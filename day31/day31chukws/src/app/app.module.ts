import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayComponent } from './components/display/display.component';
import { NavigateComponent } from './components/navigate/navigate.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    NavigateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
