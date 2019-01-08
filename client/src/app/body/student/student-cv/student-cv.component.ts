import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { StudentStatusService } from '../student-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-cv',
  templateUrl: './student-cv.component.html',
  styleUrls: ['./student-cv.component.css']
})
export class StudentCvComponent implements OnInit {

  cvForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    website: new FormControl(''),
    applicationType: new FormControl('', [Validators.required]),
    work: new FormArray([]),
    education: new FormArray([]),
    motherTonque: new FormControl('', [Validators.required]),
    foreignTonques: new FormArray([]),
    communicationSkills: new FormControl(''),
    organisationalSkills: new FormControl(''),
    jobRelatedSkills: new FormControl(''),
    digitalSkills: new FormControl(''),
  });

  defaultMessage = {
    color: 'black',
    text: 'Fill out your CV!',
  };
  message = this.defaultMessage;

  constructor(private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    if (this.studentStatusService.getStudent() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
    const me = this.studentStatusService.getStudent();
    if (me.stu.cvUploaded) {
      const newForm = new FormGroup({
        firstName: new FormControl(me.stu.cv.firstName, [Validators.required]),
        lastName: new FormControl(me.stu.cv.lastName, [Validators.required]),
        address: new FormControl(me.stu.cv.address, [Validators.required]),
        postalCode: new FormControl(me.stu.cv.postalCode, [Validators.required]),
        city: new FormControl(me.stu.cv.city, [Validators.required]),
        country: new FormControl(me.stu.cv.country, [Validators.required]),
        phone: new FormControl(me.stu.cv.phone, [Validators.required]),
        email: new FormControl(me.stu.cv.email, [Validators.required]),
        website: new FormControl(me.stu.cv.website),
        applicationType: new FormControl(me.stu.cv.applicationType, [Validators.required]),
        work: new FormArray([]),
        education: new FormArray([]),
        motherTonque: new FormControl(me.stu.cv.motherTonque, [Validators.required]),
        foreignTonques: new FormArray([]),
        communicationSkills: new FormControl(me.stu.cv.communicationSkills),
        organisationalSkills: new FormControl(me.stu.cv.organisationalSkills),
        jobRelatedSkills: new FormControl(me.stu.cv.jobRelatedSkills),
        digitalSkills: new FormControl(me.stu.cv.digitalSkills),
      });
      for (const wrk of me.stu.cv.work) {
        (<FormArray>newForm.controls.work).push(
          new FormGroup({
            fromDate: new FormControl(wrk.fromDate, [Validators.required]),
            toDate: new FormControl(wrk.toDate),
            position: new FormControl(wrk.position, [Validators.required]),
            employer: new FormControl(wrk.employer, [Validators.required]),
            city: new FormControl(wrk.city, [Validators.required]),
            country: new FormControl(wrk.country, [Validators.required]),
            description: new FormControl(wrk.description),
          })
        );
      }
      for (const edu of me.stu.cv.education) {
        (<FormArray>newForm.controls.education).push(
          new FormGroup({
            fromDate: new FormControl(edu.fromDate, [Validators.required]),
            toDate: new FormControl(edu.toDate),
            qualificaton: new FormControl(edu.qualificaton, [Validators.required]),
            school: new FormControl(edu.school, [Validators.required]),
            city: new FormControl(edu.city, [Validators.required]),
            country: new FormControl(edu.country, [Validators.required]),
            description: new FormControl(edu.description),
          })
        );
      }
      for (const tonque of me.stu.cv.foreignTonques) {
        (<FormArray>newForm.controls.foreignTonques).push(new FormControl(tonque));
      }
      this.cvForm = newForm;
    }
  }

  onSaveCV() {
    this.studentStatusService.saveCV(this.cvForm.value).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.message = { color: 'green', text: 'CV saved' };
        } else {
          this.message = { color: 'red', text: 'Error: ' + status[1] };
        }
        setTimeout(() => this.message = this.defaultMessage, 5000);
        window.scrollTo(0, 0);
      })
    );
  }

  addWork() {
    (<FormArray>this.cvForm.controls.work).push(
      new FormGroup({
        fromDate: new FormControl('', [Validators.required]),
        toDate: new FormControl(''),
        position: new FormControl('', [Validators.required]),
        employer: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        description: new FormControl(''),
      })
    );
  }

  removeWork(id: number) {
    (<FormArray>this.cvForm.controls.work).removeAt(id);
  }

  addEducation() {
    (<FormArray>this.cvForm.controls.education).push(
      new FormGroup({
        fromDate: new FormControl('', [Validators.required]),
        toDate: new FormControl(''),
        qualificaton: new FormControl('', [Validators.required]),
        school: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        description: new FormControl(''),
      })
    );
  }

  removeEducation(id: number) {
    (<FormArray>this.cvForm.controls.education).removeAt(id);
  }

  addLang() {
    (<FormArray>this.cvForm.controls.foreignTonques).push(
      new FormControl('', [Validators.required])
    );
  }

  removeLang(id: number) {
    (<FormArray>this.cvForm.controls.foreignTonques).removeAt(id);
  }

}
