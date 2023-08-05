import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocationResponseArray,LocationResponse} from './utilities/SearchData';

@Injectable({
  providedIn: 'root'
})
export class SearchCityService {

  constructor(private httpClient: HttpClient) { }

  // Método para buscar ciudades por nombre
  searchCities(query: string):Observable<LocationResponseArray> {
    return this.httpClient.get<LocationResponseArray>(`https://api.weatherapi.com/v1/search.json?key=8146256df27148489d742434230308&q=${query}`);
  }
}
