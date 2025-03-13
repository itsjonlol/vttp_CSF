import { Component, inject, OnInit } from '@angular/core';
import { TaskStore } from '../store/task.store';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Store } from '@ngxs/store';
import { TaskState } from '../store/task.state';
import { RemoveTask } from '../store/task.action';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  // taskStore = inject(TaskStore)

  // tasks$:Observable<Task[]> = this.taskStore.getTasks$
  // tasks!:Task[]

  //ngxs store
  store = inject(Store);
  ngxsTasks$:Observable<Task[]> = this.store.select(TaskState.getTasks);
  ngxsTaskCounts$:Observable<number> = this.store.select(TaskState.getTaskCount)

  ngOnInit(): void {
    // this.tasks$.subscribe(data => this.tasks = data)
  }

  deleteTask(id:string) {
    // this.taskStore.removeTask(id);
    this.store.dispatch(new RemoveTask(id));
  }

}
