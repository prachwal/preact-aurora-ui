import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Loader } from './Loader';
import '@testing-library/jest-dom';

describe('Loader (Legacy Compatibility)', () => {
  it('renders with default props', () => {
    render(<Loader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies legacy size mapping - sm to small', () => {
    render(<Loader size="sm" />);
    const loader = screen.getByRole('progressbar');
    expect(loader.className).toContain('progress--size-small');
  });

  it('applies legacy size mapping - md to medium', () => {
    render(<Loader size="md" />);
    const loader = screen.getByRole('progressbar');
    expect(loader.className).toContain('progress--size-medium');
  });

  it('applies legacy size mapping - lg to large', () => {
    render(<Loader size="lg" />);
    const loader = screen.getByRole('progressbar');
    expect(loader.className).toContain('progress--size-large');
  });

  it('applies custom color through styles', () => {
    render(<Loader color="#f00" />);
    expect(screen.getByRole('progressbar')).toHaveStyle({ color: '#f00' });
  });

  it('sets Polish loading aria-label by default', () => {
    render(<Loader />);
    expect(screen.getByLabelText('Ładowanie...')).toBeInTheDocument();
  });

  it('allows custom aria-label', () => {
    render(<Loader aria-label="Czekaj" />);
    expect(screen.getByLabelText('Czekaj')).toBeInTheDocument();
  });

  it('renders as circular variant', () => {
    render(<Loader />);
    const loader = screen.getByRole('progressbar');
    expect(loader.querySelector('svg')).toBeInTheDocument();
  });

  it('is always indeterminate (no value attributes)', () => {
    render(<Loader />);
    const loader = screen.getByRole('progressbar');
    expect(loader).not.toHaveAttribute('aria-valuenow');
    expect(loader).not.toHaveAttribute('aria-valuemin');
    expect(loader).not.toHaveAttribute('aria-valuemax');
  });

  it('uses primary color by default', () => {
    render(<Loader />);
    const loader = screen.getByRole('progressbar');
    expect(loader.className).toContain('progress--color-primary');
  });

  it('applies custom className', () => {
    render(<Loader className="custom-loader" />);
    const loader = screen.getByRole('progressbar');
    expect(loader).toHaveClass('custom-loader');
  });

  it('applies custom styles', () => {
    render(<Loader style={{ margin: '20px' }} />);
    const loader = screen.getByRole('progressbar');
    expect(loader).toHaveStyle({ margin: '20px' });
  });

  it('uses progress-root as testid for consistency', () => {
    render(<Loader />);
    expect(screen.getByTestId('progress-root')).toBeInTheDocument();
  });
});
