import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkPassword, passNoMatch } from '../guest-utils';
import { GuestStatusService } from '../guest-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-reset-pass',
  templateUrl: './guest-reset-pass.component.html',
  styleUrls: ['./guest-reset-pass.component.css']
})
export class GuestResetPassComponent implements OnInit {

  resetPassForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [checkPassword()]),
    newPass1: new FormControl('', [checkPassword()]),
    newPass2: new FormControl('', [checkPassword()]),
  }, [passNoMatch()]);

  message = 'Reset your password!';

  constructor(private guestStatusService: GuestStatusService,
    private router: Router) { }

  ngOnInit() {
  }

  onResetPass() {
    if (this.resetPassForm.invalid) {
      return;
    }

    this.guestStatusService.changePass(
      this.resetPassForm.value.username,
      this.resetPassForm.value.password,
      this.resetPassForm.value.newPass1,
      this.resetPassForm.value.newPass2).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.router.navigate(['/guest/login']);
        } else {
          this.message = status[1];
        }
      })
    );
  }

}
