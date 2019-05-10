import { firestore } from 'firebase-admin';
import { firestore as firestoreTools } from 'firebase-tools';
import * as functions from 'firebase-functions';
import { send } from './../models/notification';
import { addActivity } from './../models/activity';

import { Activity } from './../model';

const setLastUpdated = projectId => {
  return firestore()
    .collection('Projects')
    .doc(projectId)
    .set(
      {
        lastActivityAt: firestore.FieldValue.serverTimestamp()
      },
      {
        merge: true
      }
    );
};

export const projectRemoved = async (snap, context) => {
  const projectId = context.params.projectId;
  const path = `Projects/${projectId}`;
  return firestoreTools
    .delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token
    })
    .then(() => {
      return {
        path: path
      };
    });
};

export const messageAdded = async (snap, context) => {
  const message = snap.data();

  // Get the Project using Project ID
  const project = await firestore()
    .collection('Projects')
    .doc(message.projectId)
    .get();

  const users = await firestore()
    .collection('Projects')
    .doc(message.projectId)
    .collection('People')
    .get();

  const tokens = [];
  let sender;

  for (const userRef of users.docs) {
    const user = await firestore()
      .collection('Users')
      .doc(userRef.id)
      .get();
    if (message.userId === userRef.id) {
      sender = user;
    } else {
      if (user.get('pushToken')) {
        tokens.push(user.get('pushToken'));
      }
    }
  }

  return send(tokens, {
    title: `${project.get('title')} : New message from ${sender.get(
      'firstName'
    )}`,
    body: message.message,
    icon: sender.get('avatar')
  });
};

/**
 * Task Added
 * @param snap object
 * @param context object
 */
export const taskAdded = async (change, context) => {
  const task = change.after.data();
  const projectId = task.projectId;
  await setLastUpdated(projectId);
  const activity: Activity = {
    action: 'added',
    model: 'Task',
    modelId: task.id,
    userId: task.userId,
    createdAt: firestore.FieldValue.serverTimestamp()
  };
  if (change.before.exists === true) {
    activity.action = 'edited';
  }

  await addActivity(activity, projectId);

  const taskListRef = firestore()
    .collection('Projects')
    .doc(projectId)
    .collection('TaskLists')
    .doc(task.taskListId);

  // TO DO - Update task counter
  return firestore().runTransaction(t => {
    return t.get(taskListRef).then(doc => {
      const tasksCount = doc.data().tasksCount ? doc.data().tasksCount + 1 : 1;
      t.update(taskListRef, { tasksCount: tasksCount });
    });
  });
};

/**
 * Task Added
 * @param snap object
 * @param context object
 */
export const fileAdded = async (snap, context) => {
  const file = snap.data();
  const projectId = context.params.projectId;
  await setLastUpdated(projectId);
  return addActivity(
    {
      action: 'added',
      model: 'File',
      modelId: context.params.fileId,
      userId: file.userId,
      createdAt: firestore.FieldValue.serverTimestamp()
    },
    projectId
  );
};

/**
 * Task Added
 * @param snap object
 * @param context object
 */
export const commentAdded = async (snap, context) => {
  const comment = snap.data();
  const projectId = comment.projectId;
  await setLastUpdated(projectId);
  return addActivity(
    {
      action: 'added',
      model: 'Comment',
      modelId: comment.taskId,
      userId: comment.userId,
      createdAt: firestore.FieldValue.serverTimestamp()
    },
    projectId
  );
};

/**
 * Notebook Added
 * @param snap object
 * @param context object
 */
export const notebookAdded = async (change, context) => {
  const notebook = change.after.data();
  const projectId = notebook.projectId;
  await setLastUpdated(projectId);
  const activity: Activity = {
    action: 'added',
    model: 'Notebook',
    modelId: notebook.id,
    userId: notebook.userId,
    createdAt: firestore.FieldValue.serverTimestamp()
  };
  if (change.before.exists === true) {
    activity.action = 'edited';
  }

  return addActivity(activity, projectId);
};
