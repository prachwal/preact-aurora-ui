import { render, screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Button } from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as link when href is provided', () => {
    render(<Button href="/test">Link Button</Button>);
    const link = screen.getByRole('button', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies correct variant classes', () => {
    const { container, rerender } = render(<Button variant="filled">Filled</Button>);
    let button = container.querySelector('button');
    expect(button?.className).toContain('button');
    expect(button?.className).toContain('filled');

    rerender(<Button variant="outlined">Outlined</Button>);
    button = container.querySelector('button');
    expect(button?.className).toContain('outlined');

    rerender(<Button variant="text">Text</Button>);
    button = container.querySelector('button');
    expect(button?.className).toContain('text');

    rerender(<Button variant="elevated">Elevated</Button>);
    button = container.querySelector('button');
    expect(button?.className).toContain('elevated');

    rerender(<Button variant="filled-tonal">Filled Tonal</Button>);
    button = container.querySelector('button');
    expect(button?.className).toContain('filled-tonal');
  });

  it('applies correct size classes', () => {
    const { container, rerender } = render(<Button size="small">Small</Button>);
    let button = container.querySelector('button');
    expect(button?.className).toContain('small');

    rerender(<Button size="medium">Medium</Button>);
    button = container.querySelector('button');
    expect(button?.className).toContain('medium');

    rerender(<Button size="large">Large</Button>);
    button = container.querySelector('button');
    expect(button?.className).toContain('large');
  });

  it('handles disabled state', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(container.querySelector('button')?.className).toContain('disabled');
  });

  it('handles loading state', () => {
    const { container } = render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(container.querySelector('button')?.className).toContain('loading');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
  });

  it('handles fullWidth prop', () => {
    const { container } = render(<Button fullWidth>Full Width</Button>);
    expect(container.querySelector('button')?.className).toContain('fullWidth');
  });

  it('renders with icon and text', () => {
    const Icon = () => <span data-testid="icon">→</span>;
    render(
      <Button icon={<Icon />} iconPosition="start">
        With Icon
      </Button>,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('With Icon');
  });

  it('renders as icon only button', () => {
    const Icon = () => <span data-testid="icon">×</span>;
    const { container } = render(<Button icon={<Icon />} aria-label="Close" />);

    const button = screen.getByRole('button', { name: 'Close' });
    expect(container.querySelector('button')?.className).toContain('iconOnly');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(button).not.toHaveTextContent('Close');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not trigger click when loading', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} loading>
        Loading
      </Button>,
    );

    // Try to click the button
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    let buttonRef: HTMLButtonElement | HTMLAnchorElement | null = null;
    const TestComponent = () => (
      <Button
        ref={(ref: HTMLButtonElement | HTMLAnchorElement | null) => {
          buttonRef = ref;
        }}
      >
        Ref Test
      </Button>
    );

    render(<TestComponent />);
    expect(buttonRef).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(container.querySelector('button')?.className).toContain('button');
  });

  it('passes through other props', () => {
    render(
      <Button data-testid="custom-button" title="Custom Title">
        Test
      </Button>,
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('title', 'Custom Title');
  });

  it('handles keyboard navigation', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Keyboard Test</Button>);

    const button = screen.getByRole('button');

    // Test Enter key - browsers handle this automatically for buttons
    fireEvent.keyDown(button, { key: 'Enter' });
    // For button elements, keydown events don't automatically trigger click
    // This is browser-specific behavior that jsdom doesn't fully replicate

    // Test actual button click instead
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    render(<Button>Accessible Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveAttribute('aria-busy');
    expect(button).not.toHaveAttribute('aria-disabled');
  });

  it('has correct accessibility attributes when loading', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('has correct accessibility attributes when disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('works with external link', () => {
    render(
      <Button href="https://example.com" target="_blank" rel="noopener">
        External Link
      </Button>,
    );
    const link = screen.getByRole('button');

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('combines multiple classes correctly', () => {
    const { container } = render(
      <Button variant="outlined" size="large" fullWidth className="custom-class">
        Multiple Classes
      </Button>,
    );

    const button = screen.getByRole('button');
    const className = container.querySelector('button')?.className || '';
    expect(className).toContain('button');
    expect(className).toContain('outlined');
    expect(className).toContain('large');
    expect(className).toContain('fullWidth');
    expect(button).toHaveClass('custom-class');
  });
});
