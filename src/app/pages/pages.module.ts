import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class PagesModule { }
