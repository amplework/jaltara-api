import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models/user.model';
import {} from '../repositories';
import {UserRepository} from '../repositories/user.repository';
import {Credentials} from '../utils/type-schema';
import {PasswordHasher} from './hash.password.bcryptjs';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}
  async verifyCredentials(credentials: Credentials): Promise<any> {}

  convertToUserProfile(user: User): UserProfile {
    const userProfile = {
      [securityId]: user.id ?? '',
      name: user.name,
      id: user.id,
    };
    return userProfile;
  }

  async checkUniquePhoneNumber(id: any, number: any): Promise<any> {
    const userFind = await this.userRepository.findOne({
      where: {
        id: {nin: [id]},
        phone: number,
      },
    });
    if (userFind) {
      return false;
    }
    return true;
  }

  async checkPhoneNumber(number: any): Promise<any> {
    console.log('number', number);
    const userFind = await this.userRepository.findOne({
      where: {
        phone: number,
      },
    });
    if (userFind) {
      return userFind;
    }
    return false;
  }

  async getUserProfile(user: User): Promise<UserProfile> {
    const userProfile = {
      [securityId]: user.id ?? '',
      name: user.name,
      id: user.id,
    };

    return userProfile;
  }
}
