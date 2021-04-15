import { GeolocationPosition, Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

export class Geolocalizacao {


  async getCurrentPosition(): Promise<GeolocationPosition> {
    const coordinates = await Geolocation.getCurrentPosition();
    //console.log('Current', coordinates);
    return coordinates;
  }

}
