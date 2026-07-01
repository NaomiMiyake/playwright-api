import { test, expect } from '@playwright/test';
import { Booking, CreateBookingResponse } from '../types/booking';
import { getAuthToken } from '../utils/auth';
import { BookingApi } from '../api/booking-api';
import { bookingTestData } from '../data/booking-data';
import { verifyBooking } from '../utils/booking-assertions';

let bookingApi: BookingApi;
let token: string;

test.beforeAll(async ({ request }) => {
    token = await getAuthToken(request);
});

test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
});

for (const bookingData of bookingTestData) {
    test(`[${bookingData.testCaseId}] ${bookingData.testCaseName}`, async () => {
        // Create
        const createResponse = await bookingApi.createBooking(bookingData);
        expect(createResponse.status()).toBe(200);

        const createBody: CreateBookingResponse = await createResponse.json();
        const bookingId = createBody.bookingid;

        expect(typeof bookingId).toBe('number');
        expect(bookingId).toBeGreaterThan(0);

        // Retrieve
        const getResponse = await bookingApi.getBooking(bookingId);
        expect(getResponse.status()).toBe(200);

        const getBody: Booking = await getResponse.json();
        verifyBooking(getBody, bookingData);

        // Delete
        const deleteResponse = await bookingApi.deleteBooking(bookingId, token);
        expect(deleteResponse.status()).toBe(201);

        // Verify delete
        const getDeletedResponse = await bookingApi.getBooking(bookingId);
        expect(getDeletedResponse.status()).toBe(404);
    });
}
