import { test, expect } from '@playwright/test';

test.describe('Tool - PL Gear Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/PL-Gear-Generator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('PL Gear Generator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});