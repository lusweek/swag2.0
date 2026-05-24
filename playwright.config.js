import { defineConfig, devices } from '@playwright/test';

// E2E runs the SvelteKit dev server in VITE_E2E mode (Firebase swapped for
// in-repo mocks). Uses the system Chrome (channel) to avoid a browser download.
export default defineConfig({
	testDir: './e2e',
	testMatch: '**/*.spec.js',
	fullyParallel: true,
	workers: 2,
	forbidOnly: !!process.env.CI,
	retries: 1,
	reporter: [['list']],
	// Cold Vite route compiles can be slow on first hit; give assertions headroom.
	expect: { timeout: 10_000 },
	use: {
		baseURL: 'http://localhost:5180',
		actionTimeout: 10_000,
		navigationTimeout: 30_000,
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chrome',
			use: { ...devices['Desktop Chrome'], channel: 'chrome' }
		}
	],
	webServer: {
		command: 'VITE_E2E=true npm run dev -- --port 5180',
		port: 5180,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
