import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';
import { from, Subscriber } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private taskService: TasksService) { }
tasks: Task[] = [];
resulttasks: Task[] = [];
myTask: Task = {
  label: '',
  completed: false
};
editForm = false;
showForm = false ;
searchText = '' ;
  ngOnInit(): void {
    this.getTasks();
  }
// tslint:disable-next-line: typedef
getTasks() {
   this.taskService.findAll()
    .subscribe(tasks => {this.resulttasks = this.tasks = tasks; });
}
// tslint:disable-next-line: typedef
deleteTask(id)
{
  this.taskService.delete(id)
    .subscribe( () => this.tasks.filter( task => task.id !== id ));
}
// tslint:disable-next-line: typedef
addTask()
{
  this.taskService.add(this.myTask)
  .subscribe((task) => {
    this.tasks = [task, ...this.tasks]; /* spread operator*/
    this.resetTask();
    this.showForm = false;
  });
}
// tslint:disable-next-line: typedef
resetTask()
{
  this.myTask = {
    label: '',
    completed: false
  };
}
// tslint:disable-next-line: typedef
editTask(task)
{
  this.myTask = task;
  this.editForm = true;
}
// tslint:disable-next-line: typedef
updateTask()
{
 this.taskService.update(this.myTask)
   .subscribe(task => {
     this.resetTask();
     this.editForm = false ;
        });
}
// tslint:disable-next-line: typedef
searchTask()
{
  this.resulttasks = this.tasks.filter( (tasks) => tasks.label.toLowerCase().includes(this.searchText.toLowerCase()));
}
}
