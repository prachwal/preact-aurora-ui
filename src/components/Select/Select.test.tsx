import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Select } from './Select';
import type { SelectOption } from './types';
import '@testing-library/jest-dom';

const sampleOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'potato', label: 'Potato' },
    ],
  },
];

describe('Select', () => {
  it('renders with placeholder', () => {
    render(<Select options={sampleOptions} placeholder="Choose a fruit" />);
    expect(screen.getByText('Choose a fruit')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select options={sampleOptions} label="Fruit Selection" />);
    expect(screen.getByText('Fruit Selection')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Select options={sampleOptions} label="Fruit" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    render(<Select options={sampleOptions} />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('selects option on click', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Select options={sampleOptions} onChange={handleChange} />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    const appleOption = screen.getByText('Apple');
    await user.click(appleOption);

    expect(handleChange).toHaveBeenCalledWith('apple');
  });

  it('displays selected value', () => {
    render(<Select options={sampleOptions} value="banana" />);
    expect(screen.getByDisplayValue('Banana')).toBeInTheDocument();
  });

  it('handles multiple selection', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Select options={sampleOptions} multiple onChange={handleChange} />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    // Select multiple options
    await user.click(screen.getByText('Apple'));
    await user.click(screen.getByText('Banana'));

    expect(handleChange).toHaveBeenCalledWith(['apple']);
    expect(handleChange).toHaveBeenCalledWith(['apple', 'banana']);
  });

  it('filters options when searchable', async () => {
    const user = userEvent.setup();

    render(<Select options={sampleOptions} searchable />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'ap');

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();

    render(<Select options={sampleOptions} />);

    const control = screen.getByRole('combobox');
    control.focus();

    // Open with Enter
    await user.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Navigate with arrows
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');

    // Select with Enter
    await user.keyboard('{Enter}');

    expect(screen.getByDisplayValue('Banana')).toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();

    render(<Select options={sampleOptions} />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders grouped options', async () => {
    const user = userEvent.setup();

    render(<Select groups={groupedOptions} />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Carrot')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Select options={[]} loading />);
    const control = screen.getByRole('combobox');
    fireEvent.click(control);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state', async () => {
    const user = userEvent.setup();

    render(<Select options={[]} />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    expect(screen.getByText('No options available')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Select options={sampleOptions} error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Select options={sampleOptions} helperText="Choose your favorite fruit" />);

    expect(screen.getByText('Choose your favorite fruit')).toBeInTheDocument();
  });

  it('handles clear button', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Select options={sampleOptions} value="apple" clearable onChange={handleChange} />);

    const clearButton = screen.getByRole('button', { name: 'Clear selection' });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(undefined);
  });

  it('renders custom option content', async () => {
    const user = userEvent.setup();

    const customRender = (option: SelectOption) => <div>🍎 {option.label}</div>;

    render(<Select options={sampleOptions} renderOption={customRender} />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    expect(screen.getByText('🍎 Apple')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Select options={sampleOptions} disabled />);

    const control = screen.getByRole('combobox');
    expect(control).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles disabled options', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const optionsWithDisabled = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
    ];

    render(<Select options={optionsWithDisabled} onChange={handleChange} />);

    const control = screen.getByRole('combobox');
    await user.click(control);

    const disabledOption = screen.getByText('Banana');
    await user.click(disabledOption);

    // Should not select disabled option
    expect(handleChange).not.toHaveBeenCalled();
  });
});
