const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'node server/index.js',
      port: 3000,
      reuseExistingServer: true,
    },
    {
      command: 'npx serve . -l 5000',
      port: 5000,
      reuseExistingServer: true,
    }
  ],
});
