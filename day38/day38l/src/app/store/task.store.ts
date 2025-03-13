import { TaskSlice } from "../models/task-slice.model";
import { ComponentStore} from "@ngrx/component-store";
import {v4 as uuidv4} from 'uuid'
import { Task } from "../models/task.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

const INIT_STATE:TaskSlice  = {
    tasks:[],
    audit:[],
    priorityFilter:'all'
}
@Injectable(
    {providedIn:'root'}
)


export class TaskStore extends ComponentStore<TaskSlice> {

    constructor() {
        super(INIT_STATE)
    }

    //mutator - update methods
    // addTask(task) - add task to the store list

    readonly addTask = this.updater<Task>((slice:TaskSlice,newTask:Task) => {
        const toSaveTask:Task = {...newTask,id:uuidv4().substring(0,8)}
        return {
            tasks:[...slice.tasks,toSaveTask],
            audit: [...slice.audit,
                `Task ${toSaveTask.name} added, ${new Date().toLocaleString()}`
            ],
            priorityFilter:slice.priorityFilter
        } as TaskSlice
    })

    readonly removeTask = this.updater<string>((slice: TaskSlice , taskid: string) => {
        return { 
            tasks: slice.tasks.filter((task: Task) => task.id !== taskid),
            audit: [...slice.audit, 
                    `Task deleted. ${new Date().toLocaleString()}`],
            priorityFilter: slice.priorityFilter
        } as TaskSlice;
    });
    //selector
    readonly getTasks$:Observable<Task[]> = this.select<Task[]>((slice:TaskSlice) => {
        return slice.tasks.filter(t => (slice.priorityFilter === 'all' || t.priority === slice.priorityFilter))
    })

    readonly getTasks2$ = (priority:string) => this.select<Task[]>((slice:TaskSlice) => {
       return slice.tasks.filter(t => t.priority === slice.priorityFilter)
    })

    // selector query the state get count of tasks

    readonly getTaskCount$:Observable<number>= this.select<number>((slice:TaskSlice)=> {
        let number = 0;
        number = slice.tasks.length
        return number;
    })



}