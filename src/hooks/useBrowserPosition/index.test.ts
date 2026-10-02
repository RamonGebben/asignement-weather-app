import { describe, expect, it, vi } from 'vitest';
import { locatePosition, toPositionStatus } from '.';

const resolvingWith = (latitude: number, longitude: number) =>
  ({
    getCurrentPosition: vi.fn<Geolocation['getCurrentPosition']>(resolve =>
      resolve({ coords: { latitude, longitude } } as GeolocationPosition),
    ),
  }) as unknown as Geolocation;

const failingWith = (code: number) =>
  ({
    getCurrentPosition: vi.fn<Geolocation['getCurrentPosition']>(
      (_resolve, reject) => reject?.({ code } as GeolocationPositionError),
    ),
  }) as unknown as Geolocation;

describe('toPositionStatus', () => {
  it('reports a refused permission as denied', () => {
    expect(toPositionStatus({ code: 1 })).toBe('denied');
  });

  it.each([2, 3])(
    'reports error code %s (position unavailable, timeout) as unavailable',
    code => {
      expect(toPositionStatus({ code })).toBe('unavailable');
    },
  );
});

describe('locatePosition', () => {
  it('resolves the browser position as lat/lon coordinates', async () => {
    await expect(locatePosition(resolvingWith(52.37, 4.9))).resolves.toEqual({
      status: 'located',
      coordinates: { lat: 52.37, lon: 4.9 },
    });
  });

  it('asks for a coarse, recently cached position with a timeout', async () => {
    const geolocation = resolvingWith(0, 0);
    await locatePosition(geolocation);

    expect(geolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  });

  it('settles a refused permission as denied, without coordinates', async () => {
    await expect(locatePosition(failingWith(1))).resolves.toEqual({
      status: 'denied',
    });
  });

  it.each([2, 3])(
    'settles error code %s as unavailable instead of rejecting',
    async code => {
      await expect(locatePosition(failingWith(code))).resolves.toEqual({
        status: 'unavailable',
      });
    },
  );
});
