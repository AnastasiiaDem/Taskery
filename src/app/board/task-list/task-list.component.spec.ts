import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskListComponent} from './task-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../shared/services/user.service";
import {TaskService} from "../../shared/services/task.service";
import {of} from "rxjs";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [UserService, TaskService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all board from the server', () => {
    const service = TestBed.inject(TaskService);
    spyOn(service, 'getTasks').and.returnValue(of([1, 2, 3]));
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.tasks.length).toBe(3);
  });
});
