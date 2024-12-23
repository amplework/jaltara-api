import {inject} from '@loopback/core';
import {HttpErrors, post, Request} from '@loopback/rest';
import multer from 'multer';
import {S3Service} from '../services/image-service';

const storage = multer.memoryStorage();
const upload = multer({storage});

export class UploadController {
  constructor(
    @inject('services.S3Service') private s3Service: S3Service,
    @inject('rest.http.request') private request: Request,
  ) {}

  @post('/image', {
    responses: {
      '200': {
        description: 'Image upload response',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async image(): Promise<{url: string}> {
    return new Promise((resolve, reject) => {
      upload.single('file')(this.request, {} as any, async (err: any) => {
        if (err) {
          return reject(
            new HttpErrors.BadRequest('Error processing file upload.'),
          );
        }

        const file = (this.request as any).file;
        if (!file) {
          throw new HttpErrors.BadRequest('No file was uploaded.');
        }

        try {
          // Upload to S3
          const uploadResult = await this.s3Service.uploadImage(
            file.originalname + '-' + Date.now(),
            file.buffer,
            file.mimetype,
          );
          resolve({url: uploadResult.Location});
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
