import { Component, OnInit } from '@angular/core';
import { ConcourseEntity, CompanyEntity } from 'src/app/interfaces';

@Component({
  selector: 'app-student-applications',
  templateUrl: './student-applications.component.html',
  styleUrls: ['./student-applications.component.css']
})
export class StudentApplicationsComponent implements OnInit {

  concources: Array<{
    con: ConcourseEntity;
    com: CompanyEntity;
    status: string;
    acc: string;
    dec: string;
  }> = null;

  constructor() { }

  ngOnInit() {
  }

}
