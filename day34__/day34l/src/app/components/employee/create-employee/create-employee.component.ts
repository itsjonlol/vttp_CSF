import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../../../model/models';
import { EmployeeService } from '../../../service/employee.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: false,
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {

  form!:FormGroup

  private fb = inject(FormBuilder)

  employeeService = inject(EmployeeService);

  private router = inject(Router);

  @Output()
  formSubmitted = new Subject<boolean>();

  employee!:Employee

  processForm() {
    this.employee=this.form.value
    // console.log("submitted...")
    this.saveEmployee();
    // this.formSubmitted.next(true);   
    this.router.navigate(['/employeelist']);
    
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe({
      next: data => console.log(data)
    })
    
  }
  ngOnInit(): void {
    this.form= this.createForm();
  }

  private createForm():FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>(''),
      lastName:this.fb.control<string>(''),
      emailId: this.fb.control<string>('')
    })

  }
}
