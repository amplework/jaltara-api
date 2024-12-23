import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {TokenServiceBindings} from '../keys';
import {UserCredentialRepository} from '../repositories';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export interface TokenService {
  verifyToken(token: string): Promise<UserProfile>;
  generateToken(userProfile: UserProfile): Promise<string>;
  generateResetToken(userProfile: UserProfile): Promise<string>;
}

export class JWTService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET) private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN) private jwtExpiresIn: string,
    @repository(UserCredentialRepository)
    public userCredentialRepository: UserCredentialRepository,
  ) {}

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }
    let userProfile: UserProfile;
    try {
      const decodedToken = await verifyAsync(token, this.jwtSecret);
      const userCred = await this.userCredentialRepository.findOne({
        where: {
          userId: decodedToken.id,
        },
      });
      if (userCred) {
        userProfile = Object.assign(
          {[securityId]: '', name: ''},
          {
            [securityId]: decodedToken.id,
            name: decodedToken.name,
            id: decodedToken.id,
          },
        );
      } else {
        throw new HttpErrors.Gone(`Error verifying token`);
      }
    } catch (error) {
      throw new HttpErrors.Gone(`Error verifying token : ${error.message}`);
    }
    return userProfile;
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }
    const userInfoForToken = {
      id: userProfile[securityId],
      name: userProfile.name,
    };
    let token: string;
    try {
      token = await signAsync(userInfoForToken, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }

  async generateResetToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }

    const userInfoForToken = {
      id: userProfile[securityId],
      name: userProfile.name,
    };

    let token: string,
      resetExpireIn = 600; // 10 minutes;
    try {
      token = await signAsync(userInfoForToken, this.jwtSecret, {
        expiresIn: resetExpireIn,
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }
}
