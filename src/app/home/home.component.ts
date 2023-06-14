import { Component, OnInit } from '@angular/core';
import { UserService } from '../userservice';
import { NgConfirmService } from 'ng-confirm-box';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  endPage:any;
  sortid:any = 1;
  showFname:boolean = true;
  showLname:boolean = true;
  showEmail:boolean = true;
  showPhone:boolean = true;
  showCity:boolean = true;
  showState:boolean = true;
  showUserName:boolean = true;
  showAddress:boolean = true;
  constructor(private service:UserService,private confirm : NgConfirmService,private _snackBar: MatSnackBar){}

  ngOnInit()
  {
    this.getData(this.page,this.tableSize,this.searchTxt,this.sortid)
  }
  
  getData(data:number,size:number,search:string,sortId:any)
  {
    if(search != null && search.length > 2 && search != undefined)
    {
      data = 1;
      this.page = 1;
    }
    this.service.getAllUserData(data,size,search,sortId).subscribe((res:any)=>{
      this.user = res.user;
      this.totalEntries = res.totalEntries;
      this.endPage = res.totalPage;
      this.totalPage = Array(res.totalPage).fill(res.totalPage);
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message,action);
  }

  sortData(sortId:any)
  {
    if(this.sortid > 0)
    {
      this.sortid = -(sortId);
    }
    else
    {
      this.sortid = sortId;
    }
    this.getData(this.page,this.tableSize,this.searchTxt,this.sortid)
  }
  deleteUser(id:number)
  {
    this.confirm.showConfirm("Are you sure want to delete ?",
    ()=>{
      this.service.deleteUser(id).subscribe((res:any)=>{
        this.openSnackBar("User is deleted","Done");
        this.getData(this.page,this.tableSize,this.searchTxt,this.sortid);
      })
    },
    ()=>{
    }
    )
  }
  tableDataChange(event :any):void{
    this.page = event;
    this.getData(this.page,this.tableSize,this.searchTxt,this.sortid);
  }

  changeTableSize(data:any)
  {
    this.tableSize = data;
    this.page = 1;
    this.getData(this.page,this.tableSize,this.searchTxt,this.sortid);
  }
  search()
  {
    if(this.searchTxt == "")
    {
      this.searchTxt = null;
      this.getData(this.page,this.tableSize,this.searchTxt,this.sortid);
    }
    else
    {
      this.getData(this.page,this.tableSize,this.searchTxt,this.sortid);
    }
  }

  deleteMultiple(deleteId:any)
  {
    console.log(deleteId)
  }
}
