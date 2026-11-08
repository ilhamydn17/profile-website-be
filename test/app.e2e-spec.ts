import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('Portfolio & Admin CMS API (e2e)', () => {
  let app: INestApplication<App>;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/health -> returns status ok', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/health')
      .expect(200);
    expect(res.body.status).toBe('ok');
  });

  it('POST /api/auth/login -> returns JWT accessToken for valid admin credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: process.env.ADMIN_EMAIL ?? 'admin@ilham.dev',
        password: process.env.ADMIN_PASSWORD ?? 'AdminPassword2026!',
      })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
    accessToken = res.body.accessToken;
  });

  it('GET /api/experiences -> returns initial experiences', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/experiences')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(4);
  });

  it('POST /api/experiences -> creates new experience when authenticated', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/experiences')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        role: 'Lead Cloud Architect',
        company: 'CloudScale Corp',
        location: 'Remote',
        type: 'FULL_TIME',
        startDate: 'Jan 2025',
        isCurrent: true,
        description: ['Designed multi-region Kubernetes clusters'],
        technologies: ['Kubernetes', 'NestJS', 'PostgreSQL'],
      })
      .expect(201);

    expect(res.body.role).toBe('Lead Cloud Architect');
    expect(res.body.endDate).toBe('Present');
  });

  it('GET /api/projects & GET /api/profile -> returns initial projects and profile', async () => {
    const projRes = await request(app.getHttpServer())
      .get('/api/projects')
      .expect(200);
    expect(Array.isArray(projRes.body)).toBe(true);
    expect(projRes.body.length).toBeGreaterThanOrEqual(3);

    const profileRes = await request(app.getHttpServer())
      .get('/api/profile')
      .expect(200);
    expect(profileRes.body.name).toBe('Ilham');
  });

  it('PATCH /api/profile -> updates profile bio & avatarUrl with JWT auth', async () => {
    const res = await request(app.getHttpServer())
      .patch('/api/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'Open for Enterprise Projects',
        avatarUrl: 'https://example.com/avatar.png',
      })
      .expect(200);

    expect(res.body.status).toBe('Open for Enterprise Projects');
    expect(res.body.avatarUrl).toBe('https://example.com/avatar.png');
  });
});
