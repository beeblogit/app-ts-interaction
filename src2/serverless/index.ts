import { Response, internalServerErrorResp } from '../response';

export interface SlsResponseI {
  statusCode: number;
  body: string;
  headers?: { [key: string]: string };
}

export const SlsResponse = <T>(
  response: Response<T>,
  headers?: { [key: string]: string },
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

export const SlsHandlerResponse = async <T>(res: Response<T>, headers?: {[key: string]:string}) => {
    if (!headers) {
        headers = CommonHeader
    }
    if (!("code" in res)) {
        return SlsResponse(internalServerErrorResp<null>(), headers);
    }
    return SlsResponse(res, headers);
};

export interface Request<Body> {
  body: Body,
  pathParemeters: { [key: string]: string },
  queryStringParameters: { [key: string]: string },
  headers: {[key: string]:string},
  rawPath: string,
}

export const castRequest = <Body>(req: Request<string>): Request<Body> => {
    return {
        ...req, 
        body: JSON.parse(req.body) as Body,
    };
}