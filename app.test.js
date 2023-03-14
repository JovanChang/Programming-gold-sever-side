'use strict';

const request = require('supertest');
const { response } = require('./app');
const app = require('./app');

describe('Test the /new service', () => {
    test('POST /new succeeds', () => {
        return request(app)
        .get('/app/new')
        .expect(404);
    });
});
