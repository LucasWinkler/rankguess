import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'Play Guess the Rank for Your Favorite Games',
  titleTemplate: '%s | RankGuess',
  description:
    'Welcome to RankGuess, the ultimate rank guessing game where you can test your knowledge of user-submitted gameplay in CS:GO, Overwatch, League of Legends, Apex Legends and more. Track your stats to see how you improve over time. Join the fun now!',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.rankguess.com/',
    siteName: 'RankGuess',
    title: 'Play Guess the Rank for Your Favorite Games',
    description:
      'Welcome to RankGuess, the ultimate rank guessing game where you can test your knowledge of user-submitted gameplay in CS:GO, Overwatch, League of Legends, Apex Legends and more. Track your stats to see how you improve over time. Join the fun now!',
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
