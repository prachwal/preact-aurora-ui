import { render, screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';

import { IconButton, HeartIcon, StarIcon } from './IconButton';
import styles from './IconButton.module.scss';

describe('IconButton', () => {
  describe('Basic Functionality', () => {
    it('renders correctly with default props', () => {
      render(<IconButton icon={<HeartIcon />} aria-label="Heart" />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(styles.iconButton, styles.standard, styles.medium);
    });

    it('renders with custom children instead of icon prop', () => {
      render(
        <IconButton aria-label="Custom">
          <span>🎯</span>
        </IconButton>,
      );
      expect(screen.getByText('🎯')).toBeInTheDocument();
    });

    it('handles click events', () => {
      const handleClick = vi.fn();
      render(<IconButton icon={<HeartIcon />} onClick={handleClick} aria-label="Heart" />);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Variants', () => {
    it('renders standard variant correctly', () => {
      render(<IconButton variant="standard" icon={<HeartIcon />} aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveClass(styles.standard);
    });

    it('renders filled variant correctly', () => {
      render(<IconButton variant="filled" icon={<HeartIcon />} aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveClass(styles.filled);
    });

    it('renders outlined variant correctly', () => {
      render(<IconButton variant="outlined" icon={<HeartIcon />} aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveClass(styles.outlined);
    });

    it('renders tonal variant correctly', () => {
      render(<IconButton variant="tonal" icon={<HeartIcon />} aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveClass(styles.tonal);
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<IconButton size="small" icon={<HeartIcon />} aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveClass(styles.small);
    });

    it('renders medium size correctly (default)', () => {
      render(<IconButton icon={<HeartIcon />} aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveClass(styles.medium);
    });

    it('renders large size correctly', () => {
      render(<IconButton size="large" icon={<HeartIcon />} aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveClass(styles.large);
    });
  });

  describe('Disabled State', () => {
    it('renders disabled state correctly', () => {
      render(<IconButton disabled icon={<HeartIcon />} aria-label="Heart" />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass(styles.disabled);
      expect(button).toBeDisabled();
    });

    it('prevents click when disabled', () => {
      const handleClick = vi.fn();
      render(<IconButton disabled icon={<HeartIcon />} onClick={handleClick} aria-label="Heart" />);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Toggle Functionality', () => {
    it('renders toggle button correctly', () => {
      const handleToggle = vi.fn();
      render(<IconButton toggle onToggle={handleToggle} icon={<HeartIcon />} aria-label="Heart" />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass(styles.toggle);
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });

    it('handles toggle state changes', () => {
      const handleToggle = vi.fn();
      render(<IconButton toggle onToggle={handleToggle} icon={<HeartIcon />} aria-label="Heart" />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleToggle).toHaveBeenCalledWith(true);
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(button).toHaveClass(styles.selected);
    });

    it('renders with initial selected state', () => {
      const handleToggle = vi.fn();
      render(
        <IconButton
          toggle
          selected
          onToggle={handleToggle}
          icon={<HeartIcon />}
          aria-label="Heart"
        />,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(button).toHaveClass(styles.selected);
    });

    it('switches between different icons when toggling', () => {
      const handleToggle = vi.fn();
      render(
        <IconButton
          toggle
          onToggle={handleToggle}
          selectedIcon={<HeartIcon filled />}
          unselectedIcon={<HeartIcon />}
          aria-label="Heart"
        />,
      );

      const button = screen.getByRole('button');

      // Initial state should show unselected icon
      expect(button.querySelector('svg')).toHaveAttribute('fill', 'none');

      // Click to toggle
      fireEvent.click(button);
      expect(handleToggle).toHaveBeenCalledWith(true);

      // Should now show selected icon (filled)
      expect(button.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<IconButton icon={<HeartIcon />} aria-label="Like this post" />);
      expect(screen.getByLabelText('Like this post')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <IconButton icon={<HeartIcon />} aria-label="Heart" aria-describedby="heart-desc" />
          <div id="heart-desc">Click to like</div>
        </div>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'heart-desc');
    });

    it('supports title attribute', () => {
      render(<IconButton icon={<HeartIcon />} title="Heart button" aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveAttribute('title', 'Heart button');
    });
  });

  describe('Form Integration', () => {
    it('supports different button types', () => {
      render(<IconButton type="submit" icon={<HeartIcon />} aria-label="Submit" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('defaults to button type', () => {
      render(<IconButton icon={<HeartIcon />} aria-label="Heart" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  describe('Icon Components', () => {
    it('renders HeartIcon correctly', () => {
      render(<HeartIcon />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('renders filled HeartIcon correctly', () => {
      render(<HeartIcon filled />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('fill', 'currentColor');
    });

    it('renders StarIcon correctly', () => {
      render(<StarIcon />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing icon gracefully', () => {
      render(<IconButton aria-label="Empty" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('works with custom HTML attributes', () => {
      render(
        <IconButton
          icon={<HeartIcon />}
          aria-label="Heart"
          data-testid="custom-icon-button"
          tabIndex={-1}
        />,
      );

      const button = screen.getByTestId('custom-icon-button');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });
  });
});
