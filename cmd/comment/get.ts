import { CommentRepository } from './../../src/repository/comment';
import { CommentService } from './../../src/service/comment';
import { CommentController } from './../../src/controller/comment';
import {decoGetAll} from './../../src/handler/comment'
import { Response } from 'ts-responses'
import {SlsHandlerResponse, Request} from 'ts-serverless'
import { Comment, PrismaClient } from '@prisma/client';
import {Logger, SentryLog, WinstonLog, TRACE} from 'logger-fusion'
import {initSentry, initWinston} from  '../../src/bootstrap'
import {WINSTON_LOG_TRACE, SENTRY_LOG_TRACE, IS_DEBBUG} from '../../src/config'

//TODO: remove debbug func, only adding whether we can use.
const Sentry = initSentry();
const log = new Logger(IS_DEBBUG, new SentryLog(Sentry,SENTRY_LOG_TRACE), new WinstonLog(initWinston(), WINSTON_LOG_TRACE));

const db:PrismaClient = new PrismaClient({});
const repo = new CommentRepository(db,log);

export const handler = Sentry.AWSLambda.wrapHandler(  async (event: Request<null>): Promise<any> => {
  try {
    const service = new CommentService(repo,log);
    const controller = new CommentController(service);
    const comments = await controller.getall(decoGetAll(event));
    return await SlsHandlerResponse<Comment[]>(comments);
  } catch (err: unknown | Response<null>) {
    // TODO: Sentry if it's NOT Response
    return await SlsHandlerResponse<null>(err as Response<null>);
  }
}
)