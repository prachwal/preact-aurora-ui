import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Row } from './Row';
import '@testing-library/jest-dom';

describe('Row', () => {
  it('renders children', () => {
    render(<Row>Test</Row>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  it('applies className and style', () => {
    render(
      <Row className="custom" style={{ background: 'red' }}>
        X
      </Row>,
    );
    const row = screen.getByRole('row');
    expect(row).toHaveClass('custom');
    expect(row).toHaveStyle({ background: 'red' });
  });
  it('applies align and justify', () => {
    render(
      <Row align="center" justify="between">
        X
      </Row>,
    );
    const row = screen.getByRole('row');
    expect(row.className).toMatch(/align-center/);
    expect(row.className).toMatch(/justify-between/);
  });
});
