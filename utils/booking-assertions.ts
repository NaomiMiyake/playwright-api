import { expect } from '@playwright/test';
import { Booking } from '../types/booking';

export function verifyBooking(actual: Booking, expected: Booking) {
    expect(actual.firstname).toBe(expected.firstname);
    expect(actual.lastname).toBe(expected.lastname);
    expect(actual.totalprice).toBe(expected.totalprice);
    expect(actual.depositpaid).toBe(expected.depositpaid);
    expect(actual.bookingdates.checkin).toBe(expected.bookingdates.checkin);
    expect(actual.bookingdates.checkout).toBe(expected.bookingdates.checkout);
    expect(actual.additionalneeds).toBe(expected.additionalneeds);
}
