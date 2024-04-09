import { ICommentRepository } from '../repository/comment';

export interface ICommentService {
    getall(filter: any, page: number, limit: number): Promise<any>;
}

export class CommentService implements ICommentService {
    private repository: ICommentRepository;

    constructor(
        repository: ICommentRepository,
    ) {
        this.repository = repository;
    }

    public getall = async (filter: any, page: number, limit: number): Promise<any> => {
        console.log('[Comment GetAll Service] Fetching comments.');
        const comments = await this.repository.getall(filter, page, limit);

        return comments
        /*    try {

                
            } catch (e) {
                console.error({ e });
                return new NotFoundError(`page not found with ${id} id`);
            }
        console.log('[Block Get Service] Page found.');
        return page;*/
    };

}
