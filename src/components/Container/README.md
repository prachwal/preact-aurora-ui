# Container

Inteligentny komponent kontenera z automatycznym zarządzaniem surface'ami Material Design 3, responsywnością i elevacją. Zapewnia spójne tło, spacing oraz kolory tekstu zgodnie z systemem projektowym.

## Opis

`Container` to fundamentalny komponent layoutu który automatycznie zarządza kolorami tła i tekstu zgodnie z systemem surface Material Design 3. Oferuje różne poziomy elevacji, responsywny spacing, ograniczenia szerokości oraz automatyczne dopasowanie kolorów tekstu do tła. Jest podstawowym blokiem budulcowym dla tworzenia spójnych interfejsów.

## Przykłady użycia

### 1. Podstawowe surface'y Material Design 3

System surface'ów MD3 zapewnia hierarchię wizualną i spójność kolorystyczną.

```tsx
import { Container } from 'preact-aurora-ui';

// Surface - podstawowy poziom tła
<Container surface="surface">
  <h2>Podstawowa powierzchnia</h2>
  <p>Domyślny poziom tła aplikacji.</p>
</Container>

// Surface variant - alternatywny odcień
<Container surface="surface-variant">
  <h2>Wariant powierzchni</h2>
  <p>Subtelnie różniący się odcień dla wyróżnienia.</p>
</Container>

// Surface containers - różne poziomy kontenera
<Container surface="surface-container-low">
  <h2>Niski kontener</h2>
  <p>Najniższy poziom kontenera.</p>
</Container>

<Container surface="surface-container">
  <h2>Standardowy kontener</h2>
  <p>Podstawowy poziom kontenera.</p>
</Container>

<Container surface="surface-container-high">
  <h2>Wysoki kontener</h2>
  <p>Podwyższony poziom kontenera.</p>
</Container>

<Container surface="surface-container-highest">
  <h2>Najwyższy kontener</h2>
  <p>Maksymalny poziom kontenera.</p>
</Container>
```

### 2. Kolorowe surface'y z automatycznym tekstem

Kontenerami z kolorowym tłem i automatycznym doborem koloru tekstu.

```tsx
// Primary container - główny akcent
<Container surface="primary-container">
  <h2>Kontener podstawowy</h2>
  <p>Tekst automatycznie dopasowany do tła primary.</p>
</Container>

// Secondary container - drugoplanowy akcent
<Container surface="secondary-container">
  <h2>Kontener drugorzędny</h2>
  <p>Tekst automatycznie dopasowany do tła secondary.</p>
</Container>

// Tertiary container - trzeci poziom akcentu
<Container surface="tertiary-container">
  <h2>Kontener trzeciorzędny</h2>
  <p>Tekst automatycznie dopasowany do tła tertiary.</p>
</Container>

// Error container - komunikaty błędów
<Container surface="error-container">
  <h2>Kontener błędu</h2>
  <p>Automatyczny kolor tekstu dla komunikatów błędów.</p>
</Container>

// Wyłączenie automatycznego koloru tekstu
<Container surface="primary-container" autoTextColor={false}>
  <h2 style={{ color: 'white' }}>Własny kolor tekstu</h2>
  <p style={{ color: 'rgba(255,255,255,0.7)' }}>
    Kontrola nad kolorem tekstu.
  </p>
</Container>
```

### 3. Elevacja i cienie

Poziomy elevacji tworzące głębię wizualną zgodnie z Material Design.

```tsx
// Różne poziomy elevacji
<Container elevation={0}>Bez cienia (płaski)</Container>
<Container elevation={1}>Subtelny cień</Container>
<Container elevation={2}>Lekki cień</Container>
<Container elevation={3}>Średni cień</Container>
<Container elevation={4}>Wyraźny cień</Container>
<Container elevation={5}>Maksymalny cień</Container>

// Elevacja z różnymi surface'ami
<Container surface="surface-container" elevation={2}>
  <h3>Kontener z elevacją</h3>
  <p>Kombinacja surface i cienia dla wyróżnienia.</p>
</Container>

// Karta produktu z elevacją
<Container
  surface="surface-container-low"
  elevation={1}
  padding="lg"
  radius="lg"
>
  <img src="/product.jpg" alt="Produkt" style={{ width: '100%', borderRadius: '8px' }} />
  <h3 style={{ marginTop: '12px' }}>iPhone 15 Pro</h3>
  <p>Najnowszy model Apple z procesorem A17 Pro.</p>
  <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
    4999 PLN
  </p>
</Container>
```

### 4. Padding i spacing

System spacingu z predefiniowanymi rozmiarami i responsywnością.

```tsx
// Różne rozmiary padding
<Container padding="none">Bez wewnętrznego odstępu</Container>
<Container padding="xs">Bardzo mały padding</Container>
<Container padding="sm">Mały padding</Container>
<Container padding="md">Średni padding (domyślny)</Container>
<Container padding="lg">Duży padding</Container>
<Container padding="xl">Bardzo duży padding</Container>
<Container padding="2xl">Maksymalny padding</Container>

// Responsywny padding (automatycznie dostosowuje się do ekranu)
<Container padding="md" responsive>
  <h2>Responsywny kontener</h2>
  <p>Padding automatycznie dostosowuje się do rozmiaru ekranu.</p>
  <p>Na urządzeniach mobilnych będzie mniejszy.</p>
</Container>

// Kombinacja różnych opcji
<Container
  surface="surface-container"
  padding="lg"
  elevation={2}
  responsive
>
  <h2>Kompleksowy kontener</h2>
  <p>Surface, padding, elevacja i responsywność.</p>
</Container>
```

### 5. Ograniczenia szerokości

Predefiniowane maksymalne szerokości dla różnych layoutów.

```tsx
// Różne maksymalne szerokości
<Container maxWidth="xs">Bardzo wąski (480px)</Container>
<Container maxWidth="sm">Wąski (640px)</Container>
<Container maxWidth="md">Średni (768px)</Container>
<Container maxWidth="lg">Szeroki (1024px)</Container>
<Container maxWidth="xl">Bardzo szeroki (1280px)</Container>
<Container maxWidth="2xl">Maksymalnie szeroki (1536px)</Container>
<Container maxWidth="full">Pełna szerokość</Container>
<Container maxWidth="none">Bez ograniczenia</Container>

// Centrum strony z ograniczeniem szerokości
<Container
  maxWidth="lg"
  padding="xl"
  style={{ margin: '0 auto' }}
>
  <h1>Główna treść strony</h1>
  <p>Ta treść ma maksymalną szerokość i jest wycentrowana.</p>
</Container>

// Layout artykułu
<Container
  surface="surface"
  maxWidth="md"
  padding="xl"
  style={{ margin: '0 auto', marginTop: '24px' }}
>
  <article>
    <h1>Tytuł artykułu</h1>
    <p>Tekst artykułu w optymalnej szerokości do czytania.</p>
  </article>
</Container>
```

### 6. Border radius i kształty

Różne style zaokrąglenia rogów dla różnych zastosowań.

```tsx
// Różne style radius
<Container radius="none">Ostre rogi</Container>
<Container radius="sm">Małe zaokrąglenie</Container>
<Container radius="md">Średnie zaokrąglenie (domyślne)</Container>
<Container radius="lg">Duże zaokrąglenie</Container>
<Container radius="xl">Bardzo duże zaokrąglenie</Container>
<Container radius="full">Pełne zaokrąglenie (okrąg/pigułka)</Container>

// Karty z różnymi stylami
<Container
  surface="surface-container"
  padding="lg"
  radius="xl"
  elevation={2}
>
  <h3>Zaokrąglona karta</h3>
  <p>Nowoczesny styl z dużym zaokrągleniem.</p>
</Container>

// Przycisk-kontener (pill style)
<Container
  as="button"
  surface="primary-container"
  padding="sm"
  radius="full"
  style={{ border: 'none', cursor: 'pointer' }}
>
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    🚀 Akcja
  </span>
</Container>
```

### 7. Polimorfizm - różne elementy HTML

Możliwość renderowania jako dowolny element HTML.

```tsx
// Jako sekcja
<Container as="section" surface="surface-container">
  <h2>Sekcja dokumentu</h2>
  <p>Semantyczny element section.</p>
</Container>

// Jako artykuł
<Container as="article" surface="surface" maxWidth="md">
  <h1>Tytuł artykułu</h1>
  <p>Zawartość artykułu w semantycznym elemencie.</p>
</Container>

// Jako header
<Container
  as="header"
  surface="primary-container"
  padding="lg"
  style={{ position: 'sticky', top: 0, zIndex: 100 }}
>
  <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h1>Logo</h1>
    <div>Nawigacja</div>
  </nav>
</Container>

// Jako footer
<Container
  as="footer"
  surface="surface-variant"
  padding="xl"
  style={{ marginTop: 'auto' }}
>
  <div style={{ textAlign: 'center' }}>
    <p>&copy; 2025 Aurora UI. Wszystkie prawa zastrzeżone.</p>
  </div>
</Container>

// Jako main content
<Container
  as="main"
  surface="surface"
  maxWidth="xl"
  padding="lg"
  style={{ margin: '0 auto', minHeight: '100vh' }}
>
  <h1>Główna treść aplikacji</h1>
  <p>Semantyczny element main z ograniczeniem szerokości.</p>
</Container>
```

### 8. Przykłady w kontekście aplikacji

Praktyczne zastosowania w rzeczywistych scenariuszach.

```tsx
// Layout strony z różnymi kontenerami
function AppLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Container as="header" surface="primary-container" padding="lg">
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>MojaAplikacja</h1>
          <div>Menu</div>
        </nav>
      </Container>

      {/* Main content */}
      <Container
        as="main"
        surface="surface"
        maxWidth="lg"
        padding="xl"
        style={{ margin: '0 auto', flex: 1 }}
      >
        <h1>Strona główna</h1>
        <p>Główna treść aplikacji.</p>
      </Container>

      {/* Footer */}
      <Container as="footer" surface="surface-variant" padding="lg">
        <p style={{ textAlign: 'center' }}>© 2025 MojaAplikacja</p>
      </Container>
    </div>
  );
}

// Dashboard z różnymi sekcjami
function Dashboard() {
  return (
    <Container maxWidth="xl" padding="lg" style={{ margin: '0 auto' }}>
      {/* Hero section */}
      <Container
        surface="primary-container"
        padding="xl"
        radius="lg"
        style={{ marginBottom: '24px' }}
      >
        <h1>Dashboard</h1>
        <p>Witaj w panelu administratora</p>
      </Container>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {[
          { title: 'Użytkownicy', value: '1,234', change: '+12%' },
          { title: 'Sprzedaż', value: '45,678 PLN', change: '+8%' },
          { title: 'Zamówienia', value: '89', change: '-2%' },
          { title: 'Konwersja', value: '3.4%', change: '+0.5%' },
        ].map((stat, index) => (
          <Container key={index} surface="surface-container" padding="lg" elevation={1} radius="lg">
            <h3 style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>{stat.title}</h3>
            <p style={{ margin: '8px 0', fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</p>
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                color: stat.change.startsWith('+') ? 'green' : 'red',
              }}
            >
              {stat.change}
            </p>
          </Container>
        ))}
      </div>

      {/* Main content area */}
      <Container surface="surface-container-low" padding="xl" elevation={1} radius="lg">
        <h2>Ostatnia aktywność</h2>
        <p>Lista ostatnich działań w systemie...</p>
      </Container>
    </Container>
  );
}

// Formularz kontaktowy w kontenerze
function ContactForm() {
  return (
    <Container
      surface="surface-container"
      maxWidth="md"
      padding="xl"
      elevation={2}
      radius="lg"
      style={{ margin: '0 auto', marginTop: '48px' }}
    >
      <h2 style={{ marginTop: 0 }}>Skontaktuj się z nami</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField label="Imię i nazwisko" required />
        <TextField label="Email" type="email" required />
        <TextField label="Temat" />
        <TextField label="Wiadomość" multiline rows={6} required />
        <Button type="submit" variant="filled">
          Wyślij wiadomość
        </Button>
      </form>
    </Container>
  );
}

// Hero section z gradientem
function HeroSection() {
  return (
    <Container
      surface="primary-container"
      padding="2xl"
      radius="none"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        color: 'white',
        textAlign: 'center',
      }}
      autoTextColor={false}
    >
      <h1 style={{ fontSize: '48px', margin: '0 0 16px 0' }}>Witaj w Aurora UI</h1>
      <p style={{ fontSize: '20px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 32px' }}>
        Nowoczesna biblioteka komponentów dla Preact z Material Design 3
      </p>
      <Button variant="filled" size="large">
        Rozpocznij teraz
      </Button>
    </Container>
  );
}
```

## API

| Prop            | Typ                                                                 | Domyślnie    | Opis                                                               |
| :-------------- | :------------------------------------------------------------------ | :----------- | :----------------------------------------------------------------- |
| `surface`       | `SurfaceType`                                                       | `'surface'`  | Typ powierzchni MD3 (surface, surface-variant, containers, colors) |
| `padding`       | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`           | `'md'`       | Rozmiar wewnętrznego padding z design system                       |
| `elevation`     | `0 \| 1 \| 2 \| 3 \| 4 \| 5`                                        | `0`          | Poziom elevacji (głębokość cienia)                                 |
| `maxWidth`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full' \| 'none'` | `'none'`     | Maksymalna szerokość kontenera                                     |
| `autoTextColor` | `boolean`                                                           | `true`       | Automatyczne dopasowanie koloru tekstu do surface                  |
| `responsive`    | `boolean`                                                           | `true`       | Responsywne dostosowania padding i spacing                         |
| `radius`        | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                  | `'md'`       | Zaokrąglenie rogów                                                 |
| `as`            | `keyof JSX.IntrinsicElements`                                       | `'div'`      | Element HTML do renderowania (polimorfizm)                         |
| `children`      | `ComponentChildren`                                                 | **wymagane** | Zawartość kontenera                                                |
| `className`     | `string`                                                            | `''`         | Dodatkowe klasy CSS                                                |
| `style`         | `JSX.CSSProperties`                                                 | `undefined`  | Style inline                                                       |

### Typy Surface

**SurfaceType:**

- `'surface'` - Podstawowa powierzchnia aplikacji
- `'surface-variant'` - Alternatywny odcień powierzchni
- `'surface-container'` - Standardowy poziom kontenera
- `'surface-container-low'` - Niski poziom kontenera
- `'surface-container-high'` - Wysoki poziom kontenera
- `'surface-container-highest'` - Najwyższy poziom kontenera
- `'primary-container'` - Kontener w kolorze primary
- `'secondary-container'` - Kontener w kolorze secondary
- `'tertiary-container'` - Kontener w kolorze tertiary
- `'error-container'` - Kontener dla komunikatów błędów

### Rozmiary MaxWidth

| Rozmiar | Szerokość | Zastosowanie                |
| :------ | :-------- | :-------------------------- |
| `xs`    | 480px     | Formularze, modale          |
| `sm`    | 640px     | Karty, komponenty           |
| `md`    | 768px     | Artykuły, treść do czytania |
| `lg`    | 1024px    | Główna treść, dashboardy    |
| `xl`    | 1280px    | Szerokie layouty            |
| `2xl`   | 1536px    | Ultra-szerokie ekrany       |
| `full`  | 100%      | Pełna szerokość rodzica     |
| `none`  | brak      | Bez ograniczenia szerokości |

## Stylowanie i theming

### CSS Custom Properties

Komponent wykorzystuje zmienne CSS z systemu motywów Aurora UI:

```scss
// Surface colors (automatically managed)
--color-surface                    // Podstawowe tło
--color-surface-variant           // Wariant tła
--color-surface-container         // Kontener podstawowy
--color-surface-container-low     // Kontener niski
--color-surface-container-high    // Kontener wysoki
--color-surface-container-highest // Kontener najwyższy

// Colored containers
--color-primary-container         // Kontener primary
--color-secondary-container       // Kontener secondary
--color-tertiary-container        // Kontener tertiary
--color-error-container          // Kontener błędu

// Text colors (auto-applied)
--color-on-surface               // Tekst na surface
--color-on-surface-variant       // Tekst na surface-variant
--color-on-primary-container     // Tekst na primary-container
--color-on-secondary-container   // Tekst na secondary-container
--color-on-tertiary-container    // Tekst na tertiary-container
--color-on-error-container       // Tekst na error-container

// Spacing system
--space-xs: 4px;      // Bardzo mały padding
--space-sm: 8px;      // Mały padding
--space-md: 16px;     // Średni padding (domyślny)
--space-lg: 24px;     // Duży padding
--space-xl: 32px;     // Bardzo duży padding
--space-2xl: 48px;    // Maksymalny padding

// Border radius
--radius-sm: 4px;     // Małe zaokrąglenie
--radius-md: 8px;     // Średnie zaokrąglenie
--radius-lg: 12px;    // Duże zaokrąglenie
--radius-xl: 16px;    // Bardzo duże zaokrąglenie

// Elevation (box-shadow)
--elevation-1: 0 1px 3px rgba(0,0,0,0.12);
--elevation-2: 0 4px 6px rgba(0,0,0,0.1);
--elevation-3: 0 10px 20px rgba(0,0,0,0.1);
--elevation-4: 0 20px 25px rgba(0,0,0,0.1);
--elevation-5: 0 25px 50px rgba(0,0,0,0.15);
```

### Responsywność

```scss
// Automatyczne dostosowanie padding na różnych ekranach
.container--responsive {
  @media (max-width: 768px) {
    --space-xs: 2px;
    --space-sm: 4px;
    --space-md: 8px;
    --space-lg: 12px;
    --space-xl: 16px;
    --space-2xl: 24px;
  }

  @media (min-width: 1200px) {
    --space-xl: 40px;
    --space-2xl: 64px;
  }
}

// Automatyczne marginesy dla centrowania
.container--max-width-xs,
.container--max-width-sm,
.container--max-width-md,
.container--max-width-lg,
.container--max-width-xl,
.container--max-width-2xl {
  margin-left: auto;
  margin-right: auto;
}
```

### Nadpisywanie stylów

```tsx
// Style inline z custom properties
<Container
  style={{
    '--color-surface': '#f0f8ff',
    '--space-md': '20px',
    borderLeft: '4px solid var(--color-primary)'
  }}
>
  Kontener z niestandardowymi stylami
</Container>

// Klasy CSS
<Container className="custom-container">
  Kontener z niestandardową klasą
</Container>

// CSS Modules
import styles from './MyLayout.module.scss';
<Container className={styles.specialContainer}>
  Kontener ze stylami z modułu
</Container>
```

## Dostępność (A11y)

### WCAG 2.1 AA Compliance

- ✅ **Kontrast**: Automatyczne zarządzanie kontrastem tekstu do tła (minimum 4.5:1)
- ✅ **Semantyka**: Możliwość używania semantycznych elementów HTML przez `as`
- ✅ **Structure**: Poprawna hierarchia wizualna przez surface i elevation
- ✅ **Responsive**: Automatyczne dostosowanie do różnych rozmiarów ekranu

### Dobre praktyki

```tsx
// ✅ POPRAWNIE - semantyczne elementy
<Container as="main" surface="surface">
  Główna treść strony
</Container>

<Container as="section" surface="surface-container">
  <h2>Tytuł sekcji</h2>
  <p>Zawartość sekcji</p>
</Container>

// ✅ POPRAWNIE - automatyczny kontrast
<Container surface="primary-container">
  Tekst automatycznie dostosowany do kolorowego tła
</Container>

// ✅ POPRAWNIE - dostępne focus dla interaktywnych kontenerów
<Container
  as="button"
  surface="surface-container"
  style={{ cursor: 'pointer' }}
  aria-label="Kliknij aby rozwinąć"
>
  Interaktywny kontener
</Container>

// ❌ BŁĘDNIE - brak semantyki dla długiej treści
<Container>
  <h1>Długi artykuł...</h1>
  {/* lepiej użyć as="article" */}
</Container>

// ✅ POPRAWNIE - z semantyką
<Container as="article">
  <h1>Długi artykuł...</h1>
  <p>Treść artykułu...</p>
</Container>
```

### Testowanie dostępności

```tsx
import { render, screen } from '@testing-library/preact';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Container meets accessibility standards', async () => {
  const { container } = render(
    <Container as="section" surface="surface-container">
      <h2>Accessible section</h2>
      <p>Content with proper contrast</p>
    </Container>,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Wzorce testowania

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import { Container } from './Container';

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>,
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies surface and elevation classes', () => {
    render(
      <Container surface="primary-container" elevation={2}>
        Content
      </Container>,
    );

    const container = screen.getByText('Content').parentElement;
    expect(container).toHaveAttribute('data-surface', 'primary-container');
    expect(container).toHaveAttribute('data-elevation', '2');
  });

  it('renders as specified HTML element', () => {
    render(
      <Container as="section">
        <h2>Section content</h2>
      </Container>,
    );

    const section = screen.getByRole('region');
    expect(section.tagName).toBe('SECTION');
  });
});
```

### Testy styling i theming

```tsx
it('applies correct background color for surface', () => {
  render(<Container surface="primary-container">Test content</Container>);

  const container = screen.getByText('Test content').parentElement;
  expect(container).toHaveStyle({
    backgroundColor: expect.stringMatching(/#[0-9a-f]{6}/i),
  });
});

it('applies automatic text color', () => {
  render(
    <Container surface="primary-container" autoTextColor>
      Test content
    </Container>,
  );

  const container = screen.getByText('Test content').parentElement;
  expect(container).toHaveAttribute('data-auto-text-color', 'true');
});
```

### Testy responsywności

```tsx
it('applies responsive classes when enabled', () => {
  render(
    <Container responsive padding="md">
      Responsive content
    </Container>,
  );

  const container = screen.getByText('Responsive content').parentElement;
  expect(container).toHaveClass('container--responsive');
});

it('handles max-width constraints', () => {
  render(<Container maxWidth="md">Constrained content</Container>);

  const container = screen.getByText('Constrained content').parentElement;
  expect(container).toHaveClass('container--max-width-md');
});
```

### Testy polimorfizmu

```tsx
it('renders as different HTML elements', () => {
  const { rerender } = render(<Container as="article">Article content</Container>);

  expect(screen.getByRole('article')).toBeInTheDocument();

  rerender(<Container as="section">Section content</Container>);
  expect(screen.getByRole('region')).toBeInTheDocument();
});
```

## Integracja z innymi komponentami

### Z Card i Button

```tsx
import { Container, Card, Button, Text } from 'preact-aurora-ui';

function ProductShowcase() {
  return (
    <Container maxWidth="lg" padding="xl" style={{ margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {products.map((product) => (
          <Card key={product.id} elevation={1}>
            <Container padding="lg">
              <Text variant="title-medium">{product.name}</Text>
              <Text variant="body-small" color="on-surface-variant">
                {product.description}
              </Text>
              <Container
                surface="primary-container"
                padding="sm"
                radius="md"
                style={{ marginTop: '12px', textAlign: 'center' }}
              >
                <Text variant="label-large">{product.price} PLN</Text>
              </Container>
            </Container>
          </Card>
        ))}
      </div>
    </Container>
  );
}
```

### Z TextField i formularzami

```tsx
import { Container, TextField, Button } from 'preact-aurora-ui';

function RegistrationForm() {
  return (
    <Container
      surface="surface-container-low"
      maxWidth="sm"
      padding="xl"
      elevation={2}
      radius="lg"
      style={{ margin: '0 auto' }}
    >
      <h2 style={{ marginTop: 0, textAlign: 'center' }}>Rejestracja</h2>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField label="Imię i nazwisko" required fullWidth />
        <TextField label="Email" type="email" required fullWidth />
        <TextField label="Hasło" type="password" required fullWidth />

        <Container surface="surface-variant" padding="md" radius="md">
          <Text variant="body-small">Rejestrując się akceptujesz nasze warunki użytkowania.</Text>
        </Container>

        <Button type="submit" variant="filled" fullWidth>
          Zarejestruj się
        </Button>
      </form>
    </Container>
  );
}
```

## FAQ

**Q: Kiedy używać `surface` a kiedy `elevation`?**
A: Używaj `surface` do określenia koloru tła i kontekstu semantycznego. `elevation` dodaje cienie dla wizualnej hierarchii - można je łączyć.

**Q: Czy mogę nadpisać automatyczny kolor tekstu?**
A: Tak, ustaw `autoTextColor={false}` i użyj własnych stylów CSS lub `style` prop.

**Q: Jak stworzyć własny system spacing?**
A: Nadpisz CSS custom properties `--space-*` w swoich stylach lub użyj `style` prop z własnymi wartościami.

**Q: Czy Container obsługuje zagnieżdżanie?**
A: Tak, kontenery można swobodnie zagnieżdżać. Każdy zarządza swoim własnym tłem i tekstem niezależnie.

**Q: Jak zrobić sticky header z Container?**
A: Użyj `position: sticky` w `style` prop wraz z odpowiednim `z-index` i `top` value.

**Q: Czy można animować zmiany surface?**
A: Tak, dodaj `transition` w CSS dla smooth animations między różnymi surface colors.

---

**Wersja:** v0.0.13  
**Dokumentacja:** [GitHub](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Container)  
**Storybook:** [Container Stories](https://aurora-ui-storybook.vercel.app/?path=/story/components-container--default)
