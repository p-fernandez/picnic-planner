import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { PicnicsService } from './picnics.service';
import { CreatePicnicDto } from './dto';
import { Picnic } from './schemas';
import { CreatePicnicResponseDto, PicnicDto } from './dto';

// TODO: Missing request validations

@Controller('picnics')
export class PicnicsController {
  constructor(private readonly picnicsService: PicnicsService) {}

  @Post()
  async create(
    @Body() createPicnicDto: CreatePicnicDto,
  ): Promise<CreatePicnicResponseDto> {
    const createdPicnic = await this.picnicsService.create(createPicnicDto);

    return {
      _id: createdPicnic._id,
    };
  }

  @Get()
  async findAll(): Promise<Picnic[]> {
    return this.picnicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PicnicDto> {
    const picnic = await this.picnicsService.findOne(id);

    if (!picnic) {
      throw new NotFoundException();
    }

    return picnic;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const picnic = await this.picnicsService.findOne(id);

    if (!picnic) {
      throw new NotFoundException();
    }

    return this.picnicsService.delete(id);
  }
}
