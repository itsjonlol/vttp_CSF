import { inject, Injectable } from "@angular/core";
import { ComponentStore, OnStoreInit} from "@ngrx/component-store";
import { Employee } from "../model/models";
import { catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import { EmployeeService } from "../service/employee.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";



//#1 
export interface EmployeeState {
    employees: Employee[],
    isLoading:boolean;
    error: string | null;

}
//#2
const INIT_STATE = {
    employees:[],
    isLoading:false,
    error:null
}
//#3
@Injectable({
    providedIn: 'root'
 })

export class EmployeeStore extends ComponentStore<EmployeeState> implements OnStoreInit {

   

    private employeeService = inject(EmployeeService);
    router = inject(Router);

    //#4
    constructor() {
        super(INIT_STATE)
    }

    ngrxOnStoreInit(): void {
        this.loadEmployees();
        
        console.log("Store initialised...")
    }

    //#5 selectors

    

    readonly employees$: Observable<Employee[]> = this.select( (state) =>state.employees)
    readonly isLoading$: Observable<boolean> = this.select((state) => state.isLoading)
    readonly error$: Observable<string | null> = this.select((state)=> state.error)

    readonly getEmployeeById = (id: number):Observable<Employee | undefined> =>
    this.select((state) => state.employees.find((employee) => employee.id === id));

    readonly updateEmployeeById = this.updater((state, updatedEmployee: Employee) => ({
        ...state,
        isLoading: false,
        employees: state.employees.map((employee) => {
            if (employee.id === updatedEmployee.id) {
                return updatedEmployee;
            } else {
                return employee;
            }
        }
          
        ),
      }));

    vm$ = this.select({ 
        employees: this.employees$,
        isLoading: this.isLoading$,
        error: this.error$
    })

    // updaters

    readonly setIsLoading = this.updater((state,isLoading:boolean)=> ({...state,isLoading:isLoading}))
    setError = this.updater((state,error:HttpErrorResponse) => ({
        ...state, // copies old state
        isLoading:false, // updates any state
        error: error.message
    }))
    readonly setEmployees = this.updater((state,employees:Employee[]) => ({
        ...state,
        isLoading:false,
        employees
        
    }))

    readonly deleteEmployeeById = this.updater((state,id:number) => ({
        ...state,
        isLoading:false,
        employees: state.employees.filter((employee:Employee) => employee.id !==id) //Returns a new array without the deleted employee.
    }))

    readonly addEmployee = this.updater((state,employee:Employee) => ({
        ...state,
        isLoading:false,
        employees: [...state.employees,employee] //Append the new employee to the array

        // const newSlice: TodoSlice = {
        //     todos: [ ...slice.todos, todo ]
        //     }
        //     return newSlice
    }))

    



    //alt ways of writing updaters
    // setIsLoading2 = this.updater((state,isLoading) => {
    //     return {
    //         ...state,
    //         isLoading:true
    //     }
    // })

    // setIsLoading3 = this.updater( (state,isLoading) => {
    //     const newState = {
    //         ...state,
    //         isLoading:true
    //     }
    //     return newState;
    // })
    
    // completes the stream
    readonly loadEmployees = this.effect(trigger$ => {
        return trigger$.pipe(
            tap( () => this.setIsLoading(true)),
            switchMap(() => this.employeeService.getEmployees().pipe(
                tap( (employees) => {
                    this.setIsLoading(false)
                    this.setEmployees(employees)}),
                catchError((error:HttpErrorResponse) => {
                    this.setError(error)
                    return EMPTY
                })
            ))
        )
    } )

    readonly deleteEmployee = this.effect((trigger$: Observable<number>) => {
        return trigger$.pipe(
            tap(() => this.setIsLoading(true)), // Set loading state
            switchMap(id => {
                return this.employeeService.deleteEmployeeById(id).pipe(
                    tap({
                        next: () => {
                            this.deleteEmployeeById(id); // Update local state
                            // this.loadEmployees(); // Sync with server
                            // this.setIsLoading(); // Clear loading state
                            
                        },
                        error: (error: HttpErrorResponse) => {
                            // this.setError(error); // Handle error
                            // this.setIsLoading(); // Clear loading state
                        },
                    }),
                    catchError((error:HttpErrorResponse) => {
                        this.setError(error) // either works
                        return EMPTY;
                    }) // Complete the stream on error
                );
            })
        );
    });

    readonly addEmployeeAction = this.effect((trigger$: Observable<Employee>) =>
        trigger$.pipe(
          tap(() => this.setIsLoading(true)), // ✅ Set loading before API call
          switchMap(employee =>
            this.employeeService.createEmployee(employee).pipe(
              tap(() => {
                this.addEmployee(employee); 
                this.setIsLoading(false); 
                this.router.navigate(['/employeelist']); 
              }),
              catchError((error: HttpErrorResponse) => {
                this.setError(error);
                return EMPTY; 
              })
            )
          )
        )
      );
      readonly updateEmployeeAction = this.effect(
        (trigger$: Observable<{ id: number; employee: Employee }>) =>
          trigger$.pipe(
            tap(() => this.setIsLoading(true)), // ✅ Set loading before API call
            switchMap(({ id, employee }) =>
              this.employeeService.updateEmployeeById(id, employee).pipe( // assumed backend returns the updated employee
                tap((updatedEmployee: Employee) => {
                  this.updateEmployeeById(updatedEmployee); // ✅ Update local state with API response
                  this.setIsLoading(false); // ✅ Stop loading
                  this.router.navigate(['/employeelist']); // ✅ Navigate on success
                }),
                catchError((error: HttpErrorResponse) => {
                  this.setError(error);
                  this.setIsLoading(false); // ✅ Stop loading on error
                  return EMPTY;
                })
              )
            )
          )
      );

    // readonly loadEmployees2 = this.effect(trigger$ => 
    //     trigger$.pipe(
    //         tap(()=>this.setIsLoading(true)),
    //         switchMap(()=> this.employeeService.getEmployees().pipe(
    //             tap({
    //                 next: (employees) => {
    //                     this.setIsLoading(false)
    //                     this.setEmployees(employees)
    //                 },
    //                 error: (error:HttpErrorResponse) => {
    //                     this.setError(error)
    //                 }
    //             })
    //         ))
    //     )
    // )

}