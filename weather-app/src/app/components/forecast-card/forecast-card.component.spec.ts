import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ForecastCardComponent } from './forecast-card.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  template: `<app-forecast-card [forecast]="forecast"></app-forecast-card>`
})
class TestHostComponent {
  forecast = { 
    date: new Date('2024-06-03T00:00:00'), 
    temp_avg: 20, 
    temp_min: 15, 
    temp_max: 25, 
    humidity_avg: 50, 
    wind_speed_avg: 5 
  };
}

describe('ForecastCardComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForecastCardComponent, TestHostComponent],
      imports: [MatIconModule],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create the component', () => {
    expect(hostFixture).toBeTruthy();
  });

  it('should receive forecast input from the host component', () => {
    const forecastCardComponent = hostFixture.debugElement.query(By.directive(ForecastCardComponent)).componentInstance;
    expect(forecastCardComponent.forecast).toEqual(hostComponent.forecast);
  });

});
