import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';

let cachedApp: any;

async function bootstrap() {
  if (cachedApp) {
    return cachedApp;
  }

  const express = require('express');
  const server = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();
  cachedApp = server;
  return server;
}

export default async function handler(req: Request, res: Response) {
  const server = await bootstrap();
  return server(req, res);
}

