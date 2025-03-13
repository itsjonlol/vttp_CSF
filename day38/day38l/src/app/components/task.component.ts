import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../models/task.model';
import { TaskStore } from '../store/task.store';
import { Store } from '@ngxs/store';
import { AddTask } from '../store/task.action';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  private fb = inject(FormBuilder);
  private taskStore = inject(TaskStore);

  //ngxs store
  private store = inject(Store);


  protected form!:FormGroup

  ngOnInit(): void {
    this.form = this.createForm();
  }

  processForm():void {
    const newTask: Task = {
      id:'',
      ...this.form.value
    }
    this.taskStore.addTask(newTask);
    this.form = this.createForm();

    //ngxs store
    this.store.dispatch(new AddTask(newTask))

  }

  createForm():FormGroup {
    return this.fb.group({
        name:this.fb.control<string>(''),
        priority: this.fb.control<string>('low')

    })
  }

}
