import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { checkPassword } from '../guest-utils';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() { }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    console.log('Logging in', username, ',', password);

    this.router.navigate(['/student/cv']);
  }

}
