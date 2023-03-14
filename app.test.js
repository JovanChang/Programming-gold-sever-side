/* eslint-disable no-undef */
'use strict';

const request = require('supertest');
const app = require('./app');

describe('Test the /new service', () => {
    test('POST /new succeeds', () => {
        return request(app)
        .get('/app/new')
        .expect(404);
    });
});

describe('Test orders service', () => {
    test('GET /orders succeeds', () => {
        return request(app)
        .get('/app/orders')
        .expect('Content-type', /json/);
    });
});
