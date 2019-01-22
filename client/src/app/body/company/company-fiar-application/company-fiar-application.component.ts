import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompanyStatusService } from '../company-status.service';
import { Router } from '@angular/router';

interface DialogData {
  price: string;
}

enum FairAppState { UNKNOWN, NO_FAIR, NOT_APPLIED, WAITING_FOR_RESPONSE, DENIED, ACCEPTED }

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
        console.log(fair);
        if (fair == null) {
          this.fariAppState = FairAppState.NO_FAIR;
        } else {
          fair.Additional.forEach((add) => {
            (<FormArray>this.applyForm.controls.options).push(
              new FormControl()
            );
          });
        }
        // this.fariAppState = FairAppState.ACCEPTED;
      })
    );
  }

  onApply() {
    let price = this.fair.Packages[this.applyForm.value['package']].Price;
    this.applyForm.value['options'].forEach((opt, i) => {
      if (opt) { price += this.fair.Additional[i].Price; }
    });
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { price: price }
    });
  }

  ckangeFiarState() {
    switch (this.fariAppState) {
      case FairAppState.ACCEPTED:
        this.fariAppState = FairAppState.DENIED;
        break;
      case FairAppState.DENIED:
        this.fariAppState = FairAppState.NOT_APPLIED;
        break;
      case FairAppState.NOT_APPLIED:
        this.fariAppState = FairAppState.UNKNOWN;
        break;
      case FairAppState.UNKNOWN:
        this.fariAppState = FairAppState.WAITING_FOR_RESPONSE;
        break;
      case FairAppState.WAITING_FOR_RESPONSE:
        this.fariAppState = FairAppState.ACCEPTED;
        break;
    }
  }

}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Application price is &#36;{{ data.price }}din</h1>
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
