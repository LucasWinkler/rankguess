import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

// This API route is used to grab a new currentClip for each game
// It is ran via a cron job at 12:00 am ETC every day and hit a
// minute before to warm it up.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (req.query.secret === process.env.API_WARMUP_SECRET) {
    return res.status(200).json({ message: 'Warmed up' });
  }

  if (req.query.secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const games = await prisma.game.findMany({
      where: {
        isEnabled: true,
      },
      select: {
        id: true,
        slug: true,
        currentClip: true,
        clips: {
          where: {
            isAccepted: true,
            hasBeenFeatured: false,
          },
          select: {
            id: true,
          },
          orderBy: {
            acceptedDate: 'asc',
          },
          take: 1,
        },
      },
    });

    if (!games || games.length === 0) {
      return res.status(200).json({
        message:
          'No new clips to select for today as no valid games have been found',
      });
    }

    const todaysDate = new Date();
    todaysDate.setUTCHours(todaysDate.getUTCHours() - 4);

    const newExpirationDate = new Date(
      Date.UTC(
        todaysDate.getUTCFullYear(),
        todaysDate.getUTCMonth(),
        todaysDate.getUTCDate() + 1,
        0,
        0
      )
    );
    newExpirationDate.setUTCHours(newExpirationDate.getUTCHours() - 4);

    console.log('expiresDate:', newExpirationDate);

    const clipUpdateResults = await prisma
      .$transaction(async prismaTransaction => {
        const clipUpdatePromises = [];

        for (const game of games) {
          const newClip = game.clips[0];

          if (!newClip) {
            if (game.currentClip) {
              await prismaTransaction.currentClip.delete({
                where: {
                  gameId: game.id,
                },
              });
            }

            continue;
          }

          clipUpdatePromises.push(
            prismaTransaction.clip
              .update({
                where: {
                  id: newClip.id,
                },
                data: {
                  hasBeenFeatured: true,
                },
              })
              .catch(error => {
                throw new Error(
                  `Error updating clip: '${newClip.id}' to hasBeenFeatured: true: ${error}`
                );
              }),

            prismaTransaction.currentClip
              .upsert({
                where: {
                  gameId: game.id,
                },
                update: {
                  clipId: newClip.id,
                  expirationDate: newExpirationDate,
                },
                create: {
                  gameId: game.id,
                  clipId: newClip.id,
                  expirationDate: newExpirationDate,
                },
              })
              .catch(error => {
                throw new Error(
                  `Error upserting current clip '${newClip.id}' for game: '${game.id}': ${error}`
                );
              })
          );
        }

        return Promise.all(clipUpdatePromises);
      })
      .catch(error => {
        throw new Error(`Error selecting new daily clips: ${error}`);
      });

    if (!clipUpdateResults) {
      return res.status(200).json({
        message: 'No new clips to select for today',
      });
    }

    return res.status(200).json({
      message: 'Successfully selected new clips',
    });
  } catch (error) {
    console.error('Error selecting new daily clips:', error);
    return res.status(500).json({
      message: 'Error selecting new daily clips',
    });
  }
}
