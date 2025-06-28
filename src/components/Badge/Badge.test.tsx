import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';

import { Badge, BadgeWrapper } from './Badge';
import styles from './Badge.module.scss';
import '@testing-library/jest-dom';

describe('Badge Component', () => {
  describe('Basic Functionality', () => {
    it('renders dot badge with default props', () => {
      render(<Badge variant="dot" />);
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass(
        styles.badge,
        styles['badge--dot'],
        styles['badge--primary'],
        styles['badge--top-right'],
        styles['badge--medium'],
      );
    });

    it('applies custom className', () => {
      render(<Badge variant="dot" className="custom-badge" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass('custom-badge');
    });

    it('applies test ID', () => {
      render(<Badge variant="dot" testId="my-badge" />);
      const badge = screen.getByTestId('my-badge');
      expect(badge).toBeInTheDocument();
    });

    it('applies custom styles', () => {
      const customStyle = { backgroundColor: 'red' };
      render(<Badge variant="dot" style={customStyle} />);
      const badge = screen.getByRole('status');

      // Check if style attribute exists
      expect(badge).toHaveAttribute('style');
      expect(badge.getAttribute('style')).toContain('background-color: red');
    });
  });

  describe('Color Variants', () => {
    it('renders primary color variant', () => {
      render(<Badge variant="dot" color="primary" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(styles['badge--primary']);
    });

    it('renders secondary color variant', () => {
      render(<Badge variant="dot" color="secondary" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(styles['badge--secondary']);
    });

    it('renders error color variant', () => {
      render(<Badge variant="dot" color="error" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(styles['badge--error']);
    });
  });

  describe('Position Variants', () => {
    it('renders top-right position', () => {
      render(<Badge variant="dot" position="top-right" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(styles['badge--top-right']);
    });

    it('renders bottom-left position', () => {
      render(<Badge variant="dot" position="bottom-left" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(styles['badge--bottom-left']);
    });
  });

  describe('Size Variants', () => {
    it('renders small size', () => {
      render(<Badge variant="dot" size="small" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(styles['badge--small']);
    });

    it('renders large size', () => {
      render(<Badge variant="dot" size="large" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(styles['badge--large']);
    });
  });

  describe('Visibility', () => {
    it('hides badge when visible is false', () => {
      render(<Badge variant="dot" visible={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('applies animated class when animated is true', () => {
      render(<Badge variant="dot" animated />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(styles['badge--animated']);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA label for dot badge', () => {
      render(<Badge variant="dot" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', 'Status indicator');
    });

    it('uses custom ARIA label when provided', () => {
      render(<Badge variant="dot" ariaLabel="Custom label" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', 'Custom label');
    });
  });
});

describe('BadgeWrapper Component', () => {
  it('renders wrapper with badge and children', () => {
    render(
      <BadgeWrapper badge={{ variant: 'dot' }}>
        <button>Button</button>
      </BadgeWrapper>,
    );

    const wrapper = screen.getByRole('button').parentElement;
    expect(wrapper).toHaveClass(styles.badgeWrapper);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom className to wrapper', () => {
    render(
      <BadgeWrapper badge={{ variant: 'dot' }} className="custom-wrapper">
        <span>Content</span>
      </BadgeWrapper>,
    );

    const wrapper = screen.getByText('Content').parentElement;
    expect(wrapper).toHaveClass('custom-wrapper');
  });
});
