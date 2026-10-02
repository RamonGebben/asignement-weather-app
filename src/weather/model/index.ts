/**
 * Provider-agnostic weather domain. Everything here is plain, JSON-safe data
 * (dates as ISO-8601 strings) so it crosses the tRPC boundary unchanged.
 * All units are metric; formatting for display belongs to the UI.
 */

export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'heavy-rain'
  | 'storm'
  | 'snow'
  | 'fog';

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Location {
  name: string;
  /** ISO 3166 alpha-2 country code. */
  country: string;
  state?: string;
  coordinates: Coordinates;
}

export interface Wind {
  /** Metres per second. */
  speed: number;
  /** Metres per second. */
  gust?: number;
  /** Degrees, meteorological - the direction the wind blows *from*. */
  direction: number;
}

export interface SunTimes {
  /** ISO-8601, UTC. */
  sunrise: string;
  /** ISO-8601, UTC. */
  sunset: string;
}

export interface Precipitation {
  /** Millimetres per hour. */
  rain: number;
  /** Millimetres per hour. */
  snow: number;
}

export interface CurrentWeather {
  /** ISO-8601, UTC. */
  observedAt: string;
  condition: WeatherCondition;
  description: string;
  /** Provider icon code, e.g. `01d` - carries the day/night distinction. */
  icon: string;
  /** °C */
  temperature: number;
  /** °C */
  feelsLike: number;
  /** Percent, 0-100. */
  humidity: number;
  /** hPa */
  pressure: number;
  /** Percent, 0-100. */
  cloudiness: number;
  /** Metres. */
  visibility: number;
  precipitation: Precipitation;
  wind: Wind;
  sun: SunTimes;
}

export interface TemperatureRange {
  /** °C */
  min: number;
  /** °C */
  max: number;
}

export interface DailyForecast {
  /** `YYYY-MM-DD`, in the location's local time. */
  date: string;
  condition: WeatherCondition;
  description: string;
  icon: string;
  temperature: TemperatureRange;
  /** Highest probability of precipitation across the day, 0-1. */
  precipitationProbability: number;
  /** The strongest wind of the day. */
  wind: Wind;
}

export interface WeatherReport {
  coordinates: Coordinates;
  /** The location's offset from UTC in seconds. */
  timezoneOffset: number;
  current: CurrentWeather;
  /** The rest of today, including the current observation. */
  today: DailyForecast;
  /**
   * The days after today, at most five. The last day can be partial: the
   * provider's forecast ends five days from now, not at local midnight.
   */
  forecast: Array<DailyForecast>;
}
