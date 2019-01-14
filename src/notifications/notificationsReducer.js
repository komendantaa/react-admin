import { NOTIFICATION_RECEIVED } from './notificationsAction';

export default (previousState = 0, { type, payload }) => {
    if (type === NOTIFICATION_RECEIVED) {
        return payload.notifications ? payload.notifications : 0;
    }
    return previousState;
}