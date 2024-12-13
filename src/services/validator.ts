import {HttpErrors} from '@loopback/rest';
import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import {Credentials} from '../utils/type-schema';

export function validateCredentials(credentials: Credentials) {
  if (!credentials.password || credentials.password.length < 6) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 6 characters',
    );
  }
}

export function uploadSingleImage(request: any): Promise<any> {
  cloudinary.config({
    cloud_name: 'dlvqdlv18',
    api_key: '225167248643596',
    api_secret: 'r6Zvmm_hCdSCVPL1GRKjizt6DtA',
  });
  try {
    const upload = multer().single('image');

    const data = new Promise((resolve, reject) => {
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

        cloudinary.uploader
          .upload_stream(
            {public_id: 'jaltara'},
            async (error: any, result: any) => {
              console.log('im here ******************');
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(
                  new HttpErrors.InternalServerError(
                    'Error uploading to Cloudinary',
                  ),
                );
                return;
              }

              const optimizedUrl = cloudinary.url('jaltara', {
                fetch_format: 'auto',
                quality: 'auto',
              });

              const autoCropUrl = cloudinary.url('jaltara', {
                crop: 'auto',
                gravity: 'auto',
                width: 500,
                height: 500,
              });

              resolve({
                uploadResult: result,
                optimizedUrl: optimizedUrl,
                autoCroppedUrl: autoCropUrl,
              });
            },
          )
          .end(request.file.buffer);
      });
    });
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new HttpErrors.InternalServerError('Failed to process image');
  }
}
