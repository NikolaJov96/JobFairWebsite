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
    foreignTonques: new FormArray([]
      // new FormControl(''),
    ),
    communicationSkills: new FormControl(''),
    organisationalSkills: new FormControl(''),
    jobRelatedSkills: new FormControl(''),
    digitalSkills: new FormControl(''),
  });

  constructor(private studentStatusService: StudentStatusService,
    private router: Router) { }

  ngOnInit() {
    if (this.studentStatusService.getStudent() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
    // preload phone number and email
    // preload saved data
  }

  onSaveCV() {

  }

  addWork() {
    (<FormArray>this.cvForm.controls.work).push(
      new FormGroup({
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
        position: new FormControl(''),
        employer: new FormControl(''),
        city: new FormControl(''),
        country: new FormControl(''),
        description: new FormControl(''),
      })
    );
  }

  removeWork(id: number) {

  }

  addEducation() {
    (<FormArray>this.cvForm.controls.education).push(
      new FormGroup({
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
        qualificaton: new FormControl(''),
        school: new FormControl(''),
        city: new FormControl(''),
        country: new FormControl(''),
        description: new FormControl(''),
      })
    );
  }

  removeEducation(id: number) {

  }

  addLang() {

  }

  removeLang(id: number) {
    (<FormArray>this.cvForm.controls.education).push(
      new FormControl('')
    );
  }

}
