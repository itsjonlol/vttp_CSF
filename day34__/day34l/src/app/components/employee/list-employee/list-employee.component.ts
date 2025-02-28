import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../../service/employee.service';
import { Employee } from '../../../model/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  standalone: false,
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent implements OnInit{


  employeeService = inject(EmployeeService);
  private router = inject(Router);

  employees:Employee[] =[]
  ngOnInit(): void {
    this.getEmployees();
    
  }

  ngOnChanges(): void {
    this.getEmployees();
  }

  ngDoCheck(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next:(response:Employee[]) => {
        this.employees=response;
      },
      error: (error:HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

  deleteEmployeeById(id:number) {
    if (confirm("do you wanna delete?")) {
      this.employeeService.deleteEmployeeById(id).subscribe({
        next: () => {
          this.getEmployees()
        }
      })
    }
    

  }

  updateEmployeeById(id:number) {
    this.router.navigate(['employeeupdate',id])
  }

  getDetails(id:number) {
    this.router.navigate(['employeedetails',id])
  }
  
}
