const request = require('supertest');
const app = require('../app');

describe('Feedback Submission', () => {
  it('should reject without token', async () => {
    const res = await request(app).post('/api/feedback/submit').send({
      text: 'Test feedback',
      rating: 5
    });
    expect(res.statusCode).toBe(401);
  });
});
