import {CODES} from './codes';
import {MetaPagination} from "../meta"
import { errorResponse, Response, successResponse} from './response';

export { CODES, Response };

export const internalServerErrorResp  = (message: string='Internal Server Error', errors?: string[]):Response<null> => {
    return  errorResponse(message, CODES.INTERNAL_SERVER_ERROR, errors);
}

export const badGatewayResp  = (message: string='Bad Request', errors?: string[]):Response<null> => {
    return errorResponse(message, CODES.BAD_GATEWAY ,errors)
}

export const timeoutResp  = (message: string='Timeout Request', errors?: string[]):Response<null> => {
    return errorResponse(message, CODES.REQUEST_TIME_OUT ,errors)
}

export const unauthorizedResp  = (message: string='Unauthorized', errors?: string[]):Response<null> => {
    return errorResponse(message, CODES.UNAUTHORIZED ,errors)
}

export const unprocessableEntityResp  = (message: string='Unprocessable', errors?: string[]):Response<null> => {
    return errorResponse(message, CODES.UNPROCESSABLE_ENTITY ,errors)
}

export const badRequestResp  = (message: string='Bad Request', errors?: string[]):Response<null> => {
    return errorResponse(message, CODES.BAD_REQUEST ,errors)
}

export const notFoundResp  = (message: string='Not Found', errors?: string[]):Response<null> => {
    return errorResponse(message, CODES.NOT_FOUND ,errors)
}

export const conflictResp  = (message: string='Conflict', errors?: string[]):Response<null> => {
    return errorResponse(message, CODES.CONFLICT ,errors)
}

export const notImplementedResp  = (message: string='Not implemented', errors?: string[]):Response<null> => {
    return errorResponse(message, CODES.NOT_IMPLEMENTED ,errors)
}

export const forbiddenResp  = (message: string='Forbidden', errors?: string[]):Response<null> => {
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