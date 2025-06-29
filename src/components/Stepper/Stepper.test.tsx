import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { expect, test, describe, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Stepper, Step } from './index';

describe('Stepper', () => {
  test('renders stepper with steps', () => {
    render(
      <Stepper activeStep={0}>
        <Step index={0} label="Step 1" description="First step">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2" description="Second step">
          <div>Step 2 content</div>
        </Step>
      </Stepper>,
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('First step')).toBeInTheDocument();
    expect(screen.getByText('Second step')).toBeInTheDocument();
  });

  test('renders horizontal stepper by default', () => {
    render(
      <Stepper activeStep={0}>
        <Step index={0} label="Step 1">
          <div>Content</div>
        </Step>
      </Stepper>,
    );

    const stepper = screen.getByTestId('stepper');
    expect(stepper).toHaveAttribute('aria-orientation', 'horizontal');
  });

  test('renders vertical stepper when specified', () => {
    render(
      <Stepper activeStep={0} orientation="vertical">
        <Step index={0} label="Step 1">
          <div>Content</div>
        </Step>
      </Stepper>,
    );

    const stepper = screen.getByTestId('stepper');
    expect(stepper).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('shows active step content', () => {
    render(
      <Stepper activeStep={1}>
        <Step index={0} label="Step 1">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2">
          <div>Step 2 content</div>
        </Step>
      </Stepper>,
    );

    expect(screen.getByText('Step 2 content')).toBeInTheDocument();
  });

  test('handles step completion states', () => {
    render(
      <Stepper activeStep={1}>
        <Step index={0} label="Step 1" completed={true}>
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2" completed={false}>
          <div>Step 2 content</div>
        </Step>
      </Stepper>,
    );

    // Check that completed step has proper ARIA state
    const step1 = screen.getByTestId('step-0');
    expect(step1).toHaveAttribute('aria-selected', 'false'); // completed but not active

    const step2 = screen.getByTestId('step-1');
    expect(step2).toHaveAttribute('aria-selected', 'true'); // active step
  });

  test('handles error states', () => {
    render(
      <Stepper activeStep={1}>
        <Step index={0} label="Step 1" error={true}>
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2">
          <div>Step 2 content</div>
        </Step>
      </Stepper>,
    );

    const step1 = screen.getByTestId('step-0');
    expect(step1).toHaveAttribute('aria-selected', 'false');
    // For error steps, we could add aria-invalid attribute
    // For now just check it renders without crashing
    expect(step1).toBeInTheDocument();
  });

  test('handles disabled states', () => {
    render(
      <Stepper activeStep={0}>
        <Step index={0} label="Step 1">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2" disabled={true}>
          <div>Step 2 content</div>
        </Step>
      </Stepper>,
    );

    const step2 = screen.getByTestId('step-1');
    expect(step2).toHaveAttribute('aria-disabled', 'true');
    expect(step2).toHaveAttribute('tabindex', '-1');
  });

  test('calls onStepChange when step is clicked in non-linear mode', async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();

    render(
      <Stepper activeStep={0} linear={false} onStepChange={onStepChange}>
        <Step index={0} label="Step 1">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2">
          <div>Step 2 content</div>
        </Step>
      </Stepper>,
    );

    const step2 = screen.getByTestId('step-1');
    await user.click(step2);

    expect(onStepChange).toHaveBeenCalledWith(1);
  });

  test('does not allow clicking steps in linear mode', async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();

    render(
      <Stepper activeStep={0} linear={true} onStepChange={onStepChange}>
        <Step index={0} label="Step 1">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2">
          <div>Step 2 content</div>
        </Step>
      </Stepper>,
    );

    const step2 = screen.getByTestId('step-1');
    await user.click(step2);

    // Should not change step in linear mode (step 2 is not completed/active)
    expect(onStepChange).not.toHaveBeenCalled();
  });

  test('renders custom icons', () => {
    render(
      <Stepper activeStep={0}>
        <Step index={0} label="Step 1" icon="🎯">
          <div>Step 1 content</div>
        </Step>
      </Stepper>,
    );

    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  test('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();

    render(
      <Stepper activeStep={0} linear={false} onStepChange={onStepChange}>
        <Step index={0} label="Step 1">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2">
          <div>Step 2 content</div>
        </Step>
      </Stepper>,
    );

    const step1 = screen.getByTestId('step-0');

    // Focus the step first
    step1.focus();

    // Enter should activate step
    await user.keyboard('{Enter}');
    expect(onStepChange).toHaveBeenCalledWith(0);

    // Space should also activate step
    await user.keyboard(' ');
    expect(onStepChange).toHaveBeenCalledWith(0);
  });
});
