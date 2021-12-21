import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {TaskModel} from 'src/app/shared/models/task.model';
import { UserModel } from 'src/app/shared/models/user.model';
import {TaskService} from 'src/app/shared/services/task.service';
import {UserService} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  public users: Array<UserModel>;
  public tasks: TaskModel[] = [];
  public taskForm;

  constructor(public userService: UserService,
              public taskService: TaskService,
              private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      selectedUserId: ['', Validators.required],
      description: [''],
      duration: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getTasks()
      .subscribe(
        tasks => {
          this.tasks = tasks;
        },
        err => {
          console.log(err);
        });
  }

  getAllUsers() {
    this.userService.getUsers()
      .subscribe((users) => {
          this.users = users.map(user => {
            return {
              id: user.id,
              text: user.firstName + ' ' + user.lastName
            };
          });
        },
        err => {
          console.log(err);
        });
  }

  addTask() {
    let taskObject = {
      id: this.tasks.length + 1,
      title: this.taskForm.value.title,
      employeeId: this.taskForm.value.selectedUserId,
      description: this.taskForm.value.description,
      duration: this.taskForm.value.duration,
      status: 3
    };

    this.taskService.addTask(taskObject)
      .subscribe(task => {
        this.tasks.push(task);
          this.taskForm.value.title = '';
          this.taskForm.value.selectedUserId = '';
          this.taskForm.value.description = '';
          this.taskForm.value.duration = '';
        },
        err => {
          console.log(err);
        });
  }
}
