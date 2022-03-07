import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { testSample } from 'src/app/mock';
import { AppService } from 'src/app/service/app.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { CourseServiceService } from 'src/app/service/course/course-service.service';

import { CourseDetailsComponent } from './course-details.component';

const cartService = jasmine.createSpyObj('CartService', ['addToCart']);
const appService = jasmine.createSpyObj('AppService', ['toggleWishlist']);

describe('CourseDetailsComponent', () => {
  let activatedRouteSpy;
  let courseList;
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;

  beforeEach(async () => {
    activatedRouteSpy = {
      snapshot: {
        params: {
          id: '1',
        },
      },
    };
    courseList = {
      getAllCoursesWithoutPagination: () => {
        return testSample;
      },
    };
    await TestBed.configureTestingModule({
      declarations: [CourseDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
        {
          provide: CartService,
          useValue: cartService,
        },
        {
          provide: AppService,
          useValue: appService,
        },
        {
          provide: CourseServiceService,
          useValue: courseList,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
