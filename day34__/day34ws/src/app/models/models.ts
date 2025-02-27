export interface WeatherForecast {
    name:string;
    weather:Weather;
}

interface Weather {
    main:string;
    description:string;

}


export interface WeatherApiResponse {
    coord: {
      lon: number;
      lat: number;
    };
    weather: WeatherDetail[]; // Array of weather conditions
    base: string;
    main: {
      temp: number;
      pressure: number;
      humidity: number;
      temp_min: number;
      temp_max: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number; // Timestamp
    sys: {
      type: number;
      id: number;
      message: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    id: number;
    name: string;
    cod: number;
  }
  
  // Sub-interface for weather details
  export interface WeatherDetail {
    id: number;
    main: string;
    description: string;
    icon: string;
  }