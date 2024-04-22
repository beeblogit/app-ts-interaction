export interface ReqGetAll {
    limit: number,
    page: number,
    userId?: string,
    postId?: string,
}

export interface ReqStore {
    postId: string,
    userId: string,
    name: string,
    comment: string,
}
