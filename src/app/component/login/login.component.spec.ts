import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { blankUser, validUser } from 'src/app/mock';
import { By } from '@angular/platform-browser';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
const appService = jasmine.createSpyObj('AppService', [
  'saveSampleDataInStorage',
]);

describe('LoginComponent', () => {
  let component: LoginComponent = new LoginComponent(
    authServiceSpy,
    new FormBuilder(),
    routerSpy,
    appService
  );
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder,
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(userName: string, userPassword: string) {
    component.loginForm.controls['username'].setValue(userName);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.isSubmitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should have submitted as true when form is submitted', () => {
    component.login();
    expect(component.isSubmitted).toBeTruthy();
  });

  it('should update form value when input is updated', () => {
    updateForm(validUser.username, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  });

  it('should return as invalid when invalid data is passed', () => {
    updateForm(blankUser.username, blankUser.password);
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should display Username required Error Msg when Username is blank', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();

    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement
      .query(By.css('#login-form'))
      .triggerEventHandler('submit', fakeEvent);
    fixture.detectChanges();

    const usernameErrorMsg =
      fixture.debugElement.nativeElement.querySelector('#uname-required');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.textContent).toContain('Username is required');
  });

  it('should display password required Error Msg when password is blank', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();

    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement
      .query(By.css('#login-form'))
      .triggerEventHandler('submit', fakeEvent);
    fixture.detectChanges();

    const passwordErrorMsg =
      fixture.debugElement.nativeElement.querySelector('#pwd-required');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.textContent).toContain('Password is required');
  });

  it('should call authService login()', () => {
    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();

    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement
      .query(By.css('#login-form'))
      .triggerEventHandler('submit', fakeEvent);
    fixture.detectChanges();

    expect(authServiceSpy.login).toHaveBeenCalled();
  });

  it('should route to dashboard if login successfully', () => {
    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();

    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement
      .query(By.css('#login-form'))
      .triggerEventHandler('submit', fakeEvent);
    fixture.detectChanges();

    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
    expect(navArgs).toBe('/home');
  });
});
