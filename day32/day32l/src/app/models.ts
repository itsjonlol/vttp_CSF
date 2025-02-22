export interface Task {
    taskName:string
    priority: string
    dueDate: string
    urgency: number
    comments: string
    procrastinate: boolean
}

// key names cannot start with number