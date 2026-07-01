import { test, expect } from '@playwright/test';
import { BookingApi } from '../api/booking-api';
import { NONEXISTENT_BOOKING_ID } from '../data/constants';

let bookingApi: BookingApi;

test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
});

test('[API-003] Reject delete request without authentication', async () => {
    const response = await bookingApi.deleteBooking(NONEXISTENT_BOOKING_ID);
    expect(response.status()).toBe(403);
});
