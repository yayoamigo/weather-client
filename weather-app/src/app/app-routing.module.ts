import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { WeatherAdminComponent } from '../app/components/weather-admin/weather-admin.component';
import { DayAdminComponent } from '../app/components/day-admin/day-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather-admin', component: WeatherAdminComponent },
  { path: 'day-admin', component: DayAdminComponent },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
