import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminStatusService } from '../admin-status.service';
import { Router } from '@angular/router';

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

  firstStep: {
    Fairs: Array<{
      Fair: string;
      StartDate: Date;
      EndDate: Date;
      StartTime: string;
      EndTime: string;
      Place: string;
      About: string;
    }>,
    Locations: Array<{
      Place: string;
      Location: Array<{
        Name: string;
      }>
    }>
  } = null;

  thirdStep: {
    Packages: Array<{
      Title: string,
      Content: Array<string>,
      VideoPromotion: number,
      NoLessons: number,
      NoWorkchops: number,
      NoPresentation: number,
      Price: number,
      MaxCompanies: string,
    }>,
    Additional: Array<{
      Title: string,
      Price: number,
    }>,
  } = null;

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

  s1Dummy() {
    this.firstStep = {
      Fairs: [
      {
        Fair: 'JobFair2019',
        StartDate: new Date('01/03/2019'),
        EndDate: new Date('03/03/2019'),
        StartTime: '09:00:00',
        EndTime: '17:00:00',
        Place: 'ETF Beograd',
        About: 'Kreiraj svoju buducnost!'
        }
      ],
      Locations: [
      {
        Place: 'ETF Beograd',
        Location: [
          { Name: 'Amfiteatar 56' },
          { Name: 'Amfiteatar 65' },
          { Name: 'Laboratorija 60' },
          { Name: 'Svecana sala - Arhitektura' },
          { Name: 'Ucionica 310' },
          { Name: 'Ucionica 311' }
        ]
      }
    ]};
  }

  s2Dummy() {

  }

  s3Dummy() {
    this.thirdStep = {
      Packages: [
        {
          Title: 'Generalni pokrovitelj',
          Content: [ 'Stand 4x velicine', 'Logo i 2 strane u boji u brosuri', 'Logo na promo majicama trostruke velicine'],
          VideoPromotion: 15,
          NoLessons: 2,
          NoWorkchops: 1,
          NoPresentation: 0,
          Price: 30000,
          MaxCompanies: '1'
        },
        {
          Title: 'Zlatni pokrovitelj',
          Content: [ 'Stand 3x velicine', 'Logo i 2 strane u boji u brosuri', 'Logo na promo majicama 3x velicine'],
          VideoPromotion: 10,
          NoLessons: 1,
          NoWorkchops: 1,
          NoPresentation: 1,
          Price: 25000,
          MaxCompanies: '1'
        },
        {
          Title: 'Srebrni pokrovitelj',
          Content: [ 'Stand 2x velicine', 'Logo i 2 strane u boji u brosuri', 'Logo na promo majicama 2x velicine'],
          VideoPromotion: 5,
          NoLessons: 1,
          NoWorkchops: 0,
          NoPresentation: 1,
          Price: 20000,
          MaxCompanies: '2'
        },
        {
          Title: 'Bronzani pokrovitelj',
          Content: [ 'Stand 2x velicine', 'Logo i 1 strane u boji u brosuri', 'Logo na promo majicama standardne velicine'],
          VideoPromotion: 3,
          NoLessons: 1,
          NoWorkchops: 0,
          NoPresentation: 0,
          Price: 15000,
          MaxCompanies: '3'
        },
        {
          Title: 'Standardni paket',
          Content: [ 'Stand 1x velicine', 'Logo i osnovne info u brosuri'],
          VideoPromotion: 0,
          NoLessons: 0,
          NoWorkchops: 0,
          NoPresentation: 0,
          Price: 10000,
          MaxCompanies: '-'
        }
      ],
      Additional: [
        {
          Title: 'Flajer u brosuri',
          Price: 4000
        },
        {
          Title: 'Prednja unutrasnja korica brosure',
          Price: 2000
        },
        {
          Title: 'Dodatna strana u boji u brosuri',
          Price: 3000
        },
        {
          Title: 'Doplata za brendiranje standa',
          Price: 5000
        },
        {
          Title: 'Dodatna rezentacija kompanije u trajanju 45min',
          Price: 10000
        }
      ]
    };
  }

  toAcceptDummy() {
    this.appliedComs = [
      { name: 'asd', package: '1a', options: [ 'dfg', 'sdf' ] },
      { name: 'qwe', package: '2a', options: [ 'dfg', 'hjkl' ] },
      { name: 'azxc', package: '1b', options: [ 'hjkl', 'sdf' ] },
    ];
  }

}
