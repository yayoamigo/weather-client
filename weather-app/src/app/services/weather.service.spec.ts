import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';


describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch current weather', () => {
    const mockWeatherData = { };
    const city = 'New York';

    service.getCurrentWeather(city).subscribe(data => {
      expect(data).toEqual(mockWeatherData);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?city=${city}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });

  it('should fetch weather forecast and calculate daily averages', () => {
    const mockForecastData = {
      list: [
        {
          dt_txt: '2023-06-01 12:00:00',
          main: { temp: 25, temp_min: 20, temp_max: 30, humidity: 60 },
          wind: { speed: 10 }
        },
        {
          dt_txt: '2023-06-01 15:00:00',
          main: { temp: 26, temp_min: 21, temp_max: 31, humidity: 62 },
          wind: { speed: 12 }
        }
      ]
    };

    const expectedAverages = {
      list: [
        {
          date: '2023-06-01',
          temp_avg: 25.5,
          temp_min: 20,
          temp_max: 31,
          humidity_avg: 61,
          wind_speed_avg: 11
        }
      ]
    };

    const city = 'New York';

    service.getWeatherForecast(city).subscribe(data => {
      expect(data.list).toEqual(expectedAverages.list);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/forecast?city=${city}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockForecastData);
  });
});
