import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@taskforce/core';
import * as crypto from 'crypto';
import { User } from '@taskforce/shared-types';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepositoryMemory
  implements CRUDRepository<UserEntity, string, User>
{
  private repository: { [key: string]: User } = {};

  public async create(item: UserEntity): Promise<User> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID() };
    this.repository[entry._id] = entry;

    return { ...entry };
  }

  public async findById(id: string): Promise<User> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const existUser = Object.values(this.repository).find(
      (userItem) => userItem.email === email
    );

    if (!existUser) {
      return null;
    }

    return { ...existUser };
  }

  public async delete(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    this.repository[id] = { ...item.toObject(), _id: id };
    return this.findById(id);
  }
}
