import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CRUDRepository } from '@taskforce/core';
import { User } from '@taskforce/shared-types';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository
  implements CRUDRepository<UserEntity, string, User>
{
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>
  ) { }

  public async create(userEntity: UserEntity): Promise<User> {
    const newUser = new this.userModel(userEntity);

    return newUser.save();
  }

  public async findById(_id: string): Promise<User> {
    return this.userModel.findOne({ _id }).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async delete(id: string): Promise<void> {
    this.userModel.deleteOne({ id });
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
