import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../../service/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../model/models';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit{


  employeeService = inject(EmployeeService)
  id!:number

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute)
  form!:FormGroup

  private fb = inject(FormBuilder)

  employee:Employee = {
    id: this.id,
    firstName: '',
    lastName: '',
    emailId: ''
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.form = this.createForm();
    this.getEmployeeById();
    

  }

  getEmployeeById() {
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data:Employee)=> {
        this.employee=data;
        this.form.patchValue(this.employee);
      }, error: (error:Error) => console.log(error)
    })
  }

  processForm() {
    this.employee= this.form.value;
    this.updateEmployeeById();
  }

  private updateEmployeeById() {
    this.employeeService.updateEmployeeById(this.id,this.employee).subscribe({
      next: (data) => this.router.navigate(['/employeelist']),
      error: (error:Error) => console.log(error)
    }
  )
  }

  private createForm():FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>(''),
      lastName:this.fb.control<string>(''),
      emailId: this.fb.control<string>('')
    })

  }
}
