import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'Home' , component:HomeComponent},
  {path:'addUser' , component:AddUserComponent},
  {path:'edit/:id' , component:EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
