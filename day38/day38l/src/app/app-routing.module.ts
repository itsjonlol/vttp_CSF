import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list.component';
import { TaskComponent } from './components/task.component';

const routes: Routes = [
  
  
  {path:'',redirectTo:'tasklist',pathMatch:'full'},
  {path:'createtask',component:TaskComponent},
  {path:'tasklist',component:TaskListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
