namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    DATABASE_URL: string;
    SECRET: string;
  }
}
