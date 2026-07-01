import { test, expect } from '@playwright/test';
import { BookingApi } from '../api/booking-api';
import { NONEXISTENT_BOOKING_ID } from '../data/constants';

let bookingApi: BookingApi;

test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
});

test('[API-002] Return 404 for nonexistent booking', async () => {
    const response = await bookingApi.getBooking(NONEXISTENT_BOOKING_ID);
    expect(response.status()).toBe(404);
});
