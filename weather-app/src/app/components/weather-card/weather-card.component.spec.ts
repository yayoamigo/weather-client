import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WeatherCardComponent } from './weather-card.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  template: `<app-weather-card [weather]="weather"></app-weather-card>`
})
class TestHostComponent {
  weather = {
    name: 'City Name',
    main: {
      temp: 22,
      temp_min: 18,
      temp_max: 26,
      humidity: 70
    },
    wind: {
      speed: 5
    }
  };
}

describe('WeatherCardComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherCardComponent, TestHostComponent],
      imports: [MatIconModule],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create the component', () => {
    expect(hostFixture).toBeTruthy();
  });

  it('should receive weather input from the host component', () => {
    const weatherCardComponent = hostFixture.debugElement.query(By.directive(WeatherCardComponent)).componentInstance;
    expect(weatherCardComponent.weather).toEqual(hostComponent.weather);
  });

  
});
