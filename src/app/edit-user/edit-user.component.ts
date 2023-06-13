import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userservice';
import { FormGroup, FormControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  errorMessage: any[] = [];
  userId: any;
  label: any;

  userDatas = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    streetAddress: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
  })
  ngOnInit() {
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
            this.userDatas.setValue({
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
