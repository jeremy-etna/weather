import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const GEO_API = 'https://api.openweathermap.org/geo/1.0/';
const WEATHER_API = 'https://api.openweathermap.org/data/2.5/';
const HOURLY_API = 'https://pro.openweathermap.org/data/2.5/'

export const API_KEY = '0f5920d8225181d7ed2c89ab1dc63149';

export type CityResult = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state: string;
  local_names: {
    [key: string]: string;
  };
};

export type CityResearchResult = CityResult[];

type WeatherData = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type DailyForecastDataList = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: WeatherData[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain: number;
};


export type HourlyForecastDataList = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherData[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

type ApiResponse = {
  cod: string;
  message: number;
  cnt: number;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type DailyWeatherForecastResponse = ApiResponse & {
  list: DailyForecastDataList[];
};

export type HourlyWeatherForecastResponse = ApiResponse & {
  list: HourlyForecastDataList[];
};


// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    get4DaysHourlyWeather: builder.query<HourlyWeatherForecastResponse, {lat: number, lon: number, units: string}>({
        query: ({lat, lon, units}) => `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
    }),
    get24hWeather: builder.query<HourlyWeatherForecastResponse, {lat: number, lon: number, units: string}>({
        query: ({lat, lon, units}) => `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=${units}&cnt=24&appid=${API_KEY}`,
    }),
    get16DaysDailyWeather: builder.query<DailyWeatherForecastResponse, {lat: number, lon: number, units: string}>({
        query: ({lat, lon, units}) => `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
    }),
    get7DaysDailyWeather: builder.query<DailyWeatherForecastResponse, {lat: number, lon: number, units: string}>({
      query: ({lat, lon, units}) => `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=${units}&cnt=7&appid=${API_KEY}`,
    }),
    get5DaysDailyWeather: builder.query<DailyWeatherForecastResponse, {lat: number, lon: number, units: string}>({
      query: ({lat, lon, units}) => `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=${units}&cnt=5&appid=${API_KEY}`,
    }),
    //GEOLOC API
    searchCity: builder.query<CityResearchResult, {city: string}>({
      query: ({city}) => `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGet5DaysDailyWeatherQuery, useGet4DaysHourlyWeatherQuery, useGet24hWeatherQuery, useGet16DaysDailyWeatherQuery, useGet7DaysDailyWeatherQuery, useSearchCityQuery } = weatherApi