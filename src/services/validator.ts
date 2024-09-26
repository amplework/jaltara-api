import {HttpErrors} from '@loopback/rest';
// import isemail from 'isemail';
import {Credentials, NewUserRequest} from '../utils/type-schema';

export function validateCredentials(credentials: Credentials) {
  if (!credentials.password || credentials.password.length < 6) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 6 characters',
    );
  }
}

export function validateUserCreateField(user: NewUserRequest) {
  if (!user.dob) {
    throw new HttpErrors.UnprocessableEntity('Dob field can not be empty');
  }
}

export function validatePassword(password: String) {
  if (password.length < 6) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 6 characters',
    );
  }
}

export function ValidateTeam(teamId: String, userTeamId: String) {
  if (teamId != userTeamId) {
    throw new HttpErrors[422]('You are not part of the this team');
  }
}

export function TeamValidater(
  teamId: String,
  creatorTeamId: String,
  approverTeamId: String,
) {
  if (teamId != creatorTeamId) {
    throw new HttpErrors[422]('Creater is not part of this Header team');
  } else if (teamId != approverTeamId) {
    throw new HttpErrors[422]('Approver is not part of this Header team');
  }
}
