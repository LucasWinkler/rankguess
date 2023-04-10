import { Prisma } from '@prisma/client';

const gameWithRanksInclude = Prisma.validator<Prisma.GameInclude>()({
  ranks: true,
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
});

const userGameSaveWithGuessesInclude =
  Prisma.validator<Prisma.UserGameSaveInclude>()({
    guesses: {
      include: {
        rank: true,
      },
    },
  });

const guessWithRankInclude = Prisma.validator<Prisma.GuessInclude>()({
  rank: true,
});

export type GameWithRanks = Prisma.GameGetPayload<{
  include: typeof gameWithRanksInclude;
}>;

export type UserGameSaveWithGuesses = Prisma.UserGameSaveGetPayload<{
  include: typeof userGameSaveWithGuessesInclude;
}>;

export type GuessWithRank = Prisma.GuessGetPayload<{
  include: typeof guessWithRankInclude;
}>;

export type GuessParams = {
  rankId: string;
  rankName: string;
};

export type Guess = {
  rankId: string;
  rankName: string;
  rankImagePath: string;
};
