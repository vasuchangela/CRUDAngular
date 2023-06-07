import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDTaskServiceService } from '../crudtask-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  constructor(private route :ActivatedRoute,private service:CRUDTaskServiceService,private router : Router){}


  userDatas:any = {
    id:'',
    firstName : '',
    lastName: '',
    email:'',
    phone:'',
    streetAddress:'',
    city:'',
    state:'',
    userName:'',
    password:''
  }
  ngOnInit()
  {
    this.route.paramMap.subscribe({
      next:(params:any)=>{
        const id = params.get('id')

        if(id)
        {
          this.service.getUserDetail(id).subscribe((res:any)=>{
            this.userDatas = res
          })
        }
      }
    })
  }

  updateData()
  {
    this.service.updateUser(this.userDatas.id,this.userDatas).subscribe({
      next:(res)=>{
        this.router.navigate(['Home'])
      },
      error:(res)=>{if(res.error.status == 400)
        {
          alert("Enter required fields")
        }
        else
        {
          alert(res.error)
        }
      }
    })
  }

  deleteUser(id:number)
  {
    this.service.deleteUser(this.userDatas.id).subscribe((res)=>{
      this.router.navigate(['Home'])
    })
  }
}
