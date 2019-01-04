import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-invalid-path',
  templateUrl: './invalid-path.component.html',
  styleUrls: ['./invalid-path.component.css']
})
export class InvalidPathComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/guest/login']);
  }

}
