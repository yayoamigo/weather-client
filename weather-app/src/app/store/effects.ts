import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '../services/weather.service';
import * as WeatherActions from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class WeatherEffects {

  loadWeather$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.loadWeather),
    mergeMap(action => this.weatherService.getCurrentWeather(action.city).pipe(
      map(weather => WeatherActions.loadWeatherSuccess({ weather })),
      catchError(error => of(WeatherActions.loadWeatherFailure({ error })))
    ))
  ));

  loadWeatherForecast$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.loadWeatherForecast),
    mergeMap(action => this.weatherService.getWeatherForecast(action.city).pipe(
      map(forecast => WeatherActions.loadWeatherForecastSuccess({ forecast })),
      catchError(error => of(WeatherActions.loadWeatherForecastFailure({ error })))
    ))
  ));

  constructor(private actions$: Actions, private weatherService: WeatherService) {}
}
