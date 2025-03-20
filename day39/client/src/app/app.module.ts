import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Aura from '@primeng/themes/aura';

import { ToolbarModule } from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { View0Component } from './components/view0/view0.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { InvcharacterComponent } from './components/invcharacter/invcharacter.component';
import { Dialog } from 'primeng/dialog';




@NgModule({
  declarations: [
    AppComponent,
    View0Component,
    InvcharacterComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,Dialog,
    AppRoutingModule,ButtonModule,ToolbarModule, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(),

        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
   
],
  bootstrap: [AppComponent]
})
export class AppModule { }
