import { NestFactory } from '@nestjs/core';
import type { Express, Request, Response } from 'express';
import { AppModule } from './app.module.js';
import { setupApp } from './setup-app.js';

let cachedExpressApp: Express | null = null;

async function getServer(): Promise<Express> {
  if (!cachedExpressApp) {
    const app = await NestFactory.create(AppModule);
    setupApp(app);
    await app.init();
    cachedExpressApp = app.getHttpAdapter().getInstance() as Express;
  }
  return cachedExpressApp;
}

export default async function handler(req: Request, res: Response) {
  const server = await getServer();
  server(req, res);
}
