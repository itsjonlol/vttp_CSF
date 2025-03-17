import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { customAgeValidator, noFutureDateValidator } from '../../validators/no-past-date.validator';

@Component({
  selector: 'app-formvalidate',
  standalone: false,
  templateUrl: './formvalidate.component.html',
  styleUrl: './formvalidate.component.css'
})
export class FormvalidateComponent  implements OnInit{

    private fb = inject(FormBuilder)

    protected form!:FormGroup

    toggleTiming:boolean=true;

    collaborators!: FormArray // 1) declare form array

    ngOnInit(): void {
      this.form = this.createForm();
    }

    processForm():void {

    }

    private createForm():FormGroup { 
      this.collaborators = this.fb.array([]); // 2) instantiate form array
      
      return this.fb.group({
        name: this.fb.control<string>('',[Validators.required,Validators.minLength(5)]),
        dob: this.fb.control<string>('',[noFutureDateValidator(),customAgeValidator()]),
        priority:this.fb.control<boolean>(false),
        am: this.fb.control<boolean>(false),
        pm: this.fb.control<boolean>(false),
        collaborators: this.collaborators // 3) put the form array in the main form group
      })
    }

    createCollaborator():FormGroup { // 4) function to create a form group for a collaborator
      return this.fb.group({
        namef:this.fb.control<string>('',[Validators.minLength(5)]),
        email:this.fb.control<string>('')
      })
    }

    addCollaborator() {
     this.collaborators.push(this.createCollaborator()); // 5) add the form group to the form array
    }

    removeCollaborator(idx:number) {
      this.collaborators.removeAt(idx); // no need splice i guess
    }

    checkPriority($event:any) {
      if ($event.target.checked) {
        this.toggleTiming=false;
      } else {
        this.toggleTiming=true;
      }
    }


    //for validation errors
    protected hasError(ctrlName: string, errorName?: string): boolean {
      const ctrl = this.form.get(ctrlName) as FormControl;
      
      if (errorName) {
        return ctrl.dirty && ctrl.hasError(errorName); // Check for specific error
      }
      return ctrl.dirty && ctrl.invalid; // Check for any error
    }
    // #7 to disable button for invalid cases
    protected isInvalid() {
      return this.form.invalid || (this.collaborators.controls.length <= 0)
    }
}
