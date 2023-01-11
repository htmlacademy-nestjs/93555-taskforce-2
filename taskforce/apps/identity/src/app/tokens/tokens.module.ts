import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModel, TokenSchema } from './tokens.model';
import { TokensRepository } from './tokens.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: TokenModel.name, schema: TokenSchema }])],
  providers: [TokensRepository],
  exports: [TokensRepository],
})
export class TokensModule { }
