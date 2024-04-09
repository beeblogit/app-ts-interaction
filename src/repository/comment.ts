export interface ICommentRepository {
    getall(filter: any, page: number, limit: number): Promise<any>;
}

export class CommentRepository implements ICommentRepository {
    private db: any;

    constructor(db: any) {
        this.db = db;
    }

    public getall = async (
        filter: any, page: number, limit: number
    ): Promise<any> => {
        try {
            console.log("repository")
            return null;
        } catch (e) {
            throw e;
        }
    };
}
