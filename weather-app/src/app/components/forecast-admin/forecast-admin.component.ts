import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromWeather from '../../store/reducers';
import * as WeatherActions from '../../store/actions';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-day-admin',
  templateUrl: './forecast-admin.component.html',
  styleUrls: ['./forecast-admin.component.scss']
})
export class DayAdminComponent {
  model = { city: '' };
  fields = [{ key: 'city', type: 'input', templateOptions: { label: 'City', required: true } }];

  forecast$ = this.store.select(state => state.weather.forecast);

  constructor(private store: Store<fromWeather.State>, private weatherService: WeatherService) {}

  getWeatherForecast() {
    this.weatherService.getWeatherForecast(this.model.city).subscribe(forecast => {
      this.store.dispatch(WeatherActions.loadWeatherForecastSuccess({ forecast }));
    });
  }

  onModelChange(event: any) {
    
  }
}
