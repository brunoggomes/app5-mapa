import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  geometry: { type: string; coordinates: number[] }
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  private map: mapboxgl.Map;

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  searchAddress(local: string): Observable<Feature[]> {
    return this.http.get(this.URL + local + '.json?types=address&access_token='
      + environment.mapbox.accessToken)
      .pipe(map((res: MapboxOutput) => {
        return res.features;
      }));
  }

  buildMap(longitude: number, latitude: number) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 12,
      center: [longitude, latitude]
    })
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
