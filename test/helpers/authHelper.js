const request = require('supertest');
const app = require('../../src/app');

async function getToken() {
  const email = 'test@kpop.com';
  const password = 'Test1234!';

  // tenta registrar (pode já existir)
  await request(app)
    .post('/api/v1/auth/register')
    .send({ name: 'Test User', email, password });

  // faz login
  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({ email, password });

  if (response.status !== 200) {
    throw new Error(`Falha ao autenticar: ${response.status}`);
  }

  return response.body.token;
}

module.exports = { getToken };