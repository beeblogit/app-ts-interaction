export interface ICommentRepository {
    getall(filter: any, page: number, limit: number): Promise<any>;
}

export class CommentRepository implements ICommentRepository {
    private dynamoClient: any;

    constructor(dynamoClient: any) {
        this.dynamoClient = dynamoClient;
    }

    public getall = async (
        filter: any, page: number, limit: number
    ): Promise<any> => {
        try {
            return null;
        } catch (e) {
            throw e;
        }
    };
}
