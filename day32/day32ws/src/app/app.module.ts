import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateformComponent } from './components/createform/createform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowtasksComponent } from './components/showtasks/showtasks.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateformComponent,
    ShowtasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
