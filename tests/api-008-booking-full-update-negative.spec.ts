import { test, expect } from '@playwright/test';
import { Booking, CreateBookingResponse } from '../types/booking';
import { getAuthToken } from '../utils/auth';
import { BookingApi } from '../api/booking-api';
import { bookingTestData } from '../data/booking-data';
import { bookingUpdateTestData } from '../data/booking-data-update';
import { verifyBooking } from '../utils/booking-assertions';

let bookingApi: BookingApi;
let token: string;

test.beforeAll(async ({ request }) => {
    token = await getAuthToken(request);
});

test.beforeEach(async ({ request }) => {
    bookingApi = new BookingApi(request);
});

const bookingUpdateData = bookingUpdateTestData;

for (const [index, bookingData] of bookingTestData.entries()) {
    test(`[API-008] Reject full update request without authentication - ${index}`, async () => {
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

        // Attempt full update without authentication
        const updateResponse = await bookingApi.updateBooking(bookingId, '', bookingUpdateData);
        expect(updateResponse.status()).toBe(403);

        // Verify booking was not updated
        const getUpdateResponse = await bookingApi.getBooking(bookingId);
        expect(getUpdateResponse.status()).toBe(200);

        const getUpdateBody: Booking = await getUpdateResponse.json();
        verifyBooking(getUpdateBody, bookingData);

        // Delete
        const deleteResponse = await bookingApi.deleteBooking(bookingId, token);
        expect(deleteResponse.status()).toBe(201);

        // Verify result
        const getDeletedResponse = await bookingApi.getBooking(bookingId);
        expect(getDeletedResponse.status()).toBe(404);
    });
}
