import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  allData:any;
  filteredData:any;
  apiUrl: string = environment.baseApiUrl;
  
  constructor(private http : HttpClient) { }

  getAllUserData()
  {
    return this.http.get(this.apiUrl)
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
