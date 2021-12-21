import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TaskService {

    taskUrl = 'http://localhost:2200/api/task';

    constructor(private http: HttpClient) {
    }

    getTasks(): Observable<any> {
        return this.http.get(this.taskUrl);
    }

    addTask(body: Object): Observable<any> {
        return this.http.post(this.taskUrl, body);
    }

    deleteTask(taskId: number): Observable<any> {
        const url = `${this.taskUrl}/${taskId}`;
        return this.http.delete(url);
    }
}
