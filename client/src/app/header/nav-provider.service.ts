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
        this.pageTitle = 'JobFairPortal - ';
        if (navEnd.url.endsWith('overview')) {
          this.pageTitle += 'Overview';
        } else if (navEnd.url.endsWith('login')) {
          this.pageTitle += 'Login';
        } else if (navEnd.url.endsWith('reset-pass')) {
          this.pageTitle += 'Reset password';
        } else if (navEnd.url.endsWith('register')) {
          this.pageTitle += 'Register';
        }

        this.navLists = { leftList: [], rightList: [] };
        if (navEnd.url.startsWith('/guest')) {
          this.navLists.leftList.push({ text: 'Overview', url: '/guest/overview', selected: false });
          this.navLists.rightList.push({ text: 'Login', url: '/guest/login', selected: false });
          this.navLists.rightList.push({ text: 'Reset password', url: '/guest/reset-pass', selected: false });
          this.navLists.rightList.push({ text: 'Register', url: '/guest/register', selected: false });
          if (navEnd.url.endsWith('overview')) {
            this.navLists.leftList[0].selected = true;
          } else if (navEnd.url.endsWith('login')) {
            this.navLists.rightList[0].selected = true;
          } else if (navEnd.url.endsWith('reset-pass')) {
            this.navLists.rightList[1].selected = true;
          } else if (navEnd.url.endsWith('register')) {
            this.navLists.rightList[2].selected = true;
          }
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

}
