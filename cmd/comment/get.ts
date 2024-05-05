import { CommentRepository } from './../../src/repository/comment';
import { CommentService } from './../../src/service/comment';
import { CommentController } from './../../src/controller/comment';
import {decoGetAll} from './../../src/handler/comment'
import { Response } from 'ts-responses'
import {SlsHandlerResponse, Request} from 'ts-serverless'
import { Comment, PrismaClient } from '@prisma/client';
import {Logger, SentryLog, WinstonLog} from 'logger-fusion'
import {initSentry, initWinston} from  '../../src/bootstrap'
import {WINSTON_DEBBUG} from '../../src/config'


//TODO: remove debbug func, only adding whether we can use.
const Sentry = initSentry();
const log = new Logger(new SentryLog(Sentry,false), new WinstonLog(initWinston(), WINSTON_DEBBUG));

const db:PrismaClient = new PrismaClient({});
const repo = new CommentRepository(db,log);

export const handler = Sentry.AWSLambda.wrapHandler(  async (event: Request<null>): Promise<any> => {
  try {
    const service = new CommentService(repo,log);
    const controller = new CommentController(service);
    const comments = await controller.getall(decoGetAll(event));
    console.log(comments);
    return await SlsHandlerResponse<Comment[]>(comments);
  } catch (err: unknown | Response<null>) {
    console.log(err)
    // TODO: Sentry if it's NOT Response
    return await SlsHandlerResponse<null>(err as Response<null>);
  }
}
)