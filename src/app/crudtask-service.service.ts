import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CRUDTaskServiceService {
  allData:any;
  filteredData:any;
  
  constructor(private http : HttpClient) { }

  getAllUserData()
  {
    return this.http.get("https://localhost:7266/users")
  }

  addUserData(userDetails:any)
  {
    return this.http.post("https://localhost:7266/users",userDetails);
  }


  getUserDetail(id:number)
  {
    return this.http.get("https://localhost:7266/users/"+id);
  }

  updateUser(id:number,updatedData:any)
  {
    return this.http.put("https://localhost:7266/users/"+id,updatedData)
  }

  deleteUser(id:number)
  {
    return this.http.delete("https://localhost:7266/users/"+id);
  }
}
