import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-icon.component.html',
  styleUrl: './weather-icon.component.css'
})
export class WeatherIconComponent {
  @Input() weather: string = '';
  @Input() icon: string = '';
  @Input() large: boolean = false;
  
  private iconUrl: string = '';
  
  ngOnChanges(): void {
    this.updateIcon();
  }
  
  getIconUrl(): string {
    return `url(${this.iconUrl})`;
  }
  
  private updateIcon(): void {
    const iconName = this.icon || this.mapWeatherToIcon(this.weather);
    this.iconUrl = `https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/${iconName}.svg`;
  }
  
  private mapWeatherToIcon(weather: string): string {
    switch (weather.toLowerCase()) {
      case 'clear':
        return 'day';
      case 'clouds':
      case 'cloudy':
        return 'cloudy-day-1';
      case 'rain':
      case 'drizzle':
        return 'rainy-1';
      case 'thunderstorm':
        return 'thunder';
      case 'snow':
        return 'snowy-1';
      case 'mist':
      case 'fog':
        return 'cloudy';
      default:
        return 'day';
    }
  }
}
