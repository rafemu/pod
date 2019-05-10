import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebaseApp from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';

import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { Project, Notebook, Time, Invoice } from './../app.model';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private collection: AngularFirestoreCollection<Project>;
  constructor(
    private afs: AngularFirestore,
    private auth: AuthenticationService,
    private storage: AngularFireStorage,
    private user: UserService
  ) {
    this.collection = this.afs.collection<Project>('Projects');
  }

  /**
   * Add a new project into Project collection
   * @param project
   * @author Harsha
   */
  public async add(project: Project) {
    const projectId = this.afs.createId();
    project.status = 'active';
    project.createdAt = firebaseApp.firestore.FieldValue.serverTimestamp();
    project.lastUpdated = firebaseApp.firestore.FieldValue.serverTimestamp();
    project.id = projectId;

    // Strip People from Array
    const people = project.people;
    delete project.people;
    await this.collection.doc(projectId).set(project);

    // Add into the subcollection
    for (let userId of people) {
      this.collection
        .doc(projectId)
        .collection('People')
        .doc(userId)
        .set({
          userId: userId,
          createdAt: firebaseApp.firestore.FieldValue.serverTimestamp()
        });
      this.user.addProject(projectId, userId);
    }
  }

  /**
   * Update Project details
   * @param project
   * @author Harsha
   */
  public updateProject(project: Project, projectId) {
    return this.afs
      .collection('Projects')
      .doc(projectId)
      .update({
        caption: project.caption,
        title: project.title,
        description: project.description
      });
  }

  public async updateProjectPeople(
    newPeople: Array<any>,
    oldPeople: Array<any>,
    projectId
  ) {
    console.log('In updateProjectPeople');
    let promises = [];
    const peopleCollectionRef = this.afs
      .collection('Projects')
      .doc(projectId)
      .collection('People');

    promises = oldPeople.map(async user => {
      const people = await peopleCollectionRef.doc(user.userId).ref.get();
      if (people.exists) {
        return peopleCollectionRef.doc(user.userId).delete();
      } else {
        return Promise.resolve();
      }
    });

    await Promise.all(promises); // Removing people from people collection

    promises = [];
    const peoples = await peopleCollectionRef.ref.get();

    if (peoples.empty) {
      // If project people is empty
      newPeople.forEach(p => {
        promises.push(
          peopleCollectionRef.doc(p.userId).set({
            userId: p.userId,
            createdAt: firebaseApp.firestore.FieldValue.serverTimestamp()
          })
        );
      });
    } else {
      // Not empty
      promises = newPeople.map(async p => {
        const peopleDoc = await peopleCollectionRef.doc(p.userId).ref.get();
        if (!peopleDoc.exists) {
          return peopleCollectionRef.doc(p.userId).set({
            userId: p.userId,
            createdAt: firebaseApp.firestore.FieldValue.serverTimestamp()
          });
        }
      });
    }
    return Promise.all(promises);
  }

  /**
   * delete project collection : Permission limited to admin
   * @param projectId
   */
  public deleteProject(projectId) {
    console.log(projectId);
    this.collection.doc(projectId).delete();
  }

  public updateProjectStatus(projectId, currentStatus) {
    return this.collection.doc(projectId).set(
      {
        status: currentStatus
      },
      {
        merge: true
      }
    );
  }

  /**
   * List all the projects from databse collection - Project
   */
  public list(status) {
    return this.afs
      .collection<Project>('Projects', ref => ref.where('status', '==', status))
      .valueChanges();
  }

  /**
   * Get the Details of a project
   * @param id
   */
  public get(id): Observable<Project> {
    return this.collection.doc<Project>(id).valueChanges();
  }

  /**
   * Add a new NoteBook
   * @param noteBook
   */
  public saveNoteBook(notebook: Notebook) {
    let notebookId;
    if (notebook.id == null) {
      notebookId = this.afs.createId();
      notebook.id = notebookId;
      notebook.userId = this.auth.user.uid;
      notebook.createdAt = new Date();
    }
    notebookId = notebook.id;
    notebook.lastUpdatedAt = new Date();
    const notebookCollection = this.afs.collection<Notebook>(
      `Projects/${notebook.projectId}/Notebooks`
    );
    return notebookCollection.doc(notebookId).set(notebook);
  }

  /**
   * Get all the Norebooks added in a project
   * @param projectId
   */
  public getNotebooks(projectId) {
    const NotebookCollection = this.afs.collection<Notebook>(
      `Projects/${projectId}/Notebooks`
    );
    return NotebookCollection.valueChanges();
  }

  /**
   * Get a notebook with id = notebookId
   * @param projectId
   * @param notebookid
   */
  public getNotebook(projectId, notebookid) {
    const notebook = this.afs.doc(
      `Projects/${projectId}/Notebooks/${notebookid}`
    );
    return notebook.valueChanges();
  }

  /**
   * Insert the message into collection ProjectChat
   * @param chat
   */
  public addChat(chat) {
    const chatId = this.afs.createId();
    chat.userId = this.auth.user.uid;
    chat.id = chatId;
    chat.createdAt = new Date();
    chat.lastUpdatedAt = new Date();
    const commentCollection = this.afs.collection<Comment>(
      `Projects/${chat.projectId}/Messages`
    );
    return commentCollection.doc(chatId).set(chat);
  }

  /**
   * Get the chat messages of Project
   * @param projectId string
   */
  public getChat(projectId) {
    const commentCollection = this.afs.collection<Comment>(
      `Projects/${projectId}/Messages`,
      ref => ref.orderBy('createdAt', 'asc')
    );
    return commentCollection.valueChanges();
  }

  /**
   * MOVE THIS TO TASK SERVICE
   * Get the Time logs for a Project
   * @param projectId string
   */
  public getTimeLogs(projectId) {
    const timeLogCollection = this.afs.collection<Time>(
      `Projects/${projectId}/Time`,
      ref => ref.orderBy('createdAt', 'desc')
    );
    return timeLogCollection.valueChanges();
  }

  /**
   * MOVE THIS TO TASK SERVICE
   * Toggle the Billable and Non Billable status
   * for a time log
   * @param timelogId string
   * @param projectId string
   */
  public updateBillableStatus(timelogId, projectId, status) {
    return this.afs
      .collection('Projects')
      .doc(projectId)
      .collection('Time')
      .doc(timelogId)
      .update({
        isBillable: status
      });
  }

  /**
   * Get Activities
   * @param projectId string
   */
  public getActivites(projectId) {
    return this.afs
      .collection('Projects')
      .doc(projectId)
      .collection('Activities', ref =>
        ref.orderBy('createdAt', 'desc').limit(10)
      )
      .valueChanges();
  }

  /**
   * Add a file to the Project
   * @param projectId string
   */
  public addFile = (projectId: string, file, taskId?: string) => {
    const filePath = `projects/${projectId}/${file.lastModified + file.name}`;
    const task = this.storage.upload(filePath, file);
    return task.snapshotChanges().pipe(
      finalize(() => {
        return this.afs
          .collection('Projects')
          .doc(projectId)
          .collection('Files')
          .add({
            name: file.name,
            userId: this.auth.user.uid,
            taskId: taskId || null,
            ref: filePath,
            createdAt: firebaseApp.firestore.FieldValue.serverTimestamp(),
            lastUpdatedAt: firebaseApp.firestore.FieldValue.serverTimestamp()
          });
      })
    );
  };

  /**
   * Get the files in a Project
   * @param projectId string
   */
  public getFiles = (projectId: string) => {
    return this.afs
      .collection('Projects')
      .doc(projectId)
      .collection('Files')
      .valueChanges()
      .pipe(
        map(files => {
          files.forEach(file => {
            file.downloadURL = this.storage.ref(file.ref).getDownloadURL();
          });
          return files;
        })
      );
  };

  /**
   * Get the files uploaded inside a task
   * @param projectId
   * @param taskId
   */
  public getTaskFiles(projectId, taskId) {
    return this.afs
      .collection('Projects')
      .doc(projectId)
      .collection('Files', ref =>
        ref.orderBy('createdAt', 'desc').where('taskId', '==', taskId)
      )
      .valueChanges()
      .pipe(
        map(files => {
          files.forEach(file => {
            file.downloadURL = this.storage.ref(file.ref).getDownloadURL();
          });
          return files;
        })
      );
  }

  /**
   * Get all the people in a project
   * @param projectId
   */
  public getPeople(projectId) {
    return this.afs
      .collection('Projects')
      .doc(projectId)
      .collection('People', ref => ref.orderBy('createdAt', 'desc'))
      .valueChanges();
  }

  public calculateTimelogs(timeLogs) {
    let billableTime = 0;
    let nonBillabletime = 0;

    for (let i = 0; i < timeLogs.length; i++) {
      const difference = this.calculateTimeDifference(
        timeLogs[i].from,
        timeLogs[i].to
      );
      timeLogs[i].time = difference;
      if (timeLogs[i].isBillable == true) {
        billableTime = billableTime + difference;
      } else {
        nonBillabletime = nonBillabletime + difference;
      }
    }

    const totalTime = billableTime + nonBillabletime;

    return {
      billableTime: billableTime.toFixed(2),
      nonBillabletime: nonBillabletime.toFixed(2),
      totalTime: totalTime.toFixed(2)
    };
  }

  /**
   * Calculate the difference between 2 time entrys of the format 1:00 pm
   * @param startDate
   * @param endDate
   */
  public calculateTimeDifference(startDate, endDate) {
    let start_date = moment(startDate, 'HH:mm A');
    let end_date = moment(endDate, 'HH:mm A');

    let duration = moment.duration(end_date.diff(start_date));
    let time = duration.asHours();
    return time;
  }

  /**
   * Get the Timelogs of a project based on conditions
   * @author Harsha
   * @param conditions
   * @param projectId
   */
  public filterTimeLogs(conditions, projectId) {
    return this.afs
      .collection('Projects')
      .doc(projectId)
      .collection('Time', ref => {
        let query:
          | firebaseApp.firestore.CollectionReference
          | firebaseApp.firestore.Query = ref;
        if (conditions.startDate) {
          query = query.where('createdAt', '>=', conditions.startDate);
        }
        if (conditions.endDate) {
          query = query.where('createdAt', '<=', conditions.endDate);
        }
        if (typeof conditions.billableOrNot === 'boolean') {
          query = query.where('isBillable', '==', conditions.billableOrNot);
        }
        query.orderBy('createdAt', 'desc');
        return query;
      })
      .valueChanges();
  }

  /**
   * Add a file to the Project
   * @param projectId string
   */
  public updateProjectImage = (file, projectId) => {
    const filePath = `projectIcons/${file.name}`;
    const task = this.storage.upload(filePath, file);
    return task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await this.storage
          .ref(filePath)
          .getDownloadURL()
          .toPromise();
        return this.afs
          .collection('Projects')
          .doc(projectId)
          .set(
            {
              projectImage: url,
              lastUpdatedAt: new Date()
            },
            { merge: true }
          );
      })
    );
  };
}
