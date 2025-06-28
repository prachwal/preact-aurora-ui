# Plan rozbudowy: **Loader → MD3 Progress Indicators**

---

## 1. Analiza obecnego stanu i wymagań MD3

### Obecny stan Loader

**Obecne propsy:**

- `size?: string` (podstawowy rozmiar)
- `className?: string`
- `style?: JSX.CSSProperties`
- Podstawowa implementacja spinnera

### MD3 Progress Indicators wymagania

**Warianty:** Circular, Linear  
**Modi:** Determinate (z wartością), Indeterminate (nieskończony)  
**Features:** Buffer support, Color system, Size variants

---

## 2. Checklist: Rozbudowa Loader → Progress Component

### 2.1 Refactoring interfejsu

- [x] Rename `Loader` → `Progress` (z backwards compatibility) ✅
- [x] Rozszerzenie `ProgressProps`: ✅

```typescript
interface ProgressProps {
  // Basic props
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;

  // MD3 Progress variants
  variant?: 'circular' | 'linear';

  // Progress modes
  determinate?: boolean;
  value?: number; // 0-100 for determinate
  buffer?: number; // 0-100 for linear buffering (advanced)

  // Size system
  size?: 'small' | 'medium' | 'large' | number;

  // Color system
  color?: 'primary' | 'secondary' | 'tertiary';

  // Additional props
  thickness?: number; // For circular - stroke width
  trackColor?: string; // Custom track color

  // Animation
  animationDuration?: number; // ms for custom timing
}

// Backwards compatibility
interface LoaderProps extends ProgressProps {
  // Keep old interface working
  size?: string | number;
}
```

### 2.2 SCSS Structure Redesign

- [x] Główna struktura: ✅

```scss
@use '../styles/colors.scss' as *;
@use '../styles/spacing.scss' as *;
@use '../styles/typography.scss' as *;

// Base variables
$progress-primary-color: var(--md-sys-color-primary);
$progress-secondary-color: var(--md-sys-color-secondary);
$progress-tertiary-color: var(--md-sys-color-tertiary);
$progress-track-color: var(--md-sys-color-surface-variant);

// Size definitions
$progress-size-small: 16px;
$progress-size-medium: 24px;
$progress-size-large: 32px;

// Animation timing
$progress-animation-duration: 2s;
$progress-animation-ease: cubic-bezier(0.4, 0, 0.6, 1);
```

- [x] Circular Progress: ✅

```scss
.progress--variant-circular {
  display: inline-block;
  position: relative;

  svg {
    transform: rotate(-90deg); // Start from top
  }

  .track {
    fill: none;
    stroke: $progress-track-color;
    stroke-width: 4;
  }

  .indicator {
    fill: none;
    stroke: $progress-primary-color;
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.3s ease;
  }

  // Indeterminate animation
  &.indeterminate .indicator {
    animation: circular-progress $progress-animation-duration linear infinite;
  }
}

@keyframes circular-progress {
  0% {
    stroke-dasharray: 0 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 75 150;
    stroke-dashoffset: -37.5;
  }
  100% {
    stroke-dasharray: 0 150;
    stroke-dashoffset: -150;
  }
}
```

- [x] Linear Progress: ✅

```scss
.progress--variant-linear {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: $progress-track-color;
  overflow: hidden;
  position: relative;

  .indicator {
    height: 100%;
    background: $progress-primary-color;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .buffer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: color-mix(in srgb, $progress-primary-color 30%, transparent);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  // Indeterminate animation
  &.indeterminate .indicator {
    position: absolute;
    top: 0;
    left: 0;
    animation: linear-progress $progress-animation-duration ease-in-out infinite;
  }
}

@keyframes linear-progress {
  0% {
    left: -50%;
    width: 50%;
  }
  50% {
    left: 20%;
    width: 80%;
  }
  100% {
    left: 100%;
    width: 50%;
  }
}
```

- [x] Size variants: ✅

```scss
.progress--size-small {
  &.progress--variant-circular {
    width: $progress-size-small;
    height: $progress-size-small;

    .track,
    .indicator {
      stroke-width: 2;
    }
  }

  &.progress--variant-linear {
    height: 2px;
  }
}

.progress--size-medium {
  &.progress--variant-circular {
    width: $progress-size-medium;
    height: $progress-size-medium;

    .track,
    .indicator {
      stroke-width: 3;
    }
  }

  &.progress--variant-linear {
    height: 4px;
  }
}

.progress--size-large {
  &.progress--variant-circular {
    width: $progress-size-large;
    height: $progress-size-large;

    .track,
    .indicator {
      stroke-width: 4;
    }
  }

  &.progress--variant-linear {
    height: 6px;
  }
}
```

- [x] Color variants: ✅

```scss
.progress--color-primary {
  .indicator {
    stroke: $progress-primary-color;
    background: $progress-primary-color;
  }
}

.progress--color-secondary {
  .indicator {
    stroke: $progress-secondary-color;
    background: $progress-secondary-color;
  }
}

.progress--color-tertiary {
  .indicator {
    stroke: $progress-tertiary-color;
    background: $progress-tertiary-color;
  }
}
```

### 2.3 Component Implementation

- [x] Nowy Progress component: ✅

```typescript
export function Progress({
  className = '',
  style,
  'aria-label': ariaLabel,
  variant = 'circular',
  determinate = false,
  value = 0,
  buffer,
  size = 'medium',
  color = 'primary',
  thickness,
  trackColor,
  animationDuration,
}: ProgressProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const normalizedBuffer = buffer ? Math.min(Math.max(buffer, 0), 100) : undefined;

  const classes = [
    styles.progress,
    styles[`progress--variant-${variant}`],
    typeof size === 'string' ? styles[`progress--size-${size}`] : '',
    styles[`progress--color-${color}`],
    !determinate ? styles.indeterminate : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getSizeValue = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };

  if (variant === 'circular') {
    return renderCircularProgress();
  } else {
    return renderLinearProgress();
  }
}
```

- [x] Circular Progress rendering: ✅

```typescript
const renderCircularProgress = () => {
  const sizeValue = getSizeValue();
  const strokeWidth = thickness || (sizeValue <= 20 ? 2 : sizeValue <= 28 ? 3 : 4);
  const radius = (sizeValue - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = determinate
    ? circumference - (normalizedValue / 100) * circumference
    : 0;

  return (
    <div
      className={classes}
      style={{
        ...style,
        width: sizeValue,
        height: sizeValue,
        animationDuration: animationDuration ? `${animationDuration}ms` : undefined,
      }}
      role="progressbar"
      aria-label={ariaLabel || 'Progress indicator'}
      aria-valuenow={determinate ? normalizedValue : undefined}
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? 100 : undefined}
    >
      <svg width={sizeValue} height={sizeValue}>
        <circle
          className={styles.track}
          cx={sizeValue / 2}
          cy={sizeValue / 2}
          r={radius}
          strokeWidth={strokeWidth}
          style={{ stroke: trackColor }}
        />
        <circle
          className={styles.indicator}
          cx={sizeValue / 2}
          cy={sizeValue / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    </div>
  );
};
```

- [ ] Linear Progress rendering:

```typescript
const renderLinearProgress = () => {
  return (
    <div
      className={classes}
      style={{
        ...style,
        animationDuration: animationDuration ? `${animationDuration}ms` : undefined,
      }}
      role="progressbar"
      aria-label={ariaLabel || 'Progress indicator'}
      aria-valuenow={determinate ? normalizedValue : undefined}
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? 100 : undefined}
    >
      {normalizedBuffer !== undefined && (
        <div
          className={styles.buffer}
          style={{ width: `${normalizedBuffer}%` }}
        />
      )}
      <div
        className={styles.indicator}
        style={determinate ? { width: `${normalizedValue}%` } : undefined}
      />
    </div>
  );
};
```

### 2.4 Backwards Compatibility

- [x] Export both Progress and Loader: ✅

```typescript
// New component
export { Progress } from './Progress';
export type { ProgressProps } from './Progress';

// Backwards compatibility
export const Loader = Progress;
export type LoaderProps = ProgressProps;
```

### 2.5 Enhanced Tests

- [x] Test obu wariantów (circular, linear) ✅
- [x] Test determinate vs indeterminate ✅
- [x] Test value prop (0-100) ✅
- [x] Test buffer prop dla linear ✅
- [x] Test size variants (small, medium, large, custom number) ✅
- [x] Test color variants (primary, secondary, tertiary) ✅
- [x] Test custom thickness ✅
- [x] Test custom trackColor ✅
- [x] Test accessibility attributes ✅
- [x] Test backwards compatibility (Loader import) ✅

### 2.6 Enhanced Storybook

- [x] Circular Progress stories: ✅
  - Indeterminate Circular
  - Determinate Circular (with controls)
  - Size variants
  - Color variants
  - Custom thickness

- [x] Linear Progress stories: ✅
  - Indeterminate Linear
  - Determinate Linear (with controls)
  - Linear with Buffer
  - Size variants
  - Color variants

- [x] Combined playground z wszystkimi props ✅

---

## 3. Przykłady użycia po rozbudowie

```tsx
// Circular progress
<Progress variant="circular" size="large" />
<Progress variant="circular" determinate value={75} />
<Progress variant="circular" color="secondary" size="small" />

// Linear progress
<Progress variant="linear" />
<Progress variant="linear" determinate value={60} />
<Progress variant="linear" determinate value={60} buffer={85} />

// Custom sizing
<Progress variant="circular" size={48} thickness={6} />

// Color variants
<Progress variant="linear" color="tertiary" />

// Backwards compatibility (still works)
<Loader size="24px" />
```

---

## 4. Migration Guide

```tsx
// STARY (nadal działa)
<Loader size="24px" />

// NOWY (zalecany)
<Progress variant="circular" size="medium" />

// Determinate progress
<Progress
  variant="linear"
  determinate
  value={progressValue}
  aria-label="Upload progress"
/>
```

---

## 5. Kryteria akceptacji

- ✅ Circular i Linear variants - **UKOŃCZONE**
- ✅ Determinate i indeterminate modes - **UKOŃCZONE**
- ✅ Value prop (0-100) dla determinate - **UKOŃCZONE**
- ✅ Buffer support dla linear - **UKOŃCZONE**
- ✅ Size system (small, medium, large, custom) - **UKOŃCZONE**
- ✅ Color system (primary, secondary, tertiary) - **UKOŃCZONE**
- ✅ Custom thickness dla circular - **UKOŃCZONE**
- ✅ Custom track color - **UKOŃCZONE**
- ✅ Smooth animations - **UKOŃCZONE**
- ✅ Proper accessibility (ARIA) - **UKOŃCZONE**
- ✅ Backwards compatibility (Loader) - **UKOŃCZONE**
- ✅ Comprehensive tests - **UKOŃCZONE**
- ✅ Complete Storybook documentation - **UKOŃCZONE**

---

**Status:** ✅ **UKOŃCZONE** - Wszystkie wymagania MD3 Progress Indicators zostały wdrożone  
**Priorytet:** 🔄 ŚREDNI - rozbudowa istniejącego komponentu  
**Czas implementacji:** 2-3 dni robocze (ukończone)  
**Zależności:** MD3 color tokens, podstawowy Loader (już gotowy) ✅
