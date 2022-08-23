declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_HOST: string;
      EMAIL_PORT: number;
      EMAIL_ADDRESS: string;
      EMAIL_PASS: string;
      SECRET?: string;
      NEXT_PUBLIC_VERCEL_URL?: string;
      DATABASE_URL: string;
    }
  }
}

export {};
