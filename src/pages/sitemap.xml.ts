import prisma from '@/lib/prismadb';
import { GetServerSideProps } from 'next';

type GameWithSlug = {
  slug: string;
};

function generateSiteMap(games: GameWithSlug[], host: string | null) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://${host}/</loc>
     </url>
     <url>
       <loc>https://${host}/login</loc>
     </url>
     <url>
       <loc>https://${host}/logout</loc>
     </url>
     <url>
       <loc>https://${host}/changelog</loc>
     </url>
     ${games
       .map(({ slug }) => {
         return `
       <url>
           <loc>https://${`${host}/game/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

const SiteMap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const games = await prisma.game.findMany({
    where: {
      isEnabled: true,
    },
    select: {
      slug: true,
    },
  });

  const host = req.headers.host || null;
  const sitemap = generateSiteMap(games, host);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
