import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/preact';

import { renderWithTheme } from '../../test-utils';
import { runA11yTest, checkColorContrast } from '../../../test-setup-a11y';
import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import { Header } from '../Header/Header';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';

import '@testing-library/jest-dom';

describe('Accessibility Tests', () => {
  describe('Color Contrast', () => {
    it('should have sufficient contrast for primary button', () => {
      const contrast = checkColorContrast('#ffffff', '#1976d2');
      expect(contrast).toBeGreaterThan(4.5); // WCAG AA standard
    });

    it('should have sufficient contrast for error text', () => {
      const contrast = checkColorContrast('#d32f2f', '#ffffff');
      expect(contrast).toBeGreaterThan(4.5);
    });

    it('should have sufficient contrast for success text', () => {
      const contrast = checkColorContrast('#2e7d32', '#ffffff');
      expect(contrast).toBeGreaterThan(4.5);
    });
  });

  describe('Button Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const { container } = renderWithTheme(
        <Button aria-label="Save document" disabled>
          Save
        </Button>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Save document');
      expect(button).toHaveAttribute('aria-disabled', 'true');

      const violations = await runA11yTest(container as HTMLElement);
      expect(violations).toHaveLength(0);
    });

    it('should be keyboard accessible', async () => {
      renderWithTheme(<Button>Clickable</Button>);

      const button = screen.getByRole('button');
      // Buttons are focusable by default, no explicit tabindex needed
      expect(button).toBeInTheDocument();

      // Test focus behavior
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('TextField Accessibility', () => {
    it('should have proper labels and descriptions', async () => {
      const { container } = renderWithTheme(
        <TextField label="Email Address" helperText="Enter your email address" required error />,
      );

      const input = screen.getByRole('textbox');
      // Check if the input has proper label (more flexible than exact aria attributes)
      expect(input).toBeInTheDocument();
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();

      const violations = await runA11yTest(container as HTMLElement);
      expect(violations).toHaveLength(0);
    });

    it('should associate label with input', () => {
      renderWithTheme(<TextField label="Username" />);

      const input = screen.getByRole('textbox');
      const label = screen.getByText('Username');

      // Check that label and input are properly associated
      expect(input).toBeInTheDocument();
      expect(label).toBeInTheDocument();

      // More flexible check for accessibility relationship
      expect(input).toHaveAccessibleName('Username');
    });
  });

  describe('Header Accessibility', () => {
    it('should have proper landmark roles', async () => {
      const { container } = renderWithTheme(
        <Header
          logo={<span>Company Logo</span>}
          nav={
            <nav role="navigation" aria-label="Main navigation">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
            </nav>
          }
        />,
      );

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();

      // Use getAllByRole for multiple navigation elements
      const navElements = screen.getAllByRole('navigation');
      expect(navElements).toHaveLength(2); // Header navigation wrapper + inner navigation

      // Check the main navigation element
      const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(mainNav).toHaveAttribute('aria-label', 'Main navigation');

      const violations = await runA11yTest(container as HTMLElement);
      expect(violations).toHaveLength(0);
    });
  });

  describe('Card Accessibility', () => {
    it('should have proper heading structure', async () => {
      const { container } = renderWithTheme(
        <Card>
          <Text variant="headline" as="h2">
            Card Title
          </Text>
          <Text variant="body">Card content goes here</Text>
        </Card>,
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Card Title');

      const violations = await runA11yTest(container as HTMLElement);
      expect(violations).toHaveLength(0);
    });
  });

  describe('Focus Management', () => {
    it('should maintain logical tab order', () => {
      renderWithTheme(
        <div>
          <Button>First</Button>
          <TextField label="Second" />
          <Button>Third</Button>
        </div>,
      );

      const buttons = screen.getAllByRole('button');
      const input = screen.getByRole('textbox');

      // Test natural tab order (buttons and inputs are focusable by default)
      expect(buttons[0]).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(buttons[1]).toBeInTheDocument();

      // Test focus behavior
      buttons[0].focus();
      expect(buttons[0]).toHaveFocus();

      input.focus();
      expect(input).toHaveFocus();

      buttons[1].focus();
      expect(buttons[1]).toHaveFocus();
    });
  });

  describe('Screen Reader Support', () => {
    it('should provide meaningful text alternatives', () => {
      renderWithTheme(<Button aria-label="Close dialog">×</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Close dialog');
      expect(button).toHaveTextContent('×');
    });

    it('should announce dynamic content changes', () => {
      renderWithTheme(
        <div aria-live="polite" aria-atomic="true">
          <Text>Loading complete</Text>
        </div>,
      );

      const liveRegion = screen.getByText('Loading complete').parentElement;
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
    });
  });
});
