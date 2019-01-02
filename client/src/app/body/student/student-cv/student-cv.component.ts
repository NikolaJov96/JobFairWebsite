import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    work: new FormGroup({
      fromDay: new FormControl(''),
      fromMonth: new FormControl(''),
      fromYear: new FormControl(''),
      toDay: new FormControl(''),
      toMonth: new FormControl(''),
      toYear: new FormControl(''),
      position: new FormControl(''),
      employer: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      description: new FormControl(''),
    }),
    education: new FormGroup({
      fromDay: new FormControl(''),
      fromMonth: new FormControl(''),
      fromYear: new FormControl(''),
      toDay: new FormControl(''),
      toMonth: new FormControl(''),
      toYear: new FormControl(''),
      qualificaton: new FormControl(''),
      school: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      description: new FormControl(''),
    }),
    motherTonque: new FormControl('', [Validators.required]),
    foreignTonque: new FormControl(''),
    communicationSkills: new FormControl(''),
    organisationalSkills: new FormControl(''),
    jobRelatedSkills: new FormControl(''),
    digitalSkills: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
    // preload phone number and email
    // preload saved data
  }

  onSaveCV() {

  }

}
