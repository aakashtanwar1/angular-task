import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import {
  WeatherData,
  ForecastData,
  DailyForecast,
} from '../models/weather.model';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.API_KEY;
  private apiUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<WeatherData | null> {
    return this.http
      .get<WeatherData>(
        `${this.apiUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`
      )
      .pipe(catchError(() => of(null)));
  }

  getForecastByCity(city: string): Observable<DailyForecast[]> {
    return this.http
      .get<ForecastData>(
        `${this.apiUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`
      )
      .pipe(
        map((response) => this.processForecastData(response)),
        catchError(() => of([]))
      );
  }

  private processForecastData(data: ForecastData): DailyForecast[] {
    const dailyData = new Map<string, DailyForecast>();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Group by day and take midday forecast
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().split('T')[0];

      // Use the forecast around midday for each day
      const hour = date.getHours();
      if ((hour >= 11 && hour <= 14) || !dailyData.has(dayKey)) {
        dailyData.set(dayKey, {
          date: date,
          day: days[date.getDay()],
          temperature: Math.round(item.main.temp),
          weather: item.weather[0].main,
          icon: this.getWeatherIconClass(item.weather[0].id),
        });
      }
    });

    // Convert map to array and sort by date
    return Array.from(dailyData.values())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5); // Limit to 5 days
  }

  getWeatherIconClass(weatherId: number): string {
    // Map weather codes to icon names based on OpenWeatherMap API
    if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
    if (weatherId >= 300 && weatherId < 400) return 'rainy-4';
    if (weatherId >= 500 && weatherId < 600) return 'rainy-6';
    if (weatherId >= 600 && weatherId < 700) return 'snowy-6';
    if (weatherId >= 700 && weatherId < 800) return 'cloudy';
    if (weatherId === 800) return 'day';
    if (weatherId === 801) return 'cloudy-day-1';
    if (weatherId === 802) return 'cloudy-day-2';
    if (weatherId >= 803) return 'cloudy-day-3';
    return 'day';
  }
}
