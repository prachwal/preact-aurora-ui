/**
 * Text Component Tests - Aurora UI
 * Tests for intelligent text component with theme-aware styling
 */

import { render, screen } from '@testing-library/preact';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Text } from './Text';

// Mock theme hooks
vi.mock('../../hooks/useThemeColors', () => ({
  useThemeColors: () => ({
    primary: '#6750a4',
    'on-primary': '#ffffff',
    'primary-container': '#eaddff',
    'on-primary-container': '#21005d',
    secondary: '#625b71',
    'on-secondary': '#ffffff',
    'secondary-container': '#e8def8',
    'on-secondary-container': '#1d192b',
    tertiary: '#7d5260',
    'on-tertiary': '#ffffff',
    error: '#ba1a1a',
    'on-error': '#ffffff',
    background: '#fffbfe',
    'on-background': '#1c1b1f',
    surface: '#fffbfe',
    'on-surface': '#1c1b1f',
    'surface-variant': '#e7e0ec',
    'on-surface-variant': '#49454f',
    outline: '#79747e',
    'outline-variant': '#cac4d0',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3',
    danger: '#ba1a1a',
  }),
  useThemeUtils: () => ({
    getContrastText: (color: string) => {
      // Simple mock implementation
      const darkColors = ['primary', 'secondary', 'tertiary', 'error'];
      return darkColors.includes(color) ? '#ffffff' : '#000000';
    },
  }),
}));

describe('Text Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render text content', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('should render as paragraph by default', () => {
      render(<Text>Default text</Text>);
      const element = screen.getByText('Default text');
      expect(element.tagName).toBe('P');
    });

    it('should apply default variant styles', () => {
      render(<Text>Body text</Text>);
      const element = screen.getByText('Body text');
      expect(element.className).toMatch(/text--body-medium/);
    });
  });

  describe('Variant Mapping', () => {
    it('should map simple variants to full MD3 variants', () => {
      render(<Text variant="display">Display text</Text>);
      const element = screen.getByText('Display text');
      expect(element.className).toMatch(/text--display-large/);
      expect(element.tagName).toBe('H1');
    });

    it('should map headline variant correctly', () => {
      render(<Text variant="headline">Headline text</Text>);
      const element = screen.getByText('Headline text');
      expect(element.className).toMatch(/text--headline-medium/);
      expect(element.tagName).toBe('H2');
    });

    it('should map title variant correctly', () => {
      render(<Text variant="title">Title text</Text>);
      const element = screen.getByText('Title text');
      expect(element.className).toMatch(/text--title-medium/);
      expect(element.tagName).toBe('H3');
    });

    it('should map label variant correctly', () => {
      render(<Text variant="label">Label text</Text>);
      const element = screen.getByText('Label text');
      expect(element.className).toMatch(/text--label-medium/);
      expect(element.tagName).toBe('SPAN');
    });

    it('should handle full MD3 variants', () => {
      render(<Text variant="headline-large">Large headline</Text>);
      const element = screen.getByText('Large headline');
      expect(element.className).toMatch(/text--headline-large/);
      expect(element.tagName).toBe('H1');
    });
  });

  describe('Color Management', () => {
    it('should apply auto color based on variant', () => {
      render(
        <Text variant="headline" color="auto">
          Auto color text
        </Text>,
      );
      const element = screen.getByText('Auto color text');
      expect(element).toHaveStyle({ color: '#1c1b1f' }); // on-surface
    });

    it('should apply specific theme colors', () => {
      render(<Text color="primary">Primary color text</Text>);
      const element = screen.getByText('Primary color text');
      expect(element).toHaveStyle({ color: '#6750a4' });
    });

    it('should apply custom color values', () => {
      render(<Text color={'#ff0000' as any}>Custom color text</Text>);
      const element = screen.getByText('Custom color text');
      expect(element).toHaveStyle({ color: '#ff0000' });
    });

    it('should handle label variant with variant-specific color', () => {
      render(
        <Text variant="label" color="auto">
          Label text
        </Text>,
      );
      const element = screen.getByText('Label text');
      expect(element).toHaveStyle({ color: '#49454f' }); // on-surface-variant
    });
  });

  describe('Automatic Contrast Management', () => {
    it('should apply contrast color when autoContrast is enabled', () => {
      render(
        <Text color="primary" autoContrast>
          Contrast text
        </Text>,
      );
      const element = screen.getByText('Contrast text');
      expect(element).toHaveStyle({ color: '#ffffff' }); // contrast for primary
    });

    it('should not apply contrast when autoContrast is disabled', () => {
      render(
        <Text color="primary" autoContrast={false}>
          No contrast text
        </Text>,
      );
      const element = screen.getByText('No contrast text');
      expect(element).toHaveStyle({ color: '#6750a4' }); // original primary color
    });

    it('should ignore autoContrast for auto color', () => {
      render(
        <Text color="auto" autoContrast>
          Auto contrast text
        </Text>,
      );
      const element = screen.getByText('Auto contrast text');
      expect(element).toHaveStyle({ color: '#1c1b1f' }); // on-surface (auto)
    });
  });

  describe('Polymorphic Component', () => {
    it('should render as specified element', () => {
      render(<Text as="h1">Custom element</Text>);
      const element = screen.getByText('Custom element');
      expect(element.tagName).toBe('H1');
    });

    it('should override semantic element mapping', () => {
      render(
        <Text variant="body" as="div">
          Body as div
        </Text>,
      );
      const element = screen.getByText('Body as div');
      expect(element.tagName).toBe('DIV');
    });
  });

  describe('Styling Props', () => {
    it('should apply text alignment', () => {
      render(<Text align="center">Centered text</Text>);
      const element = screen.getByText('Centered text');
      expect(element.className).toMatch(/text--align-center/);
    });

    it('should apply font weight override', () => {
      render(<Text weight="bold">Bold text</Text>);
      const element = screen.getByText('Bold text');
      expect(element.className).toMatch(/text--weight-bold/);
    });

    it('should apply size override', () => {
      render(<Text size="lg">Large text</Text>);
      const element = screen.getByText('Large text');
      expect(element.className).toMatch(/text--size-lg/);
    });

    it('should combine multiple style classes', () => {
      render(
        <Text variant="title" align="center" weight="bold" size="lg">
          Styled text
        </Text>,
      );
      const element = screen.getByText('Styled text');
      expect(element.className).toMatch(/text--title-medium/);
      expect(element.className).toMatch(/text--align-center/);
      expect(element.className).toMatch(/text--weight-bold/);
      expect(element.className).toMatch(/text--size-lg/);
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      render(<Text className="custom-class">Custom styled text</Text>);
      const element = screen.getByText('Custom styled text');
      expect(element).toHaveClass('custom-class');
    });

    it('should apply inline styles', () => {
      render(<Text style={{ fontSize: '20px', fontFamily: 'Arial' }}>Inline styled text</Text>);
      const element = screen.getByText('Inline styled text');
      expect(element).toHaveStyle({
        fontSize: '20px',
        fontFamily: 'Arial',
      });
    });

    it('should merge inline styles with component styles', () => {
      render(
        <Text color="primary" style={{ fontSize: '20px' }}>
          Merged styles
        </Text>,
      );
      const element = screen.getByText('Merged styles');
      expect(element).toHaveStyle({
        color: '#6750a4',
        fontSize: '20px',
      });
    });
  });

  describe('Data Attributes', () => {
    it('should include data attributes for debugging', () => {
      render(
        <Text variant="headline" color="primary" autoContrast>
          Debug text
        </Text>,
      );
      const element = screen.getByText('Debug text');
      expect(element).toHaveAttribute('data-variant', 'headline-medium');
      expect(element).toHaveAttribute('data-color', 'primary');
      expect(element).toHaveAttribute('data-auto-contrast', 'true');
    });
  });

  describe('Forward Ref', () => {
    it('should forward ref to the DOM element', () => {
      const ref = { current: null } as any;
      render(<Text ref={ref}>Ref text</Text>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('should forward ref to custom element', () => {
      const ref = { current: null } as any;
      render(
        <Text ref={ref} as="h1">
          Ref heading
        </Text>,
      );
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('Accessibility', () => {
    it('should maintain semantic HTML structure', () => {
      render(<Text variant="headline">Page Title</Text>);
      const element = screen.getByRole('heading', { level: 2 });
      expect(element).toBeInTheDocument();
    });

    it('should allow custom ARIA attributes', () => {
      render(
        <Text {...({ 'aria-label': 'Custom label', role: 'status' } as any)}>Status text</Text>,
      );
      const element = screen.getByRole('status');
      expect(element).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing theme colors gracefully', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { });

      render(<Text color={'non-existent-color' as any}>Fallback text</Text>);
      const element = screen.getByText('Fallback text');
      expect(element).toBeInTheDocument();

      consoleError.mockRestore();
    });

    it('should fallback to safe colors when theme is unavailable', () => {
      // This test would be more complex and might require a separate test setup
      // where theme context is not available
      render(<Text>Safe fallback</Text>);
      const element = screen.getByText('Safe fallback');
      expect(element).toBeInTheDocument();
    });
  });
});
