import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PicnicsController } from './picnics.controller';
import { PicnicsService } from './picnics.service';
import { Picnic, PicnicSchema } from './schemas';

import { DatabaseModule } from '../database';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Picnic.name, schema: PicnicSchema }]),
  ],
  controllers: [PicnicsController],
  providers: [PicnicsService],
})
export class PicnicsModule {}
