import { CommentRepository } from './../../repository/comment';
import { CommentService } from './../../service/comment';
import { CommentController, StoreReq } from '../../controller/comment';
import { BaseResponseI } from '../../../src2/response'
import {SlsHandlerResponse, Request, castRequest} from '../../../src2/serverless'
import { Comment, PrismaClient } from '@prisma/client';


const db:PrismaClient = new PrismaClient({});
const repo = new CommentRepository(db);

export const handler = async (event: Request<string,null,null>): Promise<any> => {
  const req = castRequest<StoreReq, null, null>(event)
  try {
    const service = new CommentService(repo);
    const controller = new CommentController(service);
    return await SlsHandlerResponse<Comment>(
        await controller.store(req.body)
    );
  } catch (err: unknown | BaseResponseI<null>) {
    return await SlsHandlerResponse<null>(err as BaseResponseI<null>);
  }
};
