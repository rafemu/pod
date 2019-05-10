import { firestore } from 'firebase-admin';

import { Activity } from './../model';

export const addActivity = (activity: Activity, projectId: string) => {
  return firestore()
    .collection('Projects')
    .doc(projectId)
    .collection('Activities')
    .add(activity);
};
