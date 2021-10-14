import {Component, OnInit} from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/invoice',         title: 'Invoice',             icon:'nc-diamond',    class: '' },
  { path: '/products',         title: 'Products',             icon:'nc-diamond',    class: '' },
  { path: '/reports',         title: 'Reports',             icon:'nc-diamond',    class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
