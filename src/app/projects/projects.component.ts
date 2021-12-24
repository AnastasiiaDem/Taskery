import {Component, OnInit} from '@angular/core';
import {ProjectModel} from '../shared/models/project.model';
import {ProjectsService} from '../shared/services/project.service';
import {StatusEnum} from '../shared/enums';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Select2OptionData} from 'ng-select2';
import {TaskService} from '../shared/services/task.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  
  projects: ProjectModel[] = [];
  currentProject: ProjectModel;
  projectForm: FormGroup;
  statusData: Array<Select2OptionData> = [];
  tasksData: Array<Select2OptionData> = [];
  addTaskFlag: boolean;
  
  get f() {
    return this.projectForm.controls;
  }
  
  constructor(private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private taskService: TaskService,
              private projectService: ProjectsService) {
  }
  
  ngOnInit() {
    this.statusData = [
      {id: StatusEnum.todo, text: StatusEnum.todo},
      {id: StatusEnum.inProgress, text: StatusEnum.inProgress},
      {id: StatusEnum.onReview, text: StatusEnum.onReview},
      {id: StatusEnum.done, text: StatusEnum.done}
    ];
    this.getAllProjects();
    this.getAllTasks();
    this.projectForm = this.formBuilder.group({
      id: [''],
      projectName: ['', Validators.required],
      description: [''],
      status: ['', Validators.required]
    });
  }
  
  getAllProjects() {
    this.projectService.getProjects()
      .subscribe(projects => {
          this.projects = projects;
          debugger
          this.currentProject = {
            id: this.projects.length + 1,
            projectName: '',
            description: '',
            status: StatusEnum.todo,
            taskId: []
          };
        },
        err => {
          console.log(err);
        });
  }
  
  getAllTasks() {
    this.taskService.getTasks()
      .subscribe(tasks => {
          this.projects = tasks;
          debugger
          this.currentProject = {
            id: this.projects.length + 1,
            projectName: '',
            description: '',
            status: StatusEnum.todo,
            taskId: []
          };
        },
        err => {
          console.log(err);
        });
  }
  
  addProject(content) {
    let currentTask = {
      id: this.projects.length ? Math.max(...this.projects.map(x => x.id)) + 1 : 1,
      title: '',
      description: '',
      status: StatusEnum.todo,
      duration: 0,
      employeeId: 1
    };
    this.projectForm.setValue(currentTask);
    this.addTaskFlag = true;
    this.modalService.open(content, {centered: true});
  }
  
  onSubmit(modal) {
    if (!this.addTaskFlag) {
      this.projectService.updateProject(this.projectForm.value)
        .subscribe(data => {
            console.log(data.message);
          },
          err => {
            console.log(err);
          });
    } else {
      this.projectService.addProject(this.projectForm.value)
        .subscribe(task => {
            this.projects.push(task);
          },
          err => {
            console.log(err);
          });
    }
    modal.close();
  }
  
  updateProject(content, task) {
    debugger
    this.addTaskFlag = false;
    this.projectForm.setValue(task.data);
    this.modalService.open(content, {centered: true});
  }
  
  deleteProject(modal) {
    this.projectService.deleteProject(this.projectForm.value.id)
      .subscribe(data => {
          console.log(data.message);
          this.projects.filter(task => task.id !== this.projectForm.value.id);
        },
        err => {
          console.log(err);
        });
    
    let currentTask = {
      id: this.projects.length ? Math.max(...this.projects.map(x => x.id)) + 1 : 1,
      title: '',
      description: '',
      status: StatusEnum.todo,
      duration: 0,
      employeeId: 1
    };
    this.projectForm.setValue(currentTask);
    modal.close();
  }
}
