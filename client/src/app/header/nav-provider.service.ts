import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApiResponse } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { URL } from '../interfaces';

interface NavEntry {
  text: string;
  url: string;
  selected: boolean;
}

export interface NavLists {
  leftList: Array<NavEntry>;
  rightList: Array<NavEntry>;
}

@Injectable({
  providedIn: 'root'
})
export class NavProviderService {

  pageTitle: string;
  navLists: NavLists;
  navListsUpdated: Subject<NavLists> = new Subject<NavLists>();

  constructor(private router: Router,
    private http: HttpClient) {
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
        } else if (url.endsWith('concourse')) {
          this.pageTitle += 'Concourse overview';
        } else if (url.endsWith('applications')) {
          this.pageTitle += 'Application statistics';
        } else if (url.endsWith('fair-application')) {
          this.pageTitle += 'Fair application';
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
        } else if (url.startsWith('/company')) {
          this.navLists.leftList.push({ text: 'Conclurses', url: 'company/new-concourse', selected: url.endsWith('new-concourse') });
          this.navLists.leftList.push({ text: 'Fair', url: 'company/fair-application', selected: url.endsWith('fair-application') });
          this.navLists.rightList.push({ text: 'Logout', url: '/logout', selected: url.endsWith('logout') });
        } else if (url.startsWith('/admin')) {
          this.navLists.leftList.push({ text: 'Fair', url: 'admin/manage-fair', selected: url.endsWith('manage-fair') });
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

  getIndustries(): Subject<any> {
    const subject: Subject<Array<any>> = new Subject();
    this.http.get(URL + '/industries').subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next([]);
      }
    });
    return subject;
  }

  getJobTypes(): Subject<any> {
    const subject: Subject<Array<any>> = new Subject();
    this.http.get(URL + '/job-types').subscribe((res: ApiResponse) => {
      if (res.status === 'success') {
        subject.next(res.data);
      } else {
        subject.next([]);
      }
    });
    return subject;
  }

}
