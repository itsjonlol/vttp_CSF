import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../../model/models';
import { EmployeeService } from '../../../service/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-employee',
  standalone: false,
  templateUrl: './details-employee.component.html',
  styleUrl: './details-employee.component.css'
})
export class DetailsEmployeeComponent implements OnInit{

  //set default because initially was reading undefined
 
  employee!:Employee;

  employeeService = inject(EmployeeService);

  activatedRoute = inject(ActivatedRoute);

  id!:number

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getEmployeeDetails();

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
