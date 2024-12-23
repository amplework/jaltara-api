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
    bucketName: string,
    fileName: string,
    fileContent: Buffer,
    contentType: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
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
