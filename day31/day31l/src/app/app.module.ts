import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TextComponent } from './components/text.component';
import { TextInputComponent } from './components/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    TextInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
