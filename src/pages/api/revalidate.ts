import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (
    req.query.secret !== process.env.SELECT_GAME_CLIPS_AND_REVALIDATE_SECRET
  ) {
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

    const urlsToRevalidate = ['/'];

    for (const game of games) {
      urlsToRevalidate.push(`/game/${game.slug}`);
    }

    await Promise.all(
      urlsToRevalidate.map(async url => {
        await res.revalidate(url).catch(error => {
          throw new Error(
            `Error revalidating URL: '${url}' after selecting new daily clips: ${error}`
          );
        });
      })
    );

    return res.status(200).json({
      message: 'Successfully revalidated pages',
      revalidatedUrls: urlsToRevalidate,
    });
  } catch (error) {
    console.error(
      'Error selecting new daily clips or revalidating pages:',
      error
    );
    return res.status(500).json({
      message: 'Error revalidating pages',
    });
  }
}
