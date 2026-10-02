import { expect, test } from '@playwright/test';
import { mockTrpc } from '../support/mockTrpc';

test('opens on the weather for Utrecht', async ({ page }) => {
  const { calls } = await mockTrpc(page);

  const response = await page.goto('/');

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Weather Explorer' }),
  ).toBeVisible();
  await expect(page.getByText('Showing Utrecht, Utrecht, NL')).toBeVisible();

  const weather = page.getByRole('region', { name: 'Weather' });
  await expect(weather.getByRole('status')).toHaveText('Loaded.');
  await expect(weather.getByLabel('weather.get response')).toContainText(
    '"condition": "partly-cloudy"',
  );
  expect(calls).toContainEqual({
    procedure: 'weather.get',
    input: { lat: 52.0907, lon: 5.1214 },
  });
});
