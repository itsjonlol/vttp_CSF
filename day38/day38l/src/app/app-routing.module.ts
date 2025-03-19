import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list.component';
import { TaskComponent } from './components/task.component';
import { FruitComponent } from './components/fruit.component';
import { ArrayoperatorsComponent } from './components/arrayoperators.component';

const routes: Routes = [
  
  
  {path:'',redirectTo:'tasklist',pathMatch:'full'},
  {path:'createtask',component:TaskComponent},
  {path:'tasklist',component:TaskListComponent},
  {path:'fruit',component:FruitComponent},
  {path:'arrayoperators',component:ArrayoperatorsComponent},
  {path:'**',redirectTo:'tasklist'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
