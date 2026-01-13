import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

// This would be your API base URL
const BASE_URL = process.env.API_BASE_URL || 'https://api.demo-ticketing.com/v1';

describe('Ticketing API Endpoints', () => {
    let authToken: string;

    beforeAll(async () => {
        // Authenticate and get token
        const response = await request(BASE_URL)
            .post('/auth/login')
            .send({
                email: process.env.AGENT_EMAIL,
                password: process.env.AGENT_PASSWORD
            });

        authToken = response.body.token;
    });

    describe('POST /tickets', () => {
        test('Should create a new ticket successfully', async () => {
            const ticketData = {
                subject: 'API Test Ticket',
                description: 'Created via automated API suite',
                priority: 'Medium',
                category: 'Technical Support'
            };

            const response = await request(BASE_URL)
                .post('/tickets')
                .set('Authorization', `Bearer ${authToken}`)
                .send(ticketData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.subject).toBe(ticketData.subject);
        });

        test('Should return 400 for missing mandatory fields', async () => {
            const response = await request(BASE_URL)
                .post('/tickets')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ subject: 'Missing description' });

            expect(response.status).toBe(400);
            expect(response.body.error).toContain('description is required');
        });
    });

    describe('GET /tickets/routing', () => {
        test('TC-08: Should route "Billing" tickets to Finance queue', async () => {
            const response = await request(BASE_URL)
                .get('/tickets/route')
                .query({ keyword: 'Billing' })
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.assignedQueue).toBe('Finance');
        });
    });
});
