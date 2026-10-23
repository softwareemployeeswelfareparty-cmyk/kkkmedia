const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/db');

jest.setTimeout(20000);

describe('KKK Media — Automated Test Suite', () => {

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Public Portal Routes', () => {
    it('GET / - should render homepage with status 200 and contain KKK Media branding', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('KKK');
      expect(res.text).toContain('MEDIA');
    });

    it('GET /category/tamil-nadu-politics - should return category page with status 200', async () => {
      const res = await request(app).get('/category/tamil-nadu-politics');
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('தமிழ்நாடு அரசியல்');
    });

    it('GET /about - should render About Us page with status 200', async () => {
      const res = await request(app).get('/about');
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('எங்களைப் பற்றி');
    });

    it('GET /sitemap.xml - should generate valid XML sitemap', async () => {
      const res = await request(app).get('/sitemap.xml');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('xml');
      expect(res.text).toContain('<?xml');
      expect(res.text).toContain('<urlset');
    });

    it('GET /robots.txt - should generate valid robots.txt', async () => {
      const res = await request(app).get('/robots.txt');
      expect(res.statusCode).toBe(200);
      expect(res.text).toContain('User-agent: *');
      expect(res.text).toContain('Sitemap:');
    });

    it('GET /ads.txt - should generate valid Google AdSense ads.txt', async () => {
      const res = await request(app).get('/ads.txt');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('text/plain');
      expect(res.text).toContain('google.com');
      expect(res.text).toContain('DIRECT');
      expect(res.text).toContain('f08c47fec0942fa0');
    });

    it('GET /non-existent-route-404 - should return 404 status', async () => {
      const res = await request(app).get('/non-existent-route-404');
      expect(res.statusCode).toBe(404);
      expect(res.text).toContain('404');
    });
  });

  describe('REST API Endpoints', () => {
    it('GET /api/articles - should return articles with pagination', async () => {
      const res = await request(app).get('/api/articles?limit=5');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.articles)).toBe(true);
      expect(res.body.data.articles.length).toBeGreaterThan(0);
    });

    it('GET /api/categories - should return categories list', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('POST /api/auth/login - should fail with 401 on invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@kkkmedia.com',
          password: 'WrongPassword123!',
        });
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/auth/login - should succeed with valid credentials and return JWT token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@kkkmedia.com',
          password: 'Admin@KKKMedia2026!',
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.role).toBe('ADMIN');
    });

    it('POST /api/translate - should translate text', async () => {
      const res = await request(app)
        .post('/api/translate')
        .send({
          text: 'வணக்கம்',
          targetLang: 'en',
          sourceLang: 'ta'
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.translatedText).toBeDefined();
    });
  });

});

