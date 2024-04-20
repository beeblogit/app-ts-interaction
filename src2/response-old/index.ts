import {CODES} from './codes';
import {MetaPagination} from "../meta"
import { BaseError, BaseSuccess, BaseResponseI, Response} from './response';

export { BaseError, BaseSuccess, CODES, BaseResponseI, Response };

export class InternalServerError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        // TODO: validation with message value
        super(message, CODES.INTERNAL_SERVER_ERROR, errors);
    }
}

export class BadGatewayError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.BAD_GATEWAY, errors);
    }
}

export class TimeoutError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.REQUEST_TIME_OUT, errors);
    }
}

export class UnauthorizedError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.UNAUTHORIZED, errors);
    }
}

export class UnprocessableEntityError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.UNPROCESSABLE_ENTITY, errors);
    }
}

export class BadRequestError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.BAD_REQUEST, errors);
    }
}

export class NotFoundError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.NOT_FOUND, errors);
    }
}

export class ConflictError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.CONFLICT, errors);
    }
}

export class NotImplementedError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.NOT_IMPLEMENTED, errors);
    }
}

export class ForbiddenError<T = any> extends BaseError<T> {
    constructor(message: string, errors?: string[]) {
        super(message, CODES.FORBIDDEN, errors);
    }
}

export class OkResponse<T>
    extends BaseSuccess<T>
{
    constructor(data: T, message: string = '', meta?: MetaPagination) {
        super(CODES.OK, message, data, meta);
    }
}

export class CreatedResponse<T>
    extends BaseSuccess<T>
{
    constructor(data: T, message: string = '', meta?: MetaPagination) {
        super(CODES.CREATED, message, data, meta);
    }
}

export class AcceptedResponse<T>
    extends BaseSuccess<T>
{
    constructor(data: T, message: string = '', meta?: MetaPagination) {
        super(CODES.ACCEPTED, message, data, meta);
    }
}

export const classifiedErrors = {
    [CODES.INTERNAL_SERVER_ERROR]: InternalServerError,
    [CODES.BAD_GATEWAY]: BadGatewayError,
    [CODES.REQUEST_TIME_OUT]: TimeoutError,
    [CODES.UNAUTHORIZED]: UnauthorizedError,
    [CODES.UNPROCESSABLE_ENTITY]: UnprocessableEntityError,
    [CODES.BAD_REQUEST]: BadRequestError,
    [CODES.NOT_FOUND]: NotFoundError,
    [CODES.CONFLICT]: ConflictError,
    [CODES.NOT_IMPLEMENTED]: NotImplementedError,
    [CODES.FORBIDDEN]: ForbiddenError,
};
