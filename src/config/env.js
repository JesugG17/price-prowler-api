import 'dotenv/config';
import env from 'env-var';

export const ENV = {
  DATABASE_PASSWORD: env.get('DATABASE_PASSWORD').required().asString(),
  DATABASE_USER: env.get('DATABASE_USER').required().asString(),
  DATABASE_NAME: env.get('DATABASE_NAME').required().asString(),
  SECRET_KEY: env.get('SECRET_KEY').required().asString(),
  GOOGLE_CLIENT_SECRET: env.get('GOOGLE_CLIENT_SECRET').required().asString(),
  GOOGLE_CLIENT_ID: env.get('GOOGLE_CLIENT_ID').required().asString(),
};
