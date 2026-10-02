import { describe, expect, it } from 'vitest';
import { sampleWeatherReport } from '~/weather/samples';
import { summarizeWeather } from '.';

const { current, today } = sampleWeatherReport;

describe('summarizeWeather', () => {
  it('summarises feel, humidity, wind and rain', () => {
    expect(summarizeWeather(current, today)).toBe(
      'Feels like 20°. Humidity 63%, wind 11.3 km/h from the SSW. Little chance of rain today.',
    );
  });

  it('calls out a notable chance of rain', () => {
    expect(
      summarizeWeather(current, { ...today, precipitationProbability: 0.64 }),
    ).toContain('64% chance of rain today.');
  });
});
