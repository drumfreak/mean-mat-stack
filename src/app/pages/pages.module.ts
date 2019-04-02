import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { AngularMaterialModule } from '../angular-material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [HomepageComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class PagesModule { }
