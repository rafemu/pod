import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('./../keys/crew-9d52d-firebase-adminsdk-bzxqg-b52c8d57e1.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crew-9d52d.firebaseio.com'
});

const cors = require('cors')({ origin: true });

// Functions
import { add } from './controllers/user';
import { peopleAdded, peopleRemoved } from './controllers/people';
import {
  messageAdded,
  commentAdded,
  taskAdded,
  fileAdded,
  notebookAdded,
  projectRemoved
} from './controllers/project';

export const addUser = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    return add(request, response);
  });
});

// Project Triggers
export const projectMessageAdded = functions.firestore
  .document('Projects/{projectId}/Messages/{messageId}')
  .onCreate(messageAdded);
export const projectTaskAdded = functions.firestore
  .document('Projects/{projectId}/Tasks/{taskId}')
  .onWrite(taskAdded);
export const projectFileAdded = functions.firestore
  .document('Projects/{projectId}/Files/{fileId}')
  .onCreate(fileAdded);
export const projectNotebookAdded = functions.firestore
  .document('Projects/{projectId}/Notebooks/{notebookId}')
  .onWrite(notebookAdded);
export const projectCommentAdded = functions.firestore
  .document('Projects/{projectId}/Tasks/{taskId}/Comments/{commentId}')
  .onCreate(commentAdded);

export const projectPeopleAdded = functions.firestore
  .document('Projects/{projectId}/People/{userId}')
  .onCreate(peopleAdded);

export const projectPeopleRemoved = functions.firestore
  .document('Projects/{projectId}/People/{userId}')
  .onDelete(peopleRemoved);

export const projectDeleted = functions.firestore
  .document(`Projects/{projectId}`)
  .onDelete(projectRemoved);
