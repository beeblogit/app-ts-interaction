import { CommentRepository } from './../../repository/comment';
import { CommentService } from './../../service/comment';
import { CommentController } from '../../controller/comment';
import { Response } from '../../../src2/response'
import {SlsHandlerResponse, Request} from '../../../src2/serverless'
import { Comment, PrismaClient } from '@prisma/client';
import { Paginator } from '../../common/request';

const db:PrismaClient = new PrismaClient({});
const repo = new CommentRepository(db);

export const handler = async (event: Request<null,null,Paginator>): Promise<any> => {
  console.log(event);
  try {
    const {page, limit} = event.queryStringParameters;

    const service = new CommentService(repo);
    const controller = new CommentController(service);
    const comments = await controller.getall(null, page, limit);
    return await SlsHandlerResponse<Comment[]>(comments);
  } catch (err: unknown | Response<null>) {
    return await SlsHandlerResponse<null>(err as Response<null>);
  }
};
