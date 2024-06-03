import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromWeather from '../../store/reducers';
import * as WeatherActions from '../../store/actions';

@Component({
  selector: 'app-weather-admin',
  templateUrl: './weather-admin.component.html',
  styleUrls: ['./weather-admin.component.scss']
})
export class WeatherAdminComponent {
  model = { city: '' };
  fields = [{ key: 'city', type: 'input', templateOptions: { label: 'City', required: true } }];

  weather$ = this.store.select(state => state.weather.weather);

  constructor(private store: Store<fromWeather.State>) {}

  getWeather() {
    this.store.dispatch(WeatherActions.loadWeather({ city: this.model.city }));
  }

  onModelChange(event: any) {
    console.log(event);
  }
}
