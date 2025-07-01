# Propozycje ulepszeń dla biblioteki Aurora UI

## 1. Automatyczna konfiguracja stylów globalnych

### Problem

Obecnie użytkownik musi ręcznie konfigurować style globalne w CSS.

### Rozwiązanie

ThemeProvider powinien automatycznie aplikować style globalne:

```tsx
// Ulepszona wersja ThemeProvider
export function ThemeProvider({ children, autoGlobalStyles = true, ...props }: ThemeProviderProps) {
  useEffect(() => {
    if (autoGlobalStyles) {
      const globalStyles = `
        body {
          color: var(--md-sys-color-on-background);
          background-color: var(--md-sys-color-background);
          transition: color 0.2s ease, background-color 0.2s ease;
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: var(--md-sys-color-on-surface);
        }
        
        p {
          color: var(--md-sys-color-on-surface-variant);
        }
        
        a {
          color: var(--md-sys-color-primary);
        }
        
        code {
          background-color: var(--md-sys-color-surface-variant);
          color: var(--md-sys-color-on-surface-variant);
          padding: 0.2em 0.4em;
          border-radius: 4px;
        }
      `;

      const styleElement = document.createElement('style');
      styleElement.textContent = globalStyles;
      document.head.appendChild(styleElement);

      return () => document.head.removeChild(styleElement);
    }
  }, [autoGlobalStyles]);

  // reszta kodu...
}
```

## 2. Hook useThemeColors dla łatwiejszego dostępu do kolorów

### Problem

Użytkownicy muszą pamiętać długie nazwy zmiennych CSS.

### Rozwiązanie

```tsx
export function useThemeColors() {
  return {
    background: 'var(--md-sys-color-background)',
    surface: 'var(--md-sys-color-surface)',
    primary: 'var(--md-sys-color-primary)',
    onBackground: 'var(--md-sys-color-on-background)',
    onSurface: 'var(--md-sys-color-on-surface)',
    onSurfaceVariant: 'var(--md-sys-color-on-surface-variant)',
    outlineVariant: 'var(--md-sys-color-outline-variant)',
    // ... więcej kolorów
  };
}

// Użycie:
function MyComponent() {
  const colors = useThemeColors();

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        color: colors.onSurface,
      }}
    >
      Content
    </div>
  );
}
```

## 3. Komponent Text z automatycznym zarządzaniem kolorami

### Problem

Każdy tekst wymaga ręcznego ustawiania koloru.

### Rozwiązanie

```tsx
interface TextProps {
  variant?: 'headline' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'surface' | 'auto';
  children: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Text({
  variant = 'body',
  color = 'auto',
  as: Component = 'p',
  children,
  style,
  ...props
}: TextProps) {
  const getColor = () => {
    if (color === 'auto') {
      switch (variant) {
        case 'headline': return 'var(--md-sys-color-on-surface)';
        case 'body': return 'var(--md-sys-color-on-surface-variant)';
        case 'caption': return 'var(--md-sys-color-on-surface-variant)';
        case 'label': return 'var(--md-sys-color-on-surface)';
      }
    }
    return `var(--md-sys-color-${color})`;
  };

  return (
    <Component
      style={{
        color: getColor(),
        ...style
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

// Użycie:
<Text variant="headline" as="h1">Główny tytuł</Text>
<Text variant="body">Tekst paragrafowy</Text>
<Text variant="caption">Mały tekst</Text>
```

## 4. Container component z automatycznym zarządzaniem tłem

### Problem

Każdy kontener wymaga ręcznego ustawiania tła i kolorów.

### Rozwiązanie

```tsx
interface ContainerProps {
  surface?: 'background' | 'surface' | 'surface-variant';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
}

export function Container({
  surface = 'background',
  padding = 'md',
  children,
  style,
  ...props
}: ContainerProps) {
  const backgroundColor = `var(--md-sys-color-${surface})`;
  const color = `var(--md-sys-color-on-${surface})`;

  return (
    <div
      style={{
        backgroundColor,
        color,
        padding: `var(--spacing-${padding})`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Użycie:
<Container surface="surface" padding="lg">
  <Text>Tekst automatycznie dostosuje kolor do tła</Text>
</Container>;
```

## 5. Utility CSS classes

### Problem

Inline styles są niewygodne dla prostych przypadków.

### Rozwiązanie

Aurora UI powinno dostarczać utility classes:

```css
/* Automatycznie generowane przez ThemeProvider */
.aurora-bg-background {
  background-color: var(--md-sys-color-background);
}
.aurora-bg-surface {
  background-color: var(--md-sys-color-surface);
}
.aurora-bg-primary {
  background-color: var(--md-sys-color-primary);
}

.aurora-text-on-background {
  color: var(--md-sys-color-on-background);
}
.aurora-text-on-surface {
  color: var(--md-sys-color-on-surface);
}
.aurora-text-on-surface-variant {
  color: var(--md-sys-color-on-surface-variant);
}
.aurora-text-primary {
  color: var(--md-sys-color-primary);
}

.aurora-border-outline {
  border-color: var(--md-sys-color-outline);
}
.aurora-border-outline-variant {
  border-color: var(--md-sys-color-outline-variant);
}
```

## 6. Ulepszony Header component

### Problem

Header nie ma wbudowanej obsługi przełączania motywów.

### Rozwiązanie

```tsx
interface HeaderProps {
  title?: string;
  showThemeToggle?: boolean;
  themeTogglePosition?: 'left' | 'right';
  logo?: ComponentChildren;
  actions?: ComponentChildren;
  // ... inne props
}

export function Header({
  title,
  showThemeToggle = false,
  themeTogglePosition = 'right',
  children,
  ...props
}: HeaderProps) {
  const { toggleMode, isDark } = useTheme();

  const ThemeToggle = showThemeToggle ? (
    <IconButton
      variant="standard"
      onClick={toggleMode}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  ) : null;

  return (
    <header className="aurora-header">
      {themeTogglePosition === 'left' && ThemeToggle}
      {title && (
        <Text variant="headline" as="h1">
          {title}
        </Text>
      )}
      {children}
      {themeTogglePosition === 'right' && ThemeToggle}
    </header>
  );
}

// Użycie:
<Header title="My App" showThemeToggle themeTogglePosition="right" />;
```

## 7. Layout component z lepszym API

### Problem

Layout wymaga zbyt dużo konfiguracji dla prostych przypadków.

### Rozwiązanie

```tsx
interface AppLayoutProps {
  header?: ComponentChildren;
  sidebar?: ComponentChildren;
  footer?: ComponentChildren;
  children: ComponentChildren;
  theme?: 'auto' | 'light' | 'dark';
}

export function AppLayout({ header, sidebar, footer, children, theme = 'auto' }: AppLayoutProps) {
  return (
    <ThemeProvider defaultTheme={{ mode: theme }}>
      <Container surface="background" className="aurora-app-layout">
        {header && (
          <Container surface="surface" className="aurora-app-header">
            {header}
          </Container>
        )}
        <div className="aurora-app-body">
          {sidebar && (
            <Container surface="surface-variant" className="aurora-app-sidebar">
              {sidebar}
            </Container>
          )}
          <Container surface="background" className="aurora-app-main">
            {children}
          </Container>
        </div>
        {footer && (
          <Container surface="surface" className="aurora-app-footer">
            {footer}
          </Container>
        )}
      </Container>
    </ThemeProvider>
  );
}

// Użycie:
<AppLayout header={<Header title="My App" showThemeToggle />} theme="auto">
  <Text>Main content</Text>
</AppLayout>;
```

## 8. Developer Experience improvements

### Lepsze TypeScript types

```tsx
// Zamiast string literals, wykorzystać union types
type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'surface'
  | 'surface-variant'
  | 'background'
  | 'on-primary'
  | 'on-secondary'
  | 'on-tertiary'
  | 'on-surface'
  | 'on-surface-variant'
  | 'on-background';

type ThemeSurface = 'background' | 'surface' | 'surface-variant';
```

### Storybook examples

Aurora UI powinno mieć kompletny Storybook z przykładami wszystkich kombinacji motywów.

### CSS-in-JS alternative

```tsx
import { styled } from 'preact-aurora-ui/styled';

const StyledContainer = styled.div<{ surface?: ThemeSurface }>`
  background-color: ${({ surface = 'background' }) => `var(--md-sys-color-${surface})`};
  color: ${({ surface = 'background' }) => `var(--md-sys-color-on-${surface})`};
  padding: var(--spacing-md);
`;
```

## Podsumowanie

Te ulepszenia znacznie poprawiłyby Developer Experience:

1. **Mniej boilerplate code** - automatyczne style globalne
2. **Lepsze API** - komponenty Text, Container, AppLayout
3. **Łatwiejsze zarządzanie kolorami** - hook useThemeColors
4. **Utility classes** - dla prostych przypadków
5. **Wbudowana obsługa motywów** - w Header i innych komponentach
6. **Lepsze TypeScript support** - precyzyjne typy
7. **CSS-in-JS opcje** - dla zespołów preferujących tę metodę

Te zmiany sprawiłyby, że biblioteka byłaby znacznie bardziej przyjazna dla developera i wymagałaby mniej ręcznej konfiguracji.
