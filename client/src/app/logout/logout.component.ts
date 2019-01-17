import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuestStatusService } from '../body/guest/guest-status.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
    private guetStatusService: GuestStatusService) { }

  ngOnInit() {
    this.guetStatusService.logout().subscribe(
      status => {
        this.router.navigate(['/guest/login']);
      }
    );
  }

}
