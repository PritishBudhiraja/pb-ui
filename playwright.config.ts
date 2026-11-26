import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:4177",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm exec vite --config e2e/vite.config.ts --host 127.0.0.1 --port 4177 --strictPort",
    port: 4177,
    reuseExistingServer: !process.env.CI,
  },
})
