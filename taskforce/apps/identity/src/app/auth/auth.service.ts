import { Inject, Injectable } from '@nestjs/common';
import { JwtPayload, Token } from '@taskforce/shared-types';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { TokensRepository } from '../tokens/tokens.repository';
import { TokensEntity } from '../tokens/tokens.entity';
import { fillObject } from '@taskforce/core';
import { TokenRDO } from '../tokens/rdo/token.rdo';
import { TokenDataDTO } from '../tokens/dto/token-data.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('JwtAccessService') private readonly jwtAccessService: JwtService,
    @Inject('JwtRefreshService') private readonly jwtRefreshService: JwtService,
    private readonly tokensRepository: TokensRepository,
  ) { }

  private async getAccessTokenInfo(token: string) {
    return this.jwtAccessService.decode(token) as JwtPayload;
  }

  private async getRefreshTokenInfo(token: string) {
    return this.jwtRefreshService.decode(token) as JwtPayload;
  }

  async generateAuthInfo(dto: TokenDataDTO) {
    const payload = {
      sub: dto._id,
      email: dto.email,
      role: dto.role,
    };

    const accessToken = await this.jwtAccessService.signAsync(payload);

    const refreshToken = await this.jwtRefreshService.signAsync(payload);
    const refreshTokenInfo = await this.getRefreshTokenInfo(refreshToken);
    const refreshTokenEntity = new TokensEntity({ userId: dto._id, exp: new Date(refreshTokenInfo.exp * 1000) });

    await refreshTokenEntity.setToken(refreshToken);

    const existedRefreshToken = await this.tokensRepository.findByUserId(dto._id);

    if (existedRefreshToken) {
      const { id: refreshTokenId } = fillObject(TokenRDO, existedRefreshToken);
      await this.tokensRepository.update(refreshTokenId, refreshTokenEntity)
    } else {
      await this.tokensRepository.create(refreshTokenEntity);
    }

    return {
      _id: dto._id,
      email: dto.email,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }


  async getUserSessionByToken(token: string): Promise<Token | null> {
    const tokenInfo = await this.getAccessTokenInfo(token);

    return this.tokensRepository.findByUserId(tokenInfo.sub);
  }
}
