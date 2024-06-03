import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WeatherAdminComponent } from './components/weather-admin/weather-admin.component';
import { DayAdminComponent } from './components/day-admin/day-admin.component';
import { WeatherService } from './services/weather.service';
import * as fromWeather from './store/reducers';
import { WeatherEffects } from './store/effects';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherAdminComponent,
    DayAdminComponent,
    WeatherCardComponent,
    ForecastCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ [fromWeather.weatherFeatureKey]: fromWeather.reducer }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    FormlyModule.forRoot(),  // Import FormlyModule
    FormlyBootstrapModule,   // Import FormlyBootstrapModule
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
