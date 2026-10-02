import { expect, test } from '@playwright/test';
import { mockTrpc } from '../support/mockTrpc';

test('searches for a place and shows its weather', async ({ page }) => {
  const { calls } = await mockTrpc(page);
  await page.goto('/');

  await page
    .getByRole('searchbox', { name: 'Search for a place' })
    .fill('Amsterdam');
  await page.getByRole('button', { name: 'Search' }).click();

  const results = page.getByRole('list', { name: 'Search results' });
  await expect(results.getByRole('button')).toHaveCount(4);
  expect(calls).toContainEqual({
    procedure: 'location.search',
    input: { query: 'Amsterdam' },
  });

  await results
    .getByRole('button', { name: 'Amsterdam, North Holland, NL' })
    .click();

  await expect(page).toHaveURL(/lat=52\.3727598&lon=4\.8936041&name=Amsterdam/);
  const searchbox = page.getByRole('searchbox', { name: 'Search for a place' });
  await expect(searchbox).toHaveValue('Amsterdam, North Holland, NL');
  await expect(searchbox).toBeFocused();
  await expect(results).toBeHidden();
  await expect(
    page.getByRole('main').getByText('Amsterdam, North Holland, NL'),
  ).toBeVisible();
  await expect
    .poll(() => calls)
    .toContainEqual({
      procedure: 'weather.get',
      input: { lat: 52.3727598, lon: 4.8936041 },
    });
});

test('keeps the chosen place after a reload', async ({ page }) => {
  await mockTrpc(page);
  await page.goto('/?lat=52.37&lon=4.89&name=Amsterdam&country=NL');

  await page.reload();

  await expect(
    page.getByRole('main').getByText('Amsterdam, NL', { exact: true }),
  ).toBeVisible();
});

test('says so when nothing matches', async ({ page }) => {
  await mockTrpc(page, { 'location.search': () => [] });
  await page.goto('/');

  await page
    .getByRole('searchbox', { name: 'Search for a place' })
    .fill('Qwxyz');
  await page.keyboard.press('Enter');

  await expect(page.getByText('No places found.')).toBeVisible();
});
