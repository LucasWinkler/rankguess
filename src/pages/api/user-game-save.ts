import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prismadb';
import { Guess, UserGameSaveWithGuesses } from '@/types/game';

type PostParams = {
  userId: string;
  gameId: string;
  clipId: string;
  guessCount: number;
  didWin: boolean;
  guess: Guess;
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
          guesses: true,
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
    const { userId, gameId, clipId, guessCount, didWin, guess }: PostParams =
      req.body;

    if (
      typeof userId !== 'string' ||
      typeof gameId !== 'string' ||
      typeof clipId !== 'string' ||
      typeof guessCount !== 'number' ||
      typeof didWin !== 'boolean' ||
      typeof guess !== 'object' ||
      !guess.hasOwnProperty('rankId') ||
      !guess.hasOwnProperty('rankName')
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
          guesses: true,
        },
      })
      .catch(error => {
        console.error('Error creating user game save:', error);
        return res.status(500).json({
          message: 'Internal server error while creating user game save',
        });
      });

    if (userGameSave) {
      const newGuess = await prisma.guess
        .create({
          data: {
            rankId: guess.rankId,
            rankName: guess.rankName,
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
