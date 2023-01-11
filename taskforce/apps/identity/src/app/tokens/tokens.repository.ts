import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepository } from '@taskforce/core';
import { Token } from '@taskforce/shared-types';
import { Model } from 'mongoose';
import { TokenModel } from './tokens.model';
import { TokensEntity } from './tokens.entity';

@Injectable()
export class TokensRepository implements CRUDRepository<TokensEntity, string, Token> {

  constructor(@InjectModel(TokenModel.name) private readonly tokenModel: Model<TokenModel>) { }

  public async create(entity: TokensEntity): Promise<Token> {
    return this.tokenModel.create(entity);
  }

  public async findById(_id: string): Promise<Token | null> {
    return this.tokenModel
      .findOne({ _id })
      .exec();
  }

  public async findByUserId(userId: string): Promise<Token | null> {
    return this.tokenModel
      .findOne({ userId })
      .exec();
  }

  public async update(id: string, item: TokensEntity): Promise<Token> {
    return this.tokenModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async delete(userId: string): Promise<void> {
    await this.tokenModel.deleteMany({ userId });
  }
}
