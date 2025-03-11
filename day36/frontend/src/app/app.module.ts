import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UploadComponent } from './components/upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { CartdbComponent } from './components/cartdb/cartdb.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ViewImageComponent,
    CartdbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()),
  provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
