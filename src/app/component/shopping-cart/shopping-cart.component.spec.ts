import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/service/cart/cart.service';
import { AppService } from 'src/app/service/app.service';
import { ShoppingCartComponent } from './shopping-cart.component';
import { testSample } from 'src/app/mock';

const cartService = jasmine.createSpyObj('CartService', [
  'addToCart',
  'getCoursesAddedToCart',
  'toggleShoppingCart',
]);

cartService.getCoursesAddedToCart.and.returnValue(testSample);
const appService = jasmine.createSpyObj('AppService', ['toggleWishlist']);

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      providers: [
        {
          provide: CartService,
          useValue: cartService,
        },
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
