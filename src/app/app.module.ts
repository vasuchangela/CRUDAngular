import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CRUDTaskServiceService } from './crudtask-service.service';
import {HttpClientModule} from '@angular/common/http';
import { EditUserComponent } from './edit-user/edit-user.component'
import {FormsModule} from '@angular/forms';
import { FilterPipe } from './filter.pipe'

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    HomeComponent,
    EditUserComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CRUDTaskServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
