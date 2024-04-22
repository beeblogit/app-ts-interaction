import {CODES} from './codes';
import {MetaPagination, buildPaginator} from "./meta"
import { errorResponse, Response, successResponse} from './response';

export { CODES, Response, MetaPagination, buildPaginator };

export const internalServerErrorResp  = <Errors>(message: string='Internal Server Error', errors?: Errors):Response<null> => {
    return  errorResponse(message, CODES.INTERNAL_SERVER_ERROR, errors);
}

export const badGatewayResp  = <Errors>(message: string='Bad Request', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.BAD_GATEWAY ,errors)
}

export const timeoutResp  = <Errors>(message: string='Timeout Request', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.REQUEST_TIME_OUT ,errors)
}

export const unauthorizedResp  = <Errors>(message: string='Unauthorized', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.UNAUTHORIZED ,errors)
}

export const unprocessableEntityResp  = <Errors>(message: string='Unprocessable', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.UNPROCESSABLE_ENTITY ,errors)
}

export const badRequestResp  = <Errors>(message: string='Bad Request', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.BAD_REQUEST ,errors)
}

export const notFoundResp  = <Errors>(message: string='Not Found', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.NOT_FOUND ,errors)
}

export const conflictResp  = <Errors>(message: string='Conflict', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.CONFLICT ,errors)
}

export const notImplementedResp  = <Errors>(message: string='Not implemented', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.NOT_IMPLEMENTED ,errors)
}

export const forbiddenResp  = <Errors>(message: string='Forbidden', errors?: Errors):Response<null> => {
    return errorResponse(message, CODES.FORBIDDEN ,errors)
}

export const okResp = <data>(data:data, message:string='OK', meta?:MetaPagination) => {
    return successResponse(message,CODES.OK,data,meta);
}

export const createdResp = <data>(data:data, message:string='Created', meta?:MetaPagination) => {
    return successResponse(message,CODES.CREATED,data,meta);
}

export const acceptedResp = <data>(data:data, message:string='Accepted', meta?:MetaPagination) => {
    return successResponse(message,CODES.ACCEPTED,data,meta);
}