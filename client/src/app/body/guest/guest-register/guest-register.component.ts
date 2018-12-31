import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkPassword, passNoMatch } from '../guest-utils';

@Component({
  selector: 'app-guest-register',
  templateUrl: './guest-register.component.html',
  styleUrls: ['./guest-register.component.css']
})
export class GuestRegisterComponent implements OnInit {

  studentForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    newPass1: new FormControl('', [checkPassword()]),
    newPass2: new FormControl('', [checkPassword()]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    graduated: new FormControl('', [Validators.required]),
  }, [passNoMatch()]);

  companyForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    newPass1: new FormControl('', [checkPassword()]),
    newPass2: new FormControl('', [checkPassword()]),
    companyName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    director: new FormControl('', [Validators.required]),
    taxNumber: new FormControl('', [Validators.required]),
    employees: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
    industry: new FormControl('', [Validators.required]),
    field: new FormControl('', [Validators.required]),
  }, [passNoMatch()]);

  adminForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    newPass1: new FormControl('', [checkPassword()]),
    newPass2: new FormControl('', [checkPassword()]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  }, [passNoMatch()]);

  constructor() { }

  ngOnInit() {
  }

  onRegisterStudent() {
    if (this.studentForm.invalid) {
      return;
    }
  }

  onRegisterCompany() {
    if (this.companyForm.invalid) {
      return;
    }
  }

  onRegisterAdmin() {
    if (this.adminForm.invalid) {
      return;
    }
  }

  get f1() {
    return this.studentForm.value;
  }

  get f2() {
    return this.companyForm.value;
  }

  get f3() {
    return this.adminForm.value;
  }

}
