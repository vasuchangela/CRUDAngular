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
  constructor(private service:UserService,private confirm : NgConfirmService,private _snackBar: MatSnackBar){}

  ngOnInit()
  {
    this.getData(this.page,this.tableSize,this.searchTxt)
  }
  
  getData(data:number,size:number,search:string)
  {
    this.service.getAllUserData(data,size,search).subscribe((res:any)=>{
      this.user = res.user;
      this.totalEntries = res.totalEntries
      if(search != null && search.length > 1 && search != undefined)
      {
        this.page = 1
      }
      this.totalPage = Array(res.totalPage).fill(res.totalPage);
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message,action);
  }

  deleteUser(id:number)
  {
    this.confirm.showConfirm("Are you sure want to delete ?",
    ()=>{
      this.service.deleteUser(id).subscribe((res)=>{
        this.getData(this.page,this.tableSize,this.searchTxt)
        this.openSnackBar("User is deleted","Done");
      })
    },
    ()=>{
    }
    )
  }
  tableDataChange(event :any):void{
    this.page = event;
    this.getData(this.page,this.tableSize,this.searchTxt);
  }

  changeTableSize(data:any)
  {
    this.tableSize = data;
    this.page = 1;
    this.getData(this.page,this.tableSize,this.searchTxt);
  }
  search()
  {
    if(this.searchTxt == "")
    {
      this.searchTxt = null;
      this.getData(this.page,this.tableSize,this.searchTxt);
    }
    else
    {
      this.getData(this.page,this.tableSize,this.searchTxt);
    }
  }
}
