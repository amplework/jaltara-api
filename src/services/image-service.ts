import {injectable} from '@loopback/core';
import AWS from 'aws-sdk';

@injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    this.s3 = new AWS.S3();
  }

  async uploadImage(
    fileName: string,
    fileContent: Buffer,
    contentType: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
      throw new Error(
        'AWS S3 bucket name is not defined in environment variables.',
      );
    }

    const params = {
      Bucket: bucketName,
      Key: `images/${fileName}`,
      Body: fileContent,
      ContentType: contentType,
      ACL: 'public-read',
    };

    return this.s3.upload(params).promise();
  }
}
