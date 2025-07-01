# Card

Uniwersalny komponent karty zgodny z Material Design 3, oferujący różne warianty wizualne, poziomy elevacji, wsparcie dla akcji oraz stany interaktywne. Idealny do prezentacji treści w wydzielonych, wizualnie spójnych kontenerach.

## Opis

`Card` to komponent kontenerowy służący do grupowania powiązanych informacji i akcji w jednym miejscu. Obsługuje nagłówki, podtytuły, akcje, różne warianty wizualne oraz stany interaktywne jak hover i kliknięcie. Komponent automatycznie zarządza elevacją (cieniami) zgodnie z Material Design 3 i zapewnia pełną dostępność.

## Przykłady użycia

### 1. Podstawowe warianty Material Design 3

Cztery główne style kart z różnymi zastosowaniami wizualnymi.

```tsx
import { Card } from 'preact-aurora-ui';

// Default - standardowa karta z subtelnym cieniem
<Card variant="default">
  <h3>Standardowa karta</h3>
  <p>Zawartość karty z podstawowym stylem.</p>
</Card>

// Outlined - karta z obramowaniem, bez cienia
<Card variant="outlined">
  <h3>Karta z obramowaniem</h3>
  <p>Idealny do layoutów z jasnym tłem.</p>
</Card>

// Elevated - karta z podniesionym cieniem
<Card variant="elevated" elevation={4}>
  <h3>Podniesiona karta</h3>
  <p>Większy nacisk wizualny z wyższą elevacją.</p>
</Card>

// Filled - karta z kolorowym tłem
<Card variant="filled">
  <h3>Wypełniona karta</h3>
  <p>Mocny akcent wizualny z kolorowym tłem.</p>
</Card>
```

### 2. Poziomy elevacji (Material Design)

Kontrola nad głębokością cienia dla różnych hierarchii wizualnych.

```tsx
// Różne poziomy elevacji
<Card elevation={0}>Bez cienia</Card>
<Card elevation={1}>Subtelny cień (domyślny)</Card>
<Card elevation={2}>Lekki cień</Card>
<Card elevation={3}>Średni cień</Card>
<Card elevation={4}>Wyraźny cień</Card>
<Card elevation={8}>Wysoki cień</Card>
<Card elevation={12}>Bardzo wysoki cień</Card>
<Card elevation={16}>Maksymalny cień</Card>

// Karta z efektem hover - zmienia elevację
<Card elevation={1} hoverable>
  <p>Najedź myszką aby zobaczyć efekt elevacji</p>
</Card>
```

### 3. Rozmiary padding i spacing

Kontrola nad wewnętrznym spacingiem karty.

```tsx
// Różne rozmiary padding
<Card padding="none">
  <img src="/image.jpg" alt="Bez paddingu" style={{ width: '100%' }} />
  <div style={{ padding: '16px' }}>
    <h3>Karta bez wewnętrznego paddingu</h3>
    <p>Padding można dodać selektywnie do części treści.</p>
  </div>
</Card>

<Card padding="sm">Mały padding</Card>
<Card padding="md">Średni padding (domyślny)</Card>
<Card padding="lg">Duży padding</Card>
```

### 4. Nagłówki, podtytuły i akcje

Strukturalna organizacja treści karty z dedykowanymi sekcjami.

```tsx
// Karta z nagłówkiem i akcjami
<Card
  title="Profil użytkownika"
  subtitle="Aktywny od: styczeń 2024"
  actions={
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button size="small" variant="text">Edytuj</Button>
      <Button size="small" variant="outlined">Usuń</Button>
    </div>
  }
>
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <img
      src="/avatar.jpg"
      alt="Zdjęcie profilowe"
      style={{ width: 48, height: 48, borderRadius: '50%' }}
    />
    <div>
      <Text variant="title-medium">Jan Kowalski</Text>
      <Text variant="body-small" color="on-surface-variant">
        jan.kowalski@example.com
      </Text>
    </div>
  </div>
</Card>

// Karta produktu z cenami
<Card
  title="MacBook Pro 14"
  subtitle="Apple M3 Pro, 18GB RAM, 512GB SSD"
  actions={
    <Text variant="title-large" color="primary">
      8999 PLN
    </Text>
  }
>
  <img
    src="/macbook.jpg"
    alt="MacBook Pro"
    style={{ width: '100%', borderRadius: '4px' }}
  />
  <div style={{ marginTop: '12px' }}>
    <Text variant="body-medium">
      Procesor Apple M3 Pro zapewnia wyjątkową wydajność
      dla profesjonalnych zastosowań.
    </Text>
  </div>
</Card>
```

### 5. Karty interaktywne i klikalne

Obsługa interakcji użytkownika z kartami.

```tsx
// Karta klikalna jako przycisk
<Card
  clickable
  hoverable
  onClick={() => navigate('/product/123')}
  title="iPhone 15 Pro"
  subtitle="Najnowszy model Apple"
  aria-label="Przejdź do szczegółów iPhone 15 Pro"
>
  <img src="/iphone.jpg" alt="iPhone 15 Pro" />
  <Text>Kliknij aby zobaczyć szczegóły</Text>
</Card>

// Karta z efektem hover bez kliknięcia
<Card hoverable>
  <h3>Karta z efektem hover</h3>
  <p>Ta karta reaguje na hover ale nie jest klikalna.</p>
</Card>

// Karta z własną obsługą kliknięcia
function ProductCard({ product, onAddToCart }) {
  return (
    <Card
      clickable
      onClick={() => onAddToCart(product.id)}
      title={product.name}
      subtitle={`${product.price} PLN`}
    >
      <img src={product.image} alt={product.name} />
      <Button
        variant="filled"
        fullWidth
        onClick={(e) => {
          e.stopPropagation(); // Zapobiega wywołaniu onClick karty
          onAddToCart(product.id);
        }}
      >
        Dodaj do koszyka
      </Button>
    </Card>
  );
}
```

### 6. Stany ładowania

Obsługa stanów ładowania z overlay i wyłączeniem interakcji.

```tsx
// Karta w stanie ładowania
<Card loading title="Ładowanie danych...">
  <div style={{ height: '200px' }}>
    <p>Ta zawartość jest niewidoczna podczas ładowania</p>
  </div>
</Card>;

// Karta z kontrolowanym stanem ładowania
function DataCard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      loading={loading}
      title="Dane użytkownika"
      actions={
        <Button size="small" onClick={fetchData} disabled={loading}>
          {loading ? 'Ładowanie...' : 'Odśwież'}
        </Button>
      }
    >
      {data ? (
        <div>
          <Text>Dane załadowane: {data.timestamp}</Text>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <Text color="on-surface-variant">Kliknij "Odśwież" aby załadować dane</Text>
      )}
    </Card>
  );
}
```

### 7. Przykłady w kontekście aplikacji

Praktyczne zastosowania w rzeczywistych scenariuszach.

```tsx
// Dashboard z metrykami
function MetricsCard({ title, value, change, icon }) {
  const isPositive = change > 0;

  return (
    <Card variant="outlined" padding="lg">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <Text variant="label-medium" color="on-surface-variant">
            {title}
          </Text>
          <Text variant="display-small" style={{ marginTop: '4px' }}>
            {value}
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
            <Text variant="body-small" color={isPositive ? 'success' : 'error'}>
              {isPositive ? '↗' : '↘'} {Math.abs(change)}%
            </Text>
          </div>
        </div>
        <div style={{ fontSize: '24px' }}>{icon}</div>
      </div>
    </Card>
  );
}

// Lista produktów
function ProductGrid({ products }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
      }}
    >
      {products.map((product) => (
        <Card
          key={product.id}
          clickable
          hoverable
          onClick={() => navigate(`/products/${product.id}`)}
          variant="outlined"
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '16px' }}>
            <Text variant="title-medium">{product.name}</Text>
            <Text variant="body-small" color="on-surface-variant">
              {product.description}
            </Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
              }}
            >
              <Text variant="title-small" color="primary">
                {product.price} PLN
              </Text>
              <Button size="small" variant="filled">
                Dodaj do koszyka
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Formularz w karcie
function ContactFormCard() {
  return (
    <Card
      title="Skontaktuj się z nami"
      subtitle="Odpowiemy w ciągu 24 godzin"
      variant="outlined"
      padding="lg"
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField label="Imię i nazwisko" required fullWidth />
        <TextField label="Email" type="email" required fullWidth />
        <TextField label="Wiadomość" multiline rows={4} required fullWidth />
        <Button type="submit" variant="filled">
          Wyślij wiadomość
        </Button>
      </form>
    </Card>
  );
}

// Card z nawigacją
function NavigationCard() {
  return (
    <Card title="Szybka nawigacja" variant="filled">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Dashboard', icon: '📊', path: '/dashboard' },
          { label: 'Produkty', icon: '📦', path: '/products' },
          { label: 'Zamówienia', icon: '🛒', path: '/orders' },
          { label: 'Ustawienia', icon: '⚙️', path: '/settings' },
        ].map((item) => (
          <Button
            key={item.path}
            variant="text"
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              padding: '12px',
            }}
          >
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <Text variant="label-small">{item.label}</Text>
          </Button>
        ))}
      </div>
    </Card>
  );
}
```

## API

| Prop           | Typ                                                 | Domyślnie   | Opis                                               |
| :------------- | :-------------------------------------------------- | :---------- | :------------------------------------------------- |
| `children`     | `ComponentChildren`                                 | `undefined` | Główna zawartość karty                             |
| `className`    | `string`                                            | `''`        | Dodatkowe klasy CSS                                |
| `style`        | `JSX.CSSProperties`                                 | `undefined` | Style inline                                       |
| **Zawartość**  |                                                     |             |                                                    |
| `title`        | `string`                                            | `undefined` | Tytuł karty (wyświetlany w header)                 |
| `subtitle`     | `string`                                            | `undefined` | Podtytuł karty (pod headerem)                      |
| `actions`      | `ComponentChildren`                                 | `undefined` | Akcje w prawym górnym rogu (przyciski, ikony)      |
| **Wygląd**     |                                                     |             |                                                    |
| `variant`      | `'default' \| 'outlined' \| 'elevated' \| 'filled'` | `'default'` | Wariant wizualny zgodny z Material Design 3        |
| `elevation`    | `0 \| 1 \| 2 \| 3 \| 4 \| 8 \| 12 \| 16 \| 24`      | `1`         | Poziom elevacji (cienia) Material Design           |
| `padding`      | `'none' \| 'sm' \| 'md' \| 'lg'`                    | `'md'`      | Rozmiar wewnętrznego paddingu                      |
| **Interakcje** |                                                     |             |                                                    |
| `hoverable`    | `boolean`                                           | `false`     | Efekt hover (zmiana elevacji/koloru)               |
| `clickable`    | `boolean`                                           | `false`     | Karta jest klikalna (dodaje role="button")         |
| `onClick`      | `() => void`                                        | `undefined` | Handler kliknięcia (wymagany jeśli clickable=true) |
| **Stany**      |                                                     |             |                                                    |
| `loading`      | `boolean`                                           | `false`     | Stan ładowania (overlay + wyłączenie interakcji)   |
| **Dostępność** |                                                     |             |                                                    |
| `aria-label`   | `string`                                            | `'Kafelek'` | Etykieta dla screen readerów                       |

### Poziomy elevacji Material Design

| Elevation | Zastosowanie                            | Box-shadow                   |
| :-------- | :-------------------------------------- | :--------------------------- |
| `0`       | Płaskie karty, brak cienia              | none                         |
| `1`       | Standardowe karty (domyślne)            | 0 1px 3px rgba(0,0,0,0.12)   |
| `2`       | Karty z lekkim naciskiem                | 0 1px 5px rgba(0,0,0,0.15)   |
| `3`       | Karty nad tłem                          | 0 1px 8px rgba(0,0,0,0.15)   |
| `4`       | Karty z większym naciskiem              | 0 2px 10px rgba(0,0,0,0.15)  |
| `8`       | Dialogi, menu, karty nad innymi kartami | 0 5px 15px rgba(0,0,0,0.2)   |
| `12`      | FAB, karty w stanie dragging            | 0 7px 20px rgba(0,0,0,0.25)  |
| `16`      | Navigation drawer                       | 0 8px 25px rgba(0,0,0,0.3)   |
| `24`      | Maksymalna elevacja, modalne overlaye   | 0 11px 35px rgba(0,0,0,0.35) |

## Stylowanie i theming

### CSS Custom Properties

Komponent wykorzystuje zmienne CSS z systemu motywów Aurora UI:

```scss
// Kolory kart
--color-surface               // Tło karty default/elevated
--color-surface-variant       // Tło karty filled
--color-outline               // Obramowanie karty outlined
--color-outline-variant       // Obramowanie hover
--color-on-surface            // Tekst na kartach
--color-on-surface-variant    // Tekst drugorzędny
--color-surface-container     // Kontener karty

// Elevacja i cienie
--elevation-1: 0 1px 3px rgba(0,0,0,0.12);
--elevation-2: 0 1px 5px rgba(0,0,0,0.15);
--elevation-3: 0 1px 8px rgba(0,0,0,0.15);
--elevation-4: 0 2px 10px rgba(0,0,0,0.15);
// ... pozostałe poziomy

// Spacing
--space-xs: 4px;      // Padding none (0px)
--space-sm: 8px;      // Padding small
--space-md: 16px;     // Padding medium (domyślny)
--space-lg: 24px;     // Padding large

// Border radius
--border-radius-md: 12px;  // Zaokrąglenie kart MD3
```

### Warianty Material Design 3

```scss
// Default - standardowa karta z cieniem
.card--variant-default {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-md);
  box-shadow: var(--elevation-1);

  &:hover {
    box-shadow: var(--elevation-2);
  }
}

// Outlined - karta z obramowaniem
.card--variant-outlined {
  background-color: var(--color-surface);
  border: 1px solid var(--color-outline);
  border-radius: var(--border-radius-md);

  &:hover {
    border-color: var(--color-outline-variant);
    box-shadow: var(--elevation-1);
  }
}

// Elevated - karta z wyższą elevacją
.card--variant-elevated {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-md);
  box-shadow: var(--elevation-1);

  &:hover {
    box-shadow: var(--elevation-4);
  }
}

// Filled - karta z kolorowym tłem
.card--variant-filled {
  background-color: var(--color-surface-variant);
  border-radius: var(--border-radius-md);

  &:hover {
    box-shadow: var(--elevation-1);
  }
}
```

### Stan kliknięcia i hover

```scss
.card--clickable {
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }
}

.card--hoverable:hover {
  transform: translateY(-2px);
}
```

### Stan ładowania

```scss
.card--loading {
  position: relative;
  pointer-events: none;

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      width: 24px;
      height: 24px;
      border: 2px solid var(--color-outline);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}
```

### Nadpisywanie stylów

```tsx
// Style inline dla elevacji
<Card style={{ '--elevation': 'var(--elevation-8)' }}>
  Custom elevation
</Card>

// Klasy CSS
<Card className="custom-card">
  Custom styled card
</Card>

// CSS Modules
import styles from './MyComponent.module.scss';
<Card className={styles.specialCard}>
  Special card
</Card>
```

### Responsywność

```scss
// Automatyczne dostosowanie na urządzeniach mobilnych
.card {
  @media (max-width: 768px) {
    margin: var(--space-sm);
    border-radius: var(--space-sm);
  }

  @media (min-width: 1200px) {
    max-width: 400px; // Ograniczenie szerokości na desktop
  }
}

// Grid kart responsywny
.cards-grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
```

## Dostępność (A11y)

### WCAG 2.1 AA Compliance

- ✅ **Kontrast**: Wszystkie kolory spełniają wymagania kontrastu 4.5:1
- ✅ **Focus management**: Widoczne focus ring dla kliknalnych kart
- ✅ **Keyboard navigation**: Obsługa Enter i Space dla kliknalnych kart
- ✅ **Screen readers**: Automatyczne role i aria-labels
- ✅ **Semantic markup**: Użycie elementu `<section>` z odpowiednią semantyką

### Wymagania implementacyjne

```tsx
// ✅ POPRAWNIE - karta z odpowiednimi aria attributes
<Card
  title="Profil użytkownika"
  aria-label="Karta profilu użytkownika Jan Kowalski"
>
  Content
</Card>

// ✅ POPRAWNIE - karta klikalna z keyboard support
<Card
  clickable
  onClick={handleClick}
  aria-label="Kliknij aby otworzyć szczegóły produktu"
  role="button"
  tabIndex={0}
>
  Product details
</Card>

// ✅ POPRAWNIE - karta z loading state
<Card
  loading
  aria-busy="true"
  aria-label="Ładowanie danych użytkownika"
>
  Loading content
</Card>

// ❌ BŁĘDNIE - karta klikalna bez aria-label
<Card clickable onClick={handleClick}>
  Unclear action
</Card>

// ❌ BŁĘDNIE - brak kontekstu dla screen readerów
<Card>
  <img src="product.jpg" alt="" />
  <p>$99.99</p>
</Card>
```

### Automatyczne features

```tsx
// Komponent automatycznie dodaje:
<Card clickable onClick={handleClick} />
// Generuje:
// role="button"
// tabIndex={0}
// onKeyDown={handleKeyPress} - obsługa Enter/Space
// aria-label="Kafelek" (jeśli nie podano)

<Card loading />
// Generuje:
// aria-busy="true"
// Overlay z loading indicator
// pointer-events: none
```

## Wzorce testowania

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders content correctly', () => {
    render(
      <Card title="Test Card" subtitle="Test Subtitle">
        <p>Card content</p>
      </Card>,
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { container } = render(<Card variant="outlined">Content</Card>);

    const card = container.firstChild;
    expect(card).toHaveClass('card--variant-outlined');
  });

  it('handles click events when clickable', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Card clickable onClick={handleClick}>
        Clickable content
      </Card>,
    );

    const card = screen.getByRole('button');
    await user.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testy interakcji

```tsx
it('handles keyboard interaction for clickable cards', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(
    <Card clickable onClick={handleClick}>
      Clickable card
    </Card>,
  );

  const card = screen.getByRole('button');

  // Test Enter key
  card.focus();
  await user.keyboard('{Enter}');
  expect(handleClick).toHaveBeenCalledTimes(1);

  // Test Space key
  await user.keyboard(' ');
  expect(handleClick).toHaveBeenCalledTimes(2);
});

it('does not call onClick when loading', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(
    <Card clickable loading onClick={handleClick}>
      Loading card
    </Card>,
  );

  const card = screen.getByRole('button');
  await user.click(card);

  expect(handleClick).not.toHaveBeenCalled();
});
```

### Testy stanów

```tsx
it('shows loading overlay when loading', () => {
  render(<Card loading>Content under overlay</Card>);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  expect(screen.getByText('Content under overlay')).toBeInTheDocument();
});

it('applies hover effects when hoverable', () => {
  const { container } = render(<Card hoverable>Hoverable content</Card>);

  const card = container.firstChild;
  expect(card).toHaveClass('card--hoverable');
});
```

### Testy dostępności

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('meets accessibility standards', async () => {
  const { container } = render(
    <Card title="Accessible Card" aria-label="Card with full accessibility support">
      Accessible content
    </Card>,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('has proper ARIA attributes for clickable cards', () => {
  render(
    <Card clickable onClick={() => {}} aria-label="Navigate to product details">
      Product card
    </Card>,
  );

  const card = screen.getByRole('button');
  expect(card).toHaveAttribute('aria-label', 'Navigate to product details');
  expect(card).toHaveAttribute('tabIndex', '0');
});
```

## Integracja z innymi komponentami

### Z Button i Text

```tsx
import { Card, Button, Text } from 'preact-aurora-ui';

function UserProfileCard({ user }) {
  return (
    <Card
      title={user.name}
      subtitle={user.email}
      actions={
        <Button size="small" variant="text">
          Edytuj
        </Button>
      }
    >
      <div style={{ display: 'flex', gap: '12px' }}>
        <img
          src={user.avatar}
          alt="Avatar"
          style={{ width: 48, height: 48, borderRadius: '50%' }}
        />
        <div>
          <Text variant="body-medium">{user.bio}</Text>
          <Text variant="body-small" color="on-surface-variant">
            Członek od: {user.joinDate}
          </Text>
        </div>
      </div>
    </Card>
  );
}
```

### Z TextField w formularzach

```tsx
function FormCard({ title, onSubmit }) {
  return (
    <Card title={title} variant="outlined" padding="lg">
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField label="Nazwa" required fullWidth />
        <TextField label="Email" type="email" required fullWidth />
        <TextField label="Opis" multiline rows={3} fullWidth />
        <Button type="submit" variant="filled">
          Zapisz
        </Button>
      </form>
    </Card>
  );
}
```

### Z Badge dla statusów

```tsx
import { Card, Badge, Text } from 'preact-aurora-ui';

function OrderCard({ order }) {
  return (
    <Card
      title={`Zamówienie #${order.id}`}
      actions={
        <Badge
          variant={order.status === 'completed' ? 'success' : 'warning'}
          text={order.statusText}
        />
      }
    >
      <Text variant="body-medium">Data: {order.date}</Text>
      <Text variant="title-small" color="primary">
        Wartość: {order.total} PLN
      </Text>
    </Card>
  );
}
```

## FAQ

**Q: Kiedy używać którego wariantu karty?**
A: `default` - standardowe karty, `outlined` - karty na jasnym tle, `elevated` - karty wymagające uwagi, `filled` - karty akcent/hero.

**Q: Jak kontrolować elevację w różnych stanach?**
A: Użyj CSS custom properties lub prop `elevation`. Hoverable automatycznie zwiększa elevację przy hover.

**Q: Czy można zagnieżdżać karty?**
A: Tak, ale uważaj na nadmierną elevację. Użyj różnych wariantów lub niższych poziomów elevacji dla kart wewnętrznych.

**Q: Jak zrobić kartę responsywną?**
A: Użyj CSS Grid lub Flexbox w kontenerze rodzica, a karty automatycznie dostosują się. Rozważ `padding="sm"` na mobile.

**Q: Czy Card obsługuje drag & drop?**
A: Nie bezpośrednio, ale można zintegrować z bibliotekami drag & drop przez event handlery i `clickable={false}`.

**Q: Jak stylować loading overlay?**
A: Użyj CSS custom properties dla kolorów lub nadpisz klasy `.loading-overlay` w swoich stylach.

---

**Wersja:** v0.0.13  
**Dokumentacja:** [GitHub](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Card)  
**Storybook:** [Card Stories](https://aurora-ui-storybook.vercel.app/?path=/story/components-card--default)
