import {Comment, PrismaClient} from '@prisma/client'
import { internalServerErrorResp } from '../../src2/response';

export interface ICommentRepository {
    getall(filter: any, page: number, limit: number): Promise<Comment[]>;
    store(userId: string, postId: string, name: string, comment: string): Promise<Comment>;
}

export class CommentRepository implements ICommentRepository {
    private db:PrismaClient;

    constructor(db:PrismaClient) {
        this.db = db;
    }

    public getall = async (
        filter: any, page: number, limit: number
    ): Promise<Comment[]> => {
        try {
            return await this.db.comment.findMany()            
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
}
