import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface NavEntry {
  text: string;
  url: string;
  selected: boolean;
}

export interface NavLists {
  leftList: Array<NavEntry>;
  rightList: Array<NavEntry>;
}

export interface Industry {
  value: number;
  name: string;
}

export interface JobType {
  value: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavProviderService {

  pageTitle: string;
  navLists: NavLists;
  navListsUpdated: Subject<NavLists> = new Subject<NavLists>();

  constructor(private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(
      (navEnd: NavigationEnd) => {
        const url = navEnd.url.split('?')[0];
        this.pageTitle = 'JobFairPortal - ';
        if (url.endsWith('overview')) {
          this.pageTitle += 'Overview';
        } else if (url.endsWith('login')) {
          this.pageTitle += 'Login';
        } else if (url.endsWith('reset-pass')) {
          this.pageTitle += 'Reset password';
        } else if (url.endsWith('register')) {
          this.pageTitle += 'Register';
        } else if (url.endsWith('cv')) {
          this.pageTitle += 'CV';
        } else if (url.endsWith('overview-coms')) {
          this.pageTitle += 'Company overview';
        } else if (url.endsWith('overview-com')) {
          this.pageTitle += 'Company overview';
        } else if (url.endsWith('overview-offer')) {
          this.pageTitle += 'Concourse overview';
        } else if (url.endsWith('applications')) {
          this.pageTitle += 'Application statistics';
        }

        this.navLists = { leftList: [], rightList: [] };
        if (url.startsWith('/guest')) {
          this.navLists.leftList.push({ text: 'Overview', url: '/guest/overview', selected: url.endsWith('overview') });
          this.navLists.rightList.push({ text: 'Login', url: '/guest/login', selected: url.endsWith('login') });
          this.navLists.rightList.push({ text: 'Reset password', url: '/guest/reset-pass', selected: url.endsWith('reset-pass') });
          this.navLists.rightList.push({ text: 'Register', url: '/guest/register', selected: url.endsWith('register') });
        } else if (url.startsWith('/student')) {
          this.navLists.leftList.push({ text: 'My CV', url: '/student/cv', selected: url.endsWith('cv') });
          this.navLists.leftList.push({ text: 'Companies', url: '/student/overview-coms', selected: url.endsWith('overview-coms') });
          this.navLists.leftList.push({ text: 'My applications', url: '/student/applications', selected: url.endsWith('applications') });
          this.navLists.rightList.push({ text: 'Logout', url: '/logout', selected: url.endsWith('logout') });
        }
        this.navListsUpdated.next();
      });
  }

  getPageTile(): string {
    return this.pageTitle;
  }

  getNavLists(): NavLists {
    return this.navLists;
  }

  getNavListsUpdateListener(): Observable<NavLists> {
    return this.navListsUpdated.asObservable();
  }

  getIndustries(): Array<Industry> {
    return [
      { value: 0, name: 'IT' },
      { value: 1, name: 'Teleco' },
      { value: 2, name: 'Energy' },
      { value: 3, name: 'Architecture' },
      { value: 4, name: 'Mechanical' },
    ];
  }

  getJobTypes(): Array<JobType> {
    return [
      { value: 0, name: 'Internship' },
      { value: 1, name: 'Full time' },
    ];
  }

}
