import { ICommentService } from './../service/comment';
import { okResp, createdResp, Response } from '../../src2/response';
import {Comment} from '@prisma/client'

export interface ICommentController {
    getall(filter: any, page: string, limit: string): Promise<any>;
}

export interface StoreReq {
    userId: string,
    postId: string,
    name: string,
    comment: string,
}

export class CommentController implements ICommentController {
    private service: ICommentService;

    constructor(service: ICommentService) {
        this.service = service;
    }

    public getall = async (filter: any, page: string, limit: string): Promise<Response<Comment[]>> => {
        
        const comments = await this.service.getall(filter, 0, 0);
        return okResp<Comment[]>(comments)
    };

    public store = async  (req: StoreReq): Promise<Response<Comment>> => {
        const comments = await this.service.store(req.userId, req.postId, req.name, req.comment);
        return createdResp<Comment>(comments)
    };

}
