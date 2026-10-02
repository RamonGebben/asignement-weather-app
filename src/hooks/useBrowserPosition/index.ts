'use client';

import { useCallback, useState } from 'react';
import type { Coordinates } from '~/weather/model';

export type PositionStatus =
  'idle' | 'locating' | 'located' | 'denied' | 'unavailable' | 'unsupported';

const getCurrentPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, {
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
): PositionStatus =>
  error.code === permissionDenied ? 'denied' : 'unavailable';

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

    try {
      const { coords } = await getCurrentPosition();
      const located = { lat: coords.latitude, lon: coords.longitude };
      setCoordinates(located);
      setStatus('located');
      return located;
    } catch (error) {
      setStatus(toPositionStatus(error as GeolocationPositionError));
      return undefined;
    }
  }, []);

  return { status, coordinates, locate };
};
