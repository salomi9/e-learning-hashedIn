import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  user = {
    displayName: 'Steve',
    firstName: 'Steven',
    lastName: 'Charlie',
    areaOfInterest: [
      { id: 1, name: 'Designer', value: 'designer', isSelected: false },
      { id: 2, name: 'Developer', value: 'developer', isSelected: true },
    ],
    profileType: 'professional',
    experience: 10,
    technology: 'Node',
    role: 'react',
  };

  constructor() {}

  public setProfileDetails(userDetails: any) {
    this.user = userDetails;
  }

  public getProfileDetails() {
    return this.user;
  }
}
