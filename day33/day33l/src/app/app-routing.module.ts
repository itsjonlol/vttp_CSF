import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArraychangesComponent } from './components/arraychanges/arraychanges.component';
import { ContentprojectionComponent } from './components/contentprojection/contentprojection.component';
import { ChukexampleComponent } from './components/chukexample/chukexample.component';

const routes: Routes = [
  {path:'array',component:ArraychangesComponent},
  {path:'contentprojection',component:ContentprojectionComponent},
  {path:'chukexample',component:ChukexampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
