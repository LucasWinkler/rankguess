import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  console.log('---- Attempting to revalidate ----');

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

    // After the currentClip is grabbed for each game revalidate each of their pages

    await Promise.all([
      await res.revalidate('/'),
      games.map(async game => {
        await res.revalidate(game.slug);
      }),
    ]);

    console.log('---- Revalidated the home page and each game page ----');

    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
