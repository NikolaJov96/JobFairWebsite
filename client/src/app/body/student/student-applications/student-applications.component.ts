import { Component, OnInit } from '@angular/core';
import { ConcourseUsersEntity, ConcourseEntity } from 'src/app/interfaces';
import { StudentStatusService } from '../student-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-applications',
  templateUrl: './student-applications.component.html',
  styleUrls: ['./student-applications.component.css']
})
export class StudentApplicationsComponent implements OnInit {

  concourses: Array<ConcourseEntity> = null;
  concDetail: ConcourseUsersEntity = null;

  constructor(private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    if (this.studentStatusService.getStudent() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
    this.studentStatusService.getCons().subscribe(
      (status => {
        this.concourses = [];
        status.forEach(con => {
          let contains = false;
          for (let i = 0; i < con.applicants.length; i++) {
            if (con.applicants[i].student === this.studentStatusService.getStudent()._id) {
              contains = true;
              break;
            }
          }
          if (contains) {
            this.concourses.push(con);
          }
        });
      })
    );
  }

  getConDetails(con: ConcourseEntity) {
    this.concDetail = null;
    this.studentStatusService.getConDetails(con._id).subscribe(
      (status => {
        this.concDetail = status;
      })
    );
  }

}
