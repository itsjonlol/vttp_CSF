import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectComponent } from './components/subject/subject.component';
import { BehaviorsubjectComponent } from './components/behaviorsubject/behaviorsubject.component';

import { NotificationComponent } from './components/notification/notification.component';
import { ContactComponent } from './components/contact/contact.component';
import { ObservablesComponent } from './components/observables/observables.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    BehaviorsubjectComponent,
    NotificationComponent,
    ContactComponent,
    ObservablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
