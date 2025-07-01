# Stepper Component

A Material Design 3 stepper component for displaying step-by-step processes with interactive navigation, status indicators, and content areas.

## Overview

The Stepper component provides:

- **Horizontal & Vertical Layouts**: Flexible orientation options
- **Step States**: Active, completed, error, and disabled states
- **Linear & Non-linear**: Control step progression behavior
- **Interactive Navigation**: Click to navigate between steps
- **Content Areas**: Expandable content for each step
- **Accessibility**: Full keyboard navigation and screen reader support
- **Mobile Optimization**: Responsive design with mobile variant

## Basic Usage

```tsx
import { Stepper, Step } from '@aurora-ui/preact-aurora-ui';

function OnboardingProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
      <Step label="Account Setup">
        <div>Create your account information...</div>
      </Step>
      <Step label="Profile Details">
        <div>Add your profile details...</div>
      </Step>
      <Step label="Verification">
        <div>Verify your account...</div>
      </Step>
    </Stepper>
  );
}
```

## API Reference

### Stepper Props

| Prop           | Type                         | Default        | Description                                |
| -------------- | ---------------------------- | -------------- | ------------------------------------------ |
| `activeStep`   | `number`                     | **required**   | Current active step index (0-based)        |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` | Stepper layout direction                   |
| `variant`      | `'standard' \| 'mobile'`     | `'standard'`   | Stepper variant for different screen sizes |
| `linear`       | `boolean`                    | `true`         | Whether steps must be completed in order   |
| `onStepChange` | `(step: number) => void`     |                | Callback when step is changed              |
| `className`    | `string`                     |                | Additional CSS classes                     |
| `children`     | `ComponentChildren`          | **required**   | Step components                            |

### Step Props

| Prop          | Type                | Default      | Description               |
| ------------- | ------------------- | ------------ | ------------------------- |
| `label`       | `string`            | **required** | Step label text           |
| `description` | `string`            |              | Optional step description |
| `icon`        | `ComponentChildren` |              | Custom step icon          |
| `optional`    | `boolean`           | `false`      | Mark step as optional     |
| `completed`   | `boolean`           | `false`      | Override completion state |
| `error`       | `boolean`           | `false`      | Show error state          |
| `disabled`    | `boolean`           | `false`      | Disable step interaction  |
| `children`    | `ComponentChildren` |              | Step content              |
| `className`   | `string`            |              | Additional CSS classes    |

## Examples

### Horizontal Stepper (Default)

```tsx
function HorizontalStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted((prev) => new Set([...prev, activeStep]));
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} onStepChange={handleStepChange}>
        <Step label="Select campaign settings" completed={completed.has(0)}>
          <div>
            <h3>Campaign Settings</h3>
            <p>Configure your advertising campaign...</p>
            <button onClick={handleComplete}>Continue</button>
          </div>
        </Step>

        <Step label="Create an ad group" completed={completed.has(1)}>
          <div>
            <h3>Ad Group Creation</h3>
            <p>Set up your ad groups...</p>
            <button onClick={handleComplete}>Continue</button>
          </div>
        </Step>

        <Step label="Create an ad" completed={completed.has(2)}>
          <div>
            <h3>Ad Creation</h3>
            <p>Design your advertisement...</p>
            <button onClick={handleComplete}>Finish</button>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}
```

### Vertical Stepper

```tsx
function VerticalStepper() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep} orientation="vertical" onStepChange={setActiveStep}>
      <Step label="Shipping Information">
        <div>
          <p>Enter your shipping details</p>
          <input placeholder="Address" />
          <input placeholder="City" />
          <button onClick={() => setActiveStep(1)}>Continue</button>
        </div>
      </Step>

      <Step label="Payment Details">
        <div>
          <p>Select payment method</p>
          <button onClick={() => setActiveStep(2)}>Continue</button>
        </div>
      </Step>

      <Step label="Review Order">
        <div>
          <p>Review and confirm your order</p>
          <button onClick={() => alert('Order placed!')}>Place Order</button>
        </div>
      </Step>
    </Stepper>
  );
}
```

### Non-linear Stepper

```tsx
function NonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set([0])); // First step pre-completed

  return (
    <Stepper
      activeStep={activeStep}
      linear={false} // Allow jumping between steps
      onStepChange={setActiveStep}
    >
      <Step label="Basic Info" completed={completed.has(0)}>
        <div>Basic information form...</div>
      </Step>

      <Step label="Advanced Settings" optional completed={completed.has(1)}>
        <div>Optional advanced settings...</div>
      </Step>

      <Step label="Review" completed={completed.has(2)}>
        <div>Review all settings...</div>
      </Step>
    </Stepper>
  );
}
```

### Error and Status States

```tsx
function StatusStepper() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Stepper activeStep={activeStep}>
      <Step label="Account Created" completed description="✓ Successfully completed">
        <div>Account has been created successfully</div>
      </Step>

      <Step label="Email Verification" error description="⚠ Verification failed">
        <div>
          <p>Email verification failed. Please try again.</p>
          <button>Resend Email</button>
        </div>
      </Step>

      <Step label="Profile Setup" disabled description="Complete previous steps first">
        <div>This step is locked until verification is complete</div>
      </Step>
    </Stepper>
  );
}
```

### Custom Icons

```tsx
function CustomIconStepper() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep}>
      <Step label="User Account" icon={<UserIcon />} description="Create your account">
        <div>Account creation form...</div>
      </Step>

      <Step label="Security" icon={<ShieldIcon />} description="Set up security">
        <div>Security settings...</div>
      </Step>

      <Step label="Preferences" icon={<SettingsIcon />} description="Configure preferences">
        <div>Preference settings...</div>
      </Step>
    </Stepper>
  );
}
```

### Mobile Variant

```tsx
function MobileStepper() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep} variant="mobile" orientation="horizontal">
      <Step label="Step 1">Content 1</Step>
      <Step label="Step 2">Content 2</Step>
      <Step label="Step 3">Content 3</Step>
    </Stepper>
  );
}
```

## Accessibility Features

### Keyboard Navigation

- **Tab**: Navigate between interactive steps
- **Enter/Space**: Activate focused step
- **Arrow Keys**: Navigate between steps (in non-linear mode)

### Screen Reader Support

```tsx
// Enhanced accessibility
<Stepper activeStep={activeStep} aria-label="Registration process" role="tablist">
  <Step label="Personal Information" aria-describedby="step-1-description">
    <div id="step-1-description">Enter your personal details to begin registration</div>
  </Step>
</Stepper>
```

### ARIA Attributes

- **role="tablist"**: Stepper container
- **role="tab"**: Individual steps
- **aria-selected**: Current active step
- **aria-disabled**: Disabled steps
- **aria-orientation**: Stepper direction

## State Management Patterns

### Controlled Stepper

```tsx
function ControlledStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [errorSteps, setErrorSteps] = useState(new Set());

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps((prev) => new Set([...prev, stepIndex]));
    setErrorSteps((prev) => {
      const newSet = new Set(prev);
      newSet.delete(stepIndex);
      return newSet;
    });
  };

  const handleStepError = (stepIndex) => {
    setErrorSteps((prev) => new Set([...prev, stepIndex]));
  };

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => (
        <Step
          key={step.id}
          label={step.label}
          completed={completedSteps.has(index)}
          error={errorSteps.has(index)}
          optional={step.optional}
        >
          <StepContent
            step={step}
            onNext={handleNext}
            onBack={handleBack}
            onComplete={() => handleStepComplete(index)}
            onError={() => handleStepError(index)}
          />
        </Step>
      ))}
    </Stepper>
  );
}
```

### Form Integration

```tsx
function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateStep = (stepIndex) => {
    const stepErrors = validateStepData(formData, stepIndex);
    setErrors((prev) => ({ ...prev, [stepIndex]: stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <form>
      <Stepper activeStep={activeStep}>
        <Step label="Personal Info" error={!!errors[0]}>
          <PersonalInfoForm data={formData} onChange={setFormData} errors={errors[0]} />
          <button onClick={handleNext}>Next</button>
        </Step>

        <Step label="Contact Info" error={!!errors[1]}>
          <ContactInfoForm data={formData} onChange={setFormData} errors={errors[1]} />
          <button onClick={handleNext}>Next</button>
        </Step>

        <Step label="Review">
          <ReviewForm data={formData} />
          <button type="submit">Submit</button>
        </Step>
      </Stepper>
    </form>
  );
}
```

## Theming and Customization

### CSS Custom Properties

```scss
.custom-stepper {
  // Colors
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-error: #ba1a1a;
  --md-sys-color-on-error: #ffffff;

  // Surface colors
  --md-sys-color-surface: #ffffff;
  --md-sys-color-on-surface: #1a1a1a;
  --md-sys-color-surface-variant: #f5f5f5;

  // Outline colors
  --md-sys-color-outline: #e0e0e0;
  --md-sys-color-outline-variant: #f0f0f0;
}
```

### Custom Styling

```scss
// Custom step indicator
.stepper .stepIndicator {
  border: 2px solid var(--md-sys-color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &.completed {
    background: linear-gradient(45deg, #667eea, #764ba2);
  }
}

// Custom connector
.stepper .stepConnector {
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

// Custom labels
.stepper .stepLabel {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

## Advanced Patterns

### Wizard-like Navigation

```tsx
function WizardStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [stepData, setStepData] = useState({});

  const isStepValid = (step) => {
    // Validation logic for each step
    return true;
  };

  const canGoNext = isStepValid(activeStep);
  const canGoBack = activeStep > 0;

  return (
    <div className="wizard">
      <Stepper activeStep={activeStep} linear>
        {/* Steps */}
      </Stepper>

      <div className="wizard-controls">
        <button disabled={!canGoBack} onClick={() => setActiveStep((prev) => prev - 1)}>
          Back
        </button>

        <button disabled={!canGoNext} onClick={() => setActiveStep((prev) => prev + 1)}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
```

### Progress Tracking

```tsx
function ProgressStepper() {
  const [activeStep, setActiveStep] = useState(2);
  const [progress, setProgress] = useState({
    completed: [0, 1],
    current: 2,
    total: 5,
  });

  const progressPercentage = (progress.completed.length / progress.total) * 100;

  return (
    <div>
      <div className="progress-header">
        <h2>Setup Progress ({progressPercentage.toFixed(0)}%)</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      <Stepper activeStep={activeStep}>{/* Steps */}</Stepper>
    </div>
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Stepper, Step } from '@aurora-ui/preact-aurora-ui';

test('navigates between steps', async () => {
  const onStepChange = vi.fn();

  render(
    <Stepper activeStep={0} onStepChange={onStepChange}>
      <Step label="Step 1">Content 1</Step>
      <Step label="Step 2">Content 2</Step>
    </Stepper>,
  );

  const step2 = screen.getByText('Step 2');
  await userEvent.click(step2);

  expect(onStepChange).toHaveBeenCalledWith(1);
});

test('respects linear progression', () => {
  render(
    <Stepper activeStep={0} linear>
      <Step label="Step 1">Content 1</Step>
      <Step label="Step 2">Content 2</Step>
    </Stepper>,
  );

  const step2 = screen.getByText('Step 2');
  expect(step2).toHaveAttribute('tabindex', '-1');
});

test('handles keyboard navigation', async () => {
  const onStepChange = vi.fn();

  render(
    <Stepper activeStep={0} onStepChange={onStepChange} linear={false}>
      <Step label="Step 1">Content 1</Step>
      <Step label="Step 2">Content 2</Step>
    </Stepper>,
  );

  const step2 = screen.getByText('Step 2');
  step2.focus();
  await userEvent.keyboard('{Enter}');

  expect(onStepChange).toHaveBeenCalledWith(1);
});
```

### Integration Tests

```tsx
test('complete stepper workflow', async () => {
  const user = userEvent.setup();

  render(<FormStepper />);

  // Fill first step
  await user.type(screen.getByLabelText('Name'), 'John Doe');
  await user.click(screen.getByText('Next'));

  // Check second step is active
  expect(screen.getByText('Step 2')).toHaveAttribute('aria-selected', 'true');

  // Complete workflow
  await user.click(screen.getByText('Submit'));

  expect(screen.getByText('Form submitted')).toBeInTheDocument();
});
```

## Performance Considerations

### Lazy Content Loading

```tsx
function LazyContentStepper() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper activeStep={activeStep}>
      <Step label="Basic Info">{activeStep === 0 && <BasicInfoForm />}</Step>

      <Step label="Advanced Settings">{activeStep === 1 && <AdvancedSettingsForm />}</Step>

      <Step label="Review">{activeStep === 2 && <ReviewForm />}</Step>
    </Stepper>
  );
}
```

### Memoization

```tsx
const MemoizedStep = memo(({ children, ...props }) => <Step {...props}>{children}</Step>);

function OptimizedStepper() {
  const steps = useMemo(() => generateSteps(), []);

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((step) => (
        <MemoizedStep key={step.id} {...step.props}>
          {step.content}
        </MemoizedStep>
      ))}
    </Stepper>
  );
}
```

## Browser Support

- **Modern Browsers**: Full feature support
- **CSS Grid**: Used for complex layouts
- **Flexbox**: Core layout system
- **CSS Custom Properties**: Theming system
- **ARIA**: Screen reader compatibility

## Related Components

- [Button](../Button/README.md) - For step navigation controls
- [TextField](../TextField/README.md) - For form inputs within steps
- [Card](../Card/README.md) - For step content containers
- [Progress](../Loader/README.md) - For progress indicators

## Troubleshooting

### Common Issues

**Q: Steps not navigating correctly?**  
A: Check that `onStepChange` handler is properly updating the `activeStep` state.

**Q: Linear stepper allows skipping steps?**  
A: Ensure `linear={true}` and steps are marked as `completed` when finished.

**Q: Custom icons not appearing?**  
A: Verify icon components are properly imported and passed to `icon` prop.

**Q: Content not expanding in vertical mode?**  
A: Check that step has `children` content and isn't disabled.

**Q: Accessibility warnings?**  
A: Ensure proper ARIA labels and keyboard navigation handlers are implemented.

### Performance Tips

1. **Use lazy loading** for heavy step content
2. **Memoize step components** when content doesn't change
3. **Implement proper validation** to prevent unnecessary re-renders
4. **Use controlled state** for better performance in complex scenarios
5. **Minimize step re-creation** with stable keys and props

## Resources

- [Material Design Steppers](https://m3.material.io/components/steppers)
- [WCAG Navigation Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [React Hook Form Integration](https://react-hook-form.com/)
