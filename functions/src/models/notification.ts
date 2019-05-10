import { messaging } from 'firebase-admin';

export const send = (tokens, payload) => {
    return messaging().sendToDevice(tokens, { notification: payload });
}