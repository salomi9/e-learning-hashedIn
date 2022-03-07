import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  pathName = window.location.pathname;
  sortingChangedDashboard: Subject<string> = new Subject<string>();

  constructor() {}

  toggleCoursePriceDropDown(event: any) {
    this.sortingChangedDashboard.next(event.value);
  }
}
