import { Injectable } from '@angular/core';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface NavEntry {
  text: string;
  url: string;
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
          this.navLists.leftList.push({ text: 'Overview', url: '/guest/overview' });
          this.navLists.rightList.push({ text: 'Login', url: '/guest/login' });
          this.navLists.rightList.push({ text: 'Reset password', url: '/guest/reset-pass' });
          this.navLists.rightList.push({ text: 'Register', url: '/guest/register' });
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

}
