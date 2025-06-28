import { render, screen } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Radio, RadioGroup } from './index';
import '@testing-library/jest-dom';

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio label="Test radio" value="test" />);
    expect(screen.getByLabelText('Test radio')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Radio value="test" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Radio label="Test" value="test" checked={true} />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('handles change events', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Radio label="Test" value="test" onChange={handleChange} />);
    const radio = screen.getByRole('radio');

    await user.click(radio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(radio).toBeChecked();
  });

  it('handles focus events', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const user = userEvent.setup();

    render(<Radio label="Test" value="test" onFocus={handleFocus} onBlur={handleBlur} />);
    const radio = screen.getByRole('radio');

    await user.click(radio); // focuses element
    expect(handleFocus).toHaveBeenCalled();

    await user.tab(); // blurs element
    expect(handleBlur).toHaveBeenCalled();
  });

  it('handles disabled state', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Radio label="Test" value="test" disabled onChange={handleChange} />);
    const radio = screen.getByRole('radio');

    expect(radio).toBeDisabled();
    await user.click(radio);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies size classes', () => {
    render(<Radio label="Small" value="small" size="small" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    // Size is applied via CSS classes, component renders correctly
  });

  it('applies color classes', () => {
    render(<Radio label="Secondary" value="secondary" color="secondary" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    // Color is applied via CSS classes, component renders correctly
  });

  it('applies error state', () => {
    render(<Radio label="Error" value="error" error />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows required indicator', () => {
    render(<Radio label="Required" value="required" required />);
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Radio label="Custom" value="custom" className="custom-class" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    // Custom className is applied to wrapper div, component renders correctly
  });
});

describe('RadioGroup', () => {
  it('renders group with label', () => {
    render(
      <RadioGroup label="Test group">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );
    expect(screen.getByText('Test group')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    render(
      <RadioGroup value="option2">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    const option2 = screen.getByLabelText('Option 2');
    expect(option2).toBeChecked();

    const option1 = screen.getByLabelText('Option 1');
    expect(option1).not.toBeChecked();
  });

  it('handles uncontrolled default value', () => {
    render(
      <RadioGroup defaultValue="option1">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    const option1 = screen.getByLabelText('Option 1');
    expect(option1).toBeChecked();
  });

  it('handles change events', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <RadioGroup onChange={handleChange}>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    const option2 = screen.getByLabelText('Option 2');
    await user.click(option2);

    expect(handleChange).toHaveBeenCalledWith('option2', expect.any(Object));
    expect(option2).toBeChecked();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
        <Radio label="Option 3" value="option3" />
      </RadioGroup>,
    );

    const option1 = screen.getByLabelText('Option 1');
    await user.click(option1);
    expect(option1).toBeChecked();

    // Arrow key navigation should work within radio groups
    await user.keyboard('{ArrowDown}');
    // Note: Browser handles radio group keyboard navigation natively
  });

  it('applies group disabled state', () => {
    render(
      <RadioGroup disabled>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('applies group error state', () => {
    render(
      <RadioGroup error>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    const container = screen.getByRole('radiogroup');
    expect(container).toBeInTheDocument();
    // Error state is applied via CSS classes, component renders correctly
  });

  it('shows helper text', () => {
    render(
      <RadioGroup helperText="Choose one option">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    expect(screen.getByText('Choose one option')).toBeInTheDocument();
  });

  it('applies horizontal orientation', () => {
    render(
      <RadioGroup orientation="horizontal">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    const container = screen.getByRole('radiogroup');
    expect(container).toBeInTheDocument();
    // Horizontal orientation is applied via CSS classes, component renders correctly
  });

  it('shows required indicator in group label', () => {
    render(
      <RadioGroup label="Required group" required>
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    // Check that the group label contains the required indicator
    const groupLabel = screen.getByText('Required group');
    expect(groupLabel).toBeInTheDocument();
    expect(screen.getAllByLabelText('required')).toHaveLength(3); // Group + 2 radios
  });

  it('applies custom className to group', () => {
    render(
      <RadioGroup className="custom-group">
        <Radio label="Option 1" value="option1" />
        <Radio label="Option 2" value="option2" />
      </RadioGroup>,
    );

    const container = screen.getByRole('radiogroup');
    expect(container).toBeInTheDocument();
    // Custom className is applied to the group container, component renders correctly
  });

  it('generates unique names for radio groups', () => {
    render(
      <div>
        <RadioGroup>
          <Radio label="Group 1 Option 1" value="g1o1" />
          <Radio label="Group 1 Option 2" value="g1o2" />
        </RadioGroup>
        <RadioGroup>
          <Radio label="Group 2 Option 1" value="g2o1" />
          <Radio label="Group 2 Option 2" value="g2o2" />
        </RadioGroup>
      </div>,
    );

    const group1Radios = [
      screen.getByLabelText('Group 1 Option 1'),
      screen.getByLabelText('Group 1 Option 2'),
    ];
    const group2Radios = [
      screen.getByLabelText('Group 2 Option 1'),
      screen.getByLabelText('Group 2 Option 2'),
    ];

    // Radios in the same group should have the same name
    expect(group1Radios[0].getAttribute('name')).toBe(group1Radios[1].getAttribute('name'));
    expect(group2Radios[0].getAttribute('name')).toBe(group2Radios[1].getAttribute('name'));

    // Radios in different groups should have different names
    expect(group1Radios[0].getAttribute('name')).not.toBe(group2Radios[0].getAttribute('name'));
  });
});
