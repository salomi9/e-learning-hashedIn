import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserProfileService } from 'src/app/service/user/user-profile.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  areaOfInterestArr: any;

  isStudent = true;
  profileForm: FormGroup;

  constructor(
    private profileService: UserProfileService,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group({});

    this.areaOfInterestArr = [
      { id: 1, name: 'Designer', value: 'designer', isSelected: false },
      { id: 2, name: 'Developer', value: 'developer', isSelected: true },
      {
        id: 3,
        name: 'Project Manager',
        value: 'projectManager',
        isSelected: false,
      },
      { id: 4, name: 'Sales', value: 'sales', isSelected: false },
    ];
  }

  ngOnInit(): void {
    const profileValues = this.profileService.getProfileDetails();
    this.profileForm = this.formBuilder.group({
      displayName: new FormControl(
        profileValues.displayName,
        Validators.required
      ),
      firstName: new FormControl(profileValues.firstName, Validators.required),
      lastName: new FormControl(profileValues.lastName, Validators.required),
      areaOfInterest: this.formBuilder.array([''], Validators.required),
      profileType: new FormControl(profileValues.profileType),
      experience: new FormControl(profileValues.experience),
      technology: new FormControl(profileValues.technology),
      role: new FormControl(
        profileValues.role,
        Validators.pattern("^[a-zA-Z -']+")
      ),
    });

    if (profileValues.profileType == 'professional') {
      this.isStudent = false;
    }
  }

  setCheckBoxValue(values: any) {
    let areaOfInterest: FormArray = this.profileForm.get(
      'areaOfInterest'
    ) as FormArray;
    areaOfInterest = values as FormArray;
    areaOfInterest.push(new FormControl('developer'));
    this.profileForm.get('areaOfInterest')?.patchValue(areaOfInterest);
  }

  onCheckboxChange(e: any) {
    const areaOfInterest: FormArray = this.profileForm.get(
      'areaOfInterest'
    ) as FormArray;
    if (e.target.checked) {
      areaOfInterest.push(new FormControl(e.target.value));
    } else {
      const index = areaOfInterest.controls.findIndex(
        (x) => x.value === e.target.value
      );
      areaOfInterest.removeAt(index);
    }
  }
  get form() {
    return this.profileForm.controls;
  }

  public professionChange(event: any) {
    if (event.target.value == 'student') {
      this.isStudent = true;
    } else {
      this.isStudent = false;
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.profileService.setProfileDetails(this.profileForm.value);
    alert('Profile Details Saved!');
  }
}
