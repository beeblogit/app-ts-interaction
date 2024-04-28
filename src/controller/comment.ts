import { ICommentService } from './../service/comment';
import { okResp, createdResp, Response, buildPaginator } from 'ts-responses';
import {ReqGetAll, ReqStore} from '../handler/comment';
import {Comment} from '@prisma/client';

export interface ICommentController {
    getall(req: ReqGetAll): Promise<Response<Comment[]>>;
    store(req: ReqStore): Promise<Response<Comment>>;
}

export class CommentController implements ICommentController {
    private service: ICommentService;

    constructor(service: ICommentService) {
        this.service = service;
    }

    public getall = async (req: ReqGetAll): Promise<Response<Comment[]>> => {
        
        const count = await this.service.count(req.postId, req.userId);
        const meta = buildPaginator(req.page, req.limit, count);
        console.log(meta)
        const comments = await this.service.getall(meta.Offset(), meta.Limit(),req.postId, req.userId);
        return okResp<Comment[]>(comments, "", meta);
    };

    public store = async  (req: ReqStore): Promise<Response<Comment>> => {
        const comments = await this.service.store(req.userId, req.postId, req.name, req.comment);
        return createdResp<Comment>(comments)
    };

}
