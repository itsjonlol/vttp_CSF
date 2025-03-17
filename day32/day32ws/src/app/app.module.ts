import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateformComponent } from './components/createform/createform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowtasksComponent } from './components/showtasks/showtasks.component';

import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/lara';
import lara from '@primeng/themes/lara';
import { FormComponent } from './components/form/form.component';
import { FormvalidateComponent } from './components/formvalidate/formvalidate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    CreateformComponent,
    ShowtasksComponent,
    FormComponent,
    FormvalidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Toolbar,AvatarModule,SharedModule,ButtonModule,Message,InputTextModule, BrowserAnimationsModule,ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: lara,
            options:{
              darkModeSelector: '.my-app-dark'
            }
        }
    })
],
  bootstrap: [AppComponent]
})
export class AppModule { }
