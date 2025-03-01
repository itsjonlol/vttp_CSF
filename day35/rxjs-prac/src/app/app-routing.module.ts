import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './components/subject/subject.component';
import { BehaviorSubject } from 'rxjs';
import { BehaviorsubjectComponent } from './components/behaviorsubject/behaviorsubject.component';
import { ContactComponent } from './components/contact/contact.component';
import { ObservablesComponent } from './components/observables/observables.component';

const routes: Routes = [
  {path:'subject',component:SubjectComponent},
  {path:'behaviorsubject',component:BehaviorsubjectComponent},
  {path:'contact',component:ContactComponent},
  {path:'observables',component:ObservablesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
