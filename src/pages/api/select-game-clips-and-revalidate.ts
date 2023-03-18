import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { Prisma } from '@prisma/client';

const gameInclude = Prisma.validator<Prisma.GameInclude>()({
  clips: {
    where: {
      isAccepted: true,
    },
  },
  currentClip: true,
});

type GameWithAcceptedClipsAndCurrentClip = Prisma.GameGetPayload<{
  include: typeof gameInclude;
}>;

// This function is used to update a new currentClip for a game.
// It will also update the clip to mark it as featured and
// connect the currentClip to the clip.
async function updateNewGameClip(game: GameWithAcceptedClipsAndCurrentClip) {
  try {
    return prisma.$transaction(async transaction => {
      const newClip = game.clips[0];

      if (!newClip) {
        console.log('No new clips to select for game:', game.name);

        if (game.currentClip) {
          await transaction.currentClip
            .delete({
              where: {
                gameId: game.id,
              },
            })
            .then(() =>
              console.log('Deleted currentClip for game:', game.name)
            );
        }

        return null;
      }

      const newCurrentClip = await transaction.currentClip.upsert({
        where: {
          gameId: game.id,
        },
        update: {},
        create: {
          gameId: game.id,
          clipId: newClip.id,
        },
      });

      await transaction.clip.update({
        where: { id: newClip.id },
        data: {
          hasBeenFeatured: true,
          currentClip: {
            connect: {
              clipId: newCurrentClip.clipId,
            },
          },
        },
      });

      return {
        currentClip: newCurrentClip,
      };
    });
  } catch (error) {
    console.error(
      'Error selecting clip for game:',
      game?.name || 'Error reading game data',
      error
    );
  }
}

// This API route is used to grab a new currentClip for each game
// and then revalidate the home page and each game page. It is ran
// via a cron job at 12:00 AM ETC every day.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Grab each game that is enabled, include all clips that are
    // accepted + unfeatured and then sort them by acceptedDate.
    // I'm using 'take' to ensure only one clip is returned.
    // This way we can grab the oldest clip that hasn't been featured
    // yet without having to do any additional sorting.
    const games = await prisma.game.findMany({
      where: {
        isEnabled: true,
      },
      include: {
        clips: {
          where: {
            isAccepted: true,
            hasBeenFeatured: false,
          },
          orderBy: {
            acceptedDate: 'asc',
          },
          take: 1,
        },
        currentClip: true,
      },
    });

    await Promise.allSettled(
      games.map(async game => {
        const newCurrentClip = updateNewGameClip(game);

        Promise.resolve(newCurrentClip).then(currentClip => {
          if (currentClip?.currentClip) {
            game.currentClip = currentClip.currentClip;
            console.log('New currentClip for game:', game.name, currentClip);
          }
        });
      })
    )
      .then(async () => {
        const urlsToRevalidate = [
          '/',
          ...games.map(game => `/game/${game.slug}`),
        ];

        await Promise.allSettled(
          urlsToRevalidate.map(async url => {
            await res.revalidate(url);
          })
        ).catch(error => console.error('Error revalidating pages:', error));
      })
      .then(() => {
        console.log('Revalidated URLs');
      })
      .catch(error =>
        console.error(
          'Error while selecting new clips for each game or while revalidating pages:',
          error
        )
      );

    return res.json({
      games,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error revalidating pages or selecting new daily clips',
    });
  }
}
