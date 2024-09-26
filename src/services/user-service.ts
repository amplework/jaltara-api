import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models/user.model';
import {} from '../repositories';
import {UserRepository} from '../repositories/user.repository';
import {
  Credentials,
  SetPasswordRequest,
  otpCredentials,
} from '../utils/type-schema';
import {PasswordHasher} from './hash.password.bcryptjs';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async validatePassword(password: string): Promise<string | undefined> {
    // Password length validation
    if (password.length < 8 || password.length > 20) {
      return 'Password must be between 8 and 20 characters';
    }

    // Strong password validation - Customize this based on your requirements
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])',
    );
    if (!strongRegex.test(password)) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character';
    }

    return undefined; // Password meets requirements
  }

  async verifyCredentials(credentials: Credentials): Promise<User> {
    // const invalidCredentialsError = 'Invalid email or password.';
    const invalidCredentialsError = 'Invalid Credentials.';

    if (!credentials.email) {
      throw new HttpErrors[422](
        'email or phone number with country code required',
      );
    }
    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email,
        phone: credentials.phone,
        // countryCode: credentials.countryCode,
        status: 'active',
      },
      include: [{relation: 'role'}],
    });
    if (
      foundUser &&
      foundUser.role.slug != 'superadmin' &&
      foundUser.currentTeamId == ''
    ) {
      throw new HttpErrors[422](
        'You are not part of any team, Please contact system administrator',
      );
    }

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const userCredential = await this.userRepository.findCredentials(
      foundUser.id,
    );

    if (!userCredential) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      userCredential.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  async verifyOtpCredentials(credentials: otpCredentials): Promise<User> {
    const invalidCredentialsError = 'Invalid Credentials.';

    if (
      !(credentials.email || (credentials.phone && credentials.countryCode))
    ) {
      throw new HttpErrors[422](
        'email or phone number with country code required',
      );
    }
    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email,
        phone: credentials.phone,
        countryCode: credentials.countryCode,
        status: 'active',
      },
      include: [{relation: 'role'}],
    });
    if (
      foundUser &&
      foundUser.role.slug != 'superadmin' &&
      foundUser.currentTeamId == ''
    ) {
      throw new HttpErrors[422](
        'You are not part of any team, Please contact system administrator',
      );
    }

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    ///////////////////////////////////////////////////////////////////
    // if (foundUser.status == 'active') {
    //   const userCodeData = await this.userCodeRepository.findOne({
    //     where: {userId: foundUser.id},
    //   });

    //   if (!userCodeData) {
    //     throw new HttpErrors.Unauthorized('incorrect OTP');
    //   }

    //   if (credentials.otp !== '123456') {
    //     throw new HttpErrors.Unauthorized('incorrect OTP');
    //   }

    //   await this.userCodeRepository.deleteById(userCodeData.id);

    //   return foundUser;
    // }
    ////////////////////////////////////////////////////

    // if (foundUser.excelId == '9999') {
    //   const userCodeData = await this.userCodeRepository.findOne({
    //     where: {userId: foundUser.id},
    //   });

    //   if (!userCodeData) {
    //     throw new HttpErrors.Unauthorized('incorrect OTP');
    //   }

    //   if (credentials.otp !== '123456') {
    //     throw new HttpErrors.Unauthorized('incorrect OTP');
    //   }

    //   await this.userCodeRepository.deleteById(userCodeData.id);

    //   return foundUser;
    // }

    // const userCodeData = await this.userCodeRepository.findOne({
    //   where: {userId: foundUser.id},
    // });

    // if (!userCodeData) {
    //   throw new HttpErrors.Unauthorized('incorrect OTP');
    // }

    // this.otpExpiryCheck(userCodeData.codeExpiry);
    // const currentDate = new Date();
    // const storedDate: any = userCodeData.codeExpiry;
    // const timeDifference = storedDate.getTime() - currentDate.getTime();
    // const timeDifferenceInMinutes = timeDifference / (1000 * 60);
    // if (timeDifferenceInMinutes > 5 || currentDate > storedDate) {
    //   throw new HttpErrors.NotFound('otp has been expired');
    // }

    // const passwordMatched = await this.passwordHasher.comparePassword(
    //   credentials.otp,
    //   userCodeData.code,
    // );

    // if (!passwordMatched) {
    //   throw new HttpErrors.Unauthorized('incorrect OTP');
    // }

    // await this.userCodeRepository.deleteById(userCodeData.id);

    return foundUser;
  }

  async otpExpiryCheck(otpExpiryTime: any): Promise<any> {
    const currentDate = new Date();
    const storedDate = new Date(otpExpiryTime);
    const timeDifference = storedDate.getTime() - currentDate.getTime();
    const timeDifferenceInMinutes = timeDifference / (1000 * 60);
    if (timeDifferenceInMinutes > 5 && currentDate > storedDate) {
      throw new HttpErrors.NotFound('otp has been expired');
    }
  }

  async verifyPassword(userId: string, password: string): Promise<Boolean> {
    const userCredential = await this.userRepository.findCredentials(userId);

    if (!userCredential) {
      throw new HttpErrors.Unauthorized('Credentials not exist!');
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      password,
      userCredential.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('Invalid Password!');
    }

    return passwordMatched;
  }

  convertToUserProfile(user: User): UserProfile {
    const userProfile = {
      [securityId]: user.id ?? '',
      name: user.fname + ' ' + user.lname,
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

  async verifyToken(data: SetPasswordRequest): Promise<User> {
    const invalidCredentialsError = 'Invalid email or token.';

    const foundUser = await this.userRepository.findOne({
      where: {
        email: data.email,
        status: 'active',
      },
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const userCredential = await this.userRepository.findCredentials(
      foundUser.id,
    );
    if (!userCredential) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const tokenMatched = data.token === userCredential.token;

    if (!tokenMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  async getUserProfile(user: User): Promise<UserProfile> {
    const userProfile = {
      [securityId]: user.id ?? '',
      name: user.name,
      id: user.id,
    };

    return userProfile;
  }

  async randomPassword(): Promise<any> {
    const length = 8;
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  async importValidtion(): Promise<any> {
    const length = 8;
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  async checkImportUser(email: string): Promise<any> {
    const userRole = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (userRole) {
      return true;
    }
  }
}
