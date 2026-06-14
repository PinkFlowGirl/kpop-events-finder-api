const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');

describe('Auth API - /api/v1/auth', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI);
    }
    await User.deleteMany({});
  });

  after(async () => {
    await User.deleteMany({});
  });

  // POST /register
  it('deve registrar um usuário válido', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Claudia', email: 'claudia@kpop.com', password: 'Test1234!' });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
    expect(res.body.user).to.have.property('email', 'claudia@kpop.com');
  });

  it('não deve registrar com email duplicado', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Claudia', email: 'claudia@kpop.com', password: 'Test1234!' });

    expect(res.status).to.equal(409);
  });

  it('não deve registrar sem campos obrigatórios', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'sem@nome.com' });

    expect(res.status).to.equal(400);
  });

  it('não deve registrar com email inválido', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test', email: 'emailinvalido', password: 'Test1234!' });

    expect(res.status).to.equal(400);
  });

  it('não deve registrar com senha fraca', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test', email: 'test2@kpop.com', password: '123' });

    expect(res.status).to.equal(400);
  });

  // POST /login
  it('deve fazer login com credenciais válidas', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'claudia@kpop.com', password: 'Test1234!' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('não deve fazer login com senha errada', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'claudia@kpop.com', password: 'SenhaErrada1!' });

    expect(res.status).to.equal(401);
  });

  it('não deve fazer login com email inexistente', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'naoexiste@kpop.com', password: 'Test1234!' });

    expect(res.status).to.equal(401);
  });

  it('não deve fazer login com body vazio', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({});

    expect(res.status).to.equal(400);
  });

  // GET /me
  it('deve retornar dados do usuário autenticado', async () => {
    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'claudia@kpop.com', password: 'Test1234!' });

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(res.status).to.equal(200);
    expect(res.body.user).to.have.property('email', 'claudia@kpop.com');
  });

  it('não deve retornar /me sem token', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me');

    expect(res.status).to.equal(401);
  });
});