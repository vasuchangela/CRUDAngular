import { Component } from '@angular/core';
import { CRUDTaskServiceService } from '../crudtask-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [CRUDTaskServiceService]
})
export class AddUserComponent {
  constructor(private service:CRUDTaskServiceService,private router : Router){}

  userData = new FormGroup({
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    phone : new FormControl('',Validators.required),
    streetAddress : new FormControl('',Validators.required),
    city : new FormControl(''),
    state : new FormControl(''),
    userName : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  })

  saveUserDetail()
  {
    if(this.userData.valid)
    {
      this.service.addUserData(this.userData.value).subscribe({
        next:(res:any)=>{
          this.router.navigate(['Home'])
        },
        error:(res)=>{
          alert(res.error)
        }
      })
    }
  }
}