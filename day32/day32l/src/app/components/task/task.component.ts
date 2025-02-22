import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  

  urgency:number = 2;

  private fb = inject(FormBuilder);

  // form model
  protected form!: FormGroup
  protected collaborators!: FormArray

  ngOnInit(): void {
    this.form=this.createForm();
  }

  private createForm() : FormGroup {
    this.collaborators = this.fb.array([])

    const form = this.fb.group({
      taskName: this.fb.control<string>('',[Validators.required,Validators.minLength(3)]),
      priority: this.fb.control<string>('1'),
      dueDate: this.fb.control<string>('',[Validators.required]),
      urgency: this.fb.control<number>(2),
      comments: this.fb.control<string>(''),
      procrastinate: this.fb.control<boolean>(false),
      collaborators: this.collaborators


    })
    return form;
  }

  

  protected processForm(): void {
    // method 1 
    const values:Task = this.form.value

    // method2
    // const values2:Task = {
    //   myPriority: this.form.get(`priority`)?.value // whole thing becomes null if don thave
    // }

    // method3
    // const formValue = this.form.value
    // const values3: Task = {
    //   ...formValue, // deep copy -> same as for (let k in formValue) {a[k] = formValue[k]}
    // }

    console.log('>>> form' ,values)
  }
  

  updateUrgency(event: any):void  {
    this.urgency = event.target.value
  
  }

  protected isCtrlValid(ctrlName: string): boolean {
    return !!this.form.get(ctrlName)?.valid
  }

  protected isCtrlInvalid(ctrlName: string): boolean {
    return !!this.form.get(ctrlName)?.invalid
  }

  private createCollaborator():FormGroup {
    return this.fb.group({
      name:this.fb.control<string>(''),
      email:this.fb.control<string>('')
    })
  }

  protected addCollaborator() {
    this.collaborators.push(this.createCollaborator());
  }


}
