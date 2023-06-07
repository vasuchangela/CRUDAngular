import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userservice';
import { FormGroup,FormControl } from '@angular/forms'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  constructor(private route :ActivatedRoute,private service:UserService, private router : Router){}

  errorMessage:any;
  userId:any;

  userDatas = new FormGroup({
    id: new FormControl(''),
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
  ngOnInit()
  {
    this.route.paramMap.subscribe({
      next:(params:any)=>{
        const id = params.get('id')
        this.userId = id
        if(id)
        {
          this.service.getUserDetail(id).subscribe((res:any)=>{
            this.userDatas.setValue({
              id:res.id,
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
              phone: res.phone,
              streetAddress: res.streetAddress,
              city: res.city,
              state: res.state,
              userName: res.userName,
              password: res.password
            });
          })
        }
      }
    })
  }

  updateData()
  {
    if(this.userDatas.valid)
    {
      this.service.updateUser(this.userId,this.userDatas.value).subscribe({
        next:(res)=>{
          this.router.navigate(['Home'])
        },
        error:(res)=>{
          this.errorMessage = res.error;
        }
      })
    }
  }
}
