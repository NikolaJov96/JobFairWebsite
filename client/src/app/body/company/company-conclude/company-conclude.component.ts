import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { CompanyStatusService } from '../company-status.service';
import { Router } from '@angular/router';
import { ConcourseUsersEntity } from 'src/app/interfaces';

@Component({
  selector: 'app-company-conclude',
  templateUrl: './company-conclude.component.html',
  styleUrls: ['./company-conclude.component.css']
})
export class CompanyConcludeComponent implements OnInit {

  concludeForm: FormGroup = new FormGroup ({
    applicants: new FormArray([]),
  });

  con: ConcourseUsersEntity = null;
  message = {
    color: 'back',
    text: 'Conclude this concourse, chose accepted students!',
  };

  constructor(private companyStatusService: CompanyStatusService,
    private router: Router) { }

  ngOnInit() {
    if (this.companyStatusService.getCom() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
    this.companyStatusService.getCon().subscribe(
      (status => {
        this.con = status;
        if (this.con == null) {
          this.router.navigate(['/company/new-concourse']);
          return;
        }
        const cont = <FormArray>this.concludeForm.controls['applicants'];
        this.con.applicants.forEach(apl => {
          cont.push(new FormControl());
        });
      })
    );
  }

  onConclude() {
    this.companyStatusService.conclude(this.concludeForm.value.applicants).subscribe(
      (status => {
        if (status[0] === 'success') {
          this.router.navigate(['/company/new-concourse']);
        } else {
          this.message = { color: 'red', text: status[1] };
        }
      })
    );
  }

}
