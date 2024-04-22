import {Request, castRequest} from './../../../src2/serverless'
import { badRequestResp } from './../../../src2/response';
import { fromZodError } from 'zod-validation-error';
import { GetAll, Store } from '../schemas/comment';
import { ReqGetAll, ReqStore } from '../interfaces/comment';

export const decoGetAll = (event: Request<null>):ReqGetAll => {
    
        const parse = GetAll.safeParse(event.queryStringParameters || {});

        if (!parse.success) {
            throw badRequestResp(fromZodError(parse.error).toString(), parse.error.issues);
        } 
        
        return parse.data;
}

export const decoStore = (event: Request<string>):ReqStore => {

    const parse = Store.safeParse(castRequest<ReqStore>(event).body);

    if (!parse.success) {
        throw badRequestResp(fromZodError(parse.error).toString(), parse.error.issues);
    } 
    
    return parse.data;
}

