import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkPassword, passNoMatch } from '../guest-utils';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { Industry } from 'src/app/interfaces';
import { GuestStatusService } from '../guest-status.service';
import { Router } from '@angular/router';

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

  message = {
    color: 'black',
    text: 'Register as a student, company or admin!',
  };

  industries: Array<Industry> = [];

  constructor(private navProviderService: NavProviderService,
    private guestStatusService: GuestStatusService,
    private router: Router) { }

  ngOnInit() {
    this.navProviderService.getIndustries().subscribe(
      (status => {
        this.industries = status;
      })
    );
  }

  onRegisterStudent() {
    if (this.studentForm.invalid) { return; }
    const data = Object.assign({}, this.studentForm.value);
    data.type = 'student';
    this.guestStatusService.register(data).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.router.navigate(['guest/login']);
        } else {
          this.message = { color: 'red', text: status[1] };
        }
      })
    );
  }

  onRegisterCompany() {
    if (this.companyForm.invalid) { return; }
    const data = Object.assign({}, this.companyForm.value);
    data.type = 'company';
    data.industry = this.industries[data.industry].name;
    this.guestStatusService.register(data).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.router.navigate(['guest/login']);
        } else {
          this.message = { color: 'red', text: status[1] };
        }
      })
    );
  }

  onRegisterAdmin() {
    if (this.adminForm.invalid) { return; }
    const data = Object.assign({}, this.adminForm.value);
    data.type = 'admin';
    this.guestStatusService.register(data).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.router.navigate(['guest/login']);
        } else {
          this.message = { color: 'red', text: status[1] };
        }
      })
    );
  }

}
