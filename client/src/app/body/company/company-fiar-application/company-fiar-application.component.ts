import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DialogData {
  price: string;
}

enum FairAppState { UNKNOWN, NOT_APPLIED, WAITING_FOR_RESPONSE, DENIED, ACCEPTED }

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

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.packages = [
      { value: 0, name: 'p1', desc: 'd1' },
      { value: 1, name: 'p2', desc: 'd2' },
      { value: 2, name: 'p3', desc: 'd3' },
    ];
    this.options = [
      { name: 'o1', selected: false, },
      { name: 'o2', selected: false, },
    ];
    const opts = <FormArray>this.applyForm.controls['options'];
    this.options.forEach(() => {
      opts.push(new FormControl());
    });
  }

  onApply() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { price: '1234653' }
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
    <h1 mat-dialog-title>Application price is &#36;{{ data.price }}</h1>
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
