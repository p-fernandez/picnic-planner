import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Picnic, PicnicDocument } from './schemas/picnic.schema';
import { CreatePicnicDto, PicnicDto } from './dto';

@Injectable()
export class PicnicsService {
  constructor(@InjectModel(Picnic.name) private picnicModel: Model<Picnic>) {}

  async create(createPicnicDto: CreatePicnicDto): Promise<Partial<PicnicDto>> {
    const createdPicnic = new this.picnicModel(createPicnicDto);

    const entity = await createdPicnic.save();

    return this.mapSchemaEntityToDto(entity);
  }

  async findAll(): Promise<Picnic[]> {
    return this.picnicModel.find().exec();
  }

  async findOne(id: string): Promise<PicnicDto> {
    const entity = await this.picnicModel.findOne({ _id: id }).exec();

    if (!entity) {
      return undefined;
    }

    return this.mapSchemaEntityToDto(entity);
  }

  async delete(id: string) {
    const deletedPicnic = await this.picnicModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedPicnic;
  }

  mapSchemaEntityToDto(picnic: PicnicDocument): PicnicDto {
    // TODO: Remove __v in Schema configuration
    const { _id, _userId, __v, name, location, date, activities } = picnic;

    return {
      _id: _id.toString(),
      _userId,
      name,
      location,
      date,
      activities,
    };
  }
}
