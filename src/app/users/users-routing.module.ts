import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersProfileEditComponent } from './users-profile-edit/users-profile-edit.component';
import { UsersProfileViewComponent } from './users-profile-view/users-profile-view.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'edit', component: UsersProfileEditComponent, canActivate: [AuthGuard]  },
  { path: ':profileId', component: UsersProfileViewComponent  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersRoutingModule { }
