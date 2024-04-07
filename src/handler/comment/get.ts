export const handler = async (event: any): Promise<any> => {
       
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
      };

    /*try {
            const {
                pathParameters: { id }
            } = event;
            return await controller.get({ id });
        } catch (e) {
            console.error(`[ERROR] failed. ${e}`);
            const err = await SlsErrorHandler(e, CommonHeader);
            return err;
        }*/
    };
