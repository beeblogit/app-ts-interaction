import { CommentRepository } from './../../repository/comment';
import { CommentService } from './../../service/comment';
import { CommentController } from '../../controller/comment';

const repo = new CommentRepository(null);

//const REGION =
//    process.env.AWS_APP_REGION == undefined ? '' : process.env.AWS_APP_REGION;
//const sns = new SNSClient({ region: REGION });


    

export const handler = async (event: any): Promise<any> => {
    
    const service = new CommentService(repo);
    const controller = new CommentController(service);
    return await controller.getall(null, 0, 0);

    /*try {
        const {
            pathParameters: { id }
        } = event;
        
    } catch (e) {
        console.error(`[ERROR] failed. ${e}`);
        const err = await SlsErrorHandler(e, CommonHeader);
        return err;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Go Serverless v3.0! Your function executed successfully!",
            input: event,
          },
          null,
          2
        ),
      };*/
    };
