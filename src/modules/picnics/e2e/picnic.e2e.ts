import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';

import { PicnicsModule } from '../picnics.module';
import { DatabaseModule } from '../../database';

const urlPath = '/picnics';

describe('PicnicsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, PicnicsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`GET ${urlPath}`, () => {
    it(`should find the URL and return no picnics as we haven't created any`, () => {
      return request(app.getHttpServer()).get(urlPath).expect(200).expect([]);
    });
  });

  describe(`POST ${urlPath}`, () => {
    it(`should create a new picnic`, async () => {
      const date = new Date().toISOString();
      const payload = {
        _userId: '1',
        name: 'Great picnic',
        location: 'London',
        date,
        activities: ['eating', 'playing', 'laughing'],
      };
      const response = await request(app.getHttpServer())
        .post(urlPath)
        .send(payload)
        .expect(201);

      const body = JSON.parse(response.text);
      expect(body._id).toEqual(expect.any(String));
    });
  });

  describe(`GET ${urlPath}/:picnicId`, () => {
    it('should retrieve a new created picnic', async () => {
      const date = new Date().toISOString();
      const payload = {
        _userId: '2',
        name: 'Good picnic',
        location: 'Paris',
        date,
        activities: ['eating', 'playing'],
      };
      const response = await request(app.getHttpServer())
        .post(urlPath)
        .send(payload)
        .expect(201);

      const body = JSON.parse(response.text);

      const savedPicnic = await request(app.getHttpServer())
        .get(`${urlPath}/${body._id}`)
        .expect(200);

      const { _id, ...picnic } = JSON.parse(savedPicnic.text);
      expect(_id).toEqual(body._id);
      expect(picnic).toStrictEqual(payload);
    });

    it('should throw 404 for an unexisting picnicId', () => {
      const unknownId = new mongoose.Types.ObjectId();
      return request(app.getHttpServer())
        .get(`${urlPath}/${unknownId}`)
        .expect(404);
    });
  });

  describe(`DELETE ${urlPath}/:picnicId`, () => {
    it('should delete a existing picnic', async () => {
      const date = new Date().toISOString();
      const payload = {
        _userId: '3',
        name: 'Bad picnic',
        location: 'Madrid',
        date,
        activities: [],
      };
      const response = await request(app.getHttpServer())
        .post(urlPath)
        .send(payload)
        .expect(201);

      const body = JSON.parse(response.text);

      await request(app.getHttpServer())
        .get(`${urlPath}/${body._id}`)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`${urlPath}/${body._id}`)
        .expect(204);
    });

    it('should throw 404 for an unexisting picnicId', () => {
      const unknownId = new mongoose.Types.ObjectId();
      return request(app.getHttpServer())
        .delete(`${urlPath}/${unknownId}`)
        .expect(404);
    });
  });
});
