import { BaseResponseI, Response } from '../response';

export interface SlsResponseI {
  statusCode: number;
  body: string;
  headers?: { [key: string]: any };
}

export const SlsResponse = <T>(
  response: Response<T>,
  headers?: { [key: string]: any },
): SlsResponseI => ({
  statusCode: response.code,
  body: JSON.stringify(response),
  headers,
});

export const CommonHeader: { [key: string]: string } = {
  'Access-Control-Allow-Headers':
    'Content-Type,X-Amz-Date,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,PUT,PATCH',
  'Access-Control-Allow-Origin': '*',
};

export const SlsHandlerResponse = async <T>(err: BaseResponseI<T>, headers?: {[key: string]:string}) => {
    if (!headers) {
        headers = CommonHeader
    }
    return SlsResponse(err.toJSON(), headers);
};

export interface Request<Body, Path, Query> {
  body: Body,
  pathParemeters: Path,
  queryStringParameters: Query,
  headers: {[key: string]:string},
  rawPath: string,
}

export const castRequest = <Body, Path, Query>(req: Request<string, Path, Query>): Request<Body, Path, Query> => {
    return {
        ...req, 
        body: JSON.parse(req.body) as Body,
    };
}