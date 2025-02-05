import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, MONGO_URI } = process.env;
export const { LOKI_URL, LOKI_BATCH_INTERVAL_IN_SECONDS, LOG_GROUP_NAME, LOG_SERVICE_NAME } = process.env;
