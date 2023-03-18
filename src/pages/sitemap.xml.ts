import prisma from '@/lib/prismadb';
import { Game } from '@prisma/client';
import { GetServerSideProps } from 'next';

function generateSiteMap(games: Game[], host: string | null) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.rankguess.com/</loc>
     </url>
     <url>
       <loc>https://www.rankguess.com/login</loc>
     </url>
     <url>
       <loc>https://www.rankguess.com/logout</loc>
     </url>
     <url>
       <loc>https://www.rankguess.com/changelog</loc>
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

export default function SiteMap() {}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const games = await prisma.game.findMany();
  const host = req.headers.host || null;
  console.log('host', host);

  const sitemap = generateSiteMap(games, host);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
