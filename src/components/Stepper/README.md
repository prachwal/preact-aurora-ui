# Stepper Component

## Description

The `Stepper` component displays a sequence of steps in a process.

## Usage

```tsx
import { Stepper, Step } from '@aurora-ui/components';

function App() {
  return (
    <Stepper activeStep={activeStep}>
      <Step label="Step 1" />
      <Step label="Step 2" />
      <Step label="Step 3" />
    </Stepper>
  );
}
```

## API

### `Stepper` Props

| Prop        | Type          | Default     | Description                                          |
| ----------- | ------------- | ----------- | ---------------------------------------------------- | ------------------------------- |
| children    | `ReactNode`   |             | The `Step` components to display within the stepper. |
| activeStep  | `number`      | `0`         | The index of the currently active step.              |
| orientation | `"horizontal" | "vertical"` | `"horizontal"`                                       | The orientation of the stepper. |
| className   | `string`      |             | Additional CSS classes for custom styling.           |

### `Step` Props

| Prop      | Type     | Default | Description                                |
| --------- | -------- | ------- | ------------------------------------------ |
| label     | `string` |         | The label to display for the step.         |
| className | `string` |         | Additional CSS classes for custom styling. |

### Types

See [`Stepper.tsx`](./Stepper.tsx) and [`Step.tsx`](./Step.tsx) for detailed type definitions.

## Styling and Theming

The `Stepper` and `Step` components use SCSS Modules for styling, following the Material Design 3 guidelines. They leverage custom properties defined in `src/styles/colors.scss`, `src/styles/typography.scss`, and `src/styles/spacing.scss` for theming.

See [`Stepper.module.scss`](./Stepper.module.scss) for details.

## Accessibility

The `Stepper` component provides basic accessibility features. Use ARIA attributes to provide more context.

## Testing

See [`Stepper.test.tsx`](./Stepper.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I change the active step?**  
A: Use the `activeStep` prop to control the active step in your component.

**Q: How do I change the orientation of the stepper?**  
A: Use the `orientation` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
