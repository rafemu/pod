"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const firebase_tools_1 = require("firebase-tools");
const functions = require("firebase-functions");
const notification_1 = require("./../models/notification");
const activity_1 = require("./../models/activity");
const setLastUpdated = projectId => {
    return firebase_admin_1.firestore()
        .collection('Projects')
        .doc(projectId)
        .set({
        lastActivityAt: firebase_admin_1.firestore.FieldValue.serverTimestamp()
    }, {
        merge: true
    });
};
exports.projectRemoved = (snap, context) => __awaiter(this, void 0, void 0, function* () {
    const projectId = context.params.projectId;
    const path = `Projects/${projectId}`;
    return firebase_tools_1.firestore
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
});
exports.messageAdded = (snap, context) => __awaiter(this, void 0, void 0, function* () {
    const message = snap.data();
    // Get the Project using Project ID
    const project = yield firebase_admin_1.firestore()
        .collection('Projects')
        .doc(message.projectId)
        .get();
    const users = yield firebase_admin_1.firestore()
        .collection('Projects')
        .doc(message.projectId)
        .collection('People')
        .get();
    const tokens = [];
    let sender;
    for (const userRef of users.docs) {
        const user = yield firebase_admin_1.firestore()
            .collection('Users')
            .doc(userRef.id)
            .get();
        if (message.userId === userRef.id) {
            sender = user;
        }
        else {
            if (user.get('pushToken')) {
                tokens.push(user.get('pushToken'));
            }
        }
    }
    return notification_1.send(tokens, {
        title: `${project.get('title')} : New message from ${sender.get('firstName')}`,
        body: message.message,
        icon: sender.get('avatar')
    });
});
/**
 * Task Added
 * @param snap object
 * @param context object
 */
exports.taskAdded = (change, context) => __awaiter(this, void 0, void 0, function* () {
    const task = change.after.data();
    const projectId = task.projectId;
    yield setLastUpdated(projectId);
    const activity = {
        action: 'added',
        model: 'Task',
        modelId: task.id,
        userId: task.userId,
        createdAt: firebase_admin_1.firestore.FieldValue.serverTimestamp()
    };
    if (change.before.exists === true) {
        activity.action = 'edited';
    }
    yield activity_1.addActivity(activity, projectId);
    const taskListRef = firebase_admin_1.firestore()
        .collection('Projects')
        .doc(projectId)
        .collection('TaskLists')
        .doc(task.taskListId);
    // TO DO - Update task counter
    return firebase_admin_1.firestore().runTransaction(t => {
        return t.get(taskListRef).then(doc => {
            const tasksCount = doc.data().tasksCount ? doc.data().tasksCount + 1 : 1;
            t.update(taskListRef, { tasksCount: tasksCount });
        });
    });
});
/**
 * Task Added
 * @param snap object
 * @param context object
 */
exports.fileAdded = (snap, context) => __awaiter(this, void 0, void 0, function* () {
    const file = snap.data();
    const projectId = context.params.projectId;
    yield setLastUpdated(projectId);
    return activity_1.addActivity({
        action: 'added',
        model: 'File',
        modelId: context.params.fileId,
        userId: file.userId,
        createdAt: firebase_admin_1.firestore.FieldValue.serverTimestamp()
    }, projectId);
});
/**
 * Task Added
 * @param snap object
 * @param context object
 */
exports.commentAdded = (snap, context) => __awaiter(this, void 0, void 0, function* () {
    const comment = snap.data();
    const projectId = comment.projectId;
    yield setLastUpdated(projectId);
    return activity_1.addActivity({
        action: 'added',
        model: 'Comment',
        modelId: comment.taskId,
        userId: comment.userId,
        createdAt: firebase_admin_1.firestore.FieldValue.serverTimestamp()
    }, projectId);
});
/**
 * Notebook Added
 * @param snap object
 * @param context object
 */
exports.notebookAdded = (change, context) => __awaiter(this, void 0, void 0, function* () {
    const notebook = change.after.data();
    const projectId = notebook.projectId;
    yield setLastUpdated(projectId);
    const activity = {
        action: 'added',
        model: 'Notebook',
        modelId: notebook.id,
        userId: notebook.userId,
        createdAt: firebase_admin_1.firestore.FieldValue.serverTimestamp()
    };
    if (change.before.exists === true) {
        activity.action = 'edited';
    }
    return activity_1.addActivity(activity, projectId);
});
//# sourceMappingURL=project.js.map