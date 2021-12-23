import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TaskModel} from 'src/app/shared/models/task.model';
import {TaskService} from 'src/app/shared/services/task.service';
import {StatusEnum} from 'src/app/shared/enums';
import {CardSettingsModel, DialogFieldsModel, DialogSettingsModel} from '@syncfusion/ej2-angular-kanban';
import {Select2OptionData} from 'ng-select2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from 'src/app/shared/services/user.service';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewChecked {

    @ViewChild('closebutton') closebutton;
    @ViewChild('kanban') kanban;

    taskForm: FormGroup;
    tasks: TaskModel[] = [];
    currentTask: TaskModel;
    invalidDuration: boolean = false;
    invalidTitle: boolean = false;
    cardSettings: CardSettingsModel = {
        contentField: 'description',
        headerField: 'id'
    };
    dialogSettings: DialogSettingsModel = {
        fields: [
            {key: 'id', type: 'Input'},
            {key: 'status', type: 'DropDown'},
            {key: 'duration', type: 'Numeric'},
            {key: 'description', type: 'TextArea'}
        ] as DialogFieldsModel[]
    };
    addTaskFlag: boolean;
    statusData: Array<Select2OptionData> = [];
    employeeData: Array<Select2OptionData> = [];

    constructor(private formBuilder: FormBuilder,
                public taskService: TaskService,
                private modalService: NgbModal,
                private userService: UserService,
                private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.statusData = [
            {id: StatusEnum.todo, text: StatusEnum.todo},
            {id: StatusEnum.inProgress, text: StatusEnum.inProgress},
            {id: StatusEnum.onReview, text: StatusEnum.onReview},
            {id: StatusEnum.done, text: StatusEnum.done}
        ];
        this.taskForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: ['', Validators.required],
            duration: ['', Validators.required],
            employeeId: ['', Validators.required]
        });

        this.getAllTasks();
        this.getAllUsers();
    }

    ngAfterViewChecked() {
        const dom: HTMLElement = this.elementRef.nativeElement;
        dom.querySelectorAll('.e-item-count').forEach(el => {
            el.innerHTML = el.innerHTML.replace('items', 'tasks');
        });

        dom.querySelectorAll('.e-header-text').forEach(el => {
            if (el.innerHTML.includes('To do')) {
                $(el).css({'color': 'rgb(57 197 255)'});
            }
            if (el.innerHTML.includes('In Progress')) {
                $(el).css({'color': 'rgb(255 149 119)'});
            }
            if (el.innerHTML.includes('On Review')) {
                $(el).css({'color': 'rgb(101 85 255)'});
            }
            if (el.innerHTML.includes('Done')) {
                $(el).css({'color': 'rgb(58 224 104)'});
            }
            $(el).css({'font-weight': '600'});
        });

        dom.querySelectorAll('.e-header-cells').forEach(el => {
            if (el.innerHTML.includes('To do')) {
                $(el).css({'background-color': '#EDF9FF'});
            }
            if (el.innerHTML.includes('In Progress')) {
                $(el).css({'background-color': '#FFEFEA'});
            }
            if (el.innerHTML.includes('On Review')) {
                $(el).css({'background-color': '#EAE8FF'});
            }
            if (el.innerHTML.includes('Done')) {
                $(el).css({'background-color': '#E8FBED'});
            }
        });

        dom.querySelectorAll('.e-content-cells').forEach(el => {
            $(el).css({'background-color': '#F4F5F7'});
        });
    }

    getAllTasks() {
        this.taskService.getTasks()
            .subscribe(tasks => {
                    this.tasks = tasks;
                    this.currentTask = {
                        id: this.tasks.length + 1,
                        title: '',
                        description: '',
                        status: StatusEnum.todo,
                        duration: 0,
                        employeeId: 1
                    };
                },
                err => {
                    console.log(err);
                });
    }

    getAllUsers() {
        this.userService.getUsers()
            .subscribe((users) => {
                    this.employeeData = users.map(user => {
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

    drop(event) {
        this.taskService.updateTask(event.data[0])
            .subscribe(data => {
                    console.log(data.message);
                },
                err => {
                    console.log(err);
                });
    }

    openModal(content, task) {
        this.addTaskFlag = false;
        this.currentTask = task.data;
        this.modalService.open(content, {centered: true});
    }

    closeModal(modal) {
        if (!this.currentTask.title) {
            this.invalidTitle = true;
        }
        if (!this.currentTask.duration) {
            this.invalidDuration = true;
        } else {
            this.invalidDuration = false;
            this.invalidTitle = false;
            if (!this.addTaskFlag) {
                this.taskService.updateTask(this.currentTask)
                    .subscribe(data => {
                            console.log(data.message);
                        },
                        err => {
                            console.log(err);
                        });
                this.kanban.updateCard(this.currentTask);
            } else {
                this.taskService.addTask(this.currentTask)
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
                this.kanban.addCard(this.currentTask);
            }
            this.kanban.closeDialog();
            modal.close();
        }
    }

    addTask(content) {
        this.addTaskFlag = true;
        this.modalService.open(content, {centered: true});
    }
}
