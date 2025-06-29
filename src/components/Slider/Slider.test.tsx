import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Slider } from './Slider';
import { RangeSlider } from './RangeSlider';
import styles from './Slider.module.scss';

describe('Slider Component', () => {
  it('renders with default props', () => {
    render(<Slider />);
    const slider = screen.getByRole('slider');

    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders with custom props', () => {
    render(
      <Slider
        min={10}
        max={50}
        defaultValue={25}
        step={5}
        label="Test Slider"
        helperText="Helper text"
      />,
    );

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '50');
    expect(slider).toHaveAttribute('aria-valuenow', '25');

    expect(screen.getByText('Test Slider')).toBeInTheDocument();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('handles controlled mode', () => {
    render(<Slider value={30} onChange={vi.fn()} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '30');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Slider defaultValue={50} onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');

    expect(handleChange).toHaveBeenCalledWith(51);
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Slider defaultValue={50} onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    slider.focus();

    // Arrow right increases value
    await user.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledWith(51);

    // Arrow left decreases value (from current value 51)
    await user.keyboard('{ArrowLeft}');
    expect(handleChange).toHaveBeenCalledWith(50);

    // Home sets to minimum
    await user.keyboard('{Home}');
    expect(handleChange).toHaveBeenCalledWith(0);

    // End sets to maximum
    await user.keyboard('{End}');
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it('respects step values in discrete mode', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Slider defaultValue={20} step={10} variant="discrete" onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');

    expect(handleChange).toHaveBeenCalledWith(30);
  });

  it('displays tick marks in discrete mode with showTicks', () => {
    render(<Slider min={0} max={50} step={10} variant="discrete" showTicks={true} />);

    // Should have ticks at 0, 10, 20, 30, 40, 50
    const ticks = document.querySelectorAll(`.${styles.tick}`);
    expect(ticks).toHaveLength(6);
  });

  it('shows value label when showValue is true', () => {
    render(<Slider defaultValue={42} showValue={true} />);

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('uses custom value formatter', () => {
    render(<Slider defaultValue={25} showValue={true} valueFormatter={(value) => `${value}%`} />);

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Slider disabled={true} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-disabled', 'true');
    expect(slider).toHaveAttribute('tabindex', '-1');
  });

  it('displays error state', () => {
    render(<Slider error={true} errorMessage="Value too high" label="Test Slider" />);

    expect(screen.getByText('Value too high')).toBeInTheDocument();
  });

  it('handles vertical orientation', () => {
    const { container } = render(<Slider orientation="vertical" />);

    expect(container.firstChild).toHaveClass(styles.vertical);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('calls onChangeStart and onChangeEnd', async () => {
    const handleChangeStart = vi.fn();
    const handleChangeEnd = vi.fn();

    const { container } = render(
      <Slider defaultValue={50} onChangeStart={handleChangeStart} onChangeEnd={handleChangeEnd} />,
    );

    const slider = screen.getByRole('slider');

    // Find the track element (parent of slider with mouse handler)
    const track = container.querySelector(`.${styles.track}`);
    if (track) {
      vi.spyOn(track, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        top: 0,
        width: 100,
        height: 20,
        right: 100,
        bottom: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect);
    }

    // Simulate mouse down and up with coordinates
    fireEvent.mouseDown(track || slider, { clientX: 50 });
    expect(handleChangeStart).toHaveBeenCalledWith(50);

    fireEvent.mouseUp(document);
    expect(handleChangeEnd).toHaveBeenCalledWith(50);
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    render(<Slider />);

    const slider = screen.getByRole('slider');

    await user.tab(); // Focus the slider
    expect(slider).toHaveClass(styles.focused);

    await user.tab(); // Blur the slider by moving to next element
    expect(slider).not.toHaveClass(styles.focused);
  });

  it('clamps values to min/max range', () => {
    const handleChange = vi.fn();
    render(
      <Slider
        min={20}
        max={80}
        defaultValue={10} // Below min
        onChange={handleChange}
      />,
    );

    // Value should be clamped to min
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '20');
  });

  it('supports ARIA attributes', () => {
    render(<Slider aria-label="Volume Control" aria-describedby="volume-help" />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-label', 'Volume Control');
    expect(slider).toHaveAttribute('aria-describedby', 'volume-help');
  });
});

describe('RangeSlider Component', () => {
  it('renders with default props', () => {
    render(<RangeSlider />);
    const sliders = screen.getAllByRole('slider');

    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '0');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '100');
  });

  it('renders with custom default value', () => {
    render(<RangeSlider defaultValue={[20, 80]} />);
    const sliders = screen.getAllByRole('slider');

    expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
  });

  it('handles controlled mode', () => {
    const handleChange = vi.fn();
    render(<RangeSlider value={[30, 70]} onChange={handleChange} />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '30');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '70');
  });

  it('calls onChange when thumb values change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RangeSlider defaultValue={[40, 60]} onChange={handleChange} />);

    const sliders = screen.getAllByRole('slider');
    sliders[0].focus();
    await user.keyboard('{ArrowRight}');

    expect(handleChange).toHaveBeenCalledWith([41, 60]);
  });

  it('maintains min <= max order', () => {
    const handleChange = vi.fn();
    render(<RangeSlider defaultValue={[60, 40]} onChange={handleChange} />);

    const sliders = screen.getAllByRole('slider');
    // Values should be reordered to [40, 60]
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '40');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '60');
  });

  it('handles keyboard navigation for both thumbs', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RangeSlider defaultValue={[30, 70]} onChange={handleChange} />);

    const sliders = screen.getAllByRole('slider');

    // Test first thumb
    sliders[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(handleChange).toHaveBeenCalledWith([31, 70]);

    // Test second thumb (starts from current state [31, 70])
    sliders[1].focus();
    await user.keyboard('{ArrowLeft}');
    expect(handleChange).toHaveBeenCalledWith([31, 69]);
  });

  it('shows individual value labels when showValue is true', () => {
    render(<RangeSlider defaultValue={[25, 75]} showValue={true} />);

    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('uses custom value formatter for both thumbs', () => {
    render(
      <RangeSlider
        defaultValue={[20, 80]}
        showValue={true}
        valueFormatter={(value) => `$${value}`}
      />,
    );

    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText('$80')).toBeInTheDocument();
  });

  it('handles disabled state for both thumbs', () => {
    render(<RangeSlider disabled={true} />);

    const sliders = screen.getAllByRole('slider');
    sliders.forEach((slider) => {
      expect(slider).toHaveAttribute('aria-disabled', 'true');
      expect(slider).toHaveAttribute('tabindex', '-1');
    });
  });

  it('displays tick marks in discrete mode', () => {
    render(<RangeSlider min={0} max={40} step={10} variant="discrete" showTicks={true} />);

    // Should have ticks at 0, 10, 20, 30, 40
    const ticks = document.querySelectorAll(`.${styles.tick}`);
    expect(ticks).toHaveLength(5);
  });

  it('handles vertical orientation', () => {
    const { container } = render(<RangeSlider orientation="vertical" />);

    expect(container.firstChild).toHaveClass(styles.vertical);

    const sliders = screen.getAllByRole('slider');
    sliders.forEach((slider) => {
      expect(slider).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  it('calls onChangeStart and onChangeEnd', async () => {
    const handleChangeStart = vi.fn();
    const handleChangeEnd = vi.fn();

    const { container } = render(
      <RangeSlider
        defaultValue={[30, 70]}
        onChangeStart={handleChangeStart}
        onChangeEnd={handleChangeEnd}
      />,
    );

    const sliders = screen.getAllByRole('slider');

    // Find the track element (parent of slider with mouse handler)
    const track = container.querySelector(`.${styles.track}`);
    if (track) {
      vi.spyOn(track, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        top: 0,
        width: 100,
        height: 20,
        right: 100,
        bottom: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect);
    }

    // Simulate mouse down and up on first thumb with coordinates
    fireEvent.mouseDown(track || sliders[0], { clientX: 30 });
    expect(handleChangeStart).toHaveBeenCalledWith([30, 70]);

    fireEvent.mouseUp(document);
    expect(handleChangeEnd).toHaveBeenCalledWith([30, 70]);
  });

  it('has proper ARIA attributes for each thumb', () => {
    render(<RangeSlider defaultValue={[20, 80]} aria-label="Price Range" />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveAttribute('aria-label', 'Price Range minimum');
    expect(sliders[1]).toHaveAttribute('aria-label', 'Price Range maximum');
    expect(sliders[0]).toHaveAttribute('aria-valuetext', 'Minimum: 20');
    expect(sliders[1]).toHaveAttribute('aria-valuetext', 'Maximum: 80');
  });

  it('respects step values in discrete mode', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <RangeSlider defaultValue={[20, 60]} step={10} variant="discrete" onChange={handleChange} />,
    );

    const sliders = screen.getAllByRole('slider');
    sliders[0].focus();
    await user.keyboard('{ArrowRight}');

    expect(handleChange).toHaveBeenCalledWith([30, 60]);
  });
});
