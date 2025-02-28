import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { Ws34Component } from './components/ws34/ws34.component';
import { WeatherforecastComponent } from './components/weatherforecast/weatherforecast.component';
import { Ws35weatherforecastComponent } from './components/ws35weatherforecast/ws35weatherforecast.component';
import { Ws35Component } from './components/ws35/ws35.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherforecastComponent,
    Ws34Component,
    Ws35weatherforecastComponent,
    Ws35Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
