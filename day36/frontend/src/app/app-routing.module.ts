import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { CartdbComponent } from './components/cartdb/cartdb.component';

const routes: Routes = [
  {path:"",component:UploadComponent},
  {path:"image/:postId",component:ViewImageComponent},
  {path:'cartdb',component:CartdbComponent},
  {path:"**",redirectTo:"/",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
