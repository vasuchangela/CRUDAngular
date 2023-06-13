import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userservice';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  errorMessage: any[] = [];
  userId: any;
  label: any;
  userDatas:FormGroup | any;
  constructor(private route: ActivatedRoute, private service: UserService, private router: Router, private _snackBar: MatSnackBar,private fb :FormBuilder) {}

  ngOnInit() {
    this.initForm();

    this.route.paramMap.subscribe({
      next: (params: any) => {
        const id = params.get('id');
        if (id == null) {
          this.userId = 'a';
        }
        else {
          this.userId = id;
        }
        if (id) {
          this.service.getUserDetail(id).subscribe((res: any) => {
            this.userDatas.patchValue({
              id: res.id,
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
              phone: res.phone,
              streetAddress: res.streetAddress,
              city: res.city,
              state: res.state,
              userName: res.userName,
              password: res.password
            });
          })
        }
      }
    })
  }
  initForm(){
    this.userDatas = this.fb.group({
      "id": [""],
      "firstName": ["",Validators.required],
      "lastName": ["",Validators.required],
      "email": ["",[Validators.required , Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      "phone": ["",[Validators.required , Validators.pattern("[0-9]*")]],
      "streetAddress": ["",Validators.required],
      "city": [""],
      "state": [""],
      "userName": ["",Validators.required],
      "password": ["",Validators.required]
    })
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  errorMessageEmpty()
  {
    this.errorMessage = [];
  }

  saveUserDetail() {
    if (this.userDatas.valid) {
      if (this.userId == "a") {
        this.userDatas.value.id = "0";
        this.service.addUserData(this.userDatas.value).subscribe({
          next: (res: any) => {
            this.router.navigate(['Home']);
            this.openSnackBar("Data saved successfully", "Done");
          },
          error: (res: any) => {
            if (res.error.errors) {
              this.errorMessage = [];
              for (let value of Object.values(res['error']['errors'])) {
                this.errorMessage = this.errorMessage.concat(value);
              }
            }
            else
            {
              this.errorMessage = [];
              this.errorMessage.push(res.error);
            }
          }
        })
      }
      else {
        this.service.updateUser(this.userId, this.userDatas.value).subscribe({
          next: (res: any) => {
            this.openSnackBar("Data updated successfully", "Done");
            this.router.navigate(['Home']);
          },
          error: (res: any) => {
            if (res.error.errors) {
              this.errorMessage = [];
              for (let value of Object.values(res['error']['errors'])) {
                this.errorMessage = this.errorMessage.concat(value);
              }
            }
            else
            {
              this.errorMessage = [];
              this.errorMessage.push(res.error);
            }
          }
        })
      }
    }
  }
}
