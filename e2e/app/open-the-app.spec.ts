import { expect, test } from '@playwright/test';
import { mockTrpc } from '../support/mockTrpc';

test('opens on the weather for Utrecht', async ({ page }) => {
  const { calls } = await mockTrpc(page);

  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);
  const main = page.getByRole('main');
  await expect(
    main.getByRole('heading', { level: 1, name: 'Partly Cloudy' }),
  ).toBeVisible();
  await expect(main.getByText('Now 20° Celsius')).toBeVisible();
  await expect(main.getByText('Utrecht, Utrecht, NL')).toBeVisible();
  await expect(main.getByRole('region', { name: 'Wind status' })).toContainText(
    '11.3 km/h',
  );
  await expect(
    main.getByRole('region', { name: 'Sunrise & sunset' }),
  ).toContainText('07:42');
  await expect(
    main.getByRole('region', { name: 'Forecast' }).getByRole('listitem'),
  ).toHaveCount(1 + 5);
  expect(calls).toContainEqual({
    procedure: 'weather.get',
    input: { lat: 52.0907, lon: 5.1214 },
  });
});

test('lets keyboard users skip past the header', async ({ page }) => {
  await mockTrpc(page);
  await page.goto('/');

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to the weather' });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByRole('main')).toBeFocused();
});
