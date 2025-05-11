import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { WeatherLocationItemComponent } from '../weather-location-item/weather-location-item.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-weather-search',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, WeatherLocationItemComponent],
  templateUrl: './weather-search.component.html',
  styleUrl: './weather-search.component.css',
})
export class WeatherSearchComponent {
  cityName = '';
  errorMessage = '';
  locations: Location[] = [];

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {
    this.locationService.locations$.subscribe((locations) => {
      this.locations = locations;
    });
  }

  searchCity(): void {
    if (!this.cityName.trim()) {
      this.errorMessage = 'Please enter a city name';
      return;
    }

    this.errorMessage = '';
    this.weatherService
      .getWeatherByCity(this.cityName.trim())
      .subscribe((data) => {
        if (data) {
          const newLocation: Location = {
            id: uuidv4(),
            name: data.name,
            temperature: Math.round(data.main.temp),
            unit: '°C',
            weather: data.weather[0].main,
            timestamp: Date.now(),
          };

          this.locationService.addLocation(newLocation);
          this.cityName = '';
        } else {
          this.errorMessage = `City "${this.cityName}" not found`;
        }
      });
  }

  refreshLocation(location: Location): void {
    this.weatherService.getWeatherByCity(location.name).subscribe((data) => {
      if (data) {
        const updatedLocation: Location = {
          ...location,
          temperature: Math.round(data.main.temp),
          weather: data.weather[0].main,
          timestamp: Date.now(),
        };

        this.locationService.addLocation(updatedLocation);
      }
    });
  }

  removeLocation(id: string): void {
    this.locationService.removeLocation(id);
  }

  selectLocation(location: Location): void {
    this.locationService.selectLocation(location);
  }

  clearLocations(): void {
    this.locationService.clearLocations();
  }
}
