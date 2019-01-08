import { Component, OnInit } from '@angular/core';
import { ConcourseUsersEntity } from 'src/app/interfaces';

@Component({
  selector: 'app-student-applications',
  templateUrl: './student-applications.component.html',
  styleUrls: ['./student-applications.component.css']
})
export class StudentApplicationsComponent implements OnInit {

  concources: Array<ConcourseUsersEntity> = null;

  accMessage = '';

  constructor() { }

  ngOnInit() {
  }

}
