import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  algorithm: process.env.JWT_ALGORITHM,
}));

export const getJwtAccessModuleOptions = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('jwt.secret'),
    signOptions: {
      expiresIn: configService.get('jwt.expiresIn'),
      algorithm: configService.get('jwt.algorithm')
    }
  }
}

export const getJwtRefreshModuleOptions = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('jwt.refreshSecret'),
    signOptions: {
      expiresIn: configService.get('jwt.refreshExpiresIn'),
      algorithm: configService.get('jwt.algorithm')
    }
  }
}
