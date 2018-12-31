import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkPassword, passNoMatch } from '../guest-utils';

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

  constructor() { }

  ngOnInit() {
  }

  onResetPass() {
    if (this.resetPassForm.invalid) {
      return;
    }
    const username = this.resetPassForm.value.username;
    const password = this.resetPassForm.value.password;
    const newPass1 = this.resetPassForm.value.newPass1;
    const newPass2 = this.resetPassForm.value.newPass2;
    console.log('Password changed', username, ',', password, ',', newPass1, ',', newPass2);
  }

}
