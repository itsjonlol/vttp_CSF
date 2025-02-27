import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { WeatherforecastComponent } from './components/weatherforecast/weatherforecast.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherforecastComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
