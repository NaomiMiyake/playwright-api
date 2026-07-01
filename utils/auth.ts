import { APIRequestContext } from '@playwright/test';
import { AuthResponse } from '../types/booking';

export async function getAuthToken(request: APIRequestContext): Promise<string> {
    const response = await request.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123',
        },
    });

    const body: AuthResponse = await response.json();
    return body.token;
}
