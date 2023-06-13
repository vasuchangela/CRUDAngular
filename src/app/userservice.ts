import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  allData:any;
  filteredData:any;
  apiUrl: string = environment.baseApiUrl;
  users: string = environment.users;
  
  constructor(private http : HttpClient) { }

  getAllUserData(data:any,size:any,searchText:any,sortId:any)
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pg",data);
    queryParams = queryParams.append("pageSize",size);
    queryParams = queryParams.append("searchText",searchText);
    queryParams = queryParams.append("sortId",sortId);
    return this.http.get(this.apiUrl + this.users ,{params:queryParams});
  }

  addUserData(userDetails:any)
  {
    return this.http.post(this.apiUrl + this.users,userDetails);
  }


  getUserDetail(id:number)
  {
    return this.http.get(this.apiUrl + this.users + id);
  }

  updateUser(id:number,updatedData:any)
  {
    return this.http.put(this.apiUrl + this.users +id,updatedData)
  }

  deleteUser(id:number)
  {
    return this.http.delete(this.apiUrl + this.users + id);
  }
}
