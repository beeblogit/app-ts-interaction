import {MetaPagination} from "../meta"


export interface BaseResponseI<T> {
    code: number;
    status: string;
    message: string;
    data?: T;
    meta?: MetaPagination;
    errors?: string[];
}

export class BaseSuccess<T> implements BaseResponseI<T> {
    code: number;
    status: string;
    message: string;
    data?: T;
    meta?: MetaPagination;
    errors?: string[];

    constructor(code: number, message: string, data?: T, meta?: MetaPagination) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.meta = meta;
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
        lang: string = '',
    ) {
        super(message);
        Object.setPrototypeOf(this, BaseError.prototype);
        Error.captureStackTrace(this, BaseError);
        this.name = 'BaseError';
        this.message = message;
        this.code = code;
        this.errors = errors;
    }

    toJSON() {
        return {
            message: this.message,
            status: this.status,
            code: this.code,
            errors: this.errors,
        };
    }
}