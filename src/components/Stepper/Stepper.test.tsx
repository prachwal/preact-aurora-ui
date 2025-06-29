import { render, screen, fireEvent } from '@testing-library/preact';
import { expect, test, describe, vi } from 'vitest';

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
      </Stepper>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('First step')).toBeInTheDocument();
    expect(screen.getByText('Second step')).toBeInTheDocument();
  });

  test('renders horizontal stepper by default', () => {
    const { container } = render(
      <Stepper activeStep={0}>
        <Step index={0} label="Step 1">
          <div>Content</div>
        </Step>
      </Stepper>
    );

    const stepper = container.querySelector('.stepper');
    expect(stepper).toHaveClass('horizontal');
  });

  test('renders vertical stepper when specified', () => {
    const { container } = render(
      <Stepper activeStep={0} orientation="vertical">
        <Step index={0} label="Step 1">
          <div>Content</div>
        </Step>
      </Stepper>
    );

    const stepper = container.querySelector('.stepper');
    expect(stepper).toHaveClass('vertical');
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
      </Stepper>
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
      </Stepper>
    );

    // Check that completed step has proper indicator
    const step1 = screen.getByText('Step 1').closest('.step');
    expect(step1).toHaveClass('completed');
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
      </Stepper>
    );

    const step1 = screen.getByText('Step 1').closest('.step');
    expect(step1).toHaveClass('error');
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
      </Stepper>
    );

    const step2 = screen.getByText('Step 2').closest('.step');
    expect(step2).toHaveClass('disabled');
  });

  test('calls onStepChange when step is clicked in non-linear mode', () => {
    const onStepChange = vi.fn();

    render(
      <Stepper activeStep={0} linear={false} onStepChange={onStepChange}>
        <Step index={0} label="Step 1">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2">
          <div>Step 2 content</div>
        </Step>
      </Stepper>
    );

    const step2Label = screen.getByText('Step 2');
    fireEvent.click(step2Label);

    expect(onStepChange).toHaveBeenCalledWith(1);
  });

  test('does not allow clicking steps in linear mode', () => {
    const onStepChange = vi.fn();

    render(
      <Stepper activeStep={0} linear={true} onStepChange={onStepChange}>
        <Step index={0} label="Step 1">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2">
          <div>Step 2 content</div>
        </Step>
      </Stepper>
    );

    const step2Label = screen.getByText('Step 2');
    fireEvent.click(step2Label);

    // Should not change step in linear mode
    expect(onStepChange).not.toHaveBeenCalled();
  });

  test('renders custom icons', () => {
    render(
      <Stepper activeStep={0}>
        <Step index={0} label="Step 1" icon="🎯">
          <div>Step 1 content</div>
        </Step>
      </Stepper>
    );

    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  test('supports keyboard navigation', () => {
    const onStepChange = vi.fn();

    render(
      <Stepper activeStep={0} linear={false} onStepChange={onStepChange}>
        <Step index={0} label="Step 1">
          <div>Step 1 content</div>
        </Step>
        <Step index={1} label="Step 2">
          <div>Step 2 content</div>
        </Step>
      </Stepper>
    );

    const step1 = screen.getByText('Step 1');

    // Enter should activate step
    fireEvent.keyDown(step1, { key: 'Enter' });
    expect(onStepChange).toHaveBeenCalledWith(0);

    // Space should also activate step
    fireEvent.keyDown(step1, { key: ' ' });
    expect(onStepChange).toHaveBeenCalledWith(0);
  });
});
