import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Footer } from './Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('renders children', () => {
    render(<Footer>Copyright 2025</Footer>);
    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
  });

  it('applies className and style', () => {
    render(
      <Footer className="test-class" style={{ background: 'red' }}>
        Test
      </Footer>,
    );
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('test-class');
    expect(footer).toHaveStyle({ background: 'red' });
  });

  it('sets aria-label', () => {
    render(<Footer aria-label="custom label">Test</Footer>);
    expect(screen.getByLabelText('custom label')).toBeInTheDocument();
  });
});
