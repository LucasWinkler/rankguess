import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameId, secret } = req.query;

  if (secret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!gameId) {
    return res.status(400).json({ message: 'Missing game id' });
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId as string,
    },
    include: {
      ranks: {
        orderBy: {
          order: 'asc',
        },
      },
      currentClip: {
        include: {
          clip: {
            select: {
              youtubeUrl: true,
              rank: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).json({
    game,
  });
}
