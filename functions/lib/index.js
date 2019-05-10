"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require('./../keys/crew-9d52d-firebase-adminsdk-bzxqg-b52c8d57e1.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://crew-9d52d.firebaseio.com'
});
const cors = require('cors')({ origin: true });
// Functions
const user_1 = require("./controllers/user");
const people_1 = require("./controllers/people");
const project_1 = require("./controllers/project");
exports.addUser = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        return user_1.add(request, response);
    });
});
// Project Triggers
exports.projectMessageAdded = functions.firestore
    .document('Projects/{projectId}/Messages/{messageId}')
    .onCreate(project_1.messageAdded);
exports.projectTaskAdded = functions.firestore
    .document('Projects/{projectId}/Tasks/{taskId}')
    .onWrite(project_1.taskAdded);
exports.projectFileAdded = functions.firestore
    .document('Projects/{projectId}/Files/{fileId}')
    .onCreate(project_1.fileAdded);
exports.projectNotebookAdded = functions.firestore
    .document('Projects/{projectId}/Notebooks/{notebookId}')
    .onWrite(project_1.notebookAdded);
exports.projectCommentAdded = functions.firestore
    .document('Projects/{projectId}/Tasks/{taskId}/Comments/{commentId}')
    .onCreate(project_1.commentAdded);
exports.projectPeopleAdded = functions.firestore
    .document('Projects/{projectId}/People/{userId}')
    .onCreate(people_1.peopleAdded);
exports.projectPeopleRemoved = functions.firestore
    .document('Projects/{projectId}/People/{userId}')
    .onDelete(people_1.peopleRemoved);
exports.projectDeleted = functions.firestore
    .document(`Projects/{projectId}`)
    .onDelete(project_1.projectRemoved);
//# sourceMappingURL=index.js.map