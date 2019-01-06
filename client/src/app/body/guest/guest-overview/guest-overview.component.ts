import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavProviderService } from 'src/app/header/nav-provider.service';
import { Industry, UserEntity } from 'src/app/interfaces';
import { GuestStatusService } from '../guest-status.service';

interface CompanyTableRow {
  name: string;
  town: string;
  director: string;
  taxNumber: string;
  staff: string;
  email: string;
  website: string;
  industry: number;
}

@Component({
  selector: 'app-guest-overview',
  templateUrl: './guest-overview.component.html',
  styleUrls: ['./guest-overview.component.css']
})
export class GuestOverviewComponent implements OnInit {

  filterForm = new FormGroup({
    name: new FormControl(),
    industry: new FormControl(),
    town: new FormControl(),
  });

  industries: Array<Industry> = [];
  companies: Array<UserEntity>;
  companiesFiltered: Array<UserEntity>;
  displayedColumns = [
    'name',
    'town',
    'director',
    'taxNumber',
    'staff',
    'email',
    'website',
    'industry',
  ];

  constructor(private navProviderService: NavProviderService,
    private guestStatusService: GuestStatusService) { }

  ngOnInit() {
    this.navProviderService.getIndustries().subscribe(
      (status => {
        this.industries = status;
      })
    );
    this.guestStatusService.getCompanies().subscribe(
      (status => {
        if (status[0] === 'success') {
          this.companies = status[2];
          this.onFilter();
        } else {}
      })
    );
    this.companiesFiltered = this.companies;
  }

  onFilter() {
    if (this.companies == null) { return; }
    const name = this.filterForm.value.name;
    const industry = this.filterForm.value.industry;
    const town = this.filterForm.value.town;

    this.companiesFiltered = [];
    this.companies.forEach(com => {
      if (name !== null && !com.com.name.toLowerCase().includes(name.toLowerCase())) {
        return;
      }
      if (industry !== null && industry.length > 0 && !industry.includes('' + com.com.industry)) {
        return;
      }
      if (town !== null && !com.com.city.toLowerCase().includes(town.toLowerCase())) {
        return;
      }
      this.companiesFiltered.push(com);
    });
  }

  resetFrom() {
    setTimeout(() => {
      this.onFilter();
    }, 50);
  }

  getIndustry(id) {
    let name = '';
    this.industries.forEach(ind => {
      if (ind._id === id) {
        name = ind.name;
      }
    });
    return name;
  }

}
