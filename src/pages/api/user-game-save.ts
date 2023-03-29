import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const userGameSaves = await prisma.userGameSave
      .findMany({
        where: {
          userId: session.user.id,
        },
      })
      .catch(error => {
        console.error('Error getting user game saves:', error);
        return res.status(500).json({
          message: 'Internal server error while getting user game saves',
        });
      });

    return res.status(200).json({
      userGameSaves,
    });
  } else if (req.method === 'POST') {
    const { userId, gameId, clipId, guessCount, didWin } = req.body;

    const userGameSave = await prisma.userGameSave
      .upsert({
        where: {
          userId_gameId: {
            userId,
            gameId,
          },
        },
        update: {
          clipId,
          guessCount,
          didWin,
        },
        create: {
          userId,
          gameId,
          clipId,
          guessCount,
          didWin,
        },
      })
      .catch(error => {
        console.error('Error creating user game save:', error);
        return res.status(500).json({
          message: 'Internal server error while creating user game save',
        });
      });

    return res.status(200).json({
      userGameSave,
    });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
