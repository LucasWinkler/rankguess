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
    guesses: true,
  });

export type GameWithRanks = Prisma.GameGetPayload<{
  include: typeof gameWithRanksInclude;
}>;

export type UserGameSaveWithGuesses = Prisma.UserGameSaveGetPayload<{
  include: typeof userGameSaveWithGuessesInclude;
}>;
