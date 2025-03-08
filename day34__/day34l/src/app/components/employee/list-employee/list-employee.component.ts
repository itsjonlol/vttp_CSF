import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../../service/employee.service';
import { Employee } from '../../../model/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeStore } from '../../../store/employee.store';
import { provideComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-employee',
  standalone: false,
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css',
  providers:[provideComponentStore(EmployeeStore)]
})
export class ListEmployeeComponent implements OnInit{

  employeeStore = inject(EmployeeStore);
  employeeService = inject(EmployeeService);
  private router = inject(Router);

  employees:Employee[] =[]
  
  // employees$!:Observable<Employee[]>

  // isLoading$!: Observable<boolean>
  // error$!:Observable<string | null>

  vm$ = this.employeeStore.vm$;


  ngOnInit(): void {
    // this.getEmployees();
    // this.loadEmployees()
    
    
  }

  loadEmployees():void {
    // this.employeeStore.loadEmployees();
    // this.employees$ =this.employeeStore.employees$;
    // this.isLoading$ = this.employeeStore.isLoading$;
    // this.error$ = this.employeeStore.error$;
    
    
  }

  ngOnChanges(): void {
    // this.getEmployees();
    // this.employeeStore.loadEmployees()
  }

  // ngDoCheck(): void {
  //   this.getEmployees();
  // }

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
    // if (confirm("do you wanna delete?")) {
    //   this.employeeService.deleteEmployeeById(id).subscribe({
    //     next: () => {
    //       // this.getEmployees()
    //       this.employeeStore.loadEmployees();
    //     }
    //   })
    // }

    this.employeeStore.deleteEmployee(id);
    

  }

  updateEmployeeById(id:number) {
    this.router.navigate(['employeeupdate',id])
  }

  getDetails(id:number) {
    this.router.navigate(['employeedetails',id])
  }
  
}
