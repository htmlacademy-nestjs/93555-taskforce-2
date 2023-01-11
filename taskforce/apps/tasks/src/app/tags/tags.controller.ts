import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { CreateTagDTO } from './dto/create-tag.dto';
import { UpdateTagDTO } from './dto/update-tag.dto';
import { TagRDO } from './rdo/tag.rdo';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tag created',
  })
  async createTag(@Body() dto: CreateTagDTO) {
    const newTag = await this.tagsService.createTag(dto);
    return fillObject(TagRDO, newTag);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tags list',
  })
  async getTags() {
    const tags = await this.tagsService.getTags();

    return fillObject(TagRDO, tags);
  }

  @Get(':tagId')
  async getTag(@Param('tagId') tagId: number) {
    const existTag = await this.tagsService.getTag(tagId);

    return fillObject(TagRDO, existTag);
  }

  @Delete(':tagId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTag(@Param('tagId') tagId: number) {
    this.tagsService.deleteTag(tagId);
  }

  @Patch(':tagId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag updated',
  })
  async updateTag(@Param('tagId') tagId: number, @Body() dto: UpdateTagDTO) {
    const updatedTag = await this.tagsService.updateTag(tagId, dto);

    return fillObject(TagRDO, updatedTag);
  }
}
