import {MetaPagination} from "../meta"


export interface Response<T> {
    message: string;
    status: string;
    code: number;
    errors?: string[];
    data?: T;
}

export interface BaseResponseI<T> {
    code: number;
    status: string;
    message: string;
    data?: T;
    meta?: MetaPagination;
    errors?: string[];
    toJSON(): Response<T>;
}

export class BaseSuccess<T> implements BaseResponseI<T> {
    code: number;
    status: string;
    message: string;
    data?: T;
    meta?: MetaPagination;

    constructor(code: number, message: string, data?: T, meta?: MetaPagination) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }

    toJSON():  Response<T> {
        return {
            message: this.message,
            status: this.status,
            data: this.data,
            code: this.code,
        };
    }
}

export class BaseError<T = any> extends Error implements BaseResponseI<T> {
    name: string;
    code: number;
    status: string;
    errors: string[];

    constructor(
        message: string,
        code: number,
        errors: string[] = [],
    ) {
        super(message);
        Object.setPrototypeOf(this, BaseError.prototype);
        Error.captureStackTrace(this, BaseError);
        this.name = 'BaseError';
        this.message = message;
        this.code = code;
        this.errors = errors;
    }

    toJSON():  Response<T> {
        return {
            message: this.message,
            status: this.status,
            code: this.code,
            errors: this.errors,
        };
    }
}