import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent },
          { path: 'weather-admin', component: DummyComponent },
          { path: 'day-admin', component: DummyComponent },
        ])
      ],
      declarations: [AppComponent, DummyComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ignore Angular-specific elements like <router-outlet>
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "weather-app"', () => {
    expect(component.title).toEqual('weather-app');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a.navbar-brand').textContent).toContain('Home');
    expect(compiled.querySelector('a.nav-link[href="/weather-admin"]').textContent).toContain('Daily');
    expect(compiled.querySelector('a.nav-link[href="/day-admin"]').textContent).toContain('Forecast');
  });

  it('should navigate to "weather-admin" when Daily link is clicked', async () => {
    const compiled = fixture.nativeElement;
    const dailyLink = compiled.querySelector('a.nav-link[href="/weather-admin"]');
    dailyLink.click();
    fixture.whenStable().then(() => {
      expect(router.url).toBe('/weather-admin');
    });
  });

  it('should navigate to "day-admin" when Forecast link is clicked', async () => {
    const compiled = fixture.nativeElement;
    const forecastLink = compiled.querySelector('a.nav-link[href="/day-admin"]');
    forecastLink.click();
    fixture.whenStable().then(() => {
      expect(router.url).toBe('/day-admin');
    });
  });
});

// DummyComponent to use as a placeholder for route testing
@Component({
  template: ''
})
class DummyComponent {}
