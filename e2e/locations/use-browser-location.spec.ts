import { expect, test } from '@playwright/test';
import { mockTrpc } from '../support/mockTrpc';

test.describe('with location access', () => {
  test.use({
    geolocation: { latitude: 52.0799, longitude: 4.3113 },
    permissions: ['geolocation'],
  });

  test('shows the weather where the user is', async ({ page }) => {
    const { calls } = await mockTrpc(page);
    await page.goto('/');

    await page.getByRole('button', { name: 'Use my location' }).click();

    await expect(
      page.getByText('Showing The Hague, South Holland, NL'),
    ).toBeVisible();
    // The browser's own position, not the place's centre, drives the weather.
    await expect(page).toHaveURL(/lat=52\.0799&lon=4\.3113&name=The\+Hague/);
    expect(calls).toContainEqual({
      procedure: 'location.reverse',
      input: { lat: 52.0799, lon: 4.3113 },
    });
  });
});

test.describe('without location access', () => {
  test.use({ permissions: [] });

  test('explains that the location was denied', async ({ page }) => {
    await mockTrpc(page);
    await page.goto('/');

    await page.getByRole('button', { name: 'Use my location' }).click();

    await expect(
      page.getByText('Location access was denied. Search for a place instead.'),
    ).toBeVisible();
    await expect(page.getByText('Showing Utrecht, Utrecht, NL')).toBeVisible();
  });
});
