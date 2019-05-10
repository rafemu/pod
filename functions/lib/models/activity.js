"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
exports.addActivity = (activity, projectId) => {
    return firebase_admin_1.firestore()
        .collection('Projects')
        .doc(projectId)
        .collection('Activities')
        .add(activity);
};
//# sourceMappingURL=activity.js.map