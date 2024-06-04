import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DayAdminComponent } from './forecast-admin.component';
import * as fromWeather from '../../store/reducers';
import * as WeatherActions from '../../store/actions';
import { WeatherService } from '../../services/weather.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('DayAdminComponent', () => {
  let component: DayAdminComponent;
  let fixture: ComponentFixture<DayAdminComponent>;
  let store: MockStore;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeatherForecast']);

    await TestBed.configureTestingModule({
      declarations: [DayAdminComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        provideMockStore({ initialState: { weather: { forecast: [] } } }),
        { provide: WeatherService, useValue: weatherServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DayAdminComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;

    store.setState({ weather: { forecast: [] } });
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial model with an empty city', () => {
    expect(component.model.city).toBe('');
  });

  it('should have an initial form field configuration', () => {
    expect(component.fields.length).toBe(1);
    expect(component.fields[0].key).toBe('city');
    expect(component.fields[0].templateOptions.label).toBe('City');
    expect(component.fields[0].templateOptions.required).toBeTrue();
  });

  it('should call getWeatherForecast and dispatch success action', () => {
    const forecastData = { temperature: 25, condition: 'Sunny' };
    weatherService.getWeatherForecast.and.returnValue(of(forecastData));
    
    component.model.city = 'Quito';
    component.getWeatherForecast();

    expect(weatherService.getWeatherForecast).toHaveBeenCalledWith('Quito');
    store.scannedActions$.subscribe(action => {
      expect(action).toEqual(WeatherActions.loadWeatherForecastSuccess({ forecast: forecastData }));
    });
  });

  it('should select forecast from store', (done) => {
    const forecast = [{ day: 'Monday', temperature: 25 }];
    store.setState({ weather: { forecast } });

    component.forecast$.subscribe(data => {
      expect(data).toEqual(forecast);
      done();
    });
  });
});
