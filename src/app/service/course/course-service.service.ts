import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { sampleData } from 'src/app/mock/assignment_sample';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class CourseServiceService {
  retrivedData: any;
  sampleData = sampleData;
  wishListedCourses: any[] = [];
  sortingChanged: Subject<any[]> = new Subject<any[]>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allCourses: any[];
  totalPages = 0;
  pageNo = 1;
  limit = 0;
  skip = 0;

  constructor(private appService: AppService) {
    this.retrivedData = appService.getSampleData();
    this.allCourses = [];
    // this.dashboardComponent.sortingChangedDashboard.subscribe((value) => {
    //   console.log('Inside of service', value);
    //   if (value == '1') {
    //     console.log('Inside if of service');
    //     this.sortCourseListAsc();
    //   } else {
    //     this.sortCourseListDsc();
    //   }
    // });
  }

  public getTotalPagesForPagination(pageNo: number) {
    this.limit = pageNo * 4;
    this.skip = this.limit - 4;

    return [this.limit, this.skip];
  }

  public sortCourseListAsc() {
    this.sampleData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    const sortedCourses = this.getAllCourses(this.pageNo);
    this.sortingChanged.next(sortedCourses);
  }

  public sortCourseListDsc() {
    this.sampleData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    const sortedCourses = this.getAllCourses(this.pageNo);
    this.sortingChanged.next(sortedCourses);
  }

  public getAllCourses(pageNo: number) {
    this.retrivedData = this.appService.getSampleData();
    this.pageNo = pageNo;
    const courses = JSON.parse(this.retrivedData);

    const [limit, skip] = this.getTotalPagesForPagination(pageNo);
    return courses.slice(skip, limit);
  }

  public getAllCoursesWithoutPagination() {
    this.retrivedData = this.appService.getSampleData();
    const courses = JSON.parse(this.retrivedData);
    return courses;
  }

  public toggleWishlist(id: string, pageNo: number) {
    this.appService.toggleWishlist(id);
    return this.getAllCourses(pageNo);
  }

  public getWishListedCourses() {
    this.retrivedData = this.appService.getSampleData();
    let sampleData = JSON.parse(this.retrivedData);
    sampleData = sampleData.filter((el: { wishlisted: boolean }) => {
      return el.wishlisted == true;
    });
    return sampleData;
  }
}
