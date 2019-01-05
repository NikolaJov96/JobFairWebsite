import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { checkPassword } from '../guest-utils';
import { Router } from '@angular/router';
import { CompanyStatusService } from '../../company/company-status.service';
import { GuestStatusService } from '../guest-status.service';
import { StudentStatusService } from '../../student/student-status.service';

@Component({
  selector: 'app-guest-login',
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.css']
})
export class GuestLoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [checkPassword()]),
  });

  message = 'Log into you account!';

  constructor(private router: Router,
    private guestStatusService: GuestStatusService,
    private companySetatusService: CompanyStatusService,
    private studentStatusService: StudentStatusService) { }

  ngOnInit() { }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.guestStatusService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (status => {
        switch (status[0]) {
          case 'student': this.router.navigate(['/student/cv']); break;
          case 'company': this.router.navigate(['/company/new-concourse']); break;
          case 'admin': this.router.navigate(['/admin/manage-fair']); break;
          default: this.message = 'Error: ' + status[1]; break;
        }
      })
    );
  }

}
