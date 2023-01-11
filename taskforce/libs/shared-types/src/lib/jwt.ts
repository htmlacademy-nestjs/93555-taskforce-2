import { UserRole } from '@taskforce/shared-types';

export interface JwtPayload {
  email: string;
  role: UserRole
  sub: string;
  exp: number
}
