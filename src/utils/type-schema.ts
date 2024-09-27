import {AnyObject, property} from '@loopback/repository';
import {RequestBodyObject, SchemaObject} from '@loopback/rest';
import {User} from '../models';

export class UserWithRoles extends User {
  @property({
    type: 'string',
    default: false,
  })
  status: string;
}

export type Credentials = {
  email: string;
  password: string;
};

export type otpCredentials = {
  email: string;
  phone: string;
  countryCode: string;
  otp: string;
};

export type MailSchema = {
  to: string;
  slug: string;
  message?: string;
  from?: string;
  mailContent: AnyObject;
};
export type NotificationSchema = {
  type: string;
};

export const UserProfileSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'number'},
    email: {type: 'string'},
    name: {type: 'string'},
  },
};

export type PushPayload = {
  message: string;
  type: string;
  receivers: Array<string>;
  data: AnyObject;
};

export const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    phone: {
      type: 'string',
      minLength: 8,
    },
    countryCode: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody: RequestBodyObject = {
  description: 'The input for login function',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            minLength: 6,
          },
        },
      },
    },
  },
};

export const otpCredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['otp'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    phone: {
      type: 'string',
      minLength: 8,
    },
    countryCode: {
      type: 'string',
    },
    otp: {
      type: 'string',
      minLength: 6,
    },
  },
};

export const otpCredentialsRequestBody = {
  description: 'The input of login function',
  content: {
    'application/json': {schema: otpCredentialsSchema},
  },
};

export class NewUserResponse extends User {
  @property({
    type: 'string',
  })
  token: string;
}

export class TeamMemberRequest {
  @property({
    type: 'array',
    itemType: 'string',
  })
  userIds: string[];

  @property({
    type: 'string',
  })
  teamId: string;
  @property({
    type: 'string',
  })
  status: string;
}

export class campMemberRequest {
  @property({
    type: 'array',
    itemType: 'string',
  })
  userIds: string[];

  @property({
    type: 'string',
  })
  campTournamentId: string;
}

export const ChangePasswordSchema: SchemaObject = {
  type: 'object',
  required: ['oldPassword', 'password'],
  properties: {
    oldPassword: {
      type: 'string',
      minLength: 8,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const PasswordChangeRequestBody = {
  description: 'New and Old Password',
  required: true,
  content: {
    'application/json': {schema: ChangePasswordSchema},
  },
};

export class PatchUserRequest extends User {
  @property({
    type: 'string',
  })
  offset?: string;
}

export class SetPasswordRequest {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  token: string;
}

export class ForgotPasswordRequest {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  oldPassword: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class ChangePassword {
  @property({
    type: 'string',
    required: true,
  })
  oldPassword: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class deleteMultiImage {
  @property({
    type: 'array',
    itemType: 'string',
  })
  data: object[] = [];
}
export class duplicateEvents {
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  eventIds: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;
}
