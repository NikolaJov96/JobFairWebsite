import { Component, OnInit } from '@angular/core';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { StudentStatusService } from '../student-status.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ConcourseEntity, JobType, CompanyConcoursesEntity } from 'src/app/interfaces';
import { checkPDF } from '../../pdf.validator';

@Component({
  selector: 'app-student-concourse',
  templateUrl: './student-concourse.component.html',
  styleUrls: ['./student-concourse.component.css']
})
export class StudentConcourseComponent implements OnInit {

  applyForm = new FormGroup({
    coverLetterPdf: new FormControl(),
    coverLetterText: new FormControl(),
    pdf: new FormControl(null, { validators: [], asyncValidators: [] }),
  });

  com: CompanyConcoursesEntity;
  con: ConcourseEntity;
  jobTypes: Array<JobType> = [];
  message = {
    color: 'black',
    text: 'Apply to this concourse!',
  };
  letterPDF = null;

  constructor(
    private navProviderService: NavProviderService,
    private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    if (this.studentStatusService.getStudent() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
    this.navProviderService.getJobTypes().subscribe(
      (status => {
        this.jobTypes = status;
      })
    );
    this.com = this.studentStatusService.getCom();
    this.con = this.studentStatusService.getCon();
    if (this.con === null) {
      this.router.navigate(['/student/overview']);
    }
  }

  onApply() {
    if (this.applyForm.invalid) {
      this.message = { color: 'red', text: 'invalid apply form' };
      return;
    }
    this.studentStatusService.apply(this.applyForm.value).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.router.navigate(['student/overview-coms']);
        } else if (status[0] === 'error') {
          this.message = { color: 'red', text: status[1] };
        } else {
          this.message = { color: 'balck', text: status[1] };
        }
      })
    );
  }

  onLetterUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.applyForm.patchValue({ pdf: file });
    this.applyForm.get('pdf').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.letterPDF = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onBack() {
    this.studentStatusService.setComToExpand(
      this.studentStatusService.getCom()
    );
    this.router.navigate(['student/overview-coms']);
  }

  getJobType(id) {
    let name = '';
    this.jobTypes.forEach(jt => {
      if (jt._id === id) {
        name = jt.name;
      }
    });
    return name;
  }

}
