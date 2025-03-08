import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../../model/models';
import { EmployeeService } from '../../../service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeStore } from '../../../store/employee.store';
import { Observable } from 'rxjs';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-details-employee',
  standalone: false,
  templateUrl: './details-employee.component.html',
  styleUrl: './details-employee.component.css',
  providers:[provideComponentStore(EmployeeStore)]
})
export class DetailsEmployeeComponent implements OnInit{

  //set default because initially was reading undefined
 
  employee!:Employee;

  employeeService = inject(EmployeeService);

  activatedRoute = inject(ActivatedRoute);

  employeeStore = inject(EmployeeStore);
  employeeViaStore$!: Observable<Employee | undefined>

  id!:number

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = parseInt(params['id']); 
      console.log('Employee ID from route:', this.id);
      // this.getEmployeeDetails()
      this.employeeViaStore$ = this.employeeStore.getEmployeeById(this.id);
    });
  }

  getEmployeeDetails() {
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data:Employee) => {
        this.employee = data;
      },
      error: (error:Error) => console.log(error)
    })
  }
}
