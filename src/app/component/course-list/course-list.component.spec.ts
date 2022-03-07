import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { CourseServiceService } from 'src/app/service/course/course-service.service';
import { PaginationService } from 'src/app/service/pagination/pagination.service';

import { CourseListComponent } from './course-list.component';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const cartService = jasmine.createSpyObj('CartService', ['addToCart']);
const courseService = jasmine.createSpyObj('CourseServiceService', [
  'getWishListedCourses',
]);
const paginationService = jasmine.createSpyObj('PaginationService', [
  'pageNoChanged',
]);

paginationService.pageNoChanged.subscribe.and.returnValue();

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      providers: [
        {
          provide: CourseServiceService,
          useValue: courseService,
        },
        {
          provide: CartService,
          useValue: cartService,
        },
        {
          provide: PaginationService,
          useValue: paginationService,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
