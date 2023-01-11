import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getJwtRefreshModuleOptions } from '../../config/jwt.config';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtRefreshModuleOptions
    })],
  providers: [{ provide: 'JwtRefreshService', useExisting: JwtService }, JwtRefreshTokenStrategy],
  exports: ['JwtRefreshService'],
})
export class JwtRefreshModule { }
