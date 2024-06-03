import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromWeather from '../../store/reducers';
import * as WeatherActions from '../../store/actions';

@Component({
  selector: 'app-day-admin',
  templateUrl: './day-admin.component.html',
  styleUrls: ['./day-admin.component.scss']
})
export class DayAdminComponent {
  model = { city: '' };
  fields = [{ key: 'city', type: 'input', templateOptions: { label: 'City', required: true } }];

  forecast$ = this.store.select(state => state.weather.forecast);

  constructor(private store: Store<fromWeather.State>) {}

  getWeatherForecast() {
    this.store.dispatch(WeatherActions.loadWeatherForecast({ city: this.model.city }));
  }

  onModelChange(event: any) {
    console.log(event);
  }
}
