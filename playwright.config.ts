import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
export default defineConfig({
  testDir: './tests', timeout: 60_000, expect: { timeout: 15_000 },
  fullyParallel: true, forbidOnly: !!process.env.CI,
  // O site retorna "heavy load (queue full)" com muitas sessões simultâneas: limita workers e permite retry.
  retries: process.env.CI ? 2 : 2, workers: 2,
  reporter: [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]],
  use: { baseURL: process.env.BASE_URL || 'https://www.automationexercise.com',
    trace: 'retain-on-failure', screenshot: 'only-on-failure', video: 'retain-on-failure',
    actionTimeout: 15_000, navigationTimeout: 30_000 },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
