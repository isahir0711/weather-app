export interface LocationResponse {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: string;
    lon: string;
    url: string;
  }
  
  // La misma interfaz pero ahora como un arreglo de ubicaciones
  export interface LocationResponseArray extends Array<LocationResponse> {}