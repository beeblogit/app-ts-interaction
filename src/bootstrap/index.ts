const Sentry = require("@sentry/serverless");
const winston = require('winston');
import {NODE_ENV, SENTRY_ENABLED, SENTRY_DSN} from '../config'

export const initSentry = () => {
    Sentry.AWSLambda.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: 0,
        tracesSampler: () => false,
        debug: false,
        environment: NODE_ENV,
        enabled: SENTRY_ENABLED
    });

    return Sentry;
}

export const initWinston = () => {
    return winston.createLogger({
        transports: [
            new winston.transports.Console(),
        ]
    });
}