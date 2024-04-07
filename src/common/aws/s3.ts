import {
    PutObjectCommand,
    DeleteObjectsCommand,
    ListObjectsCommand
} from '@aws-sdk/client-s3';

export interface S3Client {
    send(command): Promise<any>;
}

export const DeleteByPrefix = async (
    s3: S3Client | null,
    bucket: string | undefined,
    prefix: string
): Promise<string | null> => {
    if (s3 == null) {
        return 's3 object is required';
    }
    let keys: Array<{
        Key: string;
    }> = [];
    try {
        // find all files in S3 folder
        const data = await s3.send(
            new ListObjectsCommand({
                Bucket: bucket,
                Prefix: prefix
            })
        );
        if (data.Contents != undefined) {
            for (const obj of data.Contents) {
                keys.push({
                    Key: obj.Key
                });
            }
        }
    } catch (err) {
        console.log('Error', err);
        return `S3 error: has been an error in list object with bucket '${bucket}' and prefix '${prefix}'`;
    }

    if (keys.length > 0) {
        try {
            // delete all file in the folder
            await s3.send(
                new DeleteObjectsCommand({
                    Bucket: bucket,
                    Delete: {
                        Objects: keys
                    }
                })
            );
        } catch (err) {
            console.log('Error', err);
            return `S3 error: has been an error in delete object with bucket '${bucket}' and prefix '${prefix}'`;
        }
    }

    return null;
};

export const PutObject = async (
    s3: S3Client | null,
    bucket: string | undefined,
    key: string,
    data: any
): Promise<string | null> => {
    if (s3 == null) {
        return 's3 object is required';
    }

    try {
        await s3.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: data
            })
        );
    } catch (err) {
        console.log('Error', err);
        return `S3 error: has been an error in put object with bucket '${bucket}' and key '${key}'`;
    }

    return null;
};
