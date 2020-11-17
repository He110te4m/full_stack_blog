import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as Helmet from 'helmet';
import { GlobalModule } from './app';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(GlobalModule);

  // 开启 CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(Helmet());

  await app.listen(app.get('ConfigService').server.port);
}

bootstrap();
