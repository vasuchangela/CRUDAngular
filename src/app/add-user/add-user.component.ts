import { Component } from '@angular/core';
import { UserService } from '../userservice';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent {
  constructor(private service:UserService,private router : Router){}
  errorMessage:any;

  userData = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl(''),
    streetAddress : new FormControl(''),
    city : new FormControl(''),
    state : new FormControl(''),
    userName : new FormControl(''),
    password : new FormControl(''),
  })
}