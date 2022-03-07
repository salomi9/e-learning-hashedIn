import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sampleData } from 'src/app/mock/assignment_sample';
import { CartService } from 'src/app/service/cart/cart.service';
import { CourseServiceService } from 'src/app/service/course/course-service.service';
import { PaginationService } from 'src/app/service/pagination/pagination.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  pathName = window.location.pathname;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courseList: any[] = [];

  pageNoSelected = 1;

  constructor(
    private courseService: CourseServiceService,
    private cartService: CartService,
    private paginationService: PaginationService,
    private router: Router
  ) {
    this.paginationService.pageNoChanged.subscribe((value) => {
      this.pageNoSelected = value;
      this.getAllCourses();
    });

    this.courseService.sortingChanged.subscribe((value) => {
      console.log('Calling subs');
      this.courseList = value;
    });
  }

  ngOnInit(): void {
    if (this.pathName == '/home') {
      this.getAllCourses();
    } else {
      this.getWishListedCourses();
    }
  }

  public getWishListedCourses() {
    this.courseList = this.courseService.getWishListedCourses();
  }

  /**
   * @description Get all the courses
   */
  public getAllCourses() {
    this.courseList = this.courseService.getAllCourses(this.pageNoSelected);
  }

  /**
   * @description Toggle courses added to wishlist
   * @param id
   */
  public toggleWishlist(id: string) {
    this.courseList = this.courseService.toggleWishlist(
      id,
      this.pageNoSelected
    );
  }

  /**
   * @description Toggle courses added to wishlist
   * @param id
   */
  public removeWishlist(id: string) {
    this.courseService.toggleWishlist(id, this.pageNoSelected);
    this.courseList = this.courseService.getWishListedCourses();
  }

  /**
   * Updates cart service with the new course added to cart
   * @param course
   */
  public addToCart(course: any) {
    this.cartService.addToCart(course);
  }

  public sortCourseListAsc() {
    sampleData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  public sortCourseListDsc() {
    sampleData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  public navigateToCourseDetails(id: string) {
    this.router.navigateByUrl(`/course/${id}`);
  }
}
