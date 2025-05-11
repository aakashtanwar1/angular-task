import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-weather-location-item',
  standalone: true,
  imports: [CommonModule,WeatherIconComponent],
  templateUrl: './weather-location-item.component.html',
  styleUrl: './weather-location-item.component.css'
})
export class WeatherLocationItemComponent {
  @Input() location!: Location;
  @Input() isSelected = false;
  
  @Output() refresh = new EventEmitter<Location>();
  @Output() remove = new EventEmitter<string>();
  @Output() select = new EventEmitter<Location>();

  onRefresh(event: Event): void {
    event.stopPropagation(); // Prevent location selection
    this.refresh.emit(this.location);
  }
  
  onRemove(event: Event): void {
    event.stopPropagation(); // Prevent location selection
    this.remove.emit(this.location.id);
  }
  
  onSelect(): void {
    this.select.emit(this.location);
  }
}
