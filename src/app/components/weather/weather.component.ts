import { Component } from '@angular/core';
import { WeatherSearchComponent } from '../weather-search/weather-search.component';
import { WeatherDetailComponent } from '../weather-detail/weather-detail.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [WeatherSearchComponent, WeatherDetailComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent {}
