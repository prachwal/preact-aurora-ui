import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Grid } from './Grid';
import '@testing-library/jest-dom';

describe('Grid', () => {
  it('renders children', () => {
    render(<Grid>Test</Grid>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  it('applies className and style', () => {
    render(
      <Grid className="custom" style={{ background: 'red' }}>
        X
      </Grid>,
    );
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('custom');
    expect(grid).toHaveStyle({ background: 'red' });
  });
  it('applies gap prop', () => {
    render(<Grid gap="32px">X</Grid>);
    expect(screen.getByRole('grid')).toHaveStyle({ gap: '32px' });
  });
});
