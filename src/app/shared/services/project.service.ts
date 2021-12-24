import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProjectModel} from '../models/project.model';

@Injectable()
export class ProjectsService {

  projectsUrl = 'http://localhost:2200/api/project';

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<any> {
    return this.http.get(this.projectsUrl);
  }

  addProject(body: ProjectModel): Observable<any> {
    return this.http.post(this.projectsUrl, body);
  }

  deleteProject(projectId: number): Observable<any> {
    const url = `${this.projectsUrl}/${projectId}`;
    return this.http.delete(url);
  }

  updateProject(body: ProjectModel): Observable<any> {
    const url = `${this.projectsUrl}/:${body.id}`;
    return this.http.put(url, body);
  }
}
