import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ExampleComponent } from './components/example/example.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PhotoComponent } from './components/photo/photo.component';
import { ListEmployeeComponent } from './components/employee/list-employee/list-employee.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { DetailsEmployeeComponent } from './components/employee/details-employee/details-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouteGuardService } from './service/route-guard.service';
import { DeactiveGuardService } from './service/deactive-guard.service';
import { TestComponent } from './components/test/test.component';
import { DebounceComponent } from './components/debounce/debounce.component';
import { JsonexampleComponent } from './components/jsonexample/jsonexample.component';
import { RxjsExamplesComponent } from './components/rxjs-examples/rxjs-examples.component';
import { RoutingComponent } from './components/routing/routing.component';
import { Route2Component } from './components/routing/route2.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    FileUploadComponent,
    PhotoComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    DetailsEmployeeComponent,
    TestComponent,
    DebounceComponent,
    JsonexampleComponent,
    RxjsExamplesComponent,
    RoutingComponent,
    Route2Component,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(),RouteGuardService,DeactiveGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
