import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly MAX_LOCATIONS = 8;
  private locationsSubject = new BehaviorSubject<Location[]>([]);
  private selectedLocationSubject = new BehaviorSubject<Location | null>(null);

  locations$ = this.locationsSubject.asObservable();
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  constructor() {
    // Try to load saved locations from localStorage
    try {
      const savedLocations = localStorage.getItem('weatherLocations');
      if (savedLocations) {
        this.locationsSubject.next(JSON.parse(savedLocations));
      }
    } catch (e) {
      console.error('Error loading saved locations', e);
    }
  }

  addLocation(location: Location): void {
    const currentLocations = this.locationsSubject.value;
    
    // Check if location already exists
    const existingIndex = currentLocations.findIndex(loc => 
      loc.name.toLowerCase() === location.name.toLowerCase());
    
    if (existingIndex !== -1) {
      // Update existing location
      const updatedLocations = [...currentLocations];
      updatedLocations[existingIndex] = {
        ...location,
        id: updatedLocations[existingIndex].id
      };
      this.locationsSubject.next(updatedLocations);
    } else {
      // Add new location to the top of the list
      const newLocations = [location, ...currentLocations];
      
      // If we exceed the max, remove the oldest
      if (newLocations.length > this.MAX_LOCATIONS) {
        newLocations.pop();
      }
      
      this.locationsSubject.next(newLocations);
    }
    
    this.saveLocations();
  }

  removeLocation(id: string): void {
    const currentLocations = this.locationsSubject.value;
    const updatedLocations = currentLocations.filter(loc => loc.id !== id);
    this.locationsSubject.next(updatedLocations);
    
    // If we removed the selected location, clear selection
    const selectedLocation = this.selectedLocationSubject.value;
    if (selectedLocation && selectedLocation.id === id) {
      this.selectedLocationSubject.next(null);
    }
    
    this.saveLocations();
  }

  clearLocations(): void {
    this.locationsSubject.next([]);
    this.selectedLocationSubject.next(null);
    this.saveLocations();
  }

  selectLocation(location: Location): void {
    this.selectedLocationSubject.next(location);
  }

  private saveLocations(): void {
    try {
      localStorage.setItem('weatherLocations', 
        JSON.stringify(this.locationsSubject.value));
    } catch (e) {
      console.error('Error saving locations', e);
    }
  }
}