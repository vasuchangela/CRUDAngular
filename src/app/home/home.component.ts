import { Component, OnInit } from '@angular/core';
import { UserService } from '../userservice';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  user:any[] = []
  searchTxt:string ='';
  page: number = 1;
  tableSize: number = 5 ;
  constructor(private service:UserService,private confirm : NgConfirmService){}

  ngOnInit()
  {
    this.getData()
  }
  
  getData()
  {
    this.service.getAllUserData().subscribe((res:any)=>{
      this.user = res;
    })
  }

  deleteUser(id:number)
  {

    this.confirm.showConfirm("Are you sure want to delete ?",
    ()=>{
      this.service.deleteUser(id).subscribe((res)=>{
        this.getData()
      })
    },
    ()=>{
    }
    )
  }
  tableDataChange(event :any):void{
    this.page = event
    this.getData()
  }
}
