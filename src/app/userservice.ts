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
  
  constructor(private http : HttpClient) { }

  getAllUserData(data:any,size:any,searchText:any)
  {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pg",data);
    queryParams = queryParams.append("pageSize",size);
    queryParams = queryParams.append("searchText",searchText);
    return this.http.get(this.apiUrl,{params:queryParams});
  }

  addUserData(userDetails:any)
  {
    return this.http.post(this.apiUrl,userDetails);
  }


  getUserDetail(id:number)
  {
    return this.http.get(this.apiUrl+id);
  }

  updateUser(id:number,updatedData:any)
  {
    return this.http.put(this.apiUrl+id,updatedData)
  }

  deleteUser(id:number)
  {
    return this.http.delete(this.apiUrl+id);
  }
}
