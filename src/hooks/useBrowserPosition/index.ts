'use client';

import { useCallback, useState } from 'react';
import type { Coordinates } from '~/weather/model';

export type PositionStatus =
  'idle' | 'locating' | 'located' | 'denied' | 'unavailable' | 'unsupported';

const getCurrentPosition = (geolocation: Geolocation) =>
  new Promise<GeolocationPosition>((resolve, reject) =>
    geolocation.getCurrentPosition(resolve, reject, {
      // City-level precision is plenty for weather, and faster.
      enableHighAccuracy: false,
      timeout: 10_000,
      maximumAge: 5 * 60 * 1000,
    }),
  );

/** `GeolocationPositionError.PERMISSION_DENIED` */
const permissionDenied = 1;

/** A geolocation failure as a status the UI can explain. */
export const toPositionStatus = (
  error: Pick<GeolocationPositionError, 'code'>,
): Extract<PositionStatus, 'denied' | 'unavailable'> =>
  error.code === permissionDenied ? 'denied' : 'unavailable';

export type LocateResult =
  | { status: 'located'; coordinates: Coordinates }
  | { status: ReturnType<typeof toPositionStatus> };

/** One position lookup, settled into a status - it never rejects. */
export const locatePosition = async (
  geolocation: Geolocation,
): Promise<LocateResult> => {
  try {
    const { coords } = await getCurrentPosition(geolocation);
    return {
      status: 'located',
      coordinates: { lat: coords.latitude, lon: coords.longitude },
    };
  } catch (error) {
    return { status: toPositionStatus(error as GeolocationPositionError) };
  }
};

/**
 * The browser's position, asked for on demand. `locate` resolves with the
 * coordinates, or `undefined` when they can't be had - `status` says why.
 */
export const useBrowserPosition = () => {
  const [status, setStatus] = useState<PositionStatus>('idle');
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const locate = useCallback(async (): Promise<Coordinates | undefined> => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported');
      return undefined;
    }

    setStatus('locating');

    const result = await locatePosition(navigator.geolocation);
    setStatus(result.status);

    if (result.status !== 'located') return undefined;

    setCoordinates(result.coordinates);
    return result.coordinates;
  }, []);

  return { status, coordinates, locate };
};
