# Contributing to Aurora UI

Welcome to Aurora UI! We're excited to have you contribute to our Material Design 3 component library.

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- Basic knowledge of TypeScript, Preact, and SCSS

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/aurora-ui.git
cd aurora-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Start Storybook
npm run storybook
```

## Development Workflow

### 1. Project Structure

```
src/
├── components/          # All components
│   └── ComponentName/   # Individual component folders
│       ├── ComponentName.tsx
│       ├── ComponentName.module.scss
│       ├── ComponentName.test.tsx
│       ├── ComponentName.stories.tsx
│       └── index.ts
├── styles/             # Global styles and design tokens
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### 2. Component Development Standards

#### File Structure

Every component must follow this structure:

```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.module.scss  # SCSS modules
├── ComponentName.test.tsx     # Vitest tests
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                   # Exports
```

#### TypeScript Interface Pattern

```tsx
interface ComponentNameProps {
  children?: ComponentChildren;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  // ... component-specific props
}

export const ComponentName = ({
  children,
  className,
  variant = 'default',
  ...props
}: ComponentNameProps) => {
  const styles = useComponentStyles(variant);

  return (
    <div className={`${styles.root} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
```

#### SCSS Module Pattern

```scss
@use '../styles/colors.scss' as *;
@use '../styles/typography.scss' as *;
@use '../styles/spacing.scss' as *;

// Local variables based on CSS custom properties
$component-bg: var(--md-sys-color-surface);
$component-color: var(--md-sys-color-on-surface);
$component-radius: var(--md-sys-shape-corner-medium);

.root {
  background-color: $component-bg;
  color: $component-color;
  border-radius: $component-radius;
}

.variant-outlined {
  border: 1px solid var(--md-sys-color-outline);
  background-color: transparent;
}
```

### 3. Material Design 3 Compliance

#### Design Token Usage

Always use MD3 design tokens:

```scss
// ✅ Correct
background-color: var(--md-sys-color-primary);
box-shadow: var(--md-sys-elevation-level2);

// ❌ Incorrect
background-color: #1976d2;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
```

#### Component Variants

Implement all MD3 variants when applicable:

```tsx
interface ButtonProps {
  variant?: 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text';
}
```

### 4. Testing Requirements

#### Unit Tests (Required)

```tsx
import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import { ComponentName } from './ComponentName';
import '@testing-library/jest-dom';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<ComponentName variant="outlined">Test</ComponentName>);
    expect(screen.getByText('Test')).toHaveClass('variant-outlined');
  });
});
```

#### Test Coverage Requirements

- Minimum 90% code coverage
- All component variants tested
- All interactive features tested
- Accessibility compliance tested

### 5. Storybook Documentation

#### Story Structure

```tsx
import type { Meta, StoryObj } from '@storybook/preact';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Component content',
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
  },
};
```

### 6. Accessibility Standards

#### WCAG 2.1 AA Compliance

All components must meet WCAG 2.1 AA standards:

- Semantic HTML elements
- ARIA attributes and roles
- Keyboard navigation
- Color contrast ratios
- Screen reader compatibility

#### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(<ComponentName />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Contribution Types

### 1. Bug Fixes

- Search existing issues before creating new ones
- Include reproduction steps
- Add regression tests
- Follow the existing code style

### 2. New Components

- Check if component exists in MD3 specifications
- Create implementation plan in `/docs/components/ComponentName/PLAN.md`
- Follow the component development standards
- Include comprehensive tests and documentation

### 3. Enhancements

- Discuss major changes in GitHub Discussions
- Maintain backwards compatibility
- Add migration guides for breaking changes
- Update documentation

### 4. Documentation

- Keep documentation current with code changes
- Include code examples
- Follow markdown style guide
- Test all code examples

## Code Style

### TypeScript

- Use strict TypeScript configuration
- Prefer interfaces over types for component props
- Use explicit return types for public APIs
- Follow naming conventions

### CSS/SCSS

- Use SCSS modules for component styles
- Follow BEM methodology for class names
- Use MD3 design tokens exclusively
- Mobile-first responsive design

### Commit Messages

Follow conventional commits:

```
feat(button): add loading state support
fix(card): resolve elevation style issue
docs(readme): update installation instructions
test(menu): add keyboard navigation tests
```

## Review Process

### Pull Request Guidelines

1. **Title**: Clear, descriptive title
2. **Description**: Explain what and why
3. **Testing**: Include test results
4. **Screenshots**: For UI changes
5. **Documentation**: Update relevant docs
6. **Breaking Changes**: Clearly marked

### Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass and coverage maintained
- [ ] Accessibility compliance verified
- [ ] MD3 specifications followed
- [ ] Documentation updated
- [ ] Backwards compatibility maintained

## Release Process

### Versioning

We follow Semantic Versioning (SemVer):

- **Major**: Breaking changes
- **Minor**: New features (backwards compatible)
- **Patch**: Bug fixes

### Release Phases

1. **Alpha**: Internal testing
2. **Beta**: Community testing
3. **RC**: Release candidate
4. **Stable**: Production ready

## Community

### Communication Channels

- **GitHub Discussions**: Design discussions and questions
- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Real-time community chat
- **Monthly Calls**: Community sync meetings

### Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/). Be respectful, inclusive, and constructive in all interactions.

## Recognition

### Contributors

All contributors are recognized in:

- README.md contributors section
- Release notes
- Community highlights
- Annual contributor appreciation

### Maintainer Program

Active contributors may be invited to join the maintainer team with additional responsibilities and privileges.

## Getting Help

### Documentation

- Component API reference
- Design system guidelines
- Implementation examples
- Migration guides

### Support Channels

- GitHub Discussions for questions
- Discord for real-time help
- Stack Overflow with `aurora-ui` tag
- Office hours (monthly)

### Mentorship

New contributors can request mentorship from experienced maintainers for guidance on their first contributions.

Thank you for contributing to Aurora UI! Together we're building the future of Material Design 3 component libraries.
