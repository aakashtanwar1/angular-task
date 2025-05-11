import { Component } from '@angular/core';
import { DailyForecast } from '../../models/weather.model';
import { Observable, switchMap, of } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  imports: [CommonModule, AsyncPipe, WeatherIconComponent],
  templateUrl: './weather-detail.component.html',
  styleUrl: './weather-detail.component.css',
})
export class WeatherDetailComponent {
  selectedLocation$!: Observable<Location | null>;
  forecast$!: Observable<DailyForecast[]>;
  weatherDetails: { wind: string; pressure: string } | null = null;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.selectedLocation$ = this.locationService.selectedLocation$;

    this.forecast$ = this.selectedLocation$.pipe(
      switchMap((location) => {
        if (!location) return of([]);
        return this.weatherService.getForecastByCity(location.name);
      })
    );

    // Get additional weather details when a location is selected
    this.selectedLocation$.subscribe((location) => {
      if (location) {
        this.weatherService
          .getWeatherByCity(location.name)
          .subscribe((data) => {
            if (data) {
              this.weatherDetails = {
                wind: `${data.wind.speed} m/s, ${data.wind.deg}`,
                pressure: `${data.main.pressure} hPa`,
              };
            }
          });
      } else {
        this.weatherDetails = null;
      }
    });
  }

  refreshForecast(): void {
    const location = this.locationService.selectedLocation$;
    location.subscribe((loc) => {
      if (loc) {
        this.weatherService.getWeatherByCity(loc.name).subscribe((data) => {
          if (data) {
            const updatedLocation: Location = {
              ...loc,
              temperature: Math.round(data.main.temp),
              weather: data.weather[0].main,
              timestamp: Date.now(),
            };

            this.locationService.addLocation(updatedLocation);

            this.weatherDetails = {
              wind: `${data.wind.speed} m/s, ${data.wind.deg}`,
              pressure: `${data.main.pressure} hPa`,
            };
          }
        });
      }
    });
  }
}
