import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { AuthenticationService } from './authentication.service';
import { Task, TaskList, Time, Comment } from './../app.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public activeTimers: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  private _projectId: string;
  private collection: AngularFirestoreCollection<Task>;
  private taskListCollection: AngularFirestoreCollection<TaskList>;
  //  private timeLogCollection: AngularFirestoreCollection<Time>;
  // private commentCollection: AngularFirestoreCollection<Comment>;
  constructor(
    private afs: AngularFirestore,
    private auth: AuthenticationService
  ) {}

  /**
   * Set the Project ID
   */
  set project(projectId: string) {
    this.collection = this.afs.collection<Task>(
      `Projects/${projectId}/Tasks`,
      ref => ref.orderBy('createdAt', 'desc')
    );
    this.taskListCollection = this.afs.collection<TaskList>(
      `Projects/${projectId}/TaskLists`,
      ref => ref.orderBy('createdAt', 'desc')
    );
    this._projectId = projectId;
  }

  /**
   * Add or update a task
   * @param task Task
   */
  public add(task: Task) {
    let taskId;
    if (task.id) {
      taskId = task.id;
    } else {
      taskId = this.afs.createId();
      task.createdAt = new Date();
      task.userId = this.auth.user.uid;
    }
    task.lastUpdatedAt = new Date();
    task.id = taskId;
    return this.afs
      .collection('Projects')
      .doc(task.projectId)
      .collection('Tasks')
      .doc(taskId)
      .set(task, { merge: true });
  }

  /**
   * Return the Task list
   */
  public list(taskListId) {
    const collection = this.afs.collection<Task>(
      `Projects/${this._projectId}/Tasks`,
      ref =>
        ref.orderBy('createdAt', 'desc').where('taskListId', '==', taskListId)
    );
    return collection.valueChanges();
  }

  /**
   * Update the Task status
   * @param taskId string
   * @param status string
   */
  public updateStatus(taskId, status) {
    this.afs
      .collection(`Projects/${this._projectId}/Tasks`)
      .doc(taskId)
      .update({
        status
      });
  }

  /**
   * Add / Update a Task List
   * @param taskList TaskList
   * @author Sharan (Zweck)
   */
  public saveTaskList(taskList: TaskList) {
    const taskListId = taskList.id ? taskList.id : this.afs.createId();

    if (!taskList.id) {
      taskList.createdAt = new Date();
      taskList.userId = this.auth.user.uid;
      taskList.id = taskListId;
    }

    taskList.lastUpdatedAt = new Date();
    return this.taskListCollection
      .doc(taskListId)
      .set(taskList, { merge: true });
  }

  public getTaskLists() {
    return this.taskListCollection.valueChanges();
  }

  /**
   * Update the Finished status for
   * a tasklist
   * @param taskList TaskList
   */
  public toggleFinished(taskList) {
    return this.taskListCollection.doc(taskList.id).update({
      isCompleted: taskList.isCompleted ? !taskList.isCompleted : true
    });
  }

  /**
   * @description Saves a Time Logs
   * @param time Time
   * @param userId String (Optional)
   */
  public addTimeLog(time: Time) {
    let timeId;
    if (!time.id) {
      timeId = this.afs.createId();
      time.createdAt = new Date();
      time.id = timeId;
      time.invoiceId = null;
    } else {
      timeId = time.id;
    }

    if (!time.userId) {
      time.userId = this.auth.user.uid;
    }

    time.lastUpdatedAt = new Date();
    const timeLogCollection = this.afs.collection<Time>(
      `Projects/${time.projectId}/Time`
    );
    return timeLogCollection.doc(timeId).set(time, { merge: true });
  }

  public getTaskTimeLogs(projectId, taskId) {
    const timeLogCollection = this.afs.collection<Time>(
      `Projects/${projectId}/Time`,
      ref => ref.orderBy('createdAt', 'desc').where('taskId', '==', taskId)
    );
    return timeLogCollection.valueChanges();
  }

  /**
   * Adds a comment object
   * @param comment Comment
   */
  public addComment(comment: Comment) {
    const commentId = this.afs.createId();
    comment.userId = this.auth.user.uid;
    comment.id = commentId;
    comment.createdAt = new Date();
    comment.lastUpdatedAt = new Date();
    const commentCollection = this.afs.collection<Comment>(
      `Projects/${comment.projectId}/Tasks/${comment.taskId}/Comments`
    );
    return commentCollection.doc(commentId).set(comment);
  }

  /**
   * Get Comments for a Task
   * @param projectId string
   * @param taskId string
   */
  public getComments(projectId, taskId) {
    const commentCollection = this.afs.collection<Comment>(
      `Projects/${projectId}/Tasks/${taskId}/Comments`,
      ref => ref.orderBy('createdAt', 'asc')
    );
    return commentCollection.valueChanges();
  }

  /**
   * Return the details of a task list
   * @param projectId
   * @param taskListId
   */
  public getTaskListDetail(projectId, taskListId) {
    const collection = this.afs.doc<TaskList>(
      `Projects/${projectId}/TaskLists/${taskListId}`
    );
    return collection.valueChanges();
  }

  /**
   * Return the details of a task
   * @param projectId
   * @param taskId
   */
  public getTaskDetail(projectId, taskId) {
    const collection = this.afs.doc<Task>(
      `Projects/${projectId}/Tasks/${taskId}`
    );
    return collection.valueChanges();
  }

  public updateProgress(data) {}

  public startTimer(projectId, taskId) {
    const currentTimers = this.activeTimers.value;

    // if (currentTimers.length >= 3) {
    //   throw new Error('You cannot have more than 3 active timers');
    // }
    // TODO check for duplication
    // projectId: this.projectId, taskId: this.taskId
    this.activeTimers.next([
      ...currentTimers,
      {
        projectId,
        taskId
      }
    ]);
  }
}
