import { ICommentService } from './../service/comment';
import { OkResponse, CreatedResponse, BaseSuccess } from '../../src2/response';
import {Comment} from '@prisma/client'

export interface ICommentController {
    getall(filter: any, page: number, limit: number): Promise<any>;
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

    public getall = async (filter: any, page: number, limit: number): Promise<BaseSuccess<Comment[]>> => {
        const comments = await this.service.getall(filter, page, limit);
        return new OkResponse<Comment[]>(comments)
    };

    public store = async  (req: StoreReq): Promise<BaseSuccess<Comment>> => {
        const comments = await this.service.store(req.userId, req.postId, req.name, req.comment);
        return new CreatedResponse<Comment>(comments)
    };

}
