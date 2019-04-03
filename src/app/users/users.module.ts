import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersProfileEditComponent } from './users-profile-edit/users-profile-edit.component';
import { UsersProfileViewComponent } from './users-profile-view/users-profile-view.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    UsersProfileEditComponent,
    UsersProfileViewComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class UsersModule { }
