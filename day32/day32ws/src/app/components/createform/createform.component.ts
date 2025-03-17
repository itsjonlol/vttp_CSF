import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { noPastDateValidator } from '../../validators/no-past-date.validator';
import { Task } from '../../models';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-createform',
  standalone: false,
  templateUrl: './createform.component.html',
  styleUrl: './createform.component.css'
})
export class CreateformComponent implements OnInit {

  // #1 create formgroup variable
  protected form!: FormGroup;
  // #2 inject form builder
  private fb = inject(FormBuilder);

  @Output() 
  sendTaskToParent = new Subject<Task>;


  // #3 oninit
  ngOnInit(): void {

    // #5 instantiate the form
    this.form = this.createForm();
    
  }
  
  // #4 private function to create a form
  private createForm():FormGroup {
    return this.fb.group({
      id: this.fb.control<number>(1),
      description: this.fb.control<string>('',[Validators.required,Validators.minLength(5)]),
      priority:this.fb.control<string>('low'),
      due: this.fb.control<string>('',[Validators.required,noPastDateValidator()]),
      isCompleted: this.fb.control<boolean>(false)
    })
  }

  // #6 for displaying error messages
  protected hasError(ctrlName: string, errorName?: string): boolean {
    const ctrl = this.form.get(ctrlName) as FormControl;
    
    if (errorName) {
      return ctrl.dirty && ctrl.hasError(errorName); // Check for specific error
    }
    return ctrl.dirty && ctrl.invalid; // Check for any error
  }
  // #7 to disable button for invalid cases
  protected isInvalid() {
    return this.form.invalid;
  }

  
  // #8 process form
  processForm(){

    const task:Task = this.form.value

    this.sendTaskToParent.next(task);

    // #9 reset form once submitted
    this.form = this.createForm()


  }

  
}
