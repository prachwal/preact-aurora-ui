import { test, expect } from '@playwright/test';

test.describe('Button Component Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=example-button--primary');
  });

  test('should be visible and clickable', async ({ page }) => {
    const button = page.getByRole('button').first();

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();

    await button.click();
    // Could check for actions panel or console output in Storybook
  });

  test('should handle keyboard navigation', async ({ page }) => {
    const button = page.getByRole('button').first();

    await button.focus();
    await expect(button).toBeFocused();

    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');
  });

  test('should maintain focus styles', async ({ page }) => {
    const button = page.getByRole('button').first();

    await button.focus();

    // Check if focus styles are applied
    const focusedStyle = await button.evaluate((el) => {
      return window.getComputedStyle(el).outline;
    });

    expect(focusedStyle).not.toBe('none');
  });
});

test.describe('Theme System Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=theme-themetoggle--default');
  });

  test('should toggle theme on click', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });

    // Check initial theme
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });

    await themeToggle.click();

    // Check theme changed
    const newTheme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });

    expect(newTheme).not.toBe(initialTheme);
  });

  test('should persist theme preference', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });

    await themeToggle.click();

    const themeAfterToggle = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });

    // Reload page
    await page.reload();

    const themeAfterReload = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });

    expect(themeAfterReload).toBe(themeAfterToggle);
  });
});

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should render correctly on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/iframe.html?id=layout-header--with-all-props');

      const header = page.getByRole('banner');
      await expect(header).toBeVisible();

      // Take screenshot for visual regression testing
      await expect(page).toHaveScreenshot(`header-${name.toLowerCase()}.png`);
    });
  });
});

test.describe('Accessibility Integration', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/iframe.html?id=example-button--primary');

    // Inject axe-core
    await page.addScriptTag({
      url: 'https://unpkg.com/axe-core@4.9.1/axe.min.js',
    });

    // Run accessibility scan
    const results = await page.evaluate(() => {
      return new Promise((resolve) => {
        (window as any).axe.run(document, (err: any, results: any) => {
          if (err) throw err;
          resolve(results);
        });
      });
    });

    expect((results as any).violations).toHaveLength(0);
  });

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=layout-header--with-navigation');

    // Test landmark navigation
    const banner = page.getByRole('banner');
    const navigation = page.getByRole('navigation');

    await expect(banner).toBeVisible();
    await expect(navigation).toBeVisible();

    // Test heading hierarchy
    const headings = page.getByRole('heading');
    const headingLevels = await headings.allTextContents();

    expect(headingLevels.length).toBeGreaterThan(0);
  });
});

test.describe('Performance Integration', () => {
  test('should load within performance budget', async ({ page }) => {
    // Start performance measurement
    await page.goto('/iframe.html?id=example-button--primary', {
      waitUntil: 'networkidle',
    });

    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      };
    });

    // Performance assertions
    expect(metrics.loadTime).toBeLessThan(3000); // 3 seconds
    expect(metrics.domContentLoaded).toBeLessThan(1000); // 1 second
  });

  test('should handle rapid interactions without performance degradation', async ({ page }) => {
    await page.goto('/iframe.html?id=example-button--primary');

    const button = page.getByRole('button').first();

    // Rapid clicks
    const startTime = Date.now();
    for (let i = 0; i < 10; i++) {
      await button.click();
    }
    const endTime = Date.now();

    const totalTime = endTime - startTime;
    const averageTime = totalTime / 10;

    expect(averageTime).toBeLessThan(100); // Less than 100ms per interaction
  });
});
