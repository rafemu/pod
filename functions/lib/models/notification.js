"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
exports.send = (tokens, payload) => {
    return firebase_admin_1.messaging().sendToDevice(tokens, { notification: payload });
};
//# sourceMappingURL=notification.js.map