import { test, expect } from '@playwright/test';

// These specs verify BEHAVIOUR and CONTENT, never styling — so they remain a
// valid "still works" check before and after the visual redesign.

test.describe('navigation & shell', () => {
	test('home renders hero + CTA and primary nav links', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: /Trött på gravitationens lagar/i })).toBeVisible();
		// CTA "Se kurser" points at /kurser
		await expect(page.getByRole('link', { name: 'Se kurser' })).toHaveAttribute('href', '/kurser');
		// Desktop nav links exist
		for (const label of ['Kurser', 'Open gym', 'Evenemang', 'Medlemsskap & anmälan', 'Om oss']) {
			await expect(page.getByRole('link', { name: label }).first()).toBeVisible();
		}
	});

	test('nav routes to each section', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Kurser' }).first().click();
		await expect(page).toHaveURL(/\/kurser\/?$/);
		await expect(page.getByRole('heading', { name: 'Kurser', exact: true })).toBeVisible();

		await page.goto('/');
		await page.getByRole('link', { name: 'Open gym' }).first().click();
		await expect(page).toHaveURL(/\/openGym\/?$/);
		await expect(page.getByRole('heading', { name: 'Open Gym', exact: true }).first()).toBeVisible();
	});

	test('footer shows contact links', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('link', { name: 'swag.goteborg@gmail.com' })).toBeVisible();
		await expect(page.getByRole('link', { name: '0709301799' })).toBeVisible();
	});
});

test.describe('content pages (Firebase-backed, mocked)', () => {
	test('kurser shows both courses + a schedule table', async ({ page }) => {
		await page.goto('/kurser');
		await expect(page.getByRole('heading', { name: 'Muscle up kursen', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Calisthenics grundkurs', exact: true }).first()).toBeVisible();
		// FirebaseTable rendered the mock row
		await expect(page.getByRole('cell', { name: /Muscle up/ }).first()).toBeVisible();
		// in-page anchor links
		await expect(page.getByRole('link', { name: 'Muscle up kursen' })).toHaveAttribute('href', '#muscle-up-id');
	});

	test('openGym shows title, body text, map and instagram', async ({ page }) => {
		await page.goto('/openGym');
		await expect(page.getByRole('heading', { name: 'Open Gym', exact: true }).first()).toBeVisible();
		await expect(page.getByText('Open gym är till för dig').first()).toBeVisible();
		await expect(page.locator('iframe[src*="google.com/maps"]')).toBeVisible();
		await expect(page.locator('a[href*="instagram.com/swag_streetworkout"]').first()).toBeVisible();
	});

	test('evenemang shows the mocked event', async ({ page }) => {
		await page.goto('/evenemang');
		await expect(page.getByRole('heading', { name: 'SWAG-mästerskapet' })).toBeVisible();
		await expect(page.getByText('2025-09-13')).toBeVisible();
		await expect(page.getByText('En heldag med tävlingar')).toBeVisible();
	});

	test('about shows static sections + stadgar link', async ({ page }) => {
		await page.goto('/about');
		await expect(page.getByRole('heading', { name: 'Vilka är SWAG?' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Vad är streetworkout?' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Se våra stadgar' })).toBeVisible();
	});

	test('login form renders email + password', async ({ page }) => {
		await page.goto('/login');
		await expect(page.locator('#email')).toBeVisible();
		await expect(page.locator('#password')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Logga in' })).toBeVisible();
	});
});

test.describe('anmälan (registration form) behaviour', () => {
	test('course select is populated from CMS data', async ({ page }) => {
		await page.goto('/anmälan');
		const select = page.locator('#course');
		await expect(select).toBeVisible();
		await expect(select.locator('option', { hasText: 'Calisthenics grundkurs' })).toHaveCount(1);
		await expect(select.locator('option', { hasText: 'Muscle up kursen' })).toHaveCount(1);
	});

	test('submit stays disabled until form is valid + swish confirmed', async ({ page }) => {
		await page.goto('/anmälan');
		const submit = page.getByRole('button', { name: 'Skicka' });
		await expect(submit).toBeDisabled();

		// Pick a course -> the price summary table appears
		await page.locator('#course').selectOption('Calisthenics grundkurs');
		await expect(page.getByRole('cell', { name: /Calisthenics grundkurs/ }).first()).toBeVisible();

		// Fill required fields (non-member birth)
		await page.locator('#birth').fill('200001011111');
		await page.locator('#fName').fill('Ny');
		await page.locator('#lName').fill('Medlem');
		await page.locator('#email').fill('ny@example.com');
		await page.locator('#adress').fill('Gatan 2');
		await page.locator('#postNr').fill('41100');

		// Still disabled until "Jag har swichat" is checked
		await expect(submit).toBeDisabled();
		await page.locator('input[name="radio-1"]').check();
		await expect(submit).toBeEnabled();
	});

	test('already-member birth offers autofill that fills the form', async ({ page }) => {
		await page.goto('/anmälan');
		await page.locator('#course').selectOption('Calisthenics grundkurs');
		// findMember runs on the field's change event; fill only fires input, so blur to commit.
		await page.locator('#birth').fill('199001011234'); // matches mock member
		await page.locator('#birth').blur();
		const autofill = page.getByRole('button', { name: 'Ja' });
		await expect(autofill).toBeVisible();
		await autofill.click();
		await expect(page.locator('#fName')).toHaveValue('Test');
		await expect(page.locator('#lName')).toHaveValue('Testsson');
		await expect(page.locator('#email')).toHaveValue('test@example.com');
	});
});
