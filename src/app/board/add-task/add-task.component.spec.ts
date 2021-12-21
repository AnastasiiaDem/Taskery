import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddTaskComponent} from './add-task.component';
import {UserService} from "../../shared/services/user.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TaskService} from 'src/app/shared/services/task.service';
import {of} from "rxjs";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [UserService, TaskService, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all users from the server', () => {
    const service = TestBed.inject(UserService);
    spyOn(service, 'getUsers').and.returnValue(of([1, 2, 3]));
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.users.length).toBe(3);
  });

  it('should load all board from the server', () => {
    const service = TestBed.inject(TaskService);
    spyOn(service, 'getTasks').and.returnValue(of([1, 2, 3]));
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.tasks.length).toBe(3);
  });

  it('should add the new task', () => {
    const service = TestBed.inject(TaskService);
    const task = {
      id: component.tasks.length + 1,
      title: "New task",
      description: "",
      status: 1,
      duration: 1,
      employeeId: 1
    };
    spyOn(service, 'addTask').and.callFake(() => of(task));
    component.addTask();
    expect(component.tasks.indexOf(task)).toBeGreaterThan(-1);
  });
});
