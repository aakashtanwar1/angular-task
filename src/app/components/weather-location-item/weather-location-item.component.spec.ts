import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherLocationItemComponent } from './weather-location-item.component';

describe('WeatherLocationItemComponent', () => {
  let component: WeatherLocationItemComponent;
  let fixture: ComponentFixture<WeatherLocationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherLocationItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherLocationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
