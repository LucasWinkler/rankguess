interface Games {
  title: string;
  shortTitle: string;
  thumbnail: string;
  ranks: {
    name: string;
    image: string;
  }[];
}

export const games: Games[] = [
  {
    title: 'Valorant',
    shortTitle: 'Val',
    thumbnail: '/images/games/valorant/thumbnail.webp',
    ranks: [
      {
        name: 'Iron',
        image: '/images/games/valorant/iron.webp',
      },
      {
        name: 'Bronze',
        image: '/images/games/valorant/bronze.webp',
      },
      {
        name: 'Silver',
        image: '/images/games/valorant/silver.webp',
      },
      {
        name: 'Gold',
        image: '/images/games/valorant/gold.webp',
      },
      {
        name: 'Platinum',
        image: '/images/games/valorant/platinum.webp',
      },
      {
        name: 'Diamond',
        image: '/images/games/valorant/diamond.webp',
      },
      {
        name: 'Ascendant',
        image: '/images/games/valorant/ascendant.webp',
      },
      {
        name: 'Immortal',
        image: '/images/games/valorant/immortal.webp',
      },
      {
        name: 'Radiant',
        image: '/images/games/valorant/radiant.webp',
      },
    ],
  },
  {
    title: 'Apex Legends',
    shortTitle: 'Apex',
    thumbnail: '/images/games/apex-legends/thumbnail.webp',
    ranks: [
      {
        name: 'Rookie',
        image: '/images/games/apex-legends/rookie.webp',
      },
      {
        name: 'Bronze',
        image: '/images/games/apex-legends/bronze.webp',
      },
      {
        name: 'Silver',
        image: '/images/games/apex-legends/silver.webp',
      },
      {
        name: 'Gold',
        image: '/images/games/apex-legends/gold.webp',
      },
      {
        name: 'Platinum',
        image: '/images/games/apex-legends/platinum.webp',
      },
      {
        name: 'Diamond',
        image: '/images/games/apex-legends/diamond.webp',
      },
      {
        name: 'Master',
        image: '/images/games/apex-legends/master.webp',
      },
      {
        name: 'Apex Predator',
        image: '/images/games/apex-legends/apex-predator.webp',
      },
    ],
  },
  {
    title: 'Counter-Strike: Global Offensive',
    shortTitle: 'CS:GO',
    thumbnail: '/images/games/csgo/thumbnail.webp',
    ranks: [
      {
        name: 'Silver [1-4]',
        image: '/images/games/csgo/silver-1-to-4.webp',
      },
      {
        name: 'Silver Elite',
        image: '/images/games/csgo/silver-elite.webp',
      },
      {
        name: 'Silver Elite Master',
        image: '/images/games/csgo/silver-master.webp',
      },
      {
        name: 'Gold Nova [1-3]',
        image: '/images/games/csgo/gold-nova-1-to-3.webp',
      },
      {
        name: 'Gold Nova Master',
        image: '/images/games/csgo/gold-nova-master.webp',
      },
      {
        name: 'Master Guardian [1-2]',
        image: '/images/games/csgo/master-guardian-1-to-2.webp',
      },
      {
        name: 'Master Guardian Elite',
        image: '/images/games/csgo/master-guardian-elite.webp',
      },
      {
        name: 'Distinguished Master Guardian',
        image: '/images/games/csgo/distinguished-master-guardian.webp',
      },
      {
        name: 'Legendary Eagle',
        image: '/images/games/csgo/legendary-eagle.webp',
      },
      {
        name: 'Legendary Eagle Master',
        image: '/images/games/csgo/legendary-eagle-master.webp',
      },
      {
        name: 'Supreme Master First Class',
        image: '/images/games/csgo/supreme-master-first-class.webp',
      },
      {
        name: 'The Global Elite',
        image: '/images/games/csgo/the-global-elite.webp',
      },
    ],
  },
  {
    title: 'Overwatch',
    shortTitle: 'OW',
    thumbnail: '/images/games/overwatch/thumbnail.webp',
    ranks: [
      {
        name: 'Bronze',
        image: '/images/games/overwatch/bronze.webp',
      },
      {
        name: 'Silver',
        image: '/images/games/overwatch/silver.webp',
      },
      {
        name: 'Gold',
        image: '/images/games/overwatch/gold.webp',
      },
      {
        name: 'Platinum',
        image: '/images/games/overwatch/platinum.webp',
      },
      {
        name: 'Diamond',
        image: '/images/games/overwatch/diamond.webp',
      },
      {
        name: 'Master',
        image: '/images/games/overwatch/master.webp',
      },
      {
        name: 'Grandmaster',
        image: '/images/games/overwatch/grandmaster.webp',
      },
      {
        name: 'Top 500',
        image: '/images/games/overwatch/top-500.webp',
      },
    ],
  },
];
