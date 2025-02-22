import { Component, Input, Output } from '@angular/core';
import { Task } from '../../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-showtasks',
  standalone: false,
  templateUrl: './showtasks.component.html',
  styleUrl: './showtasks.component.css'
})
export class ShowtasksComponent {

    @Input({required:true})
    tasks!:Task[]

    @Output()
    emitDeleteTask = new Subject<number>

    @Output()
    emitCompleteTask = new Subject<number>

    deleteTask(id:number) {
      this.emitDeleteTask.next(id);
    }

    markCompleted(id:number) {
      this.emitCompleteTask.next(id)
    }
}
