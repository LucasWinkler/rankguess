import { Prisma } from '@prisma/client';

const gameInclude = Prisma.validator<Prisma.GameInclude>()({
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

export type GameWithRanks = Prisma.GameGetPayload<{
  include: typeof gameInclude;
}>;
