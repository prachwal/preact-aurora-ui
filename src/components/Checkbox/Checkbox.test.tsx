import { render, screen } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';
import styles from './Checkbox.module.scss';
import '@testing-library/jest-dom';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Test checkbox" />);
    expect(screen.getByLabelText('Test checkbox')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('handles controlled checked state', () => {
    render(<Checkbox label="Test" checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles uncontrolled default checked state', () => {
    render(<Checkbox label="Test" defaultChecked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles change events', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Test" onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it('handles controlled state changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(<Checkbox label="Test" checked={false} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).not.toBeChecked(); // Still false because controlled

    rerender(<Checkbox label="Test" checked={true} onChange={handleChange} />);
    expect(checkbox).toBeChecked();
  });

  it('shows disabled state', () => {
    render(<Checkbox label="Test" disabled={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('prevents interaction when disabled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Test" disabled={true} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });

  it('shows indeterminate state', () => {
    render(<Checkbox label="Test" indeterminate={true} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('shows error state', () => {
    render(<Checkbox label="Test" error={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text', () => {
    render(<Checkbox label="Test" helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('associates helper text with checkbox', () => {
    render(<Checkbox label="Test" helperText="Helper text" />);
    const checkbox = screen.getByRole('checkbox');
    const helperText = screen.getByText('Helper text');

    expect(checkbox).toHaveAttribute('aria-describedby');
    expect(helperText).toHaveAttribute('id', checkbox.getAttribute('aria-describedby'));
  });

  it('shows error helper text with alert role', () => {
    render(<Checkbox label="Test" error={true} helperText="Error message" />);
    const helperText = screen.getByText('Error message');
    expect(helperText).toHaveAttribute('role', 'alert');
  });

  it('shows required indicator', () => {
    render(<Checkbox label="Test" required={true} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Checkbox label="Test" size="small" />);
    let container = screen.getByRole('checkbox').parentElement?.parentElement;
    expect(container).toHaveClass(styles['checkbox--small']);

    rerender(<Checkbox label="Test" size="large" />);
    container = screen.getByRole('checkbox').parentElement?.parentElement;
    expect(container).toHaveClass(styles['checkbox--large']);
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<Checkbox label="Test" color="secondary" />);
    let container = screen.getByRole('checkbox').parentElement?.parentElement;
    expect(container).toHaveClass(styles['checkbox--secondary']);

    rerender(<Checkbox label="Test" color="error" />);
    container = screen.getByRole('checkbox').parentElement?.parentElement;
    expect(container).toHaveClass(styles['checkbox--error']);
  });

  it('handles focus events', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(<Checkbox label="Test" onFocus={handleFocus} onBlur={handleBlur} />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox); // powoduje focus
    expect(handleFocus).toHaveBeenCalledTimes(1);

    await user.tab(); // przenosi focus gdzie indziej = blur
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    let ref: HTMLInputElement | null = null;
    render(<Checkbox label="Test" ref={(el: HTMLInputElement | null) => (ref = el)} />);

    expect(ref).toBeInstanceOf(HTMLInputElement);
    expect(ref).toHaveProperty('type', 'checkbox');
  });

  it('passes through additional props', () => {
    render(<Checkbox label="Test" data-testid="custom-checkbox" />);
    expect(screen.getByTestId('custom-checkbox')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Checkbox label="Test" className="custom-class" />);
    const container = screen.getByRole('checkbox').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('handles form attributes correctly', () => {
    render(<Checkbox label="Test" name="test-name" value="test-value" />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toHaveAttribute('name', 'test-name');
    expect(checkbox).toHaveAttribute('value', 'test-value');
  });
});
