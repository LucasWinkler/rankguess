interface Games {
  name: string;
  shortName?: string;
  thumbnailPath: string;
  // ranks: {
  //   name: string;
  //   image: string;
  // }[];
}

export const games: Games[] = [
  {
    name: 'Valorant',
    thumbnailPath: '/images/games/valorant/thumbnail.webp',
  },
  {
    name: 'Apex Legends',
    thumbnailPath: '/images/games/apex-legends/thumbnail.webp',
  },
  {
    name: 'Counter-Strike: Global Offensive',
    shortName: 'CS:GO',
    thumbnailPath: '/images/games/counter-strike/thumbnail.webp',
  },
  {
    name: 'Overwatch',
    thumbnailPath: '/images/games/overwatch/thumbnail.webp',
  },
  // {
  //   name: 'League of Legends',
  //   thumbnailPath: '/images/games/league-of-legends/thumbnail.webp',
  // },
];
