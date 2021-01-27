import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TasksComponent } from '../components/tasks/tasks.component';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  apiURL = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  findAll()
  {
    return this.http.get<Task[]>(this.apiURL);
  }
  // tslint:disable-next-line: typedef
  delete(id)
  {
    return this.http.delete(this.apiURL + '/' + id);
    }
  // tslint:disable-next-line: typedef
  add(task)
  {
    return this.http.post<Task>( this.apiURL, task);
  }
  // tslint:disable-next-line: typedef
  update(task)
  {
    return this.http.put(this.apiURL + '/' + task.id  , task );
  }
}
