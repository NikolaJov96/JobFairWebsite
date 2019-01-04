import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ConcourseConc, CompanyStatusService } from '../company-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-conclude',
  templateUrl: './company-conclude.component.html',
  styleUrls: ['./company-conclude.component.css']
})
export class CompanyConcludeComponent implements OnInit {

  concludeForm: FormGroup = null;

  con: ConcourseConc = null;

  constructor(private companyStatusService: CompanyStatusService,
    private router: Router) { }

  ngOnInit() {
    this.con = this.companyStatusService.getSelectedCon();
    if (this.con == null) {
      this.router.navigate(['company/new-concourse']);
      return;
    }
    const temp = new FormGroup ({
      applicants: new FormArray([]),
    });
    const cont = <FormArray>temp.controls['applicants'];
    this.con.applicants.forEach(apl => {
      cont.push(new FormControl());
    });
    this.concludeForm = temp;
  }

  onConclude() {

  }

}
