import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  Request,
  requestBody,
  response,
} from '@loopback/rest';
import multer from 'multer';
import {ImageUpload} from '../models';
import {ImageUploadRepository} from '../repositories';
import {S3Service} from '../services/image-service';

const storage = multer.memoryStorage();
const upload = multer({storage});

export class ImageUploadController {
  constructor(
    @repository(ImageUploadRepository)
    public imageUploadRepository: ImageUploadRepository,

    @inject('services.S3Service') private s3Service: S3Service,
    @inject('rest.http.request') private request: Request,
  ) {}

  @post('/images', {
    responses: {
      '200': {
        description: 'Image upload response',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async images(): Promise<any> {
    const imageData = new Promise((resolve, reject) => {
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

        const {type, moduleId, localId} = this.request.body;

        if (!type) {
          return reject(
            new HttpErrors.BadRequest('Missing required fields in form data.'),
          );
        }

        try {
          // Upload image to S3
          const uploadResult = await this.s3Service.uploadImage(
            file.originalname + '-' + Date.now(),
            file.buffer,
            file.mimetype,
          );

          const imageUploadData = {
            url: uploadResult.Location,
            type: type,
            moduleId: moduleId,
            localId: localId,
            status: 'active',
          };

          const createdImage =
            await this.imageUploadRepository.create(imageUploadData);

          resolve({
            statusCode: 201,
            message: 'Image uploaded successfully',
            data: createdImage,
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    return imageData;
  }

  @post('/image-uploads')
  @response(200, {
    description: 'ImageUpload model instance',
    content: {'application/json': {schema: getModelSchemaRef(ImageUpload)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ImageUpload, {
            title: 'NewImageUpload',
            exclude: ['id'],
          }),
        },
      },
    })
    imageUpload: Omit<ImageUpload, 'id'>,
  ): Promise<ImageUpload> {
    return this.imageUploadRepository.create(imageUpload);
  }

  @get('/image-uploads')
  @response(200, {
    description: 'Array of ImageUpload model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ImageUpload, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ImageUpload) filter?: Filter<ImageUpload>,
  ): Promise<ImageUpload[]> {
    return this.imageUploadRepository.find(filter);
  }

  @patch('/image-uploads')
  @response(200, {
    description: 'ImageUpload PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ImageUpload, {partial: true}),
        },
      },
    })
    imageUpload: ImageUpload,
    @param.where(ImageUpload) where?: Where<ImageUpload>,
  ): Promise<Count> {
    return this.imageUploadRepository.updateAll(imageUpload, where);
  }

  @get('/image-uploads/{id}')
  @response(200, {
    description: 'ImageUpload model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ImageUpload, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ImageUpload, {exclude: 'where'})
    filter?: FilterExcludingWhere<ImageUpload>,
  ): Promise<ImageUpload> {
    return this.imageUploadRepository.findById(id, filter);
  }

  @patch('/image-uploads/{id}')
  @response(204, {
    description: 'ImageUpload PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ImageUpload, {partial: true}),
        },
      },
    })
    imageUpload: ImageUpload,
  ): Promise<void> {
    await this.imageUploadRepository.updateById(id, imageUpload);
  }

  @put('/image-uploads/{id}')
  @response(204, {
    description: 'ImageUpload PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() imageUpload: ImageUpload,
  ): Promise<void> {
    await this.imageUploadRepository.replaceById(id, imageUpload);
  }

  @del('/image-uploads/{id}')
  @response(204, {
    description: 'ImageUpload DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.imageUploadRepository.deleteById(id);
  }
}
