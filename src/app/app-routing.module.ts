import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './component/course-details/course-details.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DashboardLayoutComponent } from './component/layout/dashboard-layout/dashboard-layout.component';

import { LoginComponent } from './component/login/login.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'wishlist', component: DashboardComponent },
      { path: 'cart', component: ShoppingCartComponent },
      { path: 'course/:id', component: CourseDetailsComponent },
      { path: 'profile', component: UserProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
