import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View0Component } from './components/view0/view0.component';
import { InvcharacterComponent } from './components/invcharacter/invcharacter.component';

const routes: Routes = [
  {path:'view0',component:View0Component},
  {path:'character/:characterId',component:InvcharacterComponent},
  {path:'**',redirectTo:'view0',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
