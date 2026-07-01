import { test, expect } from '@playwright/test';
import { getAuthToken } from '../utils/auth';
import { BookingApi } from '../api/booking-api';
import { NONEXISTENT_BOOKING_ID } from '../data/constants';

let bookingApi: BookingApi;
let token: string;

test.beforeAll(async ({ request }) => {
    token = await getAuthToken(request);
});

test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
});

test('[API-010] Delete nonexistent booking with authentication', async () => {
    const response = await bookingApi.getBooking(NONEXISTENT_BOOKING_ID);
    expect(response.status()).toBe(404);

    // Attempt to delete a nonexistent booking
    const deleteResponse = await bookingApi.deleteBooking(NONEXISTENT_BOOKING_ID, token);
    expect(deleteResponse.status()).toBe(405);
});
