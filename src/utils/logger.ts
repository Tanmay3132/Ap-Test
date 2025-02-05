import { LOG_DIR, LOG_GROUP_NAME, LOG_SERVICE_NAME, LOKI_BATCH_INTERVAL_IN_SECONDS, LOKI_URL, NODE_ENV } from '@config';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import LokiTransport from 'winston-loki';

// logs dir
const logDir: string = join(__dirname, LOG_DIR);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

let logger = null;
if (NODE_ENV === 'development') {
  logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
    transports: [
      new winstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/debug', // log file /logs/debug/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 2, // 7 Days saved
        json: false,
        zippedArchive: true,
      }),
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error', // log file /logs/error/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 2, // 7 Days saved
        handleExceptions: true,
        json: false,
        zippedArchive: true,
      }),
      new LokiTransport({
        host: LOKI_URL,
        onConnectionError: err => console.error(err),
        useWinstonMetaAsLabels: false,
        batching: true,
        interval: LOKI_BATCH_INTERVAL_IN_SECONDS ? Number(LOKI_BATCH_INTERVAL_IN_SECONDS) : 5,
        labels: {
          appname: LOG_GROUP_NAME,
          service_name: LOG_SERVICE_NAME,
        },
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
    transports: [
      new LokiTransport({
        host: LOKI_URL,
        onConnectionError: err => console.error(err),
        useWinstonMetaAsLabels: false,
        batching: true,
        interval: LOKI_BATCH_INTERVAL_IN_SECONDS ? Number(LOKI_BATCH_INTERVAL_IN_SECONDS) : 5,
        labels: {
          appname: LOG_GROUP_NAME,
          service_name: LOG_SERVICE_NAME,
        },
      }),
    ],
  });
}

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

// const timerRef: Array<{ timerId: string; startTime: number }> = [];
const timerRef: { [key: string]: { startTime: number } } = {};

const appCustomLogger = {
  time: ({ timerId }) => {
    const currentTime = new Date();
    timerRef[timerId] = { startTime: currentTime.getTime() };
  },
  timeLog: ({ timerId, tag = '', description = '', correlationId = '' }) => {
    const timeRefObject = timerRef[timerId];
    const currentTime = new Date().getTime();
    if (timeRefObject) {
      const timeDifference = currentTime - timeRefObject.startTime;
      logger.info(JSON.stringify({ timerId, timeTakenInMS: timeDifference, tag, description, correlationId }));
    } else {
      logger.info(`Invalid timerId provided ${timerId} ${tag} ${description ? description : ''} ${correlationId}`);
    }
  },
  timeEnd: ({ timerId, tag = '', description = '', correlationId = '' }) => {
    const timeRefObjectIndex = timerRef[timerId];
    const currentTime = new Date().getTime();

    if (timeRefObjectIndex) {
      const timeDifference = currentTime - timeRefObjectIndex.startTime;
      logger.info(JSON.stringify({ timerId, timeTakenInMS: timeDifference, tag, description, correlationId }));
      delete timerRef[timerId];
    } else {
      logger.info(`Invalid timerId provided ${timerId} ${tag} ${description ? description : ''} ${correlationId}`);
    }
  },
};

export { appCustomLogger, logger, stream };
