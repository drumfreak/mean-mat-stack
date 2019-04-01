import { NgModule } from '@angular/core';
import { WeatherComponent } from './weather.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AngularMaterialModule,
    NgbModule
  ]
})

export class WeatherModule {}
