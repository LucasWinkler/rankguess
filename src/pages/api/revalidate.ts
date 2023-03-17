import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

async function resetCurrentClip() {
  console.log('Before reset');
}

// This is API route is used to revalidate the home page and each
// game page. It is ran via a cron job at 12:00 AM ETC every day.
// It will also grab a new currentClip for each game that is enabled.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const games = await prisma.game.findMany({
      where: {
        isEnabled: true,
      },
      select: {
        slug: true,
      },
    });

    // TODO: Set a new currentClip for all active games
    // Fetch all games that are enabled. Sort all accepted
    // clips for each game by acceptedDate and grab the
    // oldest one that hasn't been featured yet.

    await resetCurrentClip().then(() => {
      console.log('After reset. Now revalidate urls');
    });

    const urls = ['/', ...games.map(game => `/game/${game.slug}`)];

    await Promise.all(
      urls.map(async url => {
        await res.revalidate(url);
      })
    ).catch(error =>
      console.log(
        'Error revalidating the home page and each game pages:',
        error
      )
    );

    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
