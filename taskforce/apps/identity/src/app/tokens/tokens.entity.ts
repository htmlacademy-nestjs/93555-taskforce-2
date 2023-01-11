import { Token } from '@taskforce/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../users/user.constants';

export class TokensEntity implements Token {
  public _id: string;
  public userId: string;
  public hash: string;
  public exp: Date;

  constructor(token: Token) {
    this.fillEntity(token);
  }

  public async setToken(token: string): Promise<Token> {
    const salt = await genSalt(SALT_ROUNDS);
    this.hash = await hash(token, salt);

    return this;
  }

  public async compareToken(token: string): Promise<boolean> {
    return compare(token, this.hash);
  }

  public fillEntity(token: Token) {
    this._id = token._id;
    this.userId = token.userId;
    this.hash = token.hash;
    this.exp = token.exp;
  }

  public toObject() {
    return {
      _id: this._id,
      userId: this.userId,
      hash: this.hash,
      exp: this.exp,
    };
  }

}
