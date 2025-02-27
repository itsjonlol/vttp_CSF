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

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    FileUploadComponent,
    PhotoComponent,
    ListEmployeeComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    DetailsEmployeeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
