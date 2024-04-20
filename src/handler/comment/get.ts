import { CommentRepository } from './../../repository/comment';
import { CommentService } from './../../service/comment';
import { CommentController } from '../../controller/comment';
import { BaseResponseI } from '../../../src2/response'
import {SlsHandlerResponse} from '../../../src2/serverless'

const repo = new CommentRepository(null);

export const handler = async (event: any): Promise<any> => {
    
  try {
    const service = new CommentService(repo);
    const controller = new CommentController(service);
    return await controller.getall(null, 0, 0);
  } catch (err: unknown | BaseResponseI<null>) {
    return await SlsHandlerResponse<null>(err);
  }
};
