import type { WeatherReport, Wind } from '~/weather/model';
import { getSunArcPosition } from '~/weather/sun/getSunArcPosition';
import { toBeaufort } from '~/weather/wind/toBeaufort';
import { toCompassPoint } from '~/weather/wind/toCompassPoint';

const describeWind = ({ speed, direction }: Wind) => ({
  compassPoint: toCompassPoint(direction),
  beaufort: toBeaufort(speed),
});

/**
 * What the client-side weather helpers make of a report at a moment - so
 * they can be checked against live data.
 */
export const toDerivedWeather = (report: WeatherReport, now: Date) => ({
  at: now.toISOString(),
  sunArc: getSunArcPosition(now, report.current.sun),
  wind: describeWind(report.current.wind),
  forecastWind: report.forecast.map(({ date, wind }) => ({
    date,
    ...describeWind(wind),
  })),
});
