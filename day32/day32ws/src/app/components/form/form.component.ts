import { Component } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  tasks:Task[] = []

  handleTask(event: Task) {
    this.tasks.push(event);
    this.storeTasksIntoLocalStorage();
  }

  handleDeleteTask(event:number) {
    

    const index = this.tasks.findIndex(x => x.id === event);
    

    if (index !== -1) {
      this.tasks.splice(index,1)
    }
    this.storeTasksIntoLocalStorage();
    
    
  }

  handleCompleteTask(event:number) {
    const index = this.tasks.findIndex(x => x.id === event);
    if (index !== -1) {
      this.tasks[index].isCompleted = true;
    }
    this.storeTasksIntoLocalStorage();

  }

  ngOnInit(): void {
    this.tasks= this.loadTasksFromLocalStorage();
  }

  private loadTasksFromLocalStorage():Task[] {
    const storedTasks = localStorage.getItem("storedtasks")

    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
    return this.tasks;
  }
  
  private storeTasksIntoLocalStorage() {
    localStorage.setItem("storedtasks",JSON.stringify(this.tasks));

  }
}
