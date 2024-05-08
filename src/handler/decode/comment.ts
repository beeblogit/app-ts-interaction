import { badRequestResp } from 'ts-responses';
import { Request, castRequest } from 'ts-serverless';
import { fromZodError } from 'zod-validation-error';
import { ReqGetAll, ReqStore } from '../interfaces/comment';
import { GetAll, Store } from '../schemas/comment';

export const decoGetAll = (event: Request<null>): ReqGetAll => {
  const parse = GetAll.safeParse(event.queryStringParameters || {});

  if (!parse.success) {
    throw badRequestResp(
      fromZodError(parse.error).toString(),
      parse.error.issues,
    );
  }

  return parse.data;
};

export const decoStore = (event: Request<string>): ReqStore => {
  const parse = Store.safeParse(castRequest<ReqStore>(event).body);

  if (!parse.success) {
    throw badRequestResp(
      fromZodError(parse.error).toString(),
      parse.error.issues,
    );
  }

  return parse.data;
};
