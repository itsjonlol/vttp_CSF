import { Task } from "../models/task.model";

// src/app/state/task.actions.ts
export class AddTask {
    static readonly type = '[Task] Add Task';
    constructor(public task: Omit<Task, 'id'>) {} // Omit 'id' because it will be generated
  }
  
  export class RemoveTask {
    static readonly type = '[Task] Remove Task';
    constructor(public taskId: string) {}
  }
