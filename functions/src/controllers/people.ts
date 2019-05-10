
import { firestore } from 'firebase-admin';

export const peopleAdded = (snap, context) => {
    const projectId = context.params.projectId;
    const userId = context.params.userId;

    // Adding projects to the users collection
    return firestore()
        .collection('Users')
        .doc(userId)
        .collection('Projects')
        .doc(projectId)
        .set({
            projectId: projectId,
            createdAt: firestore.FieldValue.serverTimestamp()
        });
};

export const peopleRemoved = (snap, context) => {

    const projectId = context.params.projectId;
    const userId = context.params.userId;


    // Removing projects to the users collection
    return firestore()
        .collection('Users')
        .doc(userId)
        .collection('Projects')
        .doc(projectId)
        .delete();
};