import App from '@/app';
import ConverterRoute from '@routes/converter.route';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Converter', () => {
  describe('[GET] /converter?type=FIAT', () => {
    it('response should fetch fiat currencies list', async () => {
      const converterRoute = new ConverterRoute();
      const app = new App([converterRoute]);

      const response = await request(app.getServer())
        .get('/converter')
        .set({ apiKey: process.env.CURRENCY_LAYER_API_KEY, Accept: 'application/json' })
        .query({ type: 'FIAT' });

      expect(response.body).toHaveProperty('data');
      expect(response.status).toBe(200);
    });
  });

  describe('[GET] /converter?type=CRYPTO', () => {
    it('response should fetch crypto currencies list', async () => {
      const converterRoute = new ConverterRoute();
      const app = new App([converterRoute]);

      const response = await request(app.getServer()).get('/converter').query({ type: 'CRYPTO' });
      expect(response.body).toHaveProperty('data');
      expect(response.status).toBe(200);
    });
  });
});
