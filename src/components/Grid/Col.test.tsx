import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Col } from './Col';
import '@testing-library/jest-dom';

describe('Col', () => {
  it('renders children', () => {
    render(<Col>Test</Col>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  it('applies className and style', () => {
    render(
      <Col className="custom" style={{ background: 'red' }}>
        X
      </Col>,
    );
    const col = screen.getByRole('gridcell');
    expect(col).toHaveClass('custom');
    expect(col).toHaveStyle({ background: 'red' });
  });
  it('applies span and offset', () => {
    render(
      <Col span={2} offset={1}>
        X
      </Col>,
    );
    const col = screen.getByRole('gridcell');
    expect(col.style.gridColumn).toMatch('span 2');
    expect(col.style.marginLeft).toBeDefined();
  });
});
