import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Lal!');
  });

  it('POST /user - deve validar email', () => {
    return request(app.getHttpServer())
    .post('/user')
    .send({
      age: 25,
      name: 'Jackson',
      email: 'jagmail.com',
      password: 'lalsdgdfhgsfsef'
    })
    .expect(400)
    .expect({
      message: [
        'email must be an email', 
      ],
      error: 'Bad Request',
      statusCode: 400
    })
  })
});
