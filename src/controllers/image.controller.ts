import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  Request,
  response,
  RestBindings,
} from '@loopback/rest';
import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';

export class ImageController {
  constructor() {
    cloudinary.config({
      cloud_name: 'dlvqdlv18',
      api_key: '225167248643596',
      api_secret: 'r6Zvmm_hCdSCVPL1GRKjizt6DtA',
    });
  }

  @post('/upload-image')
  @response(200, {
    description: 'Upload Image to Cloudinary',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async uploadImage(
    @inject(RestBindings.Http.REQUEST) request: Request,
  ): Promise<object> {
    try {
      const upload = multer().single('image');

      return new Promise((resolve, reject) => {
        upload(request, {} as any, async (err: any) => {
          if (err) {
            console.error('Error during multer processing:', err);
            reject(new HttpErrors.BadRequest('Error in file upload'));
            return;
          }

          if (!request.file) {
            reject(new HttpErrors.BadRequest('No file uploaded'));
            return;
          }

          const randomNumber = Math.floor(100000 + Math.random() * 900000);
          cloudinary.uploader
            .upload_stream(
              {public_id: `${randomNumber}${request.file.originalname}`},
              async (error, result) => {
                if (error) {
                  reject(
                    new HttpErrors.InternalServerError(
                      'Error uploading to Cloudinary',
                    ),
                  );
                  return;
                }
                resolve({
                  statusCode: 200,
                  message: 'photo uploaded successfully',
                  data: result?.url,
                });
              },
            )
            .end(request.file.buffer);
        });
      });
    } catch (error) {
      console.error('Error:', error);
      throw new HttpErrors.InternalServerError('Failed to process image');
    }
  }
}
