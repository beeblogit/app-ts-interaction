import {Comment, PrismaClient} from '@prisma/client'
import { internalServerErrorResp } from '../../src2/response';

export interface ICommentRepository {
    getall(page: number, limit: number, postId?: string, userId?: string): Promise<Comment[]>;
    store(userId: string, postId: string, name: string, comment: string): Promise<Comment>;
    count(postId?: string, userId?: string): Promise<number>;
}

export class CommentRepository implements ICommentRepository {
    private db:PrismaClient;

    constructor(db:PrismaClient) {
        this.db = db;
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
            throw internalServerErrorResp(e.toString());
        }
    };

    public count = async (postId?: string, userId?: string): Promise<number> => {
        try {
            return await this.db.comment.count();
        } catch (e) {
            throw internalServerErrorResp(e.toString());
        }
    }
}
