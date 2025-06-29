import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { Banner } from './Banner';
import { BannerVariant, BannerPosition } from './types';
import styles from './Banner.module.scss';

import '@testing-library/jest-dom';

describe('Banner', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Banner message="Test message" />);

      const banner = screen.getByRole('alert');
      expect(banner).toBeInTheDocument();
      expect(banner).toHaveTextContent('Test message');
      expect(banner).toHaveAttribute('aria-live', 'polite');
      expect(banner).toHaveAttribute('aria-atomic', 'true');
    });

    it('renders with custom message content', () => {
      render(
        <Banner
          message={
            <div>
              <strong>Important:</strong> Custom message content
            </div>
          }
        />,
      );

      expect(screen.getByText('Important:')).toBeInTheDocument();
      expect(screen.getByText('Custom message content')).toBeInTheDocument();
    });

    it('does not render when open is false', () => {
      render(<Banner message="Hidden message" open={false} />);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders info variant by default', () => {
      render(<Banner message="Info message" />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveClass(styles['banner--info']);
    });

    it('renders warning variant', () => {
      render(<Banner message="Warning message" variant={BannerVariant.WARNING} />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveClass(styles['banner--warning']);
    });

    it('renders error variant', () => {
      render(<Banner message="Error message" variant={BannerVariant.ERROR} />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveClass(styles['banner--error']);
    });

    it('renders success variant', () => {
      render(<Banner message="Success message" variant={BannerVariant.SUCCESS} />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveClass(styles['banner--success']);
    });
  });

  describe('Positioning', () => {
    it('renders without position class by default', () => {
      render(<Banner message="Default position" />);

      const banner = screen.getByRole('alert');
      expect(banner).not.toHaveClass(styles['banner--top']);
      expect(banner).not.toHaveClass(styles['banner--bottom']);
    });

    it('renders top position', () => {
      render(<Banner message="Top banner" position={BannerPosition.TOP} />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveClass(styles['banner--top']);
    });

    it('renders bottom position', () => {
      render(<Banner message="Bottom banner" position={BannerPosition.BOTTOM} />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveClass(styles['banner--bottom']);
    });
  });

  describe('Icons', () => {
    it('shows default icon by default', () => {
      render(<Banner message="Message with icon" />);

      const banner = screen.getByRole('alert');
      const icon = banner.querySelector(`.${styles.banner__icon}`);
      expect(icon).toBeInTheDocument();
      expect(icon?.querySelector('svg')).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      render(<Banner message="Message without icon" showIcon={false} />);

      const banner = screen.getByRole('alert');
      const icon = banner.querySelector(`.${styles.banner__icon}`);
      expect(icon).not.toBeInTheDocument();
    });

    it('renders custom icon', () => {
      render(
        <Banner message="Custom icon message" icon={<span data-testid="custom-icon">🎉</span>} />,
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.getByText('🎉')).toBeInTheDocument();
    });
  });

  describe('Dismissible', () => {
    it('shows close button by default', () => {
      render(<Banner message="Dismissible banner" />);

      const closeButton = screen.getByLabelText('Close banner');
      expect(closeButton).toBeInTheDocument();
    });

    it('hides close button when dismissible is false', () => {
      render(<Banner message="Non-dismissible banner" dismissible={false} />);

      expect(screen.queryByLabelText('Close banner')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleClose = vi.fn();

      render(<Banner message="Closable banner" onClose={handleClose} />);

      const closeButton = screen.getByLabelText('Close banner');
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleClose = vi.fn();

      render(<Banner message="Escapable banner" onClose={handleClose} />);

      await user.keyboard('{Escape}');

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose on Escape when dismissible is false', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleClose = vi.fn();

      render(<Banner message="Non-dismissible banner" dismissible={false} onClose={handleClose} />);

      await user.keyboard('{Escape}');

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Actions', () => {
    it('renders primary action button', () => {
      const action = {
        label: 'Action',
        onClick: vi.fn(),
      };

      render(<Banner message="Banner with action" action={action} />);

      const actionButton = screen.getByRole('button', { name: 'Action' });
      expect(actionButton).toBeInTheDocument();
    });

    it('renders secondary action button', () => {
      const secondaryAction = {
        label: 'Secondary',
        onClick: vi.fn(),
      };

      render(<Banner message="Banner with secondary action" secondaryAction={secondaryAction} />);

      const secondaryButton = screen.getByRole('button', { name: 'Secondary' });
      expect(secondaryButton).toBeInTheDocument();
    });

    it('calls action onClick when clicked', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const action = {
        label: 'Action',
        onClick: vi.fn(),
      };

      render(<Banner message="Actionable banner" action={action} />);

      const actionButton = screen.getByRole('button', { name: 'Action' });
      await user.click(actionButton);

      expect(action.onClick).toHaveBeenCalledTimes(1);
    });

    it('renders action with text variant', () => {
      const action = {
        label: 'Text Action',
        onClick: vi.fn(),
        variant: 'text' as const,
      };

      render(<Banner message="Banner with text action" action={action} />);

      const actionButton = screen.getByRole('button', { name: 'Text Action' });
      expect(actionButton).toHaveClass(styles['banner__action--text']);
    });
  });

  describe('Auto-hide', () => {
    it('calls onClose after autoHideDuration', async () => {
      const handleClose = vi.fn();

      render(<Banner message="Auto-hide banner" autoHideDuration={3000} onClose={handleClose} />);

      expect(handleClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(3000);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not auto-hide when autoHideDuration is 0', async () => {
      const handleClose = vi.fn();

      render(<Banner message="Persistent banner" autoHideDuration={0} onClose={handleClose} />);

      vi.advanceTimersByTime(5000);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('does not auto-hide when dismissible is false', async () => {
      const handleClose = vi.fn();

      render(
        <Banner
          message="Non-dismissible auto-hide"
          autoHideDuration={3000}
          dismissible={false}
          onClose={handleClose}
        />,
      );

      vi.advanceTimersByTime(3000);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('clears timeout when component unmounts', () => {
      const handleClose = vi.fn();
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      const { unmount } = render(
        <Banner message="Unmounting banner" autoHideDuration={3000} onClose={handleClose} />,
      );

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<Banner message="Custom class" className="custom-banner" />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveClass('custom-banner');
    });

    it('applies custom styles', () => {
      const customStyle = { backgroundColor: 'red', padding: '20px' };

      render(<Banner message="Custom style" style={customStyle} />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveStyle('background-color: rgb(255, 0, 0)');
      expect(banner).toHaveStyle('padding: 20px');
    });

    it('passes through additional HTML attributes', () => {
      render(<Banner message="Custom attributes" data-testid="custom-banner" id="banner-id" />);

      const banner = screen.getByTestId('custom-banner');
      expect(banner).toHaveAttribute('id', 'banner-id');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Banner message="Accessible banner" />);

      const banner = screen.getByRole('alert');
      expect(banner).toHaveAttribute('aria-live', 'polite');
      expect(banner).toHaveAttribute('aria-atomic', 'true');
    });

    it('close button has proper aria-label', () => {
      render(<Banner message="Accessible close" />);

      const closeButton = screen.getByLabelText('Close banner');
      expect(closeButton).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleClose = vi.fn();
      const action = {
        label: 'Action',
        onClick: vi.fn(),
      };

      render(<Banner message="Keyboard accessible" action={action} onClose={handleClose} />);

      // Tab to action button and activate
      await user.tab();
      await user.keyboard('{Enter}');
      expect(action.onClick).toHaveBeenCalled();

      // Tab to close button and activate
      await user.tab();
      await user.keyboard('{Enter}');
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
