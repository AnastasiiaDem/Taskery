import {Component, OnInit} from '@angular/core';
import {TaskModel} from 'src/app/shared/models/task.model';
import {TaskService} from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  sortOptions: any = {
    runInsideAngular: true,
    placeholder: 'sortable_steps_placeholder',
    handle: '.step_dragger'
  };

  tasks: TaskModel[] = [];

  public seletedTaskTitle: string;

  constructor(public taskService: TaskService) {
  }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getTasks()
      .subscribe(tasks => {
          this.tasks = tasks;
        },
        err => {
          console.log(err);
        });
  }

  openTask(task) {
    this.seletedTaskTitle = task.title;
  }
}
