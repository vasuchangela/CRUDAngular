import { Component } from '@angular/core';
import { CRUDTaskServiceService } from './crudtask-service.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CRUDTaskServiceService]
})
export class AppComponent {

  constructor(){}
}
