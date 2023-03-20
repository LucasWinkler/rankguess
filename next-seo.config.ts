import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'Play Guess the Rank for Your Favorite Games',
  titleTemplate: '%s | RankGuess',
  description:
    'RankGuess is a rank guessing game where you can test your knowledge of user-submitted gameplay in CS:GO, Overwatch, League of Legends, Apex Legends and more.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.rankguess.com/',
    siteName: 'RankGuess',
    title: 'Play Guess the Rank for Your Favorite Games',
    description:
      'RankGuess is a rank guessing game where you can test your knowledge of user-submitted gameplay in CS:GO, Overwatch, League of Legends, Apex Legends and more.',
    images: [
      {
        url: 'https://www.rankguess.com/og.png',
        width: 1200,
        height: 600,
        alt: 'Home page',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@LucasJWinkler',
    site: '@LucasJWinkler',
    cardType: 'summary_large_image',
  },
};

export default config;
