import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courseList: any[];
  totalCartValue = 0;
  amtSaved = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.courseList = cartService.courseAddedToCart;

    cartService.courseAddChanged.subscribe((courseList) => {
      this.courseList = courseList;
      this.getTotalCartValue();
    });
  }

  ngOnInit(): void {
    this.getAllCourses();
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
    return this.totalCartValue;
  }

  public getAllCourses() {
    this.courseList = this.cartService.getCoursesAddedToCart();
    this.getTotalCartValue();
  }

  public navigateToShoppingCart() {
    this.router.navigateByUrl(`/cart`);
  }
}
