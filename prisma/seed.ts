import { PrismaClient } from '@prisma/client';
import ranks from '../src/data/ranks';

const prisma = new PrismaClient();

async function main() {
  const valorant = await prisma.game.upsert({
    where: { name: 'Valorant' },
    update: {},
    create: {
      name: 'Valorant',
      slug: 'valorant',
      thumbnailPath: '/images/games/valorant/thumbnail.webp',
      ranks: {
        create: ranks.valorant,
      },
      isEnabled: true,
    },
  });

  const apex = await prisma.game.upsert({
    where: { name: 'Apex Legends' },
    update: {},
    create: {
      name: 'Apex Legends',
      slug: 'apex-legends',
      thumbnailPath: '/images/games/apex-legends/thumbnail.webp',
      ranks: {
        create: ranks.apexLegends,
      },
      isEnabled: true,
    },
  });

  const csgo = await prisma.game.upsert({
    where: { name: 'Counter-Strike: Global Offensive' },
    update: {},
    create: {
      name: 'Counter-Strike: Global Offensive',
      shortName: 'CS:GO',
      slug: 'csgo',
      thumbnailPath: '/images/games/csgo/thumbnail.webp',
      ranks: {
        create: ranks.csgo,
      },
      isEnabled: true,
    },
  });

  const overwatch = await prisma.game.upsert({
    where: { name: 'Overwatch' },
    update: {},
    create: {
      name: 'Overwatch',
      slug: 'overwatch',
      thumbnailPath: '/images/games/overwatch/thumbnail.webp',
      ranks: {
        create: ranks.overwatch,
      },
      isEnabled: true,
    },
  });

  const lol = await prisma.game.upsert({
    where: { name: 'League of Legends' },
    update: {},
    create: {
      name: 'League of Legends',
      slug: 'league-of-legends',
      thumbnailPath: '/images/games/lol/thumbnail.webp',
      ranks: {
        create: ranks.lol,
      },
      isEnabled: true,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
