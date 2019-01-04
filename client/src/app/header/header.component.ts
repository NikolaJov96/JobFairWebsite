import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavProviderService, NavLists } from './nav-provider.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  pageTitle = '';

  navLists: NavLists = { leftList: [], rightList: [] };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navProviderService: NavProviderService,
    private titleService: Title) {
      navProviderService.getNavListsUpdateListener().subscribe(
        () => {
          this.navLists = this.navProviderService.getNavLists();
          titleService.setTitle(this.navProviderService.getPageTile());
        });
    }

  ngOnInit() {}

}
