import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompanyStatusService } from '../company-status.service';
import { Router } from '@angular/router';
import { copyStyles } from '@angular/animations/browser/src/util';

interface DialogData {
  package: string;
  add: Array<string>;
  price: string;
}

enum FairAppState { UNKNOWN, NO_FAIR, NOT_APPLIED, WAITING_FOR_RESPONSE, DENIED, ACCEPTED, APPLICATIONS_CLOSED }

@Component({
  selector: 'app-company-fiar-application',
  templateUrl: './company-fiar-application.component.html',
  styleUrls: ['./company-fiar-application.component.css']
})
export class CompanyFiarApplicationComponent implements OnInit {

  applyForm = new FormGroup({
    package: new FormControl('', [Validators.required]),
    options: new FormArray([]),
  });

  appStates = FairAppState;

  packages: Array<{ value: number, name: string, desc: string, }> = null;
  options: Array<{ name: string, selected: boolean, }> = null;
  fariAppState: FairAppState = FairAppState.UNKNOWN;

  fair = null;
  deadlines = null;
  statusMessage = '';

  constructor(private dialog: MatDialog,
    private companyStatusService: CompanyStatusService,
    private router: Router) { }

  ngOnInit() {
    if (this.companyStatusService.getCom() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
    this.companyStatusService.getFair().subscribe(
      (fair => {
        this.fair = fair;
        if (fair == null) {
          this.fariAppState = FairAppState.NO_FAIR;
        } else {
          fair.Additional.forEach((add) => {
            (<FormArray>this.applyForm.controls.options).push(
              new FormControl()
            );
          });
          this.fariAppState = FairAppState.NOT_APPLIED;
          fair.appliedCompanies.forEach(apl => {
            if (String(apl.company._id) === String(this.companyStatusService.getCom()._id)) {
              if (apl.accepted === true) {
                this.fariAppState = FairAppState.ACCEPTED;
                this.statusMessage = 'Assigned stand: ' + apl.stand;
              } else if (apl.rejected === true) {
                this.fariAppState = FairAppState.DENIED;
                this.statusMessage = 'Explanation: ' + apl.comment;
              } else {
                this.fariAppState = FairAppState.WAITING_FOR_RESPONSE;
              }
            }
          });
          if (this.deadlines != null) {
            this.checkDeadlines();
          }
        }
      })
    );
    this.companyStatusService.getDeadlineDates().subscribe(
      deadlines => {
        this.deadlines = deadlines;
        if (this.fair != null && deadlines != null) {
          this.checkDeadlines();
        }
      }
    );
  }

  checkDeadlines() {
    const now = new Date();
    if (now < new Date(this.deadlines.companyStart) || now > new Date(this.deadlines.companyEnd)) {
      this.fariAppState = FairAppState.APPLICATIONS_CLOSED;
    }
  }

  onApply() {
    let price = this.fair.Packages[this.applyForm.value['package']].Price;
    const dialogData = {
      package: this.fair.Packages[this.applyForm.value['package']].Title,
      add: [],
      price: 0,
    };
    this.applyForm.value['options'].forEach((opt, i) => {
      if (opt) {
        price += this.fair.Additional[i].Price;
        dialogData.add.push(this.fair.Additional[i].Title);
      }
    });
    dialogData.price = price;
    this.companyStatusService.apply(this.applyForm.value).subscribe(
      status => {
        if (status[0] === 'success') {
          this.fair = status[1];
          this.fariAppState = FairAppState.WAITING_FOR_RESPONSE;
        }
      }
    );
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: dialogData,
    });
  }

}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `
    <p>{{ data.package }}</p>
    <p>
      <span *ngFor="let add of data.add">
        {{ add }}<br>
      </span>
    </p>
    <h1 mat-dialog-title>Application price is {{ data.price }}din</h1>
    <div mat-dialog-actions>
      <button mat-button cdkFocusInitial (click)="onCLose()">Ok</button>
    </div>
  `,
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onCLose(): void {
      this.dialogRef.close();
    }

}
