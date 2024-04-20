import { CommentRepository } from './../../repository/comment';
import { CommentService } from './../../service/comment';
import { CommentController } from '../../controller/comment';
import { BaseResponseI } from '../../../src2/response'
import {SlsHandlerResponse} from '../../../src2/serverless'
import { Comment, PrismaClient } from '@prisma/client';

const db:PrismaClient = new PrismaClient({});
const repo = new CommentRepository(db);

export const handler = async (event: any): Promise<any> => {
  
  try {
    const service = new CommentService(repo);
    const controller = new CommentController(service);
    const comments = await controller.getall(null, 0, 0);
    return await SlsHandlerResponse<Comment[]>(comments);
  } catch (err: unknown | BaseResponseI<null>) {
    return await SlsHandlerResponse<null>(err as BaseResponseI<null>);
  }
};
