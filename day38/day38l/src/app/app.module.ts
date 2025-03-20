import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task.component';
import { TaskListComponent } from './components/task-list.component';
import { TaskCountComponent } from './components/task-count.component';
import { QRCodeComponent } from 'angularx-qrcode';

//For NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TaskState } from './store/task.state';
import { FruitComponent } from './components/fruit.component';
import { ArrayoperatorsComponent } from './components/arrayoperators.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    TaskCountComponent,
    FruitComponent,
    ArrayoperatorsComponent,
    
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QRCodeComponent,
    NgxsModule.forRoot([]), NgxsLoggerPluginModule.forRoot(), NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([TaskState]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
