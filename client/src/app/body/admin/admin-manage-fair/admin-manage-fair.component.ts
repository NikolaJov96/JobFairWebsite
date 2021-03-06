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
    logo: new FormControl(null, { validators: [Validators.required], asyncValidators: [checkImage] }),
    additional: new FormArray([]),
    timetable: new FormArray([]),
  });

  firstStepValid = true;
  firstStep: FirstStepInterface = null;

  logoImage = null;
  additionalImages = [];

  thirdStepValid = true;
  thirdStep: ThirdStepInterface = null;
  confirmMessage = '';

  deadlineUpdateMessage = '';
  openedFormAcc = -1;
  openedFormRej = -1;
  fair = null;
  selectedStand = -1;

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
    if (this.firstStep == null) {
      this.confirmMessage = 'invalid first step';
      setTimeout(() => this.confirmMessage = '', 4000);
      return;
    }
    if (this.imagesForm.invalid) {
      this.confirmMessage = 'invalid second step';
      setTimeout(() => this.confirmMessage = '', 4000);
      return;
    }
    if (this.thirdStep == null) {
      this.confirmMessage = 'invalid third step';
      setTimeout(() => this.confirmMessage = '', 4000);
      return;
    }
    const data = {
      Fairs: this.firstStep.Fairs,
      Locations: this.firstStep.Locations,
      Packages: this.thirdStep.Packages,
      Additional: this.thirdStep.Additional,
      images: this.imagesForm.value,
    };
    this.adminStatusService.newFair(data).subscribe(
      status => {
        if (status[0] === 'success') { this.fair = status[1]; }
      }
    );
  }

  onAcceptCom(apl: any) {
    if (this.selectedStand < 0) {
      return;
    }
    this.adminStatusService.acceptCom(this.fair, apl, this.selectedStand).subscribe(
      status => {
        if (status === 'success') {
          this.openedFormAcc = -1;
          apl.accepted = true;
          apl.stand = this.selectedStand;
        }
      }
    );
  }

  onRejectCom(apl: any, comment: string) {
    this.adminStatusService.rejectCom(this.fair, apl, comment).subscribe(
      status => {
        if (status === 'success') {
          this.openedFormRej = -1;
          apl.rejected = true;
        }
      }
    );
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
    this.imagesForm.controls['additional']['controls'][id].patchValue(file);
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

  addEvent() {
    (<FormArray>this.imagesForm.controls.timetable).push(
      new FormGroup({
        date: new FormControl('', [Validators.required]),
        hour: new FormControl('10', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        place: new FormControl('', [Validators.required]),
      })
    );
  }

  removeEvent(id: number) {
    (<FormArray>this.imagesForm.controls.education).removeAt(id);
  }

  accRejToggled() {
    this.selectedStand = -1;
    setTimeout(
      () => {
        const imgs = document.getElementsByClassName('img');
        for (let i = 0; i < imgs.length; i++) {
          this.reloadDrawing(imgs[i]);
        }
      }, 50);
  }

  imgClicked(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (x > 1 && x < 39 && y > 40) {
      const temp = (y - 40) % 40;
      if (temp === 0 || temp === 39) { return; }
      this.selectedStand = Math.floor((y - 40) / 40);
    } else if (x > 160 && x < 200 && y > 40) {
      const temp = (y - 40) % 40;
      if (temp === 0 || temp === 39) { return; }
      this.selectedStand = Math.floor((y - 40) / 40 + 4);
    } else if (y > 1 && y < 40 && x > 40 && x < 160) {
      const temp = (x - 40) % 40;
      if (temp === 0 || temp === 39) { return; }
      this.selectedStand = Math.floor((x - 40) / 40 + 8);
    } else {
      this.selectedStand = -1;
    }
    let valid = true;
    this.fair.appliedCompanies.forEach(apl => {
      if (apl.stand === this.selectedStand) {
        valid = false;
      }
    });
    if (!valid) {
      this.selectedStand = -1;
    } else {
      this.reloadDrawing(event.target);
    }
  }

  reloadDrawing(canvas) {
    const context = canvas.getContext('2d');
    const source = new Image();
    source.onload = () => {
      context.drawImage(source, 0, 0);
      this.fair.appliedCompanies.forEach(apl => {
        if (apl.accepted) {
          let x = 0;
          let y = 0;
          if (apl.stand < 4) {
            x = 3;
            y = 40 + 40 * apl.stand + 3;
          } else if (apl.stand < 8) {
            x = 163;
            y = 40 + 40 * (apl.stand - 4) + 3;
          } else {
            x = 40 + 40 * (apl.stand - 8) + 3;
            y = 3;
          }
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + 34, y + 34);
          context.strokeStyle = '#0000FF';
          context.lineWidth = 2;
          context.stroke();
          context.beginPath();
          context.moveTo(x + 34, y);
          context.lineTo(x, y + 34);
          context.strokeStyle = '#0000FF';
          context.lineWidth = 2;
          context.stroke();
        }
      });
      if (this.selectedStand >= 0) {
        let x = 0;
        let y = 0;
        if (this.selectedStand < 4) {
          x = 3;
          y = 40 + 40 * this.selectedStand + 3;
        } else if (this.selectedStand < 8) {
          x = 163;
          y = 40 + 40 * (this.selectedStand - 4) + 3;
        } else {
          x = 40 + 40 * (this.selectedStand - 8) + 3;
          y = 3;
        }
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 34, y + 34);
        context.strokeStyle = '#00FF00';
        context.lineWidth = 2;
        context.stroke();
        context.beginPath();
        context.moveTo(x + 34, y);
        context.lineTo(x, y + 34);
        context.strokeStyle = '#00FF00';
        context.lineWidth = 2;
        context.stroke();
      }
    };
    source.src = './assets/stands.jpg';
  }

}
