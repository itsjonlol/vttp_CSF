import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './components/employee/list-employee/list-employee.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { DetailsEmployeeComponent } from './components/employee/details-employee/details-employee.component';
import { ExampleComponent } from './components/example/example.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { RouteGuardService } from './service/route-guard.service';
import { TestComponent } from './components/test/test.component';
import { DeactiveGuardService } from './service/deactive-guard.service';
import { DebounceComponent } from './components/debounce/debounce.component';
import { JsonexampleComponent } from './components/jsonexample/jsonexample.component';
import { RxjsExamplesComponent } from './components/rxjs-examples/rxjs-examples.component';
import { RoutingComponent } from './components/routing/routing.component';
import { Route2Component } from './components/routing/route2.component';


const routes:Routes =[
  {path:"employeelist",component:ListEmployeeComponent},
  {path:"employeecreate",component:CreateEmployeeComponent},
  {path:"employeedetails/:id",component:DetailsEmployeeComponent},
  {path:"employeeupdate/:id",component:UpdateEmployeeComponent,canActivate: [RouteGuardService]},
  {path:"example",component:ExampleComponent},
  {path: 'test',component:TestComponent,canDeactivate:[DeactiveGuardService]},
  {path: 'debounce',component:DebounceComponent},
  {path:'json',component:JsonexampleComponent},
  {path:'rxjs',component:RxjsExamplesComponent},
  {path:'routing',component:RoutingComponent},
  {path:'route2',component:Route2Component},
  {path:'routing/:id',component:Route2Component},
  //alternatively, can do to a 404notfoudncomponent
  {path:'**',redirectTo:'',pathMatch:'full'}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
