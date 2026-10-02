import type { Location, WeatherReport } from '~/weather/model';

/**
 * Realistic domain data for Storybook stories and e2e mocks, taken from
 * live API responses on 2 October 2026. Typed against the model, so the
 * compiler flags any drift.
 */

export const sampleWeatherReport: WeatherReport = {
  coordinates: {
    lat: 52.37,
    lon: 4.89,
  },
  timezoneOffset: 7200,
  current: {
    observedAt: '2026-10-02T14:24:20.000Z',
    condition: 'partly-cloudy',
    description: 'scattered clouds',
    icon: '03d',
    temperature: 20.3,
    feelsLike: 20.03,
    humidity: 63,
    pressure: 1030,
    cloudiness: 32,
    visibility: 10000,
    precipitation: {
      rain: 0,
      snow: 0,
    },
    wind: {
      speed: 3.13,
      direction: 192,
      gust: 4.02,
    },
    sun: {
      sunrise: '2026-10-02T05:42:41.000Z',
      sunset: '2026-10-02T17:16:50.000Z',
    },
  },
  today: {
    date: '2026-10-02',
    condition: 'partly-cloudy',
    description: 'scattered clouds',
    icon: '03d',
    temperature: {
      min: 12.93,
      max: 20.32,
    },
    precipitationProbability: 0,
    wind: {
      speed: 3.13,
      direction: 192,
      gust: 4.02,
    },
  },
  forecast: [
    {
      date: '2026-10-03',
      condition: 'cloudy',
      description: 'overcast clouds',
      icon: '04d',
      temperature: {
        min: 10.77,
        max: 20.67,
      },
      precipitationProbability: 0,
      wind: {
        speed: 1.67,
        direction: 252,
        gust: 4.87,
      },
    },
    {
      date: '2026-10-04',
      condition: 'rain',
      description: 'light rain',
      icon: '10d',
      temperature: {
        min: 12.81,
        max: 17.49,
      },
      precipitationProbability: 0.24,
      wind: {
        speed: 1.55,
        direction: 261,
        gust: 4.7,
      },
    },
    {
      date: '2026-10-05',
      condition: 'cloudy',
      description: 'overcast clouds',
      icon: '04d',
      temperature: {
        min: 11.78,
        max: 18.51,
      },
      precipitationProbability: 0,
      wind: {
        speed: 4.36,
        direction: 239,
        gust: 10.04,
      },
    },
    {
      date: '2026-10-06',
      condition: 'rain',
      description: 'light rain',
      icon: '10d',
      temperature: {
        min: 13.7,
        max: 18.44,
      },
      precipitationProbability: 0.64,
      wind: {
        speed: 2.44,
        direction: 232,
        gust: 6.16,
      },
    },
    {
      date: '2026-10-07',
      condition: 'cloudy',
      description: 'overcast clouds',
      icon: '04d',
      temperature: {
        min: 10.72,
        max: 17.01,
      },
      precipitationProbability: 0,
      wind: {
        speed: 1.05,
        direction: 68,
        gust: 3.3,
      },
    },
  ],
};

export const sampleSearchResults: Array<Location> = [
  {
    name: 'Amsterdam',
    country: 'NL',
    state: 'North Holland',
    coordinates: {
      lat: 52.3727598,
      lon: 4.8936041,
    },
  },
  {
    name: 'New Amsterdam Island',
    country: 'FR',
    state: 'French Southern and Antarctic Lands',
    coordinates: {
      lat: -37.8364908,
      lon: 77.5541729591024,
    },
  },
  {
    name: 'City of Amsterdam',
    country: 'US',
    state: 'New York',
    coordinates: {
      lat: 42.943367,
      lon: -74.1850436,
    },
  },
  {
    name: 'Amsterdam',
    country: 'US',
    state: 'Missouri',
    coordinates: {
      lat: 38.3497423,
      lon: -94.5891216,
    },
  },
];

export const sampleReverseLocation: Location = {
  name: 'The Hague',
  country: 'NL',
  state: 'South Holland',
  coordinates: {
    lat: 52.0799838,
    lon: 4.3113461,
  },
};
