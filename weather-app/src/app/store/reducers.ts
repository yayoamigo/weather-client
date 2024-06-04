import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './actions';

export const weatherFeatureKey = 'weather';

export interface State {
  weather: any;
  forecast: any;
  error: any;
}

export const initialState: State = {
  weather: null,
  forecast: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(WeatherActions.loadWeatherSuccess, (state, action) => ({ ...state, weather: action.weather })),
  on(WeatherActions.loadWeatherFailure, (state, action) => ({ ...state, error: action.error })),
  on(WeatherActions.loadWeatherForecastSuccess, (state, action) => ({ ...state, forecast: action.forecast })),
  on(WeatherActions.loadWeatherForecastFailure, (state, action) => ({ ...state, error: action.error }))
);
