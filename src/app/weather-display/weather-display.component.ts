import { Component,OnInit,HostListener } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { SearchCityService } from '../search-city.service';
import { WeatherData } from '../utilities/WeatherData';
import { Observable, finalize, map } from 'rxjs';
import {FormControl} from '@angular/forms';
import { LocationResponse } from '../utilities/SearchData';



@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit{

  userinputcity: string = '';
  latitude: number = 48.8567;
  longitude: number = 2.3508;
  accuracy: number | undefined;
  locationError: string | undefined;

  city = '19.42847,-99.12766'; // Asigna el valor deseado a la variable city
  weatherData: WeatherData | undefined;

  loaded: boolean = false;

  searching = false;
  searchQuery = '';
  cities?: LocationResponse[];
  
  searchFormControl = new FormControl();

  constructor(private weatherservice: WeatherServiceService,private searchcityservice: SearchCityService) {
  }

  onInputChange(value: string) {
    if (value && value.length >= 3) {
      this.searchcityservice.searchCities(value)
        .subscribe((data) => {
          this.cities = data;
        });
    } else {
      this.cities = [];
    }
  }
  

  newCity(lat: string,lon:string){
    //console.log(this.city);
    
    this.city = lat + ',' + lon;
    this.obtenerDatos();
    this.searchFormControl.reset();
    this.cities=[];
  }


  ngOnInit(): void {
    this.getLocation().subscribe(
      (position: GeolocationPosition) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.accuracy = position.coords.accuracy;
        this.city=this.latitude + ','+this.longitude;
        this.obtenerDatos();
      },
      (error) => {
        this.locationError = 'No se pudo obtener la ubicación.';
        console.error('Error al obtener la ubicación:', error);
      }
    );


    // Subscribe to changes of the FormControl
    this.searchFormControl.valueChanges.subscribe((value) => {
      this.onInputChange(value);
    });

    this.loaded = true
    //this.obtenerDatos();


  }


  obtenerDatos(){
    this.weatherservice.obtenerDatos(this.city).subscribe(
      (data: WeatherData) => {
        this.weatherData = data;
        //console.log(data);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  getLocation(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocalización no está disponible en este navegador.');
      }
    });
  }

}
