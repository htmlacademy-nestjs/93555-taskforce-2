import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getJwtAccessModuleOptions } from '../../config/jwt.config';

import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtAccessModuleOptions
    })],
  providers: [{ provide: 'JwtAccessService', useExisting: JwtService }, JwtAccessTokenStrategy],
  exports: ['JwtAccessService'],
})
export class JwtAccessModule { }
