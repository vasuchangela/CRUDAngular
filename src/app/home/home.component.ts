import { Component, OnInit } from '@angular/core';
import { CRUDTaskServiceService } from '../crudtask-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  user:any[] = []
  searchTxt:string ='';

  constructor(private service:CRUDTaskServiceService, private http : HttpClient){}

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

}
