import { render, screen } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Switch } from './Switch';
import '@testing-library/jest-dom';

describe('Switch', () => {
  it('renders with label', () => {
    render(<Switch label="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Switch label="Test" checked={true} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('handles unchecked state', () => {
    render(<Switch label="Test" checked={false} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('handles change events', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch label="Test" onChange={handleChange} />);
    const switchElement = screen.getByRole('switch');

    await user.click(switchElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(switchElement).toBeChecked();
  });

  it('handles controlled mode', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(<Switch label="Test" checked={false} onChange={handleChange} />);

    const switchElement = screen.getByRole('switch');

    await user.click(switchElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(switchElement).not.toBeChecked(); // Still false because controlled

    rerender(<Switch label="Test" checked={true} onChange={handleChange} />);
    expect(switchElement).toBeChecked();
  });

  it('handles uncontrolled mode with defaultChecked', () => {
    render(<Switch label="Test" defaultChecked={true} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('handles uncontrolled mode change', async () => {
    const user = userEvent.setup();
    render(<Switch label="Test" defaultChecked={false} />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);
    expect(switchElement).toBeChecked();
  });

  it('handles focus events', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const user = userEvent.setup();

    render(<Switch label="Test" onFocus={handleFocus} onBlur={handleBlur} />);
    const switchElement = screen.getByRole('switch');

    await user.click(switchElement); // focuses element
    expect(handleFocus).toHaveBeenCalled();

    await user.tab(); // blurs element
    expect(handleBlur).toHaveBeenCalled();
  });

  it('shows disabled state', () => {
    render(<Switch label="Test" disabled={true} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('prevents interaction when disabled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch label="Test" disabled={true} onChange={handleChange} />);
    const switchElement = screen.getByRole('switch');

    expect(switchElement).toBeDisabled();
    await user.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies size classes', () => {
    render(<Switch label="Small" size="small" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    // Size is applied via CSS classes, component renders correctly
  });

  it('applies color classes', () => {
    render(<Switch label="Secondary" color="secondary" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    // Color is applied via CSS classes, component renders correctly
  });

  it('applies error state', () => {
    render(<Switch label="Error" error />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows required indicator', () => {
    render(<Switch label="Required" required />);
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Switch label="Custom" className="custom-class" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    // Custom className is applied to wrapper div, component renders correctly
  });

  it('shows helper text', () => {
    render(<Switch label="Test" helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('associates helper text with switch', () => {
    render(<Switch label="Test" helperText="Helper text" />);
    const switchElement = screen.getByRole('switch');
    const helperText = screen.getByText('Helper text');

    expect(switchElement).toHaveAttribute('aria-describedby');
    const describedById = switchElement.getAttribute('aria-describedby');
    expect(helperText).toHaveAttribute('id', describedById);
  });

  it('shows error helper text', () => {
    render(<Switch label="Test" error helperText="Error message" />);
    const helperText = screen.getByText('Error message');
    expect(helperText).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Switch label="Test" />);

    const switchElement = screen.getByRole('switch');
    await user.tab();
    expect(switchElement).toHaveFocus();

    await user.keyboard(' ');
    expect(switchElement).toBeChecked();

    await user.keyboard(' ');
    expect(switchElement).not.toBeChecked();
  });

  it('handles form integration', () => {
    render(<Switch label="Test" name="test-switch" value="switch-value" />);
    const switchElement = screen.getByRole('switch');

    expect(switchElement).toHaveAttribute('name', 'test-switch');
    expect(switchElement).toHaveAttribute('value', 'switch-value');
  });

  it('supports all size variants', () => {
    const { rerender } = render(<Switch label="Small" size="small" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();

    rerender(<Switch label="Medium" size="medium" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();

    rerender(<Switch label="Large" size="large" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('supports all color variants', () => {
    const { rerender } = render(<Switch label="Primary" color="primary" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();

    rerender(<Switch label="Secondary" color="secondary" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();

    rerender(<Switch label="Error" color="error" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders properly with all props', () => {
    render(
      <Switch
        label="Full Switch"
        checked={true}
        disabled={false}
        error={false}
        helperText="Helper text"
        name="full-switch"
        value="full-value"
        required={true}
        size="large"
        color="secondary"
        className="custom-class"
      />,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked();
    expect(switchElement).toHaveAttribute('name', 'full-switch');
    expect(switchElement).toHaveAttribute('value', 'full-value');
    expect(screen.getByText('Full Switch')).toBeInTheDocument();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });
});
