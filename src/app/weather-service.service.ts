import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { WeatherData } from './utilities/WeatherData';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  
  constructor(private http: HttpClient) { }

  obtenerDatos(city: string): Observable<WeatherData> {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=8146256df27148489d742434230308&q=${city}&days=6&aqi=no`;
    return this.http.get<WeatherData>(apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          alert('Ingresa una ciudad o locación valida');
          //console.error('Error 400: La solicitud no es válida:', error);
        } else {
          alert('¿¿¿????');
          //console.error('Error inesperado:', error);
        }
        return throwError('Algo salió mal; por favor, inténtalo de nuevo más tarde.');
      })
    );
  }
}
