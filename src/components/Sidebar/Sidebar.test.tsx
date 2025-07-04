import { screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Button } from '../Button';
import { renderWithTheme } from '../../test-utils';

import { Sidebar } from './Sidebar';

import '@testing-library/jest-dom';

describe('Sidebar', () => {
  it('renders with nav, actions and children', () => {
    renderWithTheme(
      <Sidebar
        nav={
          <ul data-testid="nav">
            <li>NavItem</li>
          </ul>
        }
        actions={<Button data-testid="action">Action</Button>}
      >
        <div data-testid="children">Children</div>
      </Sidebar>,
    );
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('action')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('applies className and style', () => {
    renderWithTheme(<Sidebar className="test-class" style={{ background: 'blue' }} />);
    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('test-class');
    expect(sidebar).toHaveStyle({ background: 'blue' });
  });

  it('sets aria-label', () => {
    renderWithTheme(<Sidebar aria-label="CustomSidebar" />);
    expect(screen.getByRole('complementary')).toHaveAttribute('aria-label', 'CustomSidebar');
  });
});
