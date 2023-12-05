import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database';
import { PicnicsModule } from './modules/picnics';

@Module({
  imports: [DatabaseModule, PicnicsModule],
})
export class AppModule {}
