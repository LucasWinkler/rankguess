import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

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

    console.log('---- TODO: Grabbing the current clip for each game ----');

    // After the currentClip is grabbed for each game revalidate each of their pages

    const urls = games.map(game => `/game/${game.slug}`);
    urls.unshift('/');

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
