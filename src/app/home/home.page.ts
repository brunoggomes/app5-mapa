import { Component, OnInit } from '@angular/core';
import { Feature, MapsService } from '../maps.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  addresses: Feature[] = [];
  selectedAddress: Feature = null;
  selectedAddressName: string = null;
  coordinates: number[];

  constructor(private mapService: MapsService) { }

  ngOnInit(): void {
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapService
        .searchAddress(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features;
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: Feature) {
    this.selectedAddress = address;
    this.selectedAddressName = this.selectedAddress.place_name;
    this.addresses = [];

    this.mapService.buildMap(
      this.selectedAddress.geometry.coordinates[0],
      this.selectedAddress.geometry.coordinates[1]);
  }

}
