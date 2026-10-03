import { defineConfig, devices } from '@playwright/test';

const port = 3100;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // CI builds once and shares `.next/standalone` as an artifact (see
    // .github/workflows/ci.yml), so e2e runs the prebuilt server instead of
    // rebuilding via `next dev`.
    command: isCI
      ? 'node .next/standalone/server.js'
      : `pnpm dev --port ${port}`,
    env: isCI ? { PORT: String(port) } : undefined,
    url: `http://localhost:${port}`,
    reuseExistingServer: !isCI,
  },
});
