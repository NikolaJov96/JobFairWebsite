import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { checkPassword, passNoMatch } from '../guest-utils';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { Industry } from 'src/app/interfaces';
import { GuestStatusService } from '../guest-status.service';
import { Router } from '@angular/router';
import { checkImage } from '../../image.validator';
import { checkImageSize } from '../../image-size.validator.';

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
    graduated: new FormControl('', []),
    image: new FormControl(null, { validators: [Validators.required], asyncValidators: [checkImageSize] }),
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
    image: new FormControl(null, { validators: [Validators.required], asyncValidators: [checkImageSize] }),
  }, [passNoMatch()]);

  adminForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    newPass1: new FormControl('', [checkPassword()]),
    newPass2: new FormControl('', [checkPassword()]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    image: new FormControl(null, { validators: [Validators.required], asyncValidators: [checkImageSize] }),
  }, [passNoMatch()]);

  studentImage = null;
  companyImage = null;
  adminImage = null;

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

  onStudentImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.studentForm.patchValue({image: file});
    this.studentForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.studentImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onCompanyImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.companyForm.patchValue({image: file});
    this.companyForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.companyImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAdminImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.adminForm.patchValue({image: file});
    this.adminForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.adminImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
