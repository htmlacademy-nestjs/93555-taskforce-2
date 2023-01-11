import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandEvent, User } from '@taskforce/shared-types';
import { USER_NOT_FOUND, USER_PASSWORD_WRONG } from './user.constants';
import { AuthSignInDTO } from '../auth/dto/auth-signin.dto';
import { AuthSignUpDTO } from '../auth/dto/auth-signup.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserUpdatePasswordDTO } from './dto/user-update-password.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
  ) { }

  async createUser(dto: AuthSignUpDTO): Promise<User | null> {
    const existedUser = await this.userRepository.findByEmail(dto.email);

    if (existedUser) {
      throw new BadRequestException('User existed');
    }

    const entity = await new UserEntity({ ...dto, passwordHash: '' }).setPassword(dto.password);

    const createdUser = await this.userRepository.create(entity);

    // @tutor: есть ли какой-то стандарт сообщений? каких принципов стоит придерживаться?
    // @tutor: основы RabbitMQ на примере management панели
    // @tutor: почему не используем exchange?
    this.rabbitClient.emit(
      // @tutor: cmd это стандарт?
      { cmd: CommandEvent.AddSubscriber },
      {
        email: createdUser.email,
        name: createdUser.name,
        userId: createdUser._id.toString(),
      }
    );

    return createdUser;
  }

  async verifyUser(dto: AuthSignInDTO) {
    const existedUser = await this.userRepository.findByEmail(dto.email);

    if (!existedUser) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existedUser);
    const passwordIsValid = await userEntity.comparePassword(dto.password)

    if (!passwordIsValid) {
      throw new UnauthorizedException(USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }


  async getUserById(id: string) {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }


  async update(id: string, dto: UserUpdateDTO): Promise<User | null> {
    const existedUser = await this.userRepository.findById(id);

    if (!existedUser) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const newUserEntity = new UserEntity({ ...existedUser, ...dto });

    return this.userRepository.update(id, newUserEntity);
  }

  async updatePassword(_id: string, dto: UserUpdatePasswordDTO) {
    const { email, password, newPassword } = dto;

    const verifiedUser = await this.verifyUser({ email, password });

    const userEntity =
      await new UserEntity(verifiedUser).setPassword(newPassword);

    return this.userRepository.update(verifiedUser._id, userEntity);
  }
}
