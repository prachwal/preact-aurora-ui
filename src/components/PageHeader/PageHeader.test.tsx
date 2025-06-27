import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Button } from '../Button';

import { PageHeader } from './PageHeader';
import '@testing-library/jest-dom';

describe('PageHeader', () => {
  it('renders title', () => {
    render(<PageHeader title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<PageHeader title="T" subtitle="Sub" />);
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(<PageHeader title="T" actions={<Button>Act</Button>} />);
    expect(screen.getByText('Act')).toBeInTheDocument();
  });

  it('applies className and style', () => {
    render(<PageHeader title="T" className="custom" style={{ background: '#eee' }} />);
    const header = screen.getByLabelText('Page header');
    expect(header).toHaveClass('custom');
    expect(header).toHaveStyle({ background: '#eee' });
  });
});
