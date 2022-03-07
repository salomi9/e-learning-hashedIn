import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { CourseServiceService } from 'src/app/service/course/course-service.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  idOfCourse = '';
  course: any = {};

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseServiceService,
    private cartService: CartService,
    private appService: AppService
  ) {
    this.idOfCourse = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCourseById();
  }

  getCourseById() {
    const course = this.courseService
      .getAllCoursesWithoutPagination()
      .find((o: { id: any }) => o.id === this.idOfCourse);
    console.log('Course', course);
    if (course) {
      this.course = course;
    } else {
      alert('Course not found!');
    }
  }

  /**
   * Updates cart service with the new course added to cart
   * @param course
   */
  public addToCart(course: any) {
    this.cartService.addToCart(course);
    alert('Course successfully added in the cart');
  }
  /**
   * @description Toggle courses added to wishlist
   * @param id
   */
  public toggleWishlist(id: string) {
    this.appService.toggleWishlist(id);
  }
}
