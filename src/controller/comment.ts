import { ICommentService } from './../service/comment';
import { OkResponse } from '../../src2/response';

export interface ICommentController {
    getall(filter: any, page: number, limit: number): Promise<any>;
}

export class CommentController implements ICommentController {
    private service: ICommentService;

    constructor(service: ICommentService) {
        this.service = service;
    }

    public getall = async (filter: any, page: number, limit: number): Promise<any> => {
        console.log('[Comment GetAll Controller] Get comments.');
        const comments = await this.service.getall(filter, page, limit);


        return {
            statusCode: 200,
            body: JSON.stringify(new OkResponse(comments)),
            //headers: CommonHeader
        };
    };
}
