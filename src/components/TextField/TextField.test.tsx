import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { TextField } from './TextField';

describe('TextField', () => {
  it('renders basic text field correctly', () => {
    render(<TextField label="Test Field" />);

    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByText('Test Field')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<TextField placeholder="Enter text here" />);

    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    render(<TextField value="test value" onChange={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test value');
  });

  it('handles uncontrolled value', () => {
    render(<TextField defaultValue="default value" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('default value');
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<TextField onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onFocus and onBlur', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<TextField onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');

    await user.click(input); // powoduje focus
    expect(handleFocus).toHaveBeenCalled();

    await user.tab(); // przenosi focus gdzie indziej = blur
    expect(handleBlur).toHaveBeenCalled();
  });

  it('renders as disabled', () => {
    render(<TextField disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders with error state', () => {
    render(<TextField error helperText="This is an error" />);

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<TextField helperText="Helper text" />);

    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders with required indicator', () => {
    render(<TextField required label="Required Field" />);

    expect(screen.getByText('Required Field')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders multiline as textarea', () => {
    render(<TextField multiline rows={3} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('rows', '3');
  });

  it('shows character count', () => {
    render(<TextField showCharacterCount maxLength={10} />);

    expect(screen.getByText('0/10')).toBeInTheDocument();
  });

  it('shows character count over limit', () => {
    render(<TextField showCharacterCount maxLength={5} value="too long" />);

    expect(screen.getByText('8/5')).toBeInTheDocument();
  });

  it('renders with start icon', () => {
    const icon = <span data-testid="start-icon">🔍</span>;
    render(<TextField startIcon={icon} />);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders with end icon', () => {
    const icon = <span data-testid="end-icon">👁️</span>;
    render(<TextField endIcon={icon} />);

    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('renders clear button when clearable and has value', () => {
    render(<TextField clearable value="test" />);

    expect(screen.getByRole('button', { name: 'Clear input' })).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    const handleClear = vi.fn();
    render(<TextField clearable value="test" onClear={handleClear} />);

    const clearButton = screen.getByRole('button', { name: 'Clear input' });
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
  });

  it('applies variant classes', () => {
    const { container: outlinedContainer } = render(<TextField variant="outlined" />);
    expect((outlinedContainer.firstChild as HTMLElement)?.className).toContain(
      'textField--outlined',
    );

    const { container: filledContainer } = render(<TextField variant="filled" />);
    expect((filledContainer.firstChild as HTMLElement)?.className).toContain('textField--filled');

    const { container: standardContainer } = render(<TextField variant="standard" />);
    expect((standardContainer.firstChild as HTMLElement)?.className).toContain(
      'textField--standard',
    );
  });

  it('applies size classes', () => {
    const { container: smallContainer } = render(<TextField size="small" />);
    expect((smallContainer.firstChild as HTMLElement)?.className).toContain('textField--small');

    const { container: largeContainer } = render(<TextField size="large" />);
    expect((largeContainer.firstChild as HTMLElement)?.className).toContain('textField--large');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<TextField fullWidth />);
    expect((container.firstChild as HTMLElement)?.className).toContain('textField--fullWidth');
  });

  it('supports different input types', () => {
    render(<TextField type="email" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('handles maxLength attribute', () => {
    render(<TextField maxLength={10} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('generates unique ids for multiple instances', () => {
    render(
      <>
        <TextField label="Field 1" />
        <TextField label="Field 2" />
      </>,
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it('uses provided id when given', () => {
    render(<TextField id="custom-id" />);

    const input = screen.getByRole('textbox');
    expect(input.id).toBe('custom-id');
  });

  it('links label to input with htmlFor', () => {
    render(<TextField label="Test Label" />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Test Label');

    expect(label).toHaveAttribute('for', input.id);
  });

  it('sets aria-describedby correctly', () => {
    render(<TextField helperText="Helper" showCharacterCount />);

    const input = screen.getByRole('textbox');
    const describedBy = input.getAttribute('aria-describedby');

    expect(describedBy).toContain('helper');
    expect(describedBy).toContain('count');
  });
});
