import { ICommentRepository } from '../repository/comment';
import {Comment} from '@prisma/client';

export interface ICommentService {
    getall(filter: any, page: number, limit: number): Promise<Comment[]>;
    store(userId: string, postId: string, name: string, comment: string): Promise<Comment>;
}

export class CommentService implements ICommentService {
    private repository: ICommentRepository;

    constructor(
        repository: ICommentRepository,
    ) {
        this.repository = repository;
    }

    public getall = async (filter: any, page: number, limit: number): Promise<Comment[]> => {
        return await this.repository.getall(filter, page, limit);
    };


    public store = async (userId: string, postId: string, name: string, comment: string): Promise<Comment> => {
        return await this.repository.store(userId, postId, name, comment);
    }; 

}
