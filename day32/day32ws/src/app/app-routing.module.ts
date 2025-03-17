import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { FormvalidateComponent } from './components/formvalidate/formvalidate.component';

const routes: Routes = [
  {path:'form',component:FormComponent},
  {path:'formvalidate',component:FormvalidateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
