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

for (const bookingData of bookingTestData) {
    const { testCaseId, testCaseName, ...updateRequestBody } = bookingUpdateTestData;

    test(`[${testCaseId}] ${testCaseName}`, async () => {
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

        // Update
        const updateResponse = await bookingApi.updateBooking(bookingId, token, updateRequestBody);
        expect(updateResponse.status()).toBe(200);

        const updateBody: Booking = await updateResponse.json();
        verifyBooking(updateBody, updateRequestBody);

        // Retrieve updated booking
        const getUpdateResponse = await bookingApi.getBooking(bookingId);
        expect(getUpdateResponse.status()).toBe(200);

        const getUpdateBody: Booking = await getUpdateResponse.json();
        verifyBooking(getUpdateBody, updateRequestBody);

        // Delete
        const deleteResponse = await bookingApi.deleteBooking(bookingId, token);
        expect(deleteResponse.status()).toBe(201);

        // Verify result
        const getDeletedResponse = await bookingApi.getBooking(bookingId);
        expect(getDeletedResponse.status()).toBe(404);
    });
}
