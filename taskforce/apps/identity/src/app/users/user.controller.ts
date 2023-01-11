import { Body, Controller, createParamDecorator, ExecutionContext, Get, HttpStatus, NotFoundException, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { multerOptions, fillObject, JwtAccessTokenGuard, MongoIdValidationPipe, UserInfoPipe } from '@taskforce/core';
import { UserSignedRDO } from '../auth/rdo/user-signed.rdo';
import { UserInfo } from '../jwt/strategies/user-info.interface';
import { UserUpdatePasswordDTO } from './dto/user-update-password.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserRDO } from './rdo/user.rdo';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'User found', type: UserRDO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not  found' })
  async getUser(@Param('id', MongoIdValidationPipe) id: string) {
    const existedUser = await this.userService.getUserById(id);

    if (!existedUser) {
      throw new NotFoundException('User not found', { description: 'NotFoundException' });
    }

    return fillObject(UserRDO, existedUser);
  }

  @ApiBody({ type: UserUpdateDTO, description: 'Update user data' })
  @ApiResponse({ type: UserSignedRDO, status: HttpStatus.OK, description: 'User data has been successfully updated' })
  @Patch()
  @UseGuards(JwtAccessTokenGuard)
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  public async updateUserData(@UserInfoPipe() user: UserInfo, @Body() dto: UserUpdateDTO) {
    const updatedUser = await this.userService.update(user._id, dto);

    return fillObject(UserRDO, updatedUser);
  }

  @ApiBody({ type: UserUpdateDTO, description: 'Upload user avatar' })
  @ApiResponse({ type: UserSignedRDO, status: HttpStatus.OK, description: 'User password has been successfully updated' })
  @Patch('password')
  @UseGuards(JwtAccessTokenGuard)
  public async updateUserPassword(@UserInfoPipe() user: UserInfo, @Body() dto: UserUpdatePasswordDTO) {
    const updatedUser = await this.userService.updatePassword(user._id, dto);

    return fillObject(UserRDO, updatedUser);
  }

  @ApiBody({ type: UserUpdateDTO, description: 'Upload user avatar' })
  @ApiResponse({ type: UserSignedRDO, status: HttpStatus.OK, description: 'User avatar has been successfully uploaded' })
  @Post('avatars')
  @UseGuards(JwtAccessTokenGuard)
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  public async uploadUserAvatar(@UserInfoPipe() user: UserInfo, @UploadedFile() file: Express.Multer.File) {
    const dto = { avatar: file.path };
    const updatedUser = await this.userService.update(user._id, dto);

    return fillObject(UserRDO, updatedUser);
  }
}
