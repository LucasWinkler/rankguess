import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  console.log('Start seeding ...');

  const valorant = await prisma.game.upsert({
    where: { name: 'Valorant' },
    update: {},
    create: {
      name: 'Valorant',
      slug: 'valorant',
      thumbnailPath: '/images/valorant/thumbnail.webp',
    },
  });

  const apexLegends = await prisma.game.upsert({
    where: { name: 'Apex Legends' },
    update: {},
    create: {
      name: 'Apex Legends',
      slug: 'apex-legends',
      thumbnailPath: '/images/apex-legends/thumbnail.webp',
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
    },
  });

  const overwatch = await prisma.game.upsert({
    where: { name: 'Overwatch' },
    update: {},
    create: {
      name: 'Overwatch',
      slug: 'overwatch',
      thumbnailPath: '/images/overwatch/thumbnail.webp',
    },
  });

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
