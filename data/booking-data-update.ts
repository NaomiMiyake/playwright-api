export const bookingUpdateTestData = {
    testCaseId: 'API-004',
    testCaseName: 'Create, update, retrieve, and delete booking successfully',
    firstname: 'Updated',
    lastname: 'User',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
        checkin: '2026-07-01',
        checkout: '2026-07-03',
    },
    additionalneeds: 'Dinner',
};

export const bookingPartialUpdateTestData = {
    firstname: 'Partially-Updated',
};
