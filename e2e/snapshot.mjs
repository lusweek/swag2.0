// Capture full-page screenshots of every page at desktop + mobile widths.
// Usage: node e2e/snapshot.mjs <label>   (e.g. "before" / "after")
// Requires the E2E dev server on :5180 (npm run dev:e2e -- --port 5180).
import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';

const label = process.argv[2] || 'shots';
const base = 'http://localhost:5180';
const outDir = fileURLToPath(new URL(`./__shots__/${label}`, import.meta.url));

const pages = [
	['home', '/'],
	['kurser', '/kurser'],
	['openGym', '/openGym'],
	['evenemang', '/evenemang'],
	['about', '/about'],
	['anmalan', '/anmälan'],
	['login', '/login']
];
const viewports = [
	['desktop', 1440, 900],
	['mobile', 390, 844]
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });

for (const [vpName, width, height] of viewports) {
	const ctx = await browser.newContext({ viewport: { width, height } });
	const page = await ctx.newPage();
	for (const [name, path] of pages) {
		await page.goto(base + path, { waitUntil: 'networkidle' }).catch(() => {});
		await page.waitForTimeout(1200); // let async Firebase-mock data render
		await page.screenshot({ path: `${outDir}/${name}-${vpName}.png`, fullPage: true }).catch((e) => console.error(name, vpName, e.message));
		console.log(`✓ ${label}/${name}-${vpName}`);
	}
	await ctx.close();
}
await browser.close();
console.log(`\nSaved to ${outDir}`);
