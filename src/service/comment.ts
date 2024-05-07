import { ICommentRepository } from '../repository/comment';
import {Comment} from '@prisma/client';
import {ILogger} from 'logger-fusion'

export interface ICommentService {
    getall(page: number, limit: number,postId?: string, userId?: string): Promise<Comment[]>;
    store(userId: string, postId: string, name: string, comment: string): Promise<Comment>;
    count(postId?: string, userId?: string): Promise<number>;
}

export class CommentService implements ICommentService {
    private repository: ICommentRepository;
    private logger: ILogger;

    constructor(
        repository: ICommentRepository,
        logger: ILogger,
    ) {
        this.repository = repository;
        this.logger = logger;
    }

    public getall = async (page: number, limit: number, postId?: string, userId?: string): Promise<Comment[]> => {
        this.logger.debbug("Comment GETALL service");
        return await this.repository.getall(page, limit, postId, userId);
    };

    public store = async (userId: string, postId: string, name: string, comment: string): Promise<Comment> => {
        this.logger.debbug("Comment STORE service");
        return await this.repository.store(userId, postId, name, comment);
    }; 

    public count = async (postId?: string, userId?: string): Promise<number> => {
        this.logger.debbug("Comment COUNT service");
        return await this.repository.count(postId, userId)
    }

}
