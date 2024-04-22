import {MetaPagination} from "./meta"

export interface Response<T> {
    message: string;
    status: string;
    code: number;
    errors?: string[];
    data?: T;
    meta?: MetaPagination;
}

export const successResponse = <data>(message:string, code: number, data?:data, meta?:MetaPagination): Response<data> => {
    return {
        message,
        data,
        code,
        meta,
    } as Response<data>
}

export const errorResponse = <Errors>(message: string, code: number, errors?: Errors): Response<null> => {
    return {
        message,
        code,
        errors
    } as Response<null>
}