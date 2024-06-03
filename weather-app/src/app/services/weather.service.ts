import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'http://localhost:3000/weather';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?city=${city}`);
  }

  getWeatherForecast(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/forecast?city=${city}`);
  }
}
