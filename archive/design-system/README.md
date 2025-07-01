# Design System Documentation

Material Design 3 implementation details and design tokens.

## Color System

### MD3 Color Tokens ✅ IMPLEMENTED

- **Primary Colors**: Primary, on-primary, primary-container, on-primary-container
- **Secondary Colors**: Secondary, on-secondary, secondary-container, on-secondary-container
- **Tertiary Colors**: Tertiary, on-tertiary, tertiary-container, on-tertiary-container
- **Surface Colors**: Background, surface, surface-variant, on-surface, on-surface-variant
- **Error Colors**: Error, on-error, error-container, on-error-container
- **Outline Colors**: Outline, outline-variant
- **Special Colors**: Shadow, scrim, inverse-surface, inverse-on-surface, inverse-primary

### Theme Support ✅ IMPLEMENTED

- **Light Theme**: Complete MD3 light color palette
- **Dark Theme**: Complete MD3 dark color palette
- **Custom Themes**: Support for brand color customization
- **Theme Switching**: Runtime theme switching with localStorage persistence

## Elevation System

### MD3 Elevation Levels ✅ IMPLEMENTED

- **Level 0**: No elevation (0px)
- **Level 1**: 1dp elevation for cards, buttons
- **Level 2**: 3dp elevation for FABs, dialogs
- **Level 3**: 6dp elevation for navigation drawers
- **Level 4**: 8dp elevation for modal dialogs
- **Level 5**: 12dp elevation for menus, dropdowns

### Dark Theme Adjustments ✅ IMPLEMENTED

- Enhanced shadows for better contrast in dark environments
- Surface tint overlays for elevated components

## Typography System

### MD3 Typography Scale (PLANNED)

- **Display**: Large headlines (display-large, display-medium, display-small)
- **Headline**: Section headers (headline-large, headline-medium, headline-small)
- **Title**: Subsection headers (title-large, title-medium, title-small)
- **Body**: Reading text (body-large, body-medium, body-small)
- **Label**: UI labels (label-large, label-medium, label-small)

### Font Families (PLANNED)

- **Brand Font**: Primary brand typography
- **Plain Font**: Fallback system fonts
- **Weight Scale**: Regular (400), Medium (500), Bold (700)

## Motion System

### Animation Curves (PLANNED)

- **Standard**: General animations (cubic-bezier(0.2, 0, 0, 1))
- **Decelerate**: Enter animations (cubic-bezier(0, 0, 0, 1))
- **Accelerate**: Exit animations (cubic-bezier(0.3, 0, 1, 1))
- **Sharp**: Temporary animations (cubic-bezier(0.4, 0, 0.6, 1))

### Duration Tokens (PLANNED)

- **Short1**: 50ms - Simple icon animations
- **Short2**: 100ms - Selection controls
- **Medium1**: 250ms - Component state changes
- **Medium2**: 300ms - Small component animations
- **Long1**: 400ms - Large component animations
- **Long2**: 500ms - Complex component animations

## State System

### Component States ✅ IMPLEMENTED

- **Enabled**: Default interactive state
- **Disabled**: Non-interactive state with reduced opacity
- **Hover**: Mouse hover state with surface color overlay
- **Focus**: Keyboard focus with outline indicator
- **Pressed**: Active press state with deeper color
- **Selected**: Selection state for toggleable components

### State Layers ✅ IMPLEMENTED

- **Hover Layer**: 8% opacity overlay
- **Focus Layer**: 12% opacity overlay
- **Pressed Layer**: 16% opacity overlay
- **Selected Layer**: 16% opacity overlay

## Usage Guidelines

### Implementation Best Practices

1. **Use CSS Custom Properties**: All design tokens available as CSS variables
2. **Respect Component Variants**: Each component supports all MD3 variants
3. **Follow State Patterns**: Consistent state behavior across components
4. **Maintain Accessibility**: WCAG 2.1 AA compliance in all implementations
5. **Support Theming**: All components respond to theme changes

### Token Naming Convention

```scss
// Color tokens
--md-sys-color-{role}-{state}
// Example: --md-sys-color-primary-container

// Elevation tokens
--md-sys-elevation-level{number}
// Example: --md-sys-elevation-level2

// Typography tokens (planned)
--md-sys-typescale-{scale}-{property}
// Example: --md-sys-typescale-body-large-font-size
```
