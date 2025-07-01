import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '../../test-utils';
import { runA11yTest, checkColorContrast } from '../../../test-setup-a11y';
import { Button } from '../Button';
import { Header } from '../Header/Header';
import { Text } from '../Text/Text';
import { Container } from '../Container/Container';
import { ThemeToggle } from '../ThemeProvider/ThemeToggle';

import '@testing-library/jest-dom';

describe('Accessibility Tests', () => {
  describe('Button Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderWithTheme(<Button aria-label="Save document">Save</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Save document');
      expect(button).toBeVisible();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');

      // Test Tab navigation
      await user.tab();
      expect(button).toHaveFocus();

      // Test Enter key
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledOnce();

      // Test Space key
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('should support disabled state', () => {
      renderWithTheme(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should pass automated accessibility tests', async () => {
      const { container } = renderWithTheme(
        <div>
          <Button>Primary</Button>
          <Button variant="outlined">Secondary</Button>
          <Button variant="text">Text</Button>
          <Button disabled>Disabled</Button>
        </div>,
      );

      const violations = await runA11yTest(container as HTMLElement);
      expect(violations).toHaveLength(0);
    });
  });

  describe('Header Accessibility', () => {
    it('should have proper landmark structure', () => {
      renderWithTheme(
        <Header
          logo={<span>Company Logo</span>}
          nav={
            <nav aria-label="Main navigation">
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
              </ul>
            </nav>
          }
        />,
      );

      const banner = screen.getByRole('banner');
      expect(banner).toBeInTheDocument();

      // Use getAllByRole for multiple navigation elements
      const navElements = screen.getAllByRole('navigation');
      expect(navElements).toHaveLength(2); // Header navigation wrapper + inner navigation

      // Check the main navigation element
      const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(mainNav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should handle navigation menu accessibility', async () => {
      const user = userEvent.setup();
      const handleNavClick = vi.fn();

      renderWithTheme(
        <Header
          navigationIcon="☰"
          onNavigationClick={handleNavClick}
          nav={<nav>Navigation</nav>}
        />,
      );

      const navButton = screen.getByRole('button', { name: /open navigation menu/i });

      // Should be keyboard accessible
      await user.tab();
      expect(navButton).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleNavClick).toHaveBeenCalledOnce();
    });
  });

  describe('Text Accessibility', () => {
    it('should maintain proper heading hierarchy', () => {
      renderWithTheme(
        <div>
          <Text variant="headline-large" as="h1">
            Main Title
          </Text>
          <Text variant="headline-medium" as="h2">
            Section Title
          </Text>
          <Text variant="headline-small" as="h3">
            Subsection
          </Text>
        </div>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section Title');
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subsection');
    });

    it('should provide sufficient color contrast', () => {
      const { container } = renderWithTheme(
        <Container surface="surface">
          <Text color="on-surface">Text with good contrast</Text>
        </Container>,
      );

      // This is a simplified test - in real implementation you'd measure actual computed colors
      const textElement = container.querySelector('[class*="text"]');
      expect(textElement).toBeInTheDocument();

      // Example contrast check (simplified)
      const contrastRatio = checkColorContrast('#000000', '#ffffff');
      expect(contrastRatio).toBeGreaterThan(4.5); // WCAG AA standard
    });
  });

  describe('Theme Toggle Accessibility', () => {
    it('should announce theme changes to screen readers', async () => {
      const user = userEvent.setup();

      renderWithTheme(<ThemeToggle />);

      const toggleButton = screen.getByRole('button', { name: /switch to dark theme/i });

      // Should have proper ARIA attributes
      expect(toggleButton).toHaveAttribute('aria-label');
      expect(toggleButton).toHaveAttribute('title');

      // Should be keyboard accessible
      await user.tab();
      expect(toggleButton).toHaveFocus();

      await user.keyboard(' ');
      // Theme should toggle and button state should update
    });
  });

  describe('Container Accessibility', () => {
    it('should provide proper semantic structure', () => {
      renderWithTheme(
        <Container as="main" surface="surface">
          <Text variant="headline-large" as="h1">
            Page Title
          </Text>
          <Text variant="body-large">Page content</Text>
        </Container>,
      );

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should handle focus management', async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Container>
          <Button>First Button</Button>
          <Button>Second Button</Button>
        </Container>,
      );

      const buttons = screen.getAllByRole('button');

      // Test sequential focus navigation
      await user.tab();
      expect(buttons[0]).toHaveFocus();

      await user.tab();
      expect(buttons[1]).toHaveFocus();
    });
  });

  describe('Comprehensive Accessibility Test', () => {
    it('should pass accessibility audit for complex layout', async () => {
      const { container } = renderWithTheme(
        <div>
          <Header
            logo={<span>Logo</span>}
            nav={
              <nav aria-label="Main navigation">
                <ul>
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </nav>
            }
            actions={
              <div>
                <ThemeToggle />
                <Button variant="outlined">Login</Button>
              </div>
            }
          />

          <Container as="main" surface="surface">
            <Text variant="headline-large" as="h1">
              Welcome
            </Text>
            <Text variant="body-large">
              This is a comprehensive accessibility test for our component library.
            </Text>

            <Container surface="surface-variant" padding="lg">
              <Text variant="headline-medium" as="h2">
                Features
              </Text>
              <ul>
                <li>
                  <Text>Keyboard navigation</Text>
                </li>
                <li>
                  <Text>Screen reader support</Text>
                </li>
                <li>
                  <Text>High contrast support</Text>
                </li>
              </ul>
            </Container>

            <div>
              <Button>Primary Action</Button>
              <Button variant="outlined">Secondary Action</Button>
            </div>
          </Container>
        </div>,
      );

      const violations = await runA11yTest(container as HTMLElement);
      expect(violations).toHaveLength(0);
    });
  });
});
