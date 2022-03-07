import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { testSample } from 'src/app/mock';
import { CartService } from 'src/app/service/cart/cart.service';

import { CartDetailsComponent } from './cart-details.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const cartService = jasmine.createSpyObj('CartService', [
  'courseAddChanged',
  'courseAddedToCart',
  'getCoursesAddedToCart',
]);
cartService.getCoursesAddedToCart.and.returnValue(testSample);
// cartService.courseAddChanged.subscribe.and.returnValue(testSample);

describe('CartDetailsComponent', () => {
  let component: CartDetailsComponent;
  let fixture: ComponentFixture<CartDetailsComponent>;
  let mockHeroService: jasmine.SpyObj<CartService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDetailsComponent],
      providers: [
        {
          provide: CartService,
          useValue: mockHeroService,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should give total cart value', () => {
  //   component.courseList = testSample;
  //   const result = component.getTotalCartValue();
  //   expect(result).toBe(23);
  // });
});
