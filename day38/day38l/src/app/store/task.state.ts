// src/app/state/task.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { AddTask,RemoveTask } from './task.action';



export interface Task {
    id: string;
    name: string;
    priority: string; // 'low', 'medium', 'high'
  }
  
  export interface TaskStateModel {
    tasks: Task[];
    audit: string[];
    priorityFilter: string; // 'all', 'low', 'medium', 'high'
  }

@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    audit: [],
    priorityFilter: 'all',
  },
})
@Injectable()
export class TaskState {
  @Action(AddTask)
  addTask(ctx: StateContext<TaskStateModel>, action: AddTask) {
    const state = ctx.getState();
    const newTask: Task = { ...action.task, id: uuidv4().substring(0, 8) };
    ctx.patchState({
      tasks: [...state.tasks, newTask],
      audit: [...state.audit, `Task ${newTask.name} added, ${new Date().toLocaleString()}`],
    });
  }

  @Action(RemoveTask)
  removeTask(ctx: StateContext<TaskStateModel>, action: RemoveTask) {
    const state = ctx.getState();
    ctx.patchState({
      tasks: state.tasks.filter((task) => task.id !== action.taskId),
      audit: [...state.audit, `Task deleted. ${new Date().toLocaleString()}`],
    });
  }

  @Selector()
  static getTasks(state: TaskStateModel) {
    // return state.tasks.filter(
    //   (task) => state.priorityFilter === 'all' || task.priority === state.priorityFilter
    // );
    return state.tasks;
  }

  @Selector()
  static getTaskCount(state: TaskStateModel) {
    return state.tasks.length;
  }
}