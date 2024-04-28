import { CommentRepository } from './../../src/repository/comment';
import { CommentService } from './../../src/service/comment';
import { CommentController } from './../../src/controller/comment';
import {decoStore} from './../../src/handler/comment'
import { Response } from 'ts-responses'
import {SlsHandlerResponse, Request} from 'ts-serverless'
import { Comment, PrismaClient } from '@prisma/client';

const db:PrismaClient = new PrismaClient({});
const repo = new CommentRepository(db);

export const handler = async (event: Request<string>): Promise<any> => {

  try {
    const service = new CommentService(repo);
    const controller = new CommentController(service);
    
    return await SlsHandlerResponse<Comment>(
        await controller.store(
            decoStore(event)
          )
    );
  } catch (err: unknown | Response<null>) {
    return await SlsHandlerResponse<null>(err as Response<null>);
  }
};