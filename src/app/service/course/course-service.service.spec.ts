import { TestBed } from '@angular/core/testing';
import { AppService } from '../app.service';
import { CourseServiceService } from './course-service.service';
const appService = jasmine.createSpyObj('AppService', ['getSampleData']);
describe('CourseServiceService', () => {
  let service: CourseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppService,
          useValue: appService,
        },
      ],
    });
    service = TestBed.inject(CourseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
