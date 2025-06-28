# Przewodnik Migracji: Loader → Progress (MD3)

## Przegląd

Komponent `Loader` został rozszerzony o pełną funkcjonalność MD3 Progress Indicators poprzez utworzenie nowego komponentu `Progress`. Zachowano pełną kompatybilność wsteczną.

---

## 🔄 Backwards Compatibility

**Istniejący kod nadal działa:**

```tsx
// ✅ Nadal działa bez zmian
import { Loader } from '@/components/Loader';

<Loader size="24px" />
<Loader className="my-loader" />
```

---

## 🚀 Nowa funkcjonalność (Progress)

### Import

```tsx
// Nowy Progress komponent
import { Progress } from '@/components/Loader';
// lub
import { Progress } from '@/components/Loader/Progress';

// Backwards compatibility
import { Loader } from '@/components/Loader';
```

### Podstawowe użycie

```tsx
// Circular indeterminate (domyślne)
<Progress />

// Linear indeterminate
<Progress variant="linear" />

// Determinate progress
<Progress
  variant="circular"
  determinate
  value={75}
  aria-label="Upload progress"
/>

// Linear z buforem
<Progress
  variant="linear"
  determinate
  value={60}
  buffer={80}
/>
```

### Rozmiary

```tsx
// Predefiniowane rozmiary
<Progress size="small" />
<Progress size="medium" />  // domyślne
<Progress size="large" />

// Custom rozmiar
<Progress size={32} />
```

### Kolory

```tsx
<Progress color="primary" />    // domyślne
<Progress color="secondary" />
<Progress color="tertiary" />
```

### Customizacja

```tsx
<Progress variant="circular" thickness={6} trackColor="#e0e0e0" animationDuration={1500} />
```

---

## 📝 API Reference

### ProgressProps

```typescript
interface ProgressProps {
  // Podstawowe
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;

  // Warianty MD3
  variant?: 'circular' | 'linear'; // default: 'circular'

  // Progress modes
  determinate?: boolean; // default: false
  value?: number; // 0-100 dla determinate
  buffer?: number; // 0-100 dla linear buffering

  // System rozmiarów
  size?: 'small' | 'medium' | 'large' | number; // default: 'medium'

  // System kolorów
  color?: 'primary' | 'secondary' | 'tertiary'; // default: 'primary'

  // Customizacja
  thickness?: number; // custom stroke width dla circular
  trackColor?: string; // custom track color
  animationDuration?: number; // custom animation duration (ms)
}
```

---

## 🎨 Przykłady zastosowań

### Loading States

```tsx
// Ogólny loading
<Progress aria-label="Loading content" />

// Upload progress
<Progress
  variant="linear"
  determinate
  value={uploadProgress}
  aria-label="Upload progress"
/>

// Download z buforem
<Progress
  variant="linear"
  determinate
  value={downloaded}
  buffer={buffered}
  aria-label="Download progress"
/>
```

### W formularzach

```tsx
// Submit progress
<Progress variant="circular" size="small" color="secondary" aria-label="Saving..." />
```

### W cardach/panelach

```tsx
// Kompaktowy progress
<Progress variant="linear" size="small" determinate value={completionPercentage} />
```

---

## 🧪 Testy

Komponent został pokryty kompletnimi testami:

- ✅ Renderowanie dla obu wariantów (circular/linear)
- ✅ Determinate vs indeterminate modes
- ✅ Value i buffer props
- ✅ Size variants (small, medium, large, custom)
- ✅ Color variants
- ✅ Custom thickness i trackColor
- ✅ Accessibility attributes
- ✅ Backwards compatibility z Loader

---

## 📖 Storybook

Dostępne story:

- **Circular Progress**: wszystkie warianty circular
- **Linear Progress**: wszystkie warianty linear
- **Playground**: interaktywny playground z wszystkimi props

---

## 🔧 Implementacja techniczna

### SCSS Modules

Komponent używa CSS Modules z pełną obsługą:

```scss
.progress {
  // Base styles
}

.progress--variant-circular {
  // Circular specific styles
}

.progress--variant-linear {
  // Linear specific styles
}

// Size variants
.progress--size-small {
}
.progress--size-medium {
}
.progress--size-large {
}

// Color variants
.progress--color-primary {
}
.progress--color-secondary {
}
.progress--color-tertiary {
}
```

### Accessibility

- Proper ARIA attributes (`role="progressbar"`)
- Support dla `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Semantic HTML structure

### Performance

- CSS-only animations
- Optimalne SVG rendering dla circular
- Minimal re-renders przez React.memo

---

**Migracja:** Opcjonalna - istniejący kod nie wymaga zmian  
**Zalecenie:** Użyj nowego Progress API dla nowych feature'ów
