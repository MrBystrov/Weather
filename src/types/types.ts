export interface ICity {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  elevation: number
  feature_code: string,
  country_code: string,
  admin1_id: number,
  admin3_id: number,
  admin4_id: number,
  timezone: string,
  population: number,
  postcodes: string[]
  country_id: number,
  country: string,
  admin1: string,
  admin3: string,
  admin4: string,
}

export interface ICityWeather {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: string[]
  current: {
    time: string,
    interval: number,
    temperature_2m: number,
    relative_humidity_2m: number,
    apparent_temperature: number,
    is_day: number,
    precipitation: number,
    weather_code: number,
    surface_pressure: number,
    wind_speed_10m: number,
    wind_direction_10m: number,
    wind_gusts_10m: number
  }  
  hourly_units: {
    time: string
    temperature_2m: string
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
  }
  temperature_2m: number[]
  wind_speed_10m: number[]
  daily_units: string[]
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    sunrise: string[]
    sunset: string[]
    wind_speed_10m_max: number[]
  }
}
