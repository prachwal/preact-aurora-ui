/**
 * @vitest-environment jsdom
 */
// @ts-nocheck

import { render, screen, cleanup } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';

import { Chip, CloseIcon, CheckIcon, AddIcon } from './Chip';
import { ChipGroup } from './ChipGroup';
import styles from './Chip.module.scss';

afterEach(() => {
  cleanup();
});

describe('Chip', () => {
  describe('Basic Functionality', () => {
    it('renders correctly with default props', () => {
      render(<Chip type="assist">Test Chip</Chip>);

      const chip = screen.getByRole('button');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass(styles.chip, styles.assist);
      expect(chip).toHaveTextContent('Test Chip');
    });

    it('applies custom className and style', () => {
      render(
        <Chip type="assist" className="custom-class" style={{ backgroundColor: 'red' }}>
          Test
        </Chip>,
      );

      const chip = screen.getByRole('button');
      expect(chip).toHaveClass('custom-class');
      expect(chip).toHaveStyle('background-color: rgb(255, 0, 0)');
    });

    it('handles disabled state correctly', () => {
      render(
        <Chip type="assist" disabled>
          Disabled Chip
        </Chip>,
      );

      const chip = screen.getByRole('button');
      expect(chip).toHaveClass(styles.disabled);
      expect(chip).toHaveAttribute('aria-disabled', 'true');
      expect(chip).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Chip Types', () => {
    it('renders assist chip correctly', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Chip type="assist" onClick={handleClick}>
          Assist Chip
        </Chip>,
      );

      const chip = screen.getByRole('button');
      expect(chip).toHaveClass(styles.assist);

      await user.click(chip);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders filter chip correctly', () => {
      const handleSelect = vi.fn();
      render(
        <Chip type="filter" onSelect={handleSelect}>
          Filter Chip
        </Chip>,
      );

      const chip = screen.getByRole('option');
      expect(chip).toHaveClass(styles.filter);
      expect(chip).toHaveAttribute('aria-selected', 'false');
      expect(chip).toHaveAttribute('aria-pressed', 'false');
    });

    it('renders input chip correctly', () => {
      const handleRemove = vi.fn();
      render(
        <Chip type="input" onRemove={handleRemove} removable>
          Input Chip
        </Chip>,
      );

      const chip = screen.getByRole('option');
      expect(chip).toHaveClass(styles.input);

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      expect(removeButton).toBeInTheDocument();
    });

    it('renders suggestion chip correctly', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Chip type="suggestion" onClick={handleClick}>
          Suggestion Chip
        </Chip>,
      );

      const chip = screen.getByRole('button');
      expect(chip).toHaveClass(styles.suggestion);

      await user.click(chip);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Filter Chip Selection', () => {
    it('handles selection state changes', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();
      render(
        <Chip type="filter" onSelect={handleSelect}>
          Filter Chip
        </Chip>,
      );

      const chip = screen.getByRole('option');

      await user.click(chip);
      expect(handleSelect).toHaveBeenCalledWith(true);
      expect(chip).toHaveAttribute('aria-selected', 'true');
      expect(chip).toHaveClass(styles.selected);
    });

    it('renders with initial selected state', () => {
      const handleSelect = vi.fn();
      render(
        <Chip type="filter" selected onSelect={handleSelect}>
          Selected Filter
        </Chip>,
      );

      const chip = screen.getByRole('option');
      expect(chip).toHaveAttribute('aria-selected', 'true');
      expect(chip).toHaveClass(styles.selected);
    });

    it('shows check icon when selected', () => {
      const handleSelect = vi.fn();
      render(
        <Chip type="filter" selected onSelect={handleSelect}>
          Filter
        </Chip>,
      );

      const chip = screen.getByRole('option');
      const checkIcon = chip.querySelector(`.${styles.selectedIcon}`);
      expect(checkIcon).toBeInTheDocument();
    });
  });

  describe('Input Chip Removal', () => {
    it('shows remove button when removable', () => {
      const handleRemove = vi.fn();
      render(
        <Chip type="input" onRemove={handleRemove} removable>
          Input Chip
        </Chip>,
      );

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      expect(removeButton).toBeInTheDocument();
    });

    it('hides remove button when not removable', () => {
      render(
        <Chip type="input" removable={false}>
          Input Chip
        </Chip>,
      );

      const removeButton = screen.queryByRole('button', { name: 'Remove' });
      expect(removeButton).not.toBeInTheDocument();
    });

    it('calls onRemove when remove button is clicked', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(
        <Chip type="input" onRemove={handleRemove} removable>
          Input Chip
        </Chip>,
      );

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      await user.click(removeButton);

      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('prevents event bubbling on remove button click', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      const handleChipClick = vi.fn();

      render(
        <div onClick={handleChipClick}>
          <Chip type="input" onRemove={handleRemove} removable>
            Input Chip
          </Chip>
        </div>,
      );

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      await user.click(removeButton);

      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleChipClick).not.toHaveBeenCalled();
    });
  });

  describe('Icon and Avatar Support', () => {
    it('renders with icon', () => {
      render(
        <Chip type="assist" icon={<AddIcon />}>
          With Icon
        </Chip>,
      );

      const chip = screen.getByRole('button');
      const icon = chip.querySelector(`.${styles.icon}`);
      expect(icon).toBeInTheDocument();
    });

    it('renders with avatar', () => {
      render(
        <Chip type="assist" avatar={<img src="avatar.jpg" alt="User" />}>
          With Avatar
        </Chip>,
      );

      const chip = screen.getByRole('button');
      const avatar = chip.querySelector(`.${styles.avatar}`);
      expect(avatar).toBeInTheDocument();

      // Check that the img element exists within the avatar container
      const img = avatar?.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'avatar.jpg');
      expect(img).toHaveAttribute('alt', 'User');
    });

    it('prioritizes avatar over icon when both are provided', () => {
      render(
        <Chip type="assist" icon={<AddIcon />} avatar={<img src="avatar.jpg" alt="User" />}>
          With Both
        </Chip>,
      );

      const chip = screen.getByRole('button');
      const avatar = chip.querySelector(`.${styles.avatar}`);
      const icon = chip.querySelector(`.${styles.icon}`);

      expect(avatar).toBeInTheDocument();
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles Enter key for filter chips', async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(
        <Chip type="filter" onSelect={handleSelect}>
          Filter Chip
        </Chip>,
      );

      const chip = screen.getByRole('option');
      await user.click(chip);
      await user.keyboard('{Enter}');

      expect(handleSelect).toHaveBeenCalledWith(true);
    });

    it('handles Space key for assist chips', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Chip type="assist" onClick={handleClick}>
          Assist Chip
        </Chip>,
      );

      const chip = screen.getByRole('button');
      await user.click(chip);
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(2); // Once for click, once for space
    });

    it('handles Delete key for input chips', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();

      render(
        <Chip type="input" onRemove={handleRemove} removable>
          Input Chip
        </Chip>,
      );

      const chip = screen.getByRole('option');
      await user.click(chip);
      await user.keyboard('{Delete}');

      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('handles Backspace key for input chips', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();

      render(
        <Chip type="input" onRemove={handleRemove} removable>
          Input Chip
        </Chip>,
      );

      const chip = screen.getByRole('option');
      await user.click(chip);
      await user.keyboard('{Backspace}');

      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(
        <Chip type="assist" aria-label="Custom label">
          Test
        </Chip>,
      );
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Chip type="assist" aria-describedby="desc">
            Test
          </Chip>
          <div id="desc">Description</div>
        </div>,
      );

      const chip = screen.getByRole('button');
      expect(chip).toHaveAttribute('aria-describedby', 'desc');
    });

    it('has correct role for each chip type', () => {
      const { rerender } = render(<Chip type="assist">Assist</Chip>);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<Chip type="filter">Filter</Chip>);
      expect(screen.getByRole('option')).toBeInTheDocument();

      rerender(<Chip type="input">Input</Chip>);
      expect(screen.getByRole('option')).toBeInTheDocument();

      rerender(<Chip type="suggestion">Suggestion</Chip>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('prevents interactions when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Chip type="assist" disabled onClick={handleClick}>
          Disabled
        </Chip>,
      );

      const chip = screen.getByRole('button');
      await user.click(chip);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('disables remove button when chip is disabled', () => {
      const handleRemove = vi.fn();
      render(
        <Chip type="input" disabled onRemove={handleRemove} removable>
          Disabled Input
        </Chip>,
      );

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      expect(removeButton).toBeDisabled();
    });
  });

  describe('Icons', () => {
    it('renders CloseIcon correctly', () => {
      render(<CloseIcon />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('renders CheckIcon correctly', () => {
      render(<CheckIcon />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('renders AddIcon correctly', () => {
      render(<AddIcon />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });
});

describe('ChipGroup', () => {
  it('renders correctly with default props', () => {
    render(
      <ChipGroup>
        <Chip type="assist">Chip 1</Chip>
        <Chip type="assist">Chip 2</Chip>
      </ChipGroup>,
    );

    const group = screen.getByRole('group');
    expect(group).toBeInTheDocument();
    expect(group).toHaveClass(styles.chipGroup, styles.comfortable);
    expect(screen.getByText('Chip 1')).toBeInTheDocument();
    expect(screen.getByText('Chip 2')).toBeInTheDocument();
  });

  it('applies vertical orientation', () => {
    render(
      <ChipGroup orientation="vertical">
        <Chip type="assist">Chip 1</Chip>
      </ChipGroup>,
    );

    const group = screen.getByRole('group');
    expect(group).toHaveClass(styles.vertical);
  });

  it('applies compact spacing', () => {
    render(
      <ChipGroup spacing="compact">
        <Chip type="assist">Chip 1</Chip>
      </ChipGroup>,
    );

    const group = screen.getByRole('group');
    expect(group).toHaveClass(styles.compact);
  });

  it('applies no-wrap styling', () => {
    render(
      <ChipGroup wrap={false}>
        <Chip type="assist">Chip 1</Chip>
      </ChipGroup>,
    );

    const group = screen.getByRole('group');
    expect(group).toHaveClass(styles.noWrap);
  });
});
