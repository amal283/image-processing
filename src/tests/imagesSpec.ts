import request from 'supertest';
import app from '../index';

it('api for image processing', async () => {
     const response = await request(app)
      .get('/api/images')
      .query({fileName: 'coffee', width: '500', height: '500'})
      .expect(200);
});