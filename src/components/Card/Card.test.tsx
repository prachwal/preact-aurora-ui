import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Card } from './Card';
import '@testing-library/jest-dom';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Test</Card>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  it('renders title, subtitle, actions', () => {
    render(
      <Card title="T" subtitle="S" actions={<button>Act</button>}>
        X
      </Card>,
    );
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('Act')).toBeInTheDocument();
  });
  it('applies className and style', () => {
    render(
      <Card className="custom" style={{ background: 'red' }}>
        X
      </Card>,
    );
    const card = screen.getByLabelText('Kafelek');
    expect(card).toHaveClass('custom');
    expect(card).toHaveStyle({ background: 'red' });
  });
  it('sets aria-label', () => {
    render(<Card aria-label="custom label">X</Card>);
    expect(screen.getByLabelText('custom label')).toBeInTheDocument();
  });
});
