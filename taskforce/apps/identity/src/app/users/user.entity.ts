import { genSalt, hash, compare } from 'bcrypt';
import { User, UserCity, UserRole } from '@taskforce/shared-types';
import { SALT_ROUNDS } from './user.constants';

export class UserEntity implements User {
  public _id: string;
  public avatar?: string;
  public birthDate: Date;
  public email: string;
  public name: string;
  public info?: string;
  public passwordHash: string;
  public city: UserCity;
  public role: UserRole;

  public publishedTasks?: number;
  public newTasks?: number;

  public specializations?: string[];
  public rating?: number;
  public rank?: number;
  public completedTasks?: number;
  public failedTasks?: number;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }


  public fillEntity(user: User) {
    this._id = user._id;
    this.avatar = user.avatar;
    this.email = user.email;
    this.name = user.name;
    this.birthDate = user.birthDate;
    this.passwordHash = user.passwordHash;
    this.city = user.city;
    this.role = user.role;
    this.publishedTasks = user.publishedTasks
    this.newTasks = user.newTasks
    this.specializations = user?.specializations;
    this.rating = user?.rating;
    this.rank = user?.rank;
    this.completedTasks = user?.completedTasks;
    this.failedTasks = user?.failedTasks;
  }

  public toObject() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      birthDate: this.birthDate,
      passwordHash: this.passwordHash,
      city: this.city,
      role: this.role,
      publishedTasks: this.publishedTasks,
      newTasks: this.newTasks,
      specializations: this.specializations,
      rating: this.rating,
      rank: this.rank,
      completedTasks: this.completedTasks,
      failedTasks: this.failedTasks,
    };
  }
}
