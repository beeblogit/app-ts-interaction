import { PublishCommand } from '@aws-sdk/client-sns';

export interface SNSClient {
    send(command): Promise<any>;
}

export const Publish = async (
    sns: SNSClient | null,
    topicName: string | undefined,
    id: string
): Promise<string | null> => {
    const params = {
        Message: id,
        TopicArn: topicName
    };
    const data = await sns?.send(new PublishCommand(params));
    console.log('Success.', data);
    return 'ok';
};
