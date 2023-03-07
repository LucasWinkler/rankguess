import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'Play Guess The Rank',
  titleTemplate: '%s | RankGuess',
  description:
    'Guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.rankguess.com/',
    siteName: 'RankGuess',
  },
  twitter: {
    handle: '@LucasJWinkler',
    site: '@LucasJWinkler',
    cardType: 'summary_large_image',
  },
};

export default config;
