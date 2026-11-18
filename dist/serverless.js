import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupApp } from './setup-app.js';
let cachedExpressApp = null;
async function getServer() {
    if (!cachedExpressApp) {
        const app = await NestFactory.create(AppModule);
        setupApp(app);
        await app.init();
        cachedExpressApp = app.getHttpAdapter().getInstance();
    }
    return cachedExpressApp;
}
export default async function handler(req, res) {
    const server = await getServer();
    server(req, res);
}
//# sourceMappingURL=serverless.js.map