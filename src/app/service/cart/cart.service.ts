import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { sampleData } from 'src/app/mock/assignment_sample';
import { AppService } from '../app.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  courseAddedToCart: any[] = [];
  retrivedData: any;

  courseAddChanged: Subject<any[]> = new Subject<any[]>();

  constructor(private appService: AppService) {}

  /**
   * @description Get courses added to cart
   * @returns Courses added to cart
   */
  public getCoursesAddedToCart() {
    this.retrivedData = this.appService.getSampleData();
    const sampleData = JSON.parse(this.retrivedData);
    this.courseAddedToCart = sampleData.filter(
      (element: { addedToCart: boolean }) => {
        return element.addedToCart == true;
      }
    );

    return this.courseAddedToCart;
  }

  public toggleShoppingCart(id: string) {
    this.appService.toggleShoppingCart(id);
    return this.getCoursesAddedToCart();
  }

  /**
   * @description Push course object to addedToCart array
   * @param course: Course object
   * @returns Courses not added to cart
   */
  public addToCart(course: any) {
    const obj = this.courseAddedToCart.find((o) => o.id === course.id);
    if (obj == undefined) {
      this.courseAddedToCart.push(course);
      this.courseAddChanged.next(this.courseAddedToCart);
      this.appService.toggleShoppingCart(course.id);
      alert('Course sucessfully added to cart');
    } else {
      alert(`Course '${course.description}' already exit in cart !`);
    }
  }
}
