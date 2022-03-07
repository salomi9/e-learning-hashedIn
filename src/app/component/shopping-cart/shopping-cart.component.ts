import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { CourseServiceService } from 'src/app/service/course/course-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  courseList: any[] = [];
  recommendedList: any[] = [];

  totalCartValue = 0;
  amtSaved = 0;
  constructor(
    private cartService: CartService,
    private appService: AppService,
    private courseService: CourseServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCoursesAddedToCart();
    this.getRecommendedCoures();
  }

  public getTotalCartValue() {
    let sum = 0;
    this.courseList.map((el) => {
      if (el.discounted_price == null) {
        sum = sum + parseFloat(el.actual_price);
      } else {
        sum = sum + parseFloat(el.discounted_price);
      }
    });
    this.totalCartValue = sum;
    this.getAmountSaved();
    return this.totalCartValue;
  }

  /**
   * @description Toggle course added to cart
   * @param id
   */
  public removeFromCart(id: string) {
    this.cartService.toggleShoppingCart(id);
    this.getCoursesAddedToCart();
  }

  getCoursesAddedToCart() {
    this.courseList = this.cartService.getCoursesAddedToCart();
    this.getTotalCartValue();
  }

  getRecommendedCoures() {
    const recommedCourses = this.courseService.getAllCoursesWithoutPagination();
    for (let i = 0; i < 2; i++) {
      const idx = Math.floor(Math.random() * recommedCourses.length);
      this.recommendedList.push(recommedCourses[idx]);
      recommedCourses.splice(idx, 1);
    }
    return this.recommendedList;
  }

  public getAmountSaved() {
    let sum = 0;
    this.courseList.forEach((el) => {
      sum = sum + parseFloat(el.actual_price);
    });
    this.amtSaved = sum - this.totalCartValue;
  }

  public moveToWishlist(id: string) {
    this.cartService.toggleShoppingCart(id);
    this.appService.toggleWishlist(id);
    this.getCoursesAddedToCart();
  }

  public alert() {
    alert('You have succesfully placed your order');
  }

  /**
   * Updates cart service with the new course added to cart
   * @param course
   */
  public addToCart(course: any) {
    this.cartService.addToCart(course);
  }

  public navigateToCourseDetails(id: string) {
    this.router.navigateByUrl(`/course/${id}`);
  }
}
