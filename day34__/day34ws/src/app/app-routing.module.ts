import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Ws34Component } from './components/ws34/ws34.component';
import { HomeComponent } from './components/home/home.component';
import { Ws35Component } from './components/ws35/ws35.component';
import { WeatherforecastComponent } from './components/weatherforecast/weatherforecast.component';
import { Ws35weatherforecastComponent } from './components/ws35weatherforecast/ws35weatherforecast.component';



const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'ws34' ,component:Ws34Component},
  {path:'ws35',component:Ws35Component},
  //if using query
  {path:'weatherforecast',component:Ws35weatherforecastComponent}
  //if using normal query,
  // {path:'weatherforecast/:city',component: Ws35weatherforecastComponent}
  // { path: '',   redirectTo: 'weatherforecast', pathMatch: 'full' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes, { bindToComponentInputs: true })
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {}
