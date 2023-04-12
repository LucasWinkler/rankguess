import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prismadb';
import { Rank } from '@prisma/client';

type PostParams = {
  userId: string;
  gameId: string;
  clipId: string;
  guessCount: number;
  didWin: boolean;
  rankGuessed: Rank;
};

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
        include: {
          guesses: {
            include: {
              rank: true,
            },
          },
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
    const {
      userId,
      gameId,
      clipId,
      guessCount,
      didWin,
      rankGuessed,
    }: PostParams = req.body;

    if (
      typeof userId !== 'string' ||
      typeof gameId !== 'string' ||
      typeof clipId !== 'string' ||
      typeof guessCount !== 'number' ||
      typeof didWin !== 'boolean' ||
      typeof rankGuessed !== 'object'
    ) {
      return res.status(400).json({
        message: 'Missing required fields or type is incorrect',
      });
    }

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
        include: {
          guesses: {
            include: {
              rank: true,
            },
          },
        },
      })
      .catch(error => {
        console.error('Error creating user game save:', error);
        return res.status(500).json({
          message: 'Internal server error while creating user game save',
        });
      });

    if (userGameSave) {
      await prisma.guess
        .create({
          data: {
            rank: {
              connect: {
                id: rankGuessed.id,
              },
            },
            userGameSave: {
              connect: {
                id: userGameSave.id,
              },
            },
          },
        })
        .catch(error => {
          console.log('Error creating guess:', error);
        });
    }

    return res.status(200).json({
      userGameSave,
    });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
