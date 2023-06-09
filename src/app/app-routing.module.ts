import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'Home' , component:HomeComponent},
  {path:'addUser' , component:EditUserComponent},
  {path:'edit/:id' , component:EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
