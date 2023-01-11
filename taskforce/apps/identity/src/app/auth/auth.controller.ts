import { Headers, Body, Controller, HttpCode, HttpStatus, Post, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { AuthService } from './auth.service';
import { AuthSignUpDTO } from './dto/auth-signup.dto';
import { AuthSignInDTO } from './dto/auth-signin.dto';
import { UserSignedRDO } from './rdo/user-signed.rdo';
import { UserRDO } from '../users/rdo/user.rdo';
import { UserService } from '../users/user.service';
import { TokenDataRDO } from '../tokens/rdo/token-data.rdo';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The new user has been successfully created', type: UserRDO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid user data' })
  async signup(@Headers('Authorization') token: string, @Body() dto: AuthSignUpDTO) {
    if (token) {
      const [, accessToken] = token.split(' ');
      const userSession = await this.authService.getUserSessionByToken(accessToken);

      if (userSession) {
        throw new BadRequestException('User has active session')
      }
    }

    const createdUser = await this.userService.createUser(dto);

    return fillObject(UserRDO, createdUser);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'User has been successfully logged', type: UserSignedRDO })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Password or Login is wrong', })
  async signin(@Body() dto: AuthSignInDTO) {
    const verifiedUser = await this.userService.verifyUser(dto);
    const data = fillObject(TokenDataRDO, verifiedUser);

    return this.authService.generateAuthInfo(data);
  }
}
