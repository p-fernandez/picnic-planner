import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as path from 'node:path';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// TODO: [SHORTCUT] Cleaner config management. Locate it in a better place as this can lead to errors
dotenv.config({ path: path.join(`.env.${process.env.NODE_ENV}`) });

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.enableCors();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // TODO: [SHORTCUT] Configurable port of the application
  await app.listen(3000);
}

// TODO: [SHORTCUT] Missing gracefully shutdown

bootstrap();
