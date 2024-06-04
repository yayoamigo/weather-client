import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.http.get<any>(`${this.apiUrl}/forecast?city=${city}`).pipe(
      map(response => this.calculateDailyAverages(response))
    );
  }

  private calculateDailyAverages(response: any): any {
    const dailyData: { [key: string]: any } = {};

    response.list.forEach((entry: any) => {
      const date = entry.dt_txt.split(' ')[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          temp_sum: 0,
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          humidity_sum: 0,
          wind_speed_sum: 0,
          count: 0
        };
      }

      dailyData[date].temp_sum += entry.main.temp;
      dailyData[date].temp_min = Math.min(dailyData[date].temp_min, entry.main.temp_min);
      dailyData[date].temp_max = Math.max(dailyData[date].temp_max, entry.main.temp_max);
      dailyData[date].humidity_sum += entry.main.humidity;
      dailyData[date].wind_speed_sum += entry.wind.speed;
      dailyData[date].count += 1;
    });

    const dailyAverages = Object.keys(dailyData).map(date => {
      const dayData = dailyData[date];
      return {
        date,
        temp_avg: dayData.temp_sum / dayData.count,
        temp_min: dayData.temp_min,
        temp_max: dayData.temp_max,
        humidity_avg: dayData.humidity_sum / dayData.count,
        wind_speed_avg: dayData.wind_speed_sum / dayData.count
      };
    });

    return { ...response, list: dailyAverages };
  }
}
