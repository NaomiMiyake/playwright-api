import { APIRequestContext } from '@playwright/test';

export class BookingApi {
    constructor(private request: APIRequestContext) {}

    async createBooking(data: unknown) {
        return await this.request.post('/booking', {
            data,
        });
    }

    async getBooking(bookingId: number) {
        return await this.request.get(`/booking/${bookingId}`);
    }

    async updateBooking(bookingId: number, token: string, data: unknown) {
        return await this.request.put(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`,
            },
            data,
        });
    }

    async deleteBooking(bookingId: number, token?: string) {
        return await this.request.delete(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`,
            },
        });
    }

    async partialUpdateBooking(bookingId: number, token: string, data: unknown) {
        return await this.request.patch(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`,
            },
            data,
        });
    }
}
