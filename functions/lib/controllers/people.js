"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
exports.peopleAdded = (snap, context) => {
    const projectId = context.params.projectId;
    const userId = context.params.userId;
    // Adding projects to the users collection
    return firebase_admin_1.firestore()
        .collection('Users')
        .doc(userId)
        .collection('Projects')
        .doc(projectId)
        .set({
        projectId: projectId,
        createdAt: firebase_admin_1.firestore.FieldValue.serverTimestamp()
    });
};
exports.peopleRemoved = (snap, context) => {
    const projectId = context.params.projectId;
    const userId = context.params.userId;
    // Removing projects to the users collection
    return firebase_admin_1.firestore()
        .collection('Users')
        .doc(userId)
        .collection('Projects')
        .doc(projectId)
        .delete();
};
//# sourceMappingURL=people.js.map