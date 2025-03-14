import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task.component';
import { TaskListComponent } from './components/task-list.component';
import { TaskCountComponent } from './components/task-count.component';
//For NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TaskState } from './store/task.state';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    TaskCountComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([]), NgxsLoggerPluginModule.forRoot(), NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([TaskState]) // Ensure TaskState is registered
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
