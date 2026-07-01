import { test, expect } from '@playwright/test';

test('[API-005] Reject authentication with invalid credentials', async ({ request }) => {
    const response = await request.post('/auth', {
        data: {
            username: 'admin',
            password: 'wrong-password',
        },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeUndefined();
    expect(body.reason).toBe('Bad credentials');
});
