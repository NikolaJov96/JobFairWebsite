import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AdminStatusService } from '../admin-status.service';
import { Router } from '@angular/router';
import { checkImage } from '../../image.validator';

interface FirstStepInterface {
  Fairs: Array<{
    Fair: string;
    StartDate: Date;
    EndDate: Date;
    StartTime: string;
    EndTime: string;
    Place: string;
    About: string;
  }>;
  Locations: Array<{
    Place: string;
    Location: Array<{
      Name: string;
    }>;
  }>;
}

interface ThirdStepInterface  {
  Packages: Array<{
    Title: string,
    Content: Array<string>,
    VideoPromotion: number,
    NoLessons: number,
    NoWorkchops: number,
    NoPresentation: number,
    Price: number,
    MaxCompanies: string,
  }>;
  Additional: Array<{
    Title: string,
    Price: number,
  }>;
}

@Component({
  selector: 'app-admin-manage-fair',
  templateUrl: './admin-manage-fair.component.html',
  styleUrls: ['./admin-manage-fair.component.css']
})
export class AdminManageFairComponent implements OnInit {

  dateForm = new FormGroup({
    studentStart: new FormControl('', [Validators.required]),
    studentEnd: new FormControl('', [Validators.required]),
    companyStart: new FormControl('', [Validators.required]),
    companyEnd: new FormControl('', [Validators.required]),
  });

  imagesForm = new FormGroup({
    logo: new FormControl(null, { validators: [], asyncValidators: [checkImage] }),
    additional: new FormArray([]),
  });

  firstStepValid = true;
  firstStep: FirstStepInterface = null;

  logoImage = null;
  additionalImages = [];

  thirdStepValid = true;
  thirdStep: ThirdStepInterface = null;

  appliedComs: Array<{
    name: string;
    package: string;
    options: Array<string>;
  }> = null;

  deadlineUpdateMessage = '';
  openedForm = -1;
  fair = null;

  constructor(private router: Router,
    private adminStatusService: AdminStatusService) { }

  ngOnInit() {
    if (this.adminStatusService.getAdmin() == null) {
      this.router.navigate(['/guest/login']);
      return;
    }
    this.adminStatusService.getFair().subscribe(
      (status => {
        this.fair = status;
      })
    );
    this.adminStatusService.getDeadlineDates().subscribe(
      (status => {
        this.dateForm.patchValue(status);
      })
    );
  }

  confirmInit() {

  }

  onAcceptCom(i: number, stand: number) {
    // jump to place assignment
  }

  onRejectCom(i: number) {

  }

  onDatesChange() {
    this.adminStatusService.updateDeadlines(this.dateForm.value).subscribe(
      status => {
        if (status === 'success') {
          this.deadlineUpdateMessage = 'deadlines updated';
          setTimeout(() => this.deadlineUpdateMessage = '', 4000);
        }
      }
    );
  }

  onFirstJson(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();
    this.firstStep = null;
    fileReader.addEventListener('loadend', () => {
      const text = (fileReader.result as string);
      try {
        this.firstStep = JSON.parse(text);
        const err: Error = { name: 'bad json', message: '' };
        if (this.firstStep.Fairs == null) { throw err; }
        this.firstStep.Fairs.forEach(Fair => {
          if (Fair.Fair == null) { throw err; }
          if (Fair.StartDate == null) { throw err; }
          if (Fair.EndDate == null) { throw err; }
          if (Fair.StartTime == null) { throw err; }
          if (Fair.EndTime == null) { throw err; }
          if (Fair.Place == null) { throw err; }
          if (Fair.About == null) { throw err; }
        });
        if (this.firstStep.Locations == null) { throw err; }
        this.firstStep.Locations.forEach(Location => {
          if (Location.Place == null) { throw err; }
          if (Location.Location == null) { throw err; }
          Location['Location'].forEach(Loc => {
            if (Loc.Name == null) { throw err; }
          });
        });
        this.firstStepValid = true;
      } catch (err) {
        this.firstStepValid = false;
        this.firstStep = null;
      }
    });
    fileReader.readAsText(file);
  }

  onLogoPick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imagesForm.patchValue({logo: file});
    this.imagesForm.get('logo').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.logoImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onAdditionalPick(event: Event, id: number) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imagesForm.controls['additional'].value[id] = file;
    this.imagesForm.controls['additional']['controls'][id].updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.additionalImages[id] = reader.result;
    };
    reader.readAsDataURL(file);
  }

  addImage() {
    (<FormArray>this.imagesForm.controls.additional).push(
        new FormControl('', { validators: [Validators.required], asyncValidators: [checkImage] })
    );
    this.additionalImages.push(null);
  }

  removeImage(id: number) {
    (<FormArray>this.imagesForm.controls.additional).removeAt(id);
    this.additionalImages.splice(id, 1);
  }

  onSecondJson() {
    const file = (event.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();
    this.thirdStep = null;
    fileReader.addEventListener('loadend', () => {
      const text = (fileReader.result as string);
      try {
        this.thirdStep = JSON.parse(text);
        const err: Error = { name: 'bad json', message: '' };
        if (this.thirdStep.Packages == null) { throw err; }
        this.thirdStep.Packages.forEach(Package => {
          if (Package.Title == null) { throw err; }
          if (Package.Content == null) { throw err; }
          if (Package.VideoPromotion == null) { throw err; }
          if (Package.NoLessons == null) { throw err; }
          if (Package.NoWorkchops == null) { throw err; }
          if (Package.Price == null) { throw err; }
          if (Package.MaxCompanies == null) { throw err; }
        });
        if (this.thirdStep.Additional == null) { throw err; }
        this.thirdStep.Additional.forEach(Location => {
          if (Location.Title == null) { throw err; }
          if (Location.Price == null) { throw err; }
        });
        this.thirdStepValid = true;
      } catch (err) {
        this.thirdStepValid = false;
        this.thirdStep = null;
      }
    });
    fileReader.readAsText(file);
  }

  toAcceptDummy() {
    this.appliedComs = [
      { name: 'asd', package: '1a', options: [ 'dfg', 'sdf' ] },
      { name: 'qwe', package: '2a', options: [ 'dfg', 'hjkl' ] },
      { name: 'azxc', package: '1b', options: [ 'hjkl', 'sdf' ] },
    ];
  }

}
