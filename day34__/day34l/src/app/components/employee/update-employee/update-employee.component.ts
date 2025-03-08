import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../../service/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../model/models';
import { EmployeeStore } from '../../../store/employee.store';
import { exhaustMap, switchMap } from 'rxjs';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
  providers:[provideComponentStore(EmployeeStore)]
})
export class UpdateEmployeeComponent implements OnInit{


  employeeService = inject(EmployeeService)
  id!:number

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute)
  form!:FormGroup

  employeeStore = inject(EmployeeStore)
  
  private fb = inject(FormBuilder)

  employee:Employee = {
    id: this.id,
    firstName: '',
    lastName: '',
    emailId: ''
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe( params => {
    //     this.id= +params['id']
    //     this.getEmployeeById()
    // }
    // )

    this.activatedRoute.params.pipe(
      exhaustMap( params => {
        this.id = +params['id']
        return this.employeeStore.getEmployeeById(this.id)
      })
    ).subscribe({
      next: (data:Employee|undefined) =>{
        if (data) {
          this.employee = data;
          this.form.patchValue(this.employee);
        }
      }
    })

    this.form = this.createForm();
    
    

  }

  getEmployeeById() {
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data:Employee)=> {
        this.employee=data;
        this.form.patchValue(this.employee);
      }, error: (error:Error) => console.log(error)
    })

    // this.employeeStore.getEmployeeById(this.id).subscribe({
    //   next: (data:Employee | undefined) => {
    //     if ( data) {
    //       this.employee = data;
    //       this.form.patchValue(this.employee);
    //     }
        
    //   }
    // })
  }

  processForm() {
    this.employee= this.form.value;
    this.updateEmployeeById();
  }

  private updateEmployeeById() {
  //   this.employeeService.updateEmployeeById(this.id,this.employee).subscribe({
  //     next: (data) => this.router.navigate(['/employeelist']),
  //     error: (error:Error) => console.log(error)
  //   }
  // )
  this.employeeStore.updateEmployeeAction({ id: this.id, employee: this.employee }); // ✅ Correct
  }

  private createForm():FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>(''),
      lastName:this.fb.control<string>(''),
      emailId: this.fb.control<string>('')
    })

  }
}
