import { Component, OnInit, Input, OnChanges } from '@angular/core';

// Services
import { TaskService } from './../../../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges {
  @Input()
  taskListId: string;
  @Input()
  projectId: string;

  public todo = [];
  public doing = [];
  public completed = [];
  public todoQuery: string;
  public doingQuery: string;
  public completedQuery: string;

  constructor(private task: TaskService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.getTasks();
  }

  public getTasks() {
    this.task.list(this.taskListId).subscribe(tasks => {
      this.todo = [];
      this.doing = [];
      this.completed = [];
      this.sortTasks(tasks);
    });
  }

  private sortTasks(tasks) {
    tasks.forEach(task => {
      switch (task.status) {
        case 'todo':
          this.todo.push(task);
          break;

        case 'doing':
          this.doing.push(task);
          break;

        case 'completed':
          this.completed.push(task);
          break;

        default:
          break;
      }
    });
  }

  /**
   * Task Dropped on todo Lane
   * @param task Task
   */
  public droppedOnToDo({ dropData }): void {
    this.processDrop(dropData, 'todo');
  }

  /**
   * Task Dropped on doing Lane
   * @param task Task
   */
  public droppedOnDoing({ dropData }): void {
    this.processDrop(dropData, 'doing');
  }

  /**
   * Task Dropped on completed Lane
   * @param task Task
   */
  public droppedOnCompleted({ dropData }): void {
    this.processDrop(dropData, 'completed');
  }

  /**
   * Check if the task already exists in the lane
   * @param task object
   * @param lane string
   */
  private processDrop(droppedTask, lane) {
    if (droppedTask.status !== lane) {
      const currentLane = droppedTask.status;
      const tasks = this[currentLane];
      const index = tasks.findIndex(task => {
        return droppedTask.id === task.id;
      });
      this[currentLane].splice(index, 1);
      droppedTask.status = lane;
      this[lane].push(droppedTask);
      this.task.updateStatus(droppedTask.id, lane);
    }
  }
}
