import * as dotenv from 'dotenv';
import * as path from 'node:path';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// TODO: Locate it in a better place as this can lead to errors
dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV}`) });

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  await app.listen(3000);
}

bootstrap();
