import { ICommentRepository } from '../repository/comment';
import {Comment} from '@prisma/client';

export interface ICommentService {
    getall(page: number, limit: number,postId?: string, userId?: string): Promise<Comment[]>;
    store(userId: string, postId: string, name: string, comment: string): Promise<Comment>;
    count(postId?: string, userId?: string): Promise<number>;
}

export class CommentService implements ICommentService {
    private repository: ICommentRepository;

    constructor(
        repository: ICommentRepository,
    ) {
        this.repository = repository;
    }

    public getall = async (page: number, limit: number, postId?: string, userId?: string): Promise<Comment[]> => {
        console.log(page, limit)
        return await this.repository.getall(page, limit, postId, userId);
    };


    public store = async (userId: string, postId: string, name: string, comment: string): Promise<Comment> => {
        return await this.repository.store(userId, postId, name, comment);
    }; 

    public count = async (postId?: string, userId?: string): Promise<number> => {
        return await this.repository.count(postId, userId)
    }

}
