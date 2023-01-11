import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Token } from '@taskforce/shared-types';
import { Document } from 'mongoose';

@Schema({ collection: 'tokens' })
export class TokenModel extends Document implements Token {

  @Prop({ required: true })
  public userId: string;

  @Prop({ required: true })
  public hash: string;

  @Prop({ required: true })
  public exp: Date;
}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);
