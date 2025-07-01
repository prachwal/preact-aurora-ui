/**
 * Container Component Tests - Aurora UI
 * Comprehensive unit and integration tests for Container component
 */

import { render, screen } from '@testing-library/preact';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Container } from './Container';
import type { ContainerProps } from './Container';
import styles from './Container.module.scss';

// Mock the theme hooks
const mockColors = {
  surface: '#fef7ff',
  'surface-variant': '#f3eff4',
  'surface-container': '#ebe6ec',
  'surface-container-low': '#f7f2f8',
  'surface-container-high': '#ece6f0',
  'surface-container-highest': '#e6e0e9',
  'primary-container': '#eaddff',
  'secondary-container': '#e8def8',
  'tertiary-container': '#ffd8e4',
  'error-container': '#f9dedc',
  'on-surface': '#1d1b20',
  'on-surface-variant': '#49454f',
  'on-primary-container': '#21005d',
  'on-secondary-container': '#1d192b',
  'on-tertiary-container': '#31111d',
  'on-error-container': '#410e0b',
  primary: '#6750a4',
};

const mockGetSurfaceColor = vi.fn((elevation: number) => {
  const elevationColors = {
    0: mockColors.surface,
    1: '#f9f5fa',
    2: '#f5f1f6',
    3: '#f1ecf2',
    4: '#ede8ee',
    5: '#e9e3ea',
  };
  return elevationColors[elevation as keyof typeof elevationColors] || mockColors.surface;
});

const mockGetContrastText = vi.fn((color: string) => {
  return color.includes('f') ? mockColors['on-surface'] : '#ffffff';
});

vi.mock('../../hooks/useThemeColors', () => ({
  useThemeColors: () => mockColors,
  useThemeUtils: () => ({
    getSurfaceColor: mockGetSurfaceColor,
    getContrastText: mockGetContrastText,
  }),
}));

describe('Container Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Container>
          <div data-testid="child">Test Content</div>
        </Container>,
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      render(<Container data-testid="container">Content</Container>);

      expect(screen.getByTestId('container').tagName).toBe('DIV');
    });

    it('renders with custom element when as prop is provided', () => {
      render(
        <Container as="section" data-testid="container">
          Content
        </Container>,
      );

      expect(screen.getByTestId('container').tagName).toBe('SECTION');
    });
  });

  describe('Surface and Color Management', () => {
    it('applies default surface styling', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ backgroundColor: mockColors.surface });
      expect(container).toHaveStyle({ color: mockColors['on-surface'] });
      expect(container).toHaveAttribute('data-surface', 'surface');
    });

    it('applies primary-container surface styling', () => {
      render(
        <Container surface="primary-container" data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ backgroundColor: mockColors['primary-container'] });
      expect(container).toHaveStyle({ color: mockColors['on-primary-container'] });
      expect(container).toHaveAttribute('data-surface', 'primary-container');
    });

    it('applies surface-variant styling', () => {
      render(
        <Container surface="surface-variant" data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ backgroundColor: mockColors['surface-variant'] });
      expect(container).toHaveStyle({ color: mockColors['on-surface-variant'] });
    });

    it('disables auto text color when autoTextColor is false', () => {
      render(
        <Container autoTextColor={false} data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({ backgroundColor: mockColors.surface });
      expect(container.style.color).toBe('');
      expect(container).toHaveAttribute('data-auto-text-color', 'false');
    });
  });

  describe('Elevation and Surface Colors', () => {
    it('applies elevation 0 by default', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveAttribute('data-elevation', '0');
      expect(mockGetSurfaceColor).toHaveBeenCalledWith(0);
    });

    it('applies elevation 2 styling', () => {
      render(
        <Container elevation={2} data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).toHaveAttribute('data-elevation', '2');
      expect(container).toHaveClass(styles['container--elevation-2']);
      expect(mockGetSurfaceColor).toHaveBeenCalledWith(2);
    });

    it('applies elevation 5 styling', () => {
      render(
        <Container elevation={5} data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).toHaveClass(styles['container--elevation-5']);
      expect(mockGetSurfaceColor).toHaveBeenCalledWith(5);
    });
  });

  describe('Padding Variants', () => {
    it('applies default medium padding', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass(styles['container--padding-md']);
      expect(container).toHaveAttribute('data-padding', 'md');
    });

    it('applies custom padding sizes', () => {
      const sizes: ContainerProps['padding'][] = ['none', 'xs', 'sm', 'lg', 'xl', '2xl'];

      sizes.forEach((size) => {
        render(
          <Container padding={size} data-testid={`container-padding-${size}`}>
            Content
          </Container>,
        );

        const container = screen.getByTestId(`container-padding-${size}`);
        expect(container).toHaveClass(styles[`container--padding-${size}`]);
        expect(container).toHaveAttribute('data-padding', size);
      });
    });
  });

  describe('Max Width Constraints', () => {
    it('applies no max-width by default', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      // Check that no max-width classes are present
      const classNames = container.className;
      expect(classNames).not.toMatch(/max-width/);
    });

    it('applies max-width constraints', () => {
      const sizes: ContainerProps['maxWidth'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];

      sizes.forEach((size) => {
        render(
          <Container maxWidth={size} data-testid={`container-${size}`}>
            Content
          </Container>,
        );

        const container = screen.getByTestId(`container-${size}`);
        expect(container).toHaveClass(styles[`container--max-width-${size}`]);
      });
    });
  });

  describe('Border Radius', () => {
    it('applies default medium radius', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass(styles['container--radius-md']);
    });

    it('applies custom radius sizes', () => {
      const radii: ContainerProps['radius'][] = ['none', 'sm', 'lg', 'xl', 'full'];

      radii.forEach((radius) => {
        render(
          <Container radius={radius} data-testid={`container-${radius}`}>
            Content
          </Container>,
        );

        const container = screen.getByTestId(`container-${radius}`);
        expect(container).toHaveClass(styles[`container--radius-${radius}`]);
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive class by default', () => {
      render(<Container data-testid="container">Content</Container>);

      const container = screen.getByTestId('container');
      expect(container).toHaveClass(styles['container--responsive']);
    });

    it('removes responsive class when responsive is false', () => {
      render(
        <Container responsive={false} data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).not.toHaveClass(styles['container--responsive']);
    });
  });

  describe('Props and Attributes', () => {
    it('applies custom className', () => {
      render(
        <Container className="custom-class" data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).toHaveClass('custom-class');
    });

    it('applies custom inline styles', () => {
      const customStyle = { marginTop: '20px', fontSize: '16px' };

      render(
        <Container style={customStyle} data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle(customStyle);
    });

    it('merges custom styles with component styles', () => {
      render(
        <Container
          style={{ marginTop: '20px' }}
          surface="primary-container"
          data-testid="container"
        >
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      expect(container).toHaveStyle({
        marginTop: '20px',
        backgroundColor: mockColors['primary-container'],
        color: mockColors['on-primary-container'],
      });
    });
  });

  describe('Complex Usage Scenarios', () => {
    it('combines multiple props correctly', () => {
      render(
        <Container
          surface="secondary-container"
          padding="lg"
          elevation={3}
          maxWidth="md"
          radius="lg"
          responsive={true}
          className="custom-container"
          data-testid="container"
        >
          Complex Content
        </Container>,
      );

      const container = screen.getByTestId('container');

      // Check classes
      expect(container).toHaveClass('custom-container');
      expect(container).toHaveClass(styles['container--padding-lg']);
      expect(container).toHaveClass(styles['container--elevation-3']);
      expect(container).toHaveClass(styles['container--max-width-md']);
      expect(container).toHaveClass(styles['container--radius-lg']);
      expect(container).toHaveClass(styles['container--responsive']);

      // Check styles
      expect(container).toHaveStyle({
        backgroundColor: mockColors['secondary-container'],
        color: mockColors['on-secondary-container'],
      });

      // Check data attributes
      expect(container).toHaveAttribute('data-surface', 'secondary-container');
      expect(container).toHaveAttribute('data-elevation', '3');
      expect(container).toHaveAttribute('data-padding', 'lg');
      expect(container).toHaveAttribute('data-auto-text-color', 'true');
    });

    it('works with nested containers', () => {
      render(
        <Container surface="surface" data-testid="outer-container">
          <Container surface="primary-container" data-testid="inner-container">
            Nested Content
          </Container>
        </Container>,
      );

      const outerContainer = screen.getByTestId('outer-container');
      const innerContainer = screen.getByTestId('inner-container');

      expect(outerContainer).toHaveStyle({ backgroundColor: mockColors.surface });
      expect(innerContainer).toHaveStyle({ backgroundColor: mockColors['primary-container'] });
      expect(screen.getByText('Nested Content')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles invalid surface gracefully', () => {
      render(
        <Container surface={'invalid' as any} data-testid="container">
          Content
        </Container>,
      );

      const container = screen.getByTestId('container');
      // Should fall back to default surface color
      expect(container).toHaveStyle({ backgroundColor: mockColors.surface });
    });
  });
});
