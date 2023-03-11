import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    console.log('---- Invalid token ----');

    return res.status(401).json({ message: 'Invalid token' });
  }

  console.log('---- Start attempting to revalidate ----');
  try {
    console.log('---- Fetching all games ----');
    const games = await prisma.game.findMany({
      where: {
        isEnabled: true,
      },
      select: {
        slug: true,
      },
    });

    console.log(games);
    console.log('---- Fetched all games ----');

    // TODO: Set a new currentClip for all active games
    // Fetch all games that are enabled. Sort all accepted
    // clips for each game by acceptedDate and grab the
    // oldest one that hasn't been featured yet.

    console.log('---- TODO: Grabbing the current clip for each game ----');

    // After the currentClip is grabbed for each game revalidate each of their pages

    const urls = games.map(game => `/game/${game.slug}`);
    console.log('URLS before unshift: ', urls);

    urls.unshift('/');
    console.log('URLS after unshift: ', urls);

    console.log('---- Revalidating the home page and each game page ----');

    await Promise.all(
      urls.map(async url => {
        await res.revalidate(url);
      })
    )
      .then(values =>
        console.log(
          '---- Revalidated the home page and each game page ---- Values:',
          values
        )
      )
      .catch(error =>
        console.log(
          '---- Error revalidating the home page and each game page ---- Error:',
          error
        )
      );

    console.log('---- End of revaldiate ----');

    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
