import {Component, OnInit} from '@angular/core';
import {TaskModel} from 'src/app/shared/models/task.model';
import {TaskService} from 'src/app/shared/services/task.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {StatusEnum} from 'src/app/shared/enums';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    tasks: TaskModel[] = [];
    todo: TaskModel[] = [];
    inProgress: TaskModel[] = [];
    done: TaskModel[] = [];

    public selectedTaskTitle: string;

    constructor(public taskService: TaskService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getAllTasks();
    }

    getAllTasks() {
        this.taskService.getTasks()
            .subscribe(tasks => {
                    this.tasks = tasks;
                    this.todo = tasks.filter(task => task.status == StatusEnum.todo);
                    this.inProgress = tasks.filter(task => task.status == StatusEnum.inProgress);
                    this.done = tasks.filter(task => task.status == StatusEnum.done);
                },
                err => {
                    console.log(err);
                });
    }

    openTask(task) {
        this.selectedTaskTitle = task.title;
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            if (event.container.id == 'todo') {
                event.item.data.status = 'todo';
            } else if (event.container.id == 'inProgress') {
                event.item.data.status = 'in progress';
            } else {
                event.item.data.status = 'done';
            }
            this.taskService.updateTask(event.item.data);
        }
    }
}
