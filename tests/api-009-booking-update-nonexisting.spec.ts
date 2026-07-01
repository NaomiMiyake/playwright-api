import { test, expect } from '@playwright/test';
import { getAuthToken } from '../utils/auth';
import { BookingApi } from '../api/booking-api';
import { NONEXISTENT_BOOKING_ID } from '../data/constants';
import { bookingUpdateTestData } from '../data/booking-data-update';

let bookingApi: BookingApi;
let token: string;

test.beforeAll(async ({ request }) => {
    token = await getAuthToken(request);
});

test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
});

test('[API-009] Update nonexistent booking', async () => {
    const bookingUpdateData = bookingUpdateTestData;
    const updateRequestBody = bookingUpdateData;

    const response = await bookingApi.getBooking(NONEXISTENT_BOOKING_ID);
    expect(response.status()).toBe(404);

    // Attempt full update for a nonexistent booking
    const updateResponse = await bookingApi.updateBooking(
        NONEXISTENT_BOOKING_ID,
        token,
        updateRequestBody
    );
    expect(updateResponse.status()).toBe(405);
});
