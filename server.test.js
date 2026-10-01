const request = require('supertest');
const app = require('./server');

describe('DermaAI Appointment API Endpoints', () => {
    it('should fetch all appointments', async () => {
        const res = await request(app).get('/api/appointments');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should create a new appointment request', async () => {
        const newReq = { patientName: 'Test User', symptoms: 'Itchy skin' };
        const res = await request(app).post('/api/appointments').send(newReq);
        expect(res.statusCode).toEqual(201);
        expect(res.body.patientName).toEqual('Test User');
        expect(res.body.status).toEqual('Pending');
    });

    it('should allow a doctor to accept an appointment', async () => {
        const res = await request(app).put('/api/appointments/1/status').send({ status: 'Accepted' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('Accepted');
    });

    it('should allow an admin to delete an appointment', async () => {
        const res = await request(app).delete('/api/appointments/1');
        expect(res.statusCode).toEqual(204);
    });
});