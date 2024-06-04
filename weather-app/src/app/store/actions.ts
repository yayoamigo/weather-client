import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction('[Weather] Load Weather', props<{ city: string }>());
export const loadWeatherSuccess = createAction('[Weather] Load Weather Success', props<{ weather: any }>());
export const loadWeatherFailure = createAction('[Weather] Load Weather Failure', props<{ error: any }>());

export const loadWeatherForecast = createAction('[Weather] Load Weather Forecast', props<{ city: string }>());
export const loadWeatherForecastSuccess = createAction('[Weather] Load Weather Forecast Success', props<{ forecast: any }>());
export const loadWeatherForecastFailure = createAction('[Weather] Load Weather Forecast Failure', props<{ error: any }>());
