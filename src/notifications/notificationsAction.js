export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';
export const notificationReceived = notifications => ({
    type: NOTIFICATION_RECEIVED,
    payload: { notifications },
    meta: { refresh: true }
});