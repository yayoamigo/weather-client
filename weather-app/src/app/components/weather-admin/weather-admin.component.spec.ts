import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WeatherAdminComponent } from './weather-admin.component';
import * as fromWeather from '../../store/reducers';
import * as WeatherActions from '../../store/actions';

describe('WeatherAdminComponent', () => {
  let component: WeatherAdminComponent;
  let fixture: ComponentFixture<WeatherAdminComponent>;
  let store: MockStore;
  const initialState = { weather: { weather: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherAdminComponent],
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherAdminComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    store.setState(initialState);
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

  it('should call getWeather and dispatch loadWeather action', () => {
    const city = 'New York';
    component.model.city = city;
    const spyDispatch = spyOn(store, 'dispatch').and.callThrough();

    component.getWeather();

    expect(spyDispatch).toHaveBeenCalledWith(WeatherActions.loadWeather({ city }));
  });

  it('should select weather from store', (done) => {
    const weather = [{ day: 'Monday', temperature: 25 }];
    store.setState({ weather: { weather } });

    component.weather$.subscribe(data => {
      expect(data).toEqual(weather);
      done();
    });
  });
});
