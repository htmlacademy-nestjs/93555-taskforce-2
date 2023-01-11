import { Document } from 'mongoose';
import { User, UserCity, UserRole } from '@taskforce/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class UserModel extends Document implements User {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public birthDate: Date;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop({ required: true, type: String, enum: UserCity })
  public city: UserCity;

  @Prop({ required: true, type: String, enum: UserRole })
  public role: UserRole;

  @Prop({ _id: false, type: String })
  public avatar: string;

  @Prop()
  public info?: string;

  @Prop()
  public rating?: number;

  @Prop()
  public rank?: number;

  @Prop()
  public specializations?: string[];

  @Prop()
  public publishedTasks?: number;

  @Prop()
  public newTasks?: number;

  @Prop()
  public completedTasks?: number;

  @Prop()
  public failedTasks?: number;


}

export const UserSchema = SchemaFactory.createForClass(UserModel);
