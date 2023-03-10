[![MIT License][license-shield]][license-url]

<br />
<p align="center">
  <img src="./public/images/logo.svg" alt="rankguess logo" width="130" height="25">
</p>

<p align="center">
  Guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!
</p>
<p align="center">

![rankguess ui design](./desktop-home-design.png)

</p>

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development](#development)
  - [Production](#production)
- [Credits](#credits)
- [Contact](#contact)
- [License](#license)

## About

A web-based game where players can pick their favourite game and guess the rank of user submitted footage. Players can only guess on each game daily. Account creation will allow them to submit their own footage for review. If accepted they will be featured in the game.

## Getting Started

Follow these steps in order to get the website up and running locally on your machine.

### Prerequisites

Here's what you need to be able to run RankGuess.

- Node.js
- MySQL (recommended)
- Google Cloud OAuth Credentials

### Development

1. Clone the repostiory:

```ssh
https://github.com/LucasWinkler/rankguess.git
```

2. Go to the root directory and install the dependencies:

```ssh
cd rankguess
npm install
```

3. Set up your preferred database:

   - Create a local or cloud based MySQL database
     - I'm using Planetscale
     - You can swap this out for other options if preferred

4. Create your environment variables:

   - Duplicate the `.env.example` and rename it to `.env.local`
   - Fill in all of the environment variables

5. Synchronize your Prisma Schema with your database and generate the Prisma Client:
   - `migrate` is not recommended for Planetscale

```ssh
npm run db:push
```

5. Seed the database:

```ssh
npm run db:seed
```

6. Start the development server:

```ssh
npm run dev
```

7. Heads up, the custom npm scripts in the `package.json` that use `dotenv` are required for local development

### Production

1. Host on your preferred platform.

   - For simplicity I use:
     - Website: Vercel
     - Database: Planetscale

2. Set up your `.env` for your preferred platform following similar steps to development

   - You'll need to ensure the `NEXTAUTH_URL` is set to your domain and not `localhost:3000`
   - You'll also need to make sure that your Google Cloud Credentials include your domain instead of `localhost:3000`

3. Change the build command:
   - This command will generate the Prisma Client, seed the database and generate an optimized build

```ssh
npm run production:build
```

## Credits

Inspired by various Guess The Rank styled games and daily games such as Wordle.

## Contact

- [LinkedIn](https://linkedin.com/in/lucas-winkler)
- [Github](https://github.com/lucaswinkler)
- [Email](mailto:lucaswinkler@gmail.com)

## License

Distributed under the MIT License. See `LICENSE` for more information.

[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://choosealicense.com/licenses/mit
