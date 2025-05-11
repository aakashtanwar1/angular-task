export interface WeatherData {
  main: {
    temp: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  dt: number;
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
  city: {
    name: string;
  };
}

export interface DailyForecast {
  date: Date;
  day: string;
  temperature: number;
  weather: string;
  icon: string;
}
