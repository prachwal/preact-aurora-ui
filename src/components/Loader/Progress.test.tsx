import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Progress } from './Progress';
import '@testing-library/jest-dom';

describe('Progress', () => {
  describe('Basic rendering', () => {
    it('renders with default props', () => {
      render(<Progress />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders circular variant by default', () => {
      render(<Progress />);
      const progress = screen.getByRole('progressbar');
      expect(progress.querySelector('svg')).toBeInTheDocument();
    });

    it('renders linear variant when specified', () => {
      render(<Progress variant="linear" />);
      const progress = screen.getByRole('progressbar');
      expect(progress.querySelector('svg')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Progress className="custom-class" />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveClass('custom-class');
    });

    it('applies custom styles', () => {
      render(<Progress style={{ marginTop: '10px' }} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveStyle({ marginTop: '10px' });
    });

    it('sets custom aria-label', () => {
      render(<Progress aria-label="Custom loading" />);
      expect(screen.getByLabelText('Custom loading')).toBeInTheDocument();
    });
  });

  describe('Determinate mode', () => {
    it('renders indeterminate by default', () => {
      render(<Progress />);
      const progress = screen.getByRole('progressbar');
      expect(progress).not.toHaveAttribute('aria-valuenow');
      expect(progress).not.toHaveAttribute('aria-valuemin');
      expect(progress).not.toHaveAttribute('aria-valuemax');
    });

    it('renders determinate progress with value', () => {
      render(<Progress determinate value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '50');
      expect(progress).toHaveAttribute('aria-valuemin', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
    });

    it('clamps value between 0 and 100', () => {
      render(<Progress determinate value={150} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps negative values to 0', () => {
      render(<Progress determinate value={-10} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '0');
    });
  });

  describe('Size variants', () => {
    it('applies small size class', () => {
      render(<Progress size="small" />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress--size-small');
    });

    it('applies medium size class', () => {
      render(<Progress size="medium" />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress--size-medium');
    });

    it('applies large size class', () => {
      render(<Progress size="large" />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress--size-large');
    });

    it('handles custom numeric size for circular', () => {
      render(<Progress variant="circular" size={48} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveStyle({ width: '48px', height: '48px' });
    });
  });

  describe('Color variants', () => {
    it('applies primary color class by default', () => {
      render(<Progress />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress--color-primary');
    });

    it('applies secondary color class', () => {
      render(<Progress color="secondary" />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress--color-secondary');
    });

    it('applies tertiary color class', () => {
      render(<Progress color="tertiary" />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress--color-tertiary');
    });
  });

  describe('Circular variant specific', () => {
    it('renders SVG with correct dimensions', () => {
      render(<Progress variant="circular" size="medium" />);
      const svg = screen.getByRole('progressbar').querySelector('svg');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });

    it('applies custom thickness', () => {
      render(<Progress variant="circular" thickness={6} />);
      const circles = screen.getByRole('progressbar').querySelectorAll('circle');
      circles.forEach((circle) => {
        expect(circle).toHaveAttribute('stroke-width', '6');
      });
    });

    it('applies custom track color', () => {
      render(<Progress variant="circular" trackColor="#ff0000" />);
      // Use a more generic selector since CSS modules change class names
      const svgElement = screen.getByRole('progressbar').querySelector('svg');
      const trackCircle = svgElement?.querySelector('circle:first-child');
      expect(trackCircle).toHaveStyle({ stroke: '#ff0000' });
    });

    it('calculates stroke-dashoffset for determinate progress', () => {
      render(<Progress variant="circular" determinate value={25} />);
      // Use a more generic selector since CSS modules change class names
      const svgElement = screen.getByRole('progressbar').querySelector('svg');
      const indicator = svgElement?.querySelector('circle:last-child');
      expect(indicator).toHaveAttribute('stroke-dashoffset');
    });
  });

  describe('Linear variant specific', () => {
    it('sets width for determinate progress', () => {
      render(<Progress variant="linear" determinate value={75} />);
      // Use generic selector for CSS modules
      const indicator = screen.getByRole('progressbar').querySelector('div:last-child');
      expect(indicator).toHaveStyle({ width: '75%' });
    });

    it('renders buffer indicator when provided', () => {
      render(<Progress variant="linear" determinate value={50} buffer={80} />);
      // Check if buffer div exists (first child div)
      const progressBar = screen.getByRole('progressbar');
      const bufferDiv = progressBar.querySelector('div:first-child');
      expect(bufferDiv).toBeInTheDocument();
      expect(bufferDiv).toHaveStyle({ width: '80%' });
    });

    it('does not render buffer when not provided', () => {
      render(<Progress variant="linear" determinate value={50} />);
      const progressBar = screen.getByRole('progressbar');
      // Should only have one child div (indicator, no buffer)
      const childDivs = progressBar.querySelectorAll('div');
      expect(childDivs).toHaveLength(1);
    });

    it('clamps buffer value between 0 and 100', () => {
      render(<Progress variant="linear" buffer={150} />);
      const progressBar = screen.getByRole('progressbar');
      const bufferDiv = progressBar.querySelector('div:first-child');
      expect(bufferDiv).toHaveStyle({ width: '100%' });
    });
  });

  describe('Animation', () => {
    it('applies custom animation duration', () => {
      render(<Progress animationDuration={3000} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveStyle({ animationDuration: '3000ms' });
    });

    it('applies indeterminate class for infinite animation', () => {
      render(<Progress determinate={false} />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('indeterminate');
    });

    it('does not apply indeterminate class for determinate progress', () => {
      render(<Progress determinate={true} />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).not.toContain('indeterminate');
    });
  });

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<Progress />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('has default aria-label', () => {
      render(<Progress />);
      expect(screen.getByLabelText('Progress indicator')).toBeInTheDocument();
    });

    it('respects custom aria-label', () => {
      render(<Progress aria-label="File upload progress" />);
      expect(screen.getByLabelText('File upload progress')).toBeInTheDocument();
    });

    it('includes data-testid for testing', () => {
      render(<Progress />);
      expect(screen.getByTestId('progress-root')).toBeInTheDocument();
    });
  });

  describe('CSS Module integration', () => {
    it('applies base progress class', () => {
      render(<Progress />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress');
    });

    it('applies variant-specific classes', () => {
      render(<Progress variant="linear" />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress--variant-linear');
    });

    it('combines multiple CSS classes correctly', () => {
      render(<Progress variant="linear" size="large" color="secondary" className="custom" />);
      const progress = screen.getByRole('progressbar');
      expect(progress.className).toContain('progress');
      expect(progress.className).toContain('progress--variant-linear');
      expect(progress.className).toContain('progress--size-large');
      expect(progress.className).toContain('progress--color-secondary');
      expect(progress.className).toContain('custom');
    });
  });
});
