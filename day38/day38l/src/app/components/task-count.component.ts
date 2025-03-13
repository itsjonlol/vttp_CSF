import { Component, inject } from '@angular/core';
import { TaskStore } from '../store/task.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-count',
  standalone: false,
  templateUrl: './task-count.component.html',
  styleUrl: './task-count.component.css'
})
export class TaskCountComponent {

    taskStore = inject(TaskStore) 

    taskCount$:Observable<number> = this.taskStore.getTaskCount$
}
