# Layout

Elastyczny system layoutu oparty na flexbox/grid, zapewniający strukturę dla aplikacji zgodnie z Material Design 3.

## 🎯 Kiedy używać

- **Główna struktura aplikacji** - podstawowy kontener dla wszystkich widoków
- **Dashboardy** - układy z sidebar, header i główną treścią
- **Aplikacje mobilne** - responsive układy pionowe i poziome
- **Komponenty kontenerowe** - wrapper dla sekcji wymagających spójnego układu

## 📱 Podstawowe użycie

```tsx
import { Layout } from 'preact-aurora-ui';

function App() {
  return (
    <Layout>
      <header>Nagłówek</header>
      <main>Główna treść</main>
      <footer>Stopka</footer>
    </Layout>
  );
}
```

## 🔧 Warianty

### Layout pionowy (domyślny)

```tsx
<Layout direction="vertical">
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</Layout>
```

### Layout poziomy

```tsx
<Layout direction="horizontal">
  <aside>Sidebar</aside>
  <main>Main Content</main>
</Layout>
```

### Warianty stylowe

```tsx
// Domyślny
<Layout variant="default">
  <div>Standardowy layout</div>
</Layout>

// Dashboard
<Layout variant="dashboard" direction="horizontal">
  <aside>Navigation</aside>
  <main>Dashboard Content</main>
</Layout>

// Aplikacja z zaokrąglonymi rogami
<Layout variant="app">
  <div>App Layout</div>
</Layout>

// Minimalny bez stylowania
<Layout variant="minimal">
  <div>Clean Layout</div>
</Layout>
```

### Z paddingiem

```tsx
// Boolean (używa md)
<Layout padding>
  <div>Content z padding</div>
</Layout>

// Konkretny rozmiar
<Layout padding="lg">
  <div>Content z dużym padding</div>
</Layout>

// Różne rozmiary
<Layout padding="sm">Small</Layout>
<Layout padding="md">Medium</Layout>
<Layout padding="lg">Large</Layout>
<Layout padding="xl">Extra Large</Layout>
<Layout padding="none">No Padding</Layout>
```

### Z odstępami (gap)

```tsx
<Layout gap="md">
  <div>Element 1</div>
  <div>Element 2</div>
  <div>Element 3</div>
</Layout>

// Różne rozmiary gap
<Layout gap="sm">Small gap</Layout>
<Layout gap="lg">Large gap</Layout>
<Layout gap="xl">Extra large gap</Layout>
<Layout gap="none">No gap</Layout>
```

### Overflow handling

```tsx
// Ukryty overflow (domyślny)
<Layout overflow="hidden">
  <div>Content</div>
</Layout>

// Auto scroll
<Layout overflow="auto">
  <div>Scrollable content</div>
</Layout>

// Widoczny overflow
<Layout overflow="visible">
  <div>Visible overflow</div>
</Layout>
```

## 🧩 Wzorce layoutu

### Dashboard z sidebar

```tsx
import { Layout, Header, Sidebar, Content } from 'preact-aurora-ui';

function Dashboard() {
  return (
    <Layout variant="dashboard" direction="horizontal">
      <Sidebar>
        <nav>Navigation items</nav>
      </Sidebar>
      <Layout direction="vertical">
        <Header>Dashboard Header</Header>
        <Content>Main dashboard content</Content>
      </Layout>
    </Layout>
  );
}
```

### Aplikacja mobilna

```tsx
function MobileApp() {
  return (
    <Layout variant="app" direction="vertical" fullHeight={true} padding="none">
      <header>Mobile Header</header>
      <main style={{ flex: 1, overflow: 'auto' }}>Scrollable content</main>
      <BottomNavigation />
    </Layout>
  );
}
```

### Layout z zagnieżdżonymi sekcjami

```tsx
function ComplexLayout() {
  return (
    <Layout variant="dashboard" gap="md" padding="lg">
      <header>App Header</header>

      <Layout direction="horizontal" gap="md">
        <aside style={{ width: '300px' }}>Sidebar content</aside>

        <Layout direction="vertical" gap="sm" style={{ flex: 1 }}>
          <section>Section 1</section>
          <section>Section 2</section>

          <Layout direction="horizontal" gap="sm">
            <div>Sub-section A</div>
            <div>Sub-section B</div>
          </Layout>
        </Layout>
      </Layout>

      <footer>App Footer</footer>
    </Layout>
  );
}
```

### Responsywny layout

```tsx
import { useMediaQuery } from 'preact-aurora-ui';

function ResponsiveLayout() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Layout
      direction={isMobile ? 'vertical' : 'horizontal'}
      variant={isMobile ? 'minimal' : 'dashboard'}
      padding={isMobile ? 'sm' : 'md'}
    >
      <aside className={isMobile ? 'mobile-nav' : 'desktop-sidebar'}>Navigation</aside>
      <main>Content</main>
    </Layout>
  );
}
```

## 📋 API Reference

### Layout Props

| Prop         | Typ                                                 | Domyślnie    | Opis                                           |
| ------------ | --------------------------------------------------- | ------------ | ---------------------------------------------- |
| `children`   | `ComponentChildren`                                 | -            | **Wymagane.** Treść layoutu                    |
| `direction`  | `'horizontal' \| 'vertical'`                        | `'vertical'` | Kierunek układu flexbox                        |
| `fullHeight` | `boolean`                                           | `true`       | Czy layout ma zajmować pełną wysokość viewport |
| `variant`    | `'default' \| 'dashboard' \| 'app' \| 'minimal'`    | `'default'`  | Wariant stylowy layoutu                        |
| `padding`    | `boolean \| 'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `false`      | Padding wewnętrzny                             |
| `gap`        | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`            | `'none'`     | Odstęp między elementami                       |
| `overflow`   | `'hidden' \| 'auto' \| 'visible'`                   | `'hidden'`   | Sposób obsługi przepełnienia                   |
| `className`  | `string`                                            | -            | Dodatkowe klasy CSS                            |
| `style`      | `JSX.CSSProperties`                                 | -            | Inline style                                   |

### Warianty

**`default`** - standardowy layout z podstawowym stylem
**`dashboard`** - zoptymalizowany dla dashboardów z sidebar
**`app`** - layout aplikacji z zaokrąglonymi rogami i cieniem
**`minimal`** - czysty layout bez dodatkowych stylów

## 🎨 Stylowanie

### CSS Custom Properties

```css
.custom-layout {
  /* Tło layoutu */
  --layout-background: var(--md-sys-color-background);

  /* Przejścia */
  --layout-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Cienie dla variantu app */
  --layout-shadow: var(--md-sys-elevation-level2);

  /* Kolory tekstu */
  --layout-color: var(--md-sys-color-on-surface);
}
```

### Klasy pomocnicze

```scss
// Scrollowalna obszar
.scrollable-area {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

// Layout responsive
@media (max-width: $breakpoint-sm) {
  .layout {
    padding: 0;
  }

  .layout--variant-app {
    border-radius: 0;
    box-shadow: none;
  }
}
```

### Customowe warianty

```tsx
// Custom variant przez className
<Layout variant="minimal" className="my-custom-layout">
  <div>Content</div>
</Layout>
```

```scss
.my-custom-layout {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

## ♿ Accessibility

### Semantyczne role

```tsx
<Layout>
  <header role="banner">
    <h1>App Title</h1>
  </header>

  <Layout direction="horizontal">
    <nav role="navigation" aria-label="Main navigation">
      <ul>Navigation items</ul>
    </nav>

    <main role="main">Main content</main>
  </Layout>

  <footer role="contentinfo">Footer content</footer>
</Layout>
```

### Skip links

```tsx
function AccessibleLayout() {
  return (
    <Layout>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header>Header</header>
      <nav>Navigation</nav>

      <main id="main-content" tabIndex={-1}>
        Main content
      </main>
    </Layout>
  );
}
```

### Landmark regions

```tsx
<Layout>
  <header>
    <h1>Application Title</h1>
  </header>

  <Layout direction="horizontal">
    <aside aria-label="Sidebar navigation">Navigation</aside>

    <main aria-label="Main content">
      <h2>Page Title</h2>
      Content
    </main>
  </Layout>
</Layout>
```

## 🧪 Testowanie

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import { Layout } from 'preact-aurora-ui';

test('renderuje children', () => {
  render(
    <Layout>
      <div data-testid="content">Test content</div>
    </Layout>,
  );

  expect(screen.getByTestId('content')).toBeInTheDocument();
});

test('aplikuje właściwy kierunek', () => {
  render(
    <Layout direction="horizontal" data-testid="layout">
      <div>Content</div>
    </Layout>,
  );

  const layout = screen.getByTestId('layout');
  expect(layout).toHaveClass('layout--horizontal');
});
```

### Testy wariantów

```tsx
test('renderuje różne warianty', () => {
  const { rerender } = render(
    <Layout variant="dashboard" data-testid="layout">
      <div>Content</div>
    </Layout>,
  );

  expect(screen.getByTestId('layout')).toHaveClass('layout--variant-dashboard');

  rerender(
    <Layout variant="app" data-testid="layout">
      <div>Content</div>
    </Layout>,
  );

  expect(screen.getByTestId('layout')).toHaveClass('layout--variant-app');
});
```

### Testy responsywności

```tsx
import { render } from '@testing-library/preact';
import { MediaQueryProvider } from 'preact-aurora-ui';

test('layout jest responsywny', () => {
  // Test dla mobile
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 480,
  });

  render(
    <MediaQueryProvider>
      <ResponsiveLayout />
    </MediaQueryProvider>,
  );

  // Sprawdź mobile layout
  expect(screen.getByTestId('layout')).toHaveClass('layout--vertical');
});
```

### Testy accessibility

```tsx
test('ma poprawną strukturę accessibility', () => {
  render(
    <Layout>
      <header role="banner">Header</header>
      <main role="main">Main</main>
      <footer role="contentinfo">Footer</footer>
    </Layout>,
  );

  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});
```

## 📚 Przykłady zaawansowane

### Layout z animacjami

```tsx
import { useState } from 'preact/hooks';

function AnimatedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Layout
      variant="dashboard"
      direction="horizontal"
      style={{
        transition: 'all 0.3s ease',
      }}
    >
      <aside
        style={{
          width: sidebarOpen ? '300px' : '60px',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? '←' : '→'}</button>
        {sidebarOpen && <nav>Navigation</nav>}
      </aside>

      <main style={{ flex: 1 }}>Content</main>
    </Layout>
  );
}
```

### Layout z błędami granicznymi

```tsx
import { ErrorBoundary } from 'preact-aurora-ui';

function SafeLayout() {
  return (
    <Layout variant="app">
      <header>App Header</header>

      <ErrorBoundary fallback={<div>Error in content</div>}>
        <main>Main content that might error</main>
      </ErrorBoundary>

      <footer>App Footer</footer>
    </Layout>
  );
}
```

### Layout z lazy loading

```tsx
import { Suspense, lazy } from 'preact/compat';

const LazyContent = lazy(() => import('./LazyContent'));

function LazyLayout() {
  return (
    <Layout variant="dashboard">
      <header>Header</header>

      <Suspense fallback={<div>Loading...</div>}>
        <LazyContent />
      </Suspense>
    </Layout>
  );
}
```

## ❓ FAQ

**P: Jak utworzyć sticky header?**  
O: Użyj CSS `position: sticky` na komponencie header wewnątrz Layout:

```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
```

**P: Dlaczego layout nie zajmuje pełnej wysokości?**  
O: Sprawdź czy `fullHeight={true}` jest ustawione i czy rodzic nie ma ograniczeń wysokości.

**P: Jak obsłużyć overflow w layoutcie poziomym?**  
O: Użyj `overflow="auto"` i ustaw `min-width: 0` na flex children.

**P: Czy mogę zagnieżdżać komponenty Layout?**  
O: Tak, Layout jest zaprojektowany do zagnieżdżania dla złożonych układów.

**P: Jak zmienić breakpointy dla responsywności?**  
O: Zmodyfikuj zmienne w `src/styles/breakpoints.scss` lub użyj własnych media queries.

**P: Dlaczego sidebar nie zachowuje szerokości?**  
O: W layout poziomym ustaw `flex-shrink: 0` na sidebar i `flex: 1` na content.

---

**Powiązane komponenty:**

- [Grid](../Grid/README.md) - System siatki responsywnej
- [Container](../Container/README.md) - Wrapper treści
- [Header](../Header/README.md) - Nagłówki aplikacji
- [Sidebar](../Sidebar/README.md) - Panele boczne

See [`Layout.test.tsx`](./Layout.test.tsx) for unit tests.

## Storybook

[Link to Storybook story](https://your-storybook-url.com/layout)

## FAQ

**Q: How do I customize the layout structure?**  
A: Modify the CSS styles in `Layout.module.scss` or override the CSS custom properties in your application's CSS or theme.

**Q: Can I use different components within the layout?**  
A: Yes, you can use any React components within the Header, Sidebar, and Content areas.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
