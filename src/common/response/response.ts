import { SlsResponse } from '@digitalhouse-tech/ts-lib-serverless';
import { BaseError, InternalServerError } from '@digitalhouse-tech/ts-lib-http';

export const CommonHeader: { [key: string]: string } = {
    'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,PUT,PATCH',
    'Access-Control-Allow-Origin': '*'
};
export const SlsErrorHandler = async (
    err: any,
    headers?: { [key: string]: string }
) => {
    console.log(headers);
    return SlsResponse(exceptionHandler(err), headers);
};

const exceptionHandler = (err: any) => {
    if (err instanceof BaseError) {
        return err.toJSON();
    } else {
        const error: BaseError = new InternalServerError(String(err));
        return error.toJSON();
    }
};
