import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { DisplayfruitComponent } from './components/displayfruit/displayfruit.component';


import { CartcheckoutComponent } from './components/cartcheckout/cartcheckout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestChildComponent } from './components/test-child/test-child.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayfruitComponent,
    CartcheckoutComponent,
    TestChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
