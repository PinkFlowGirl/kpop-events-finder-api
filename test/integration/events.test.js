const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Event = require('../../src/models/event.model');
const { getToken } = require('../helpers/authHelper');

describe('Events API - /api/v1/events', () => {
  let token = '';

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI);
    }
    await Event.deleteMany({});
    token = await getToken();
  });

  after(async () => {
    await Event.deleteMany({});
  });

  const validEvent = {
    name: 'KCON Brasil 2025',
    artist: 'BTS',
    date: '2027-12-01T20:00:00.000Z',
    venue: 'Allianz Parque',
    country: 'BR'
  };

  // POST /events
  it('deve criar um evento válido', async () => {
    const res = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send(validEvent);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('name', validEvent.name);
  });

  it('não deve criar evento sem token', async () => {
    const res = await request(app)
      .post('/api/v1/events')
      .send(validEvent);

    expect(res.status).to.equal(401);
  });

  it('não deve criar evento sem campos obrigatórios', async () => {
    const res = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Evento Incompleto' });

    expect(res.status).to.equal(400);
  });

  it('não deve criar evento com country inválido', async () => {
    const res = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...validEvent, country: 'BRASIL' });

    expect(res.status).to.equal(400);
  });

  it('não deve criar evento duplicado', async () => {
    const res = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send(validEvent);

    expect(res.status).to.equal(409);
  });

  // GET /events
  it('deve listar eventos com autenticação', async () => {
    const res = await request(app)
      .get('/api/v1/events')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  it('não deve listar eventos sem token', async () => {
    const res = await request(app)
      .get('/api/v1/events');

    expect(res.status).to.equal(401);
  });

  // GET /events/:id
  it('deve buscar um evento por ID válido', async () => {
    const created = await request(app)
      .post('/api/v1/events')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...validEvent, name: 'Evento Busca ID', date: '2028-01-01T20:00:00.000Z' });

    const res = await request(app)
      .get(`/api/v1/events/${created.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('name', 'Evento Busca ID');
  });

  it('deve retornar 404 para ID inexistente', async () => {
    const res = await request(app)
      .get('/api/v1/events/000000000000000000000000')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(404);
  });

  it('não deve buscar evento sem token', async () => {
    const res = await request(app)
      .get('/api/v1/events/000000000000000000000000');

    expect(res.status).to.equal(401);
  });
});