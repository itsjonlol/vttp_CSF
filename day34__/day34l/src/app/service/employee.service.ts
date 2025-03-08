import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  private apiUrl="http://localhost:8080/api/v1/employees"

  httpClient = inject(HttpClient)

  getEmployees():Observable<Employee[]> {
    console.log("service calling api...")
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id:number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.apiUrl}/${id}`)
  }

  deleteEmployeeById(id:number):Observable<Object> {
    return this.httpClient.delete<Object>(`${this.apiUrl}/${id}`)
  }
  
  createEmployee(employee:Employee): Observable<Object> {
    return this.httpClient.post<Employee>(this.apiUrl,employee);
  }

  updateEmployeeById(id:number,employee:Employee):Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.apiUrl}/${id}`,employee);
  }

  
}
