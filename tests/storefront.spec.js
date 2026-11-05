import { expect, test } from '@playwright/test';

const mockSupabaseInsert = async (page, responseForTable = () => ({ status: 201, body: '' })) => {
  const submittedRows = [];
  const readRequests = [];
  await page.route('http://127.0.0.1:54321/rest/v1/**', async (route) => {
    if (route.request().method() !== 'POST') {
      if (route.request().method() === 'GET') {
        readRequests.push(new URL(route.request().url()).pathname.split('/').pop());
      }
      await route.continue();
      return;
    }

    const table = new URL(route.request().url()).pathname.split('/').pop();
    submittedRows.push({ table, body: route.request().postDataJSON() });
    const response = responseForTable(table);
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: response.body,
    });
  });
  return { submittedRows, readRequests };
};

const openStorefront = (page) => page.goto('/', { waitUntil: 'domcontentloaded' });

test('renders the storefront without a blocking startup overlay', async ({ page }) => {
  await openStorefront(page);

  await expect(page.locator('#home h1')).toBeVisible();
  await expect(page.locator('[aria-label="Loading Patao Pocket Patio"]')).toHaveCount(0);
  await expect(page.locator('.scroll-progress-bar')).toHaveCount(1);
});

test('navigates to the plant gallery, filters cards, and returns to a home section', async ({ page }) => {
  await openStorefront(page);
  await page.getByRole('link', { name: 'Gallery', exact: true }).click();
  await expect(page).toHaveURL(/\/gallery$/);
  await expect(page.getByRole('heading', { name: 'Plant Collection' })).toBeVisible();

  await page.getByRole('button', { name: /Outdoor & Fruit/ }).click();
  await expect(page.getByText(/\d+ of 50 plants/)).toBeVisible();

  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.locator('#about')).toBeVisible();
});

test('keeps the home page and gallery within mobile, tablet, and desktop viewport widths', async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await openStorefront(page);
    await expect(page.locator('#home')).toBeVisible();
    const homeWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(homeWidth, `Home page overflows at ${viewport.width}px`).toBeLessThanOrEqual(viewport.width);

    await page.goto('/gallery', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Plant Collection' })).toBeVisible();
    const galleryWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(galleryWidth, `Gallery overflows at ${viewport.width}px`).toBeLessThanOrEqual(viewport.width);
  }
});

test('shows the animated hero content without the category label', async ({ page }) => {
  await openStorefront(page);

  const hero = page.locator('#home');
  await expect(hero.getByText('Botanical garden & plant shop', { exact: true })).toHaveCount(0);
  await expect(hero.getByRole('heading', { name: /Escape into nature’s hidden paradise/ })).toBeVisible();
  await expect(hero.getByText(/Wander through a garden sanctuary/)).toBeVisible();
  await expect(hero.getByRole('button', { name: /Plan your visit/ })).toBeVisible();
  await expect(hero.getByRole('link', { name: 'Explore our plants' })).toBeVisible();
});

test('keeps experience ticker moving continuously without pause controls', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openStorefront(page);

  const ticker = page.locator('.marquee-track');
  await expect(ticker).toBeVisible();
  await expect(page.getByRole('button', { name: /pause|resume/i })).toHaveCount(0);

  const initialTransform = await ticker.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(300);
  const nextTransform = await ticker.evaluate((element) => getComputedStyle(element).transform);
  const animationIterationCount = await ticker.evaluate(
    (element) => getComputedStyle(element).animationIterationCount
  );

  expect(animationIterationCount).toBe('infinite');
  expect(nextTransform).not.toBe(initialTransform);
});

test('crossfades the hero background through the final slide and back to the first', async ({ page }) => {
  await page.clock.install();
  await openStorefront(page);

  const slides = page.locator('#home [data-testid="hero-background-slide"]');
  await expect(slides).toHaveCount(3);
  await expect(slides.first()).toHaveAttribute('data-image', /bon\.webp/);
  await expect.poll(() => slides.first().evaluate(
    (element) => getComputedStyle(element).transitionDuration
  )).toBe('1.6s');

  await page.clock.runFor(12_000);
  await expect(slides.nth(2)).toHaveAttribute('data-active', 'true');
  await page.clock.runFor(6_000);
  await expect(slides.first()).toHaveAttribute('data-active', 'true');
});

test('crossfades About and mobile plant photos smoothly', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openStorefront(page);

  const aboutSection = page.locator('#about');
  await aboutSection.scrollIntoViewIfNeeded();
  const aboutPhoto = aboutSection.locator('.photo-crossfade').first();
  await expect(aboutPhoto).toBeVisible();
  await expect.poll(() => aboutPhoto.evaluate(
    (element) => getComputedStyle(element).transitionDuration
  )).toBe('0.65s');

  const plantsSection = page.getByRole('heading', { name: 'Browse Our Plants' }).locator('xpath=ancestor::section');
  await plantsSection.scrollIntoViewIfNeeded();
  const plantPhotos = plantsSection.locator('.photo-crossfade');
  await expect(plantPhotos.first()).toBeVisible();
  await plantsSection.getByRole('button', { name: 'Show plant 2' }).click();
  await expect(plantPhotos.nth(1)).toHaveClass(/opacity-100/);
  await expect.poll(() => plantPhotos.first().evaluate(
    (element) => getComputedStyle(element).transitionDuration
  )).toBe('0.65s');
});

test('shows sanctuary feature cards with photo backgrounds and overlaid text', async ({ page }) => {
  await openStorefront(page);

  const cards = page.locator('#about article');
  await expect(cards).toHaveCount(4);
  for (const [index, title] of [
    [0, 'Botanical Garden'],
    [1, 'Garden Pool'],
    [2, 'Photography Spot'],
    [3, 'Plant Shop'],
  ]) {
    const card = cards.nth(index);
    await expect(card.getByRole('heading', { name: title })).toBeVisible();
    await expect(card.locator('img')).toHaveAttribute('src', /\/assets\/.+\.webp/);
    const contentPosition = await card.locator('h4').evaluate(
      (element) => getComputedStyle(element.parentElement).position
    );
    expect(contentPosition).toBe('relative');
  }
});

test('submits a booking request through the public insert-only endpoint', async ({ page }) => {
  const { submittedRows } = await mockSupabaseInsert(page);
  await openStorefront(page);
  await page.getByRole('button', { name: 'Book a Visit' }).click();

  const dialog = page.getByRole('dialog', { name: 'Book Your Visit' });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel('Full name').fill('Test Visitor');
  await dialog.getByLabel('Email address').fill('visitor@example.test');
  await dialog.getByRole('button', { name: 'Confirm Booking' }).click();

  await expect(dialog.getByText('Booking Received!')).toBeVisible();
  expect(submittedRows).toHaveLength(1);
  expect(submittedRows[0].table).toBe('booking_inquiries');
  expect(submittedRows[0].body[0].preferred_date).toBeNull();
});

test('traps booking dialog focus, closes with Escape, and restores focus', async ({ page }) => {
  await openStorefront(page);
  const trigger = page.getByRole('button', { name: 'Book a Visit' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Book Your Visit' });
  const nameInput = dialog.getByLabel('Full name');
  await expect(nameInput).toBeFocused();

  const closeButton = dialog.getByRole('button', { name: 'Close booking form' });
  await closeButton.focus();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Confirm Booking' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(closeButton).toBeFocused();
  await page.keyboard.press('Escape');

  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('submits contact and newsletter forms without requesting private row reads', async ({ page }) => {
  const { submittedRows, readRequests } = await mockSupabaseInsert(page);
  await openStorefront(page);

  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Your email').fill('visitor@example.test');
  await page.getByLabel('Your message').fill('Testing the contact form.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Message Sent!')).toBeVisible();

  const newsletter = page.locator('footer').getByLabel('Email address');
  await newsletter.fill('newsletter@example.test');
  await page.locator('footer').getByRole('button', { name: 'Sign up' }).click();
  await expect(page.locator('footer').getByRole('status')).toContainText(/welcome/i);

  expect(submittedRows.map((row) => row.table).sort()).toEqual([
    'contact_messages',
    'newsletter_subscribers',
  ]);
  expect(readRequests).toEqual([]);
});

test('shows a retryable form error when the backend rejects a public submission', async ({ page }) => {
  await mockSupabaseInsert(page, () => ({
    status: 503,
    body: JSON.stringify({ message: 'Service unavailable' }),
  }));
  await openStorefront(page);

  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Your email').fill('visitor@example.test');
  await page.getByLabel('Your message').fill('Testing the error state.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByRole('alert')).toContainText(/try again/i);
});
