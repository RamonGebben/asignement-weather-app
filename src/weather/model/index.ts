/**
 * Provider-agnostic weather domain. Everything here is plain, JSON-safe data
 * (dates as ISO 8601 strings, https://en.wikipedia.org/wiki/ISO_8601) so it
 * crosses the tRPC boundary unchanged.
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
  /**
   * ISO 3166-1 alpha-2 country code, e.g. `NL`.
   *
   * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  country: string;
  state?: string;
  coordinates: Coordinates;
}

export interface Wind {
  /** Metres per second, sustained (averaged over a few minutes). */
  speed: number;
  /**
   * Metres per second: the peak of a brief burst above the sustained speed.
   *
   * @see https://en.wikipedia.org/wiki/Wind_gust
   */
  gust?: number;
  /**
   * Degrees clockwise from north, meteorological: the direction the wind
   * blows *from*, so a westerly (270°) blows towards the east.
   *
   * @see https://en.wikipedia.org/wiki/Wind_direction
   */
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
  /**
   * °C. The apparent temperature: what the air feels like to a person once
   * humidity and wind chill are taken into account.
   *
   * @see https://en.wikipedia.org/wiki/Apparent_temperature
   */
  feelsLike: number;
  /** Percent, 0-100. */
  humidity: number;
  /** hPa */
  pressure: number;
  /**
   * Percent of the sky covered by cloud, 0-100.
   *
   * @see https://en.wikipedia.org/wiki/Cloud_cover
   */
  cloudiness: number;
  /**
   * Metres: how far away objects can be clearly seen. Capped at 10 km.
   *
   * @see https://en.wikipedia.org/wiki/Visibility
   */
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
  /**
   * Highest probability of precipitation (PoP) across the day, 0-1: the
   * chance of measurable rain or snow.
   *
   * @see https://en.wikipedia.org/wiki/Probability_of_precipitation
   */
  precipitationProbability: number;
  /** The strongest wind of the day. */
  wind: Wind;
}

export interface WeatherReport {
  coordinates: Coordinates;
  /**
   * The location's offset from UTC in seconds, e.g. 7200 for UTC+2. It's not a
   * time zone: it doesn't say when daylight saving time changes.
   *
   * @see https://en.wikipedia.org/wiki/UTC_offset
   */
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
