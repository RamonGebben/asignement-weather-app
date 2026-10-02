import { expect, test } from '@playwright/test';
import { mockTrpc } from '../support/mockTrpc';

test('shows the raw weather response for the chosen place', async ({
  page,
}) => {
  await mockTrpc(page);

  await page.goto('/explorer?lat=52.37&lon=4.89&name=Amsterdam&country=NL');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Weather Explorer' }),
  ).toBeVisible();
  await expect(page.getByText('Showing Amsterdam, NL')).toBeVisible();
  const weather = page.getByRole('region', { name: 'Weather' });
  await expect(weather.getByRole('status')).toHaveText('Loaded.');
  await expect(weather.getByLabel('weather.get response')).toContainText(
    '"condition": "partly-cloudy"',
  );
});

test('keeps the explorer when choosing another place', async ({ page }) => {
  await mockTrpc(page);
  await page.goto('/explorer');

  await page
    .getByRole('searchbox', { name: 'Search for a place' })
    .fill('Amsterdam');
  await page.keyboard.press('Enter');
  await page
    .getByRole('button', { name: 'Amsterdam, North Holland, NL' })
    .click();

  await expect(page).toHaveURL(/\/explorer\?lat=52\.3727598/);
});
