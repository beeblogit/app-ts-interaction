import {Comment, PrismaClient} from '@prisma/client'
import { internalServerErrorResp } from 'ts-responses';
import {ILogger} from '../common/logger'

export interface ICommentRepository {
    getall(page: number, limit: number, postId?: string, userId?: string): Promise<Comment[]>;
    store(userId: string, postId: string, name: string, comment: string): Promise<Comment>;
    count(postId?: string, userId?: string): Promise<number>;
}

export class CommentRepository implements ICommentRepository {
    private db:PrismaClient;
    private logger: ILogger;

    constructor(db:PrismaClient, logger: ILogger) {
        this.db = db;
        this.logger = logger;
    }

    public getall = async (
        page: number, limit: number, postId?: string, userId?: string
    ): Promise<Comment[]> => {
        try {
            return await this.db.comment.findMany({
                skip: page,
                take: limit,
            })            
        } catch (e) {
            this.logger.log(e);
            throw internalServerErrorResp(e.toString());
        }
    };

    
    public store = async (
        userId: string, postId: string, name: string, comment: string
    ): Promise<Comment> => {
        try {
            return await this.db.comment.create({
                data: {
                    userId,
                    postId,
                    name,
                    comment,
                    likes: 0,
                },
              });
        } catch (e) {
            this.logger.log(e);
            throw internalServerErrorResp(e.toString());
        }
    };

    public count = async (postId?: string, userId?: string): Promise<number> => {
        try {
            return await this.db.comment.count();
        } catch (e) {
            this.logger.log(e);
            throw internalServerErrorResp(e.toString());
        }
    }
}
