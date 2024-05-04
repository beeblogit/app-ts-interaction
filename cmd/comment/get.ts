import { CommentRepository } from './../../src/repository/comment';
import { CommentService } from './../../src/service/comment';
import { CommentController } from './../../src/controller/comment';
import {decoGetAll} from './../../src/handler/comment'
import { Response } from 'ts-responses'
import {SlsHandlerResponse, Request} from 'ts-serverless'
import { Comment, PrismaClient } from '@prisma/client';
import {Logger} from '../../src/common/logger'

const Sentry = require("@sentry/serverless");

Sentry.AWSLambda.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0,
  tracesSampler: () => false,
  debug: false,
  /*beforeSend: (event, hint) => {
    if (IS_DEBUG) {
      console.error(hint.originalException || hint.syntheticException);
      return null; // this drops the event and nothing will be sent to sentry
    }
    console.error(hint.originalException || hint.syntheticException);
    return event;
   }*/
  environment: process.env.NODE_ENV,
  enabled: process.env.SENTRY_ENABLED === 'true'
});

const log = new Logger()
log.setSentry(Sentry);
const db:PrismaClient = new PrismaClient({});
const repo = new CommentRepository(db,log);

export const handler = Sentry.AWSLambda.wrapHandler(  async (event: Request<null>): Promise<any> => {
  try {
    const service = new CommentService(repo,log);
    const controller = new CommentController(service);
    const comments = await controller.getall(decoGetAll(event));
    return await SlsHandlerResponse<Comment[]>(comments);
  } catch (err: unknown | Response<null>) {
    Sentry.captureMessage(err);
    await Sentry.flush();
    return await SlsHandlerResponse<null>(err as Response<null>);
  }
}
)