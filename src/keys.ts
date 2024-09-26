import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {User} from './models';
import {PasswordHasher} from './services/hash.password.bcryptjs';
// import {Credentials} from './utils/type-schema';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'amp13T0k3nS3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '15778800'; // 6 months (6 * 30.44 * 24 * 60 * 60)
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service',
  );
  export const DATASOURCE_NAME = 'db';
}

import {FileUploadHandler} from './types'; // Binding key for the file upload service
import {Credentials} from './utils/type-schema';
export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
  'services.FileUpload',
); // Binding key for the storage directory
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');
