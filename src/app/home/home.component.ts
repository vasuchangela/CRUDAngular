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
  searchTxt:any;
  page: number = 1;
  tableSize: number = 5 ;
  totalEntries: any;
  totalPage:any;
  selectedSize:any = '5';
  constructor(private service:UserService,private confirm : NgConfirmService){}

  ngOnInit()
  {
    this.getData(this.page,this.tableSize,this.searchTxt)
  }
  
  getData(data:number,size:number,search:string)
  {
    this.service.getAllUserData(data,size,search).subscribe((res:any)=>{
      this.user = res.user;
      this.totalEntries = res.totalEntries
      if(search != undefined && search.length > 1)
      {
        this.page = 1
      }
      this.totalPage = Array(res.totalPage).fill(res.totalPage);
    })
  }

  deleteUser(id:number)
  {
    this.confirm.showConfirm("Are you sure want to delete ?",
    ()=>{
      this.service.deleteUser(id).subscribe((res)=>{
        this.getData(this.page,this.tableSize,this.searchTxt)
      })
    },
    ()=>{
    }
    )
  }
  tableDataChange(event :any):void{
    this.page = event
    this.getData(this.page,this.tableSize,this.searchTxt)
  }

  changeTableSize(data:any)
  {
    this.tableSize = data
    this.page = 1
    this.getData(this.page,this.tableSize,this.searchTxt)
  }
  search()
  {
    if(this.searchTxt == "")
    {
      this.searchTxt = undefined
    }
    this.getData(this.page,this.tableSize,this.searchTxt)
  }
}
