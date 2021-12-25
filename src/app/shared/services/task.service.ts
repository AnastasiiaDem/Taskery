import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TaskModel} from '../models/task.model';

@Injectable()
export class TaskService {

    taskUrl = 'http://localhost:2200/api/task';

    constructor(private http: HttpClient) {
    }

    getTasks(): Observable<any> {
        return this.http.get(this.taskUrl);
    }

    addTask(body: TaskModel): Observable<any> {
        debugger
        return this.http.post(this.taskUrl, body);
    }

    deleteTask(taskId: number): Observable<any> {
        const url = `${this.taskUrl}/${taskId}`;
        return this.http.delete(url);
    }

    updateTask(body: TaskModel): Observable<any> {
        const url = `${this.taskUrl}/:${body.id}`;
        return this.http.put(url, body);
    }
}
