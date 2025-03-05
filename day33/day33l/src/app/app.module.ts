import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewChildComponent } from './components/view-child/view-child.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vc2Component } from './components/vc2/vc2.component';
import { ArraychangesComponent } from './components/arraychanges/arraychanges.component';
import { ArraychildComponent } from './components/arraychild/arraychild.component';
import { ContentprojectionComponent } from './components/contentprojection/contentprojection.component';
import { ContentprojectionchildComponent } from './components/contentprojectionchild/contentprojectionchild.component';
import { NumInputComponent } from './components/chukexample/num-input.component';
import { NumListComponent } from './components/chukexample/num-list.component';
import { ChukexampleComponent } from './components/chukexample/chukexample.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewChildComponent,
    Vc2Component,
    ArraychangesComponent,
    ArraychildComponent,
    ContentprojectionComponent,
    ContentprojectionchildComponent,
    ChukexampleComponent,
    NumInputComponent,
    NumListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
