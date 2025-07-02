import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

import { DocsLayout } from './DocsLayout';
import { ThemeProvider } from '../ThemeProvider';

// Wrapper component with ThemeProvider
function TestWrapper({ children }: { children: any }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('DocsLayout', () => {
  it('renders with default props', () => {
    render(
      <TestWrapper>
        <DocsLayout>
          <div>Test content</div>
        </DocsLayout>
      </TestWrapper>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Aurora UI')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <TestWrapper>
        <DocsLayout className="custom-class">
          <div>Test content</div>
        </DocsLayout>
      </TestWrapper>
    );

    const container = screen.getByLabelText('Aurora UI Documentation');
    expect(container).toHaveClass('custom-class');
  });

  it('applies background variant classes', () => {
    const { rerender } = render(
      <TestWrapper>
        <DocsLayout backgroundVariant="homepage">
          <div>Test content</div>
        </DocsLayout>
      </TestWrapper>
    );

    const container = screen.getByLabelText('Aurora UI Documentation');
    expect(container.className).toContain('variant-homepage');

    rerender(
      <TestWrapper>
        <DocsLayout backgroundVariant="readme">
          <div>Test content</div>
        </DocsLayout>
      </TestWrapper>
    );

    expect(container.className).toContain('variant-readme');
  });

  it('has proper semantic structure', () => {
    render(
      <TestWrapper>
        <DocsLayout>
          <div>Test content</div>
        </DocsLayout>
      </TestWrapper>
    );

    // Header
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Main content
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Logo elements
    expect(screen.getByText('🌟')).toBeInTheDocument();
    expect(screen.getByText('Aurora UI')).toBeInTheDocument();
  });

  it('applies custom aria-label', () => {
    render(
      <TestWrapper>
        <DocsLayout aria-label="Custom Documentation">
          <div>Test content</div>
        </DocsLayout>
      </TestWrapper>
    );

    expect(screen.getByLabelText('Custom Documentation')).toBeInTheDocument();
  });
});
