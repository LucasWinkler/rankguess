import { PrismaClient } from '@prisma/client';
import ranks from '../src/data/ranks';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  console.log(ranks);

  const valorant = await prisma.game.upsert({
    where: { name: 'Valorant' },
    update: {},
    create: {
      name: 'Valorant',
      slug: 'valorant',
      thumbnailPath: '/images/valorant/thumbnail.webp',
      ranks: {
        create: ranks.valorant,
      },
    },
  });

  const apex = await prisma.game.upsert({
    where: { name: 'Apex Legends' },
    update: {},
    create: {
      name: 'Apex Legends',
      slug: 'apex-legends',
      thumbnailPath: '/images/apex-legends/thumbnail.webp',
      ranks: {
        create: ranks.apexLegends,
      },
    },
  });

  const csgo = await prisma.game.upsert({
    where: { name: 'Counter-Strike: Global Offensive' },
    update: {},
    create: {
      name: 'Counter-Strike: Global Offensive',
      shortName: 'CS:GO',
      slug: 'csgo',
      thumbnailPath: '/images/csgo/thumbnail.webp',
      ranks: {
        create: ranks.csgo,
      },
    },
  });

  const overwatch = await prisma.game.upsert({
    where: { name: 'Overwatch' },
    update: {},
    create: {
      name: 'Overwatch',
      slug: 'overwatch',
      thumbnailPath: '/images/overwatch/thumbnail.webp',
      ranks: {
        create: ranks.overwatch,
      },
    },
  });

  const lol = await prisma.game.upsert({
    where: { name: 'League of Legends' },
    update: {},
    create: {
      name: 'League of Legends',
      slug: 'league-of-legends',
      thumbnailPath: '/images/lol/thumbnail.webp',
      ranks: {
        create: ranks.lol,
      },
    },
  });

  console.log('Games created:', valorant, apex, csgo, overwatch, lol);

  console.log('Seeding finished.');
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
