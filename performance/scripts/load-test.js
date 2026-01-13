import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 }, // ramp up to 20 users
        { duration: '1m', target: 20 },  // stay at 20 users
        { duration: '30s', target: 0 },  // ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% of requests must be below 200ms
        http_req_failed: ['rate<0.01'],   // error rate should be less than 1%
    },
};

export default function () {
    const url = __ENV.API_BASE_URL || 'https://api.demo-ticketing.com/v1';
    const payload = JSON.stringify({
        subject: 'Performance Test Ticket',
        description: 'Load testing description',
        priority: 'Low',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${__ENV.PERF_TOKEN || 'YOUR_TEST_TOKEN'}`,
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
    });

    sleep(1);
}
