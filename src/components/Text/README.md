# Text

Inteligentny komponent tekstowy z pełnym wsparciem dla typografii Material Design 3, automatycznym zarządzaniem kolorami i polimorficzną naturą umożliwiającą renderowanie jako dowolny element HTML.

## Opis

`Text` to uniwersalny komponent do wyświetlania tekstu zgodnego z systemem typografii Material Design 3. Oferuje automatyczne zarządzanie kolorami z uwzględnieniem motywu aplikacji, semantyczne znaczniki HTML oraz pełną kontrolę nad wyglądem tekstu. Komponent automatycznie dobiera odpowiednie elementy HTML na podstawie wariantu typograficznego, co zapewnia poprawną semantykę i dostępność.

## Przykłady użycia

### 1. Podstawowe warianty typografii MD3

System typografii Material Design 3 oferuje hierarchię tekstową od wyświetlania po etykiety.

```tsx
import { Text } from 'preact-aurora-ui';

// Display - największe teksty, często nagłówki hero
<Text variant="display-large">Witaj w Aurora UI</Text>
<Text variant="display-medium">Dashboard aplikacji</Text>
<Text variant="display-small">Sekcja główna</Text>

// Headlines - nagłówki sekcji
<Text variant="headline-large">Nagłówek strony</Text>
<Text variant="headline-medium">Nagłówek sekcji</Text>
<Text variant="headline-small">Podsekcja</Text>

// Titles - tytuły komponentów i kart
<Text variant="title-large">Tytuł karty</Text>
<Text variant="title-medium">Tytuł formularza</Text>
<Text variant="title-small">Tytuł elementu</Text>

// Body - tekst podstawowy
<Text variant="body-large">Większy tekst opisu lub długiej treści.</Text>
<Text variant="body-medium">Standardowy tekst paragrafów i opisów.</Text>
<Text variant="body-small">Mniejszy tekst dodatkowych informacji.</Text>

// Labels - etykiety i interfejs
<Text variant="label-large">Etykieta przycisku</Text>
<Text variant="label-medium">Etykieta pola</Text>
<Text variant="label-small">Tooltip lub podpis</Text>
```

### 2. Uproszczone warianty

Dla wygody można używać uproszczonych nazw, które są automatycznie mapowane na pełne warianty MD3.

```tsx
// Uproszczone nazwy (zalecane dla szybkiego prototypowania)
<Text variant="display">Automatycznie używa display-large</Text>
<Text variant="headline">Automatycznie używa headline-medium</Text>
<Text variant="title">Automatycznie używa title-medium</Text>
<Text variant="body">Automatycznie używa body-medium</Text>
<Text variant="label">Automatycznie używa label-medium</Text>
```

### 3. Zarządzanie kolorami i motywem

Automatyczne dopasowywanie kolorów do motywu aplikacji oraz kontekstu.

```tsx
// Kolory z palety motywu
<Text color="primary">Tekst w kolorze podstawowym</Text>
<Text color="secondary">Tekst w kolorze drugorzędnym</Text>
<Text color="error">Komunikat błędu</Text>
<Text color="success">Komunikat sukcesu</Text>

// Automatyczny dobór koloru na podstawie wariantu
<Text variant="headline" color="auto">Nagłówek z automatycznym kolorem</Text>
<Text variant="label" color="auto">Etykieta z automatycznym kolorem</Text>

// Automatyczny kontrast (dobiera kontrastujący kolor do tła)
<Text color="primary" autoContrast>
  Tekst z automatycznym kontrastem
</Text>

// Niestandardowe kolory
<Text style={{ color: '#ff5722' }}>Niestandardowy kolor</Text>
```

### 4. Polimorficzność - renderowanie jako różne elementy

Możliwość renderowania jako dowolny element HTML przy zachowaniu stylów typograficznych.

```tsx
// Automatyczne semantyczne elementy (zalecane)
<Text variant="headline-large">Automatycznie <h1></Text>
<Text variant="body-medium">Automatycznie <p></Text>
<Text variant="label-small">Automatycznie <span></Text>

// Wymuszenie konkretnego elementu
<Text variant="body-medium" as="div">Tekst w div</Text>
<Text variant="title-small" as="h2">Tytuł jako h2</Text>
<Text variant="label-medium" as="strong">Etykieta jako strong</Text>

// Linki tekstowe
<Text variant="body-medium" as="a" href="/help">
  Link do pomocy
</Text>

// Przyciski tekstowe
<Text
  variant="label-large"
  as="button"
  onClick={handleClick}
  style={{ background: 'none', border: 'none' }}
>
  Przycisk tekstowy
</Text>
```

### 5. Wyrównanie i formatowanie

Kontrola nad układem i prezentacją tekstu.

```tsx
// Wyrównanie tekstu
<Text align="left">Tekst wyrównany do lewej</Text>
<Text align="center">Tekst wyśrodkowany</Text>
<Text align="right">Tekst wyrównany do prawej</Text>
<Text align="justify">Tekst wyjustowany</Text>

// Grubość czcionki
<Text weight="normal">Normalna grubość</Text>
<Text weight="medium">Średnia grubość</Text>
<Text weight="bold">Pogrubiony tekst</Text>

// Rozmiar (nadpisuje wariant)
<Text variant="body-medium" size="xs">Bardzo mały tekst</Text>
<Text variant="body-medium" size="sm">Mały tekst</Text>
<Text variant="body-medium" size="lg">Duży tekst</Text>
<Text variant="body-medium" size="xl">Bardzo duży tekst</Text>
```

### 6. Przykłady w kontekście aplikacji

Praktyczne zastosowania w rzeczywistych scenariuszach.

```tsx
// Nagłówek strony
function PageHeader({ title, subtitle }) {
  return (
    <header>
      <Text variant="headline-large" color="on-surface">
        {title}
      </Text>
      <Text variant="body-large" color="on-surface-variant">
        {subtitle}
      </Text>
    </header>
  );
}

// Karta produktu
function ProductCard({ product }) {
  return (
    <div className="card">
      <Text variant="title-medium">{product.name}</Text>
      <Text variant="body-small" color="on-surface-variant">
        {product.description}
      </Text>
      <Text variant="label-large" color="primary">
        {product.price} PLN
      </Text>
    </div>
  );
}

// Formularz z etykietami
function ContactForm() {
  return (
    <form>
      <div>
        <Text variant="label-medium" as="label" htmlFor="name">
          Imię i nazwisko
        </Text>
        <input id="name" type="text" />
      </div>
      <div>
        <Text variant="label-medium" as="label" htmlFor="email">
          Email
        </Text>
        <input id="email" type="email" />
      </div>
    </form>
  );
}

// Komunikaty statusu
function StatusMessages({ success, error }) {
  return (
    <div>
      {success && (
        <Text variant="body-small" color="success">
          Operacja zakończona sukcesem
        </Text>
      )}
      {error && (
        <Text variant="body-small" color="error">
          Wystąpił błąd: {error}
        </Text>
      )}
    </div>
  );
}
```

## API

| Prop           | Typ                                          | Domyślnie     | Opis                                                |
| :------------- | :------------------------------------------- | :------------ | :-------------------------------------------------- |
| `variant`      | `ThemeVariant \| SimpleThemeVariant`         | `'body'`      | Wariant typografii MD3 lub uproszczony alias        |
| `color`        | `ThemeColor \| 'auto'`                       | `'auto'`      | Kolor tekstu z palety motywu lub automatyczny dobór |
| `as`           | `keyof JSX.IntrinsicElements`                | _semantyczny_ | Element HTML do renderowania (polimorfizm)          |
| `align`        | `'left' \| 'center' \| 'right' \| 'justify'` | `undefined`   | Wyrównanie tekstu                                   |
| `weight`       | `'normal' \| 'medium' \| 'bold'`             | `undefined`   | Grubość czcionki (nadpisuje wariant)                |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`       | `undefined`   | Rozmiar czcionki (nadpisuje wariant)                |
| `autoContrast` | `boolean`                                    | `false`       | Automatyczne dopasowanie kontrastu do tła           |
| `children`     | `ComponentChildren`                          | **wymagane**  | Treść tekstowa do wyświetlenia                      |
| `className`    | `string`                                     | `''`          | Dodatkowe klasy CSS                                 |
| `style`        | `JSX.CSSProperties`                          | `undefined`   | Style inline                                        |

### Typy wariantów

**ThemeVariant (pełne nazwy MD3):**

- `'display-large'` | `'display-medium'` | `'display-small'`
- `'headline-large'` | `'headline-medium'` | `'headline-small'`
- `'title-large'` | `'title-medium'` | `'title-small'`
- `'body-large'` | `'body-medium'` | `'body-small'`
- `'label-large'` | `'label-medium'` | `'label-small'`

**SimpleThemeVariant (uproszczone aliasy):**

- `'display'` → `'display-large'`
- `'headline'` → `'headline-medium'`
- `'title'` → `'title-medium'`
- `'body'` → `'body-medium'`
- `'label'` → `'label-medium'`

### Mapowanie na elementy HTML

Komponent automatycznie wybiera semantyczny element HTML na podstawie wariantu:

| Wariant           | Element domyślny | Semantyka                    |
| :---------------- | :--------------- | :--------------------------- |
| `display-*`       | `h1`             | Główne nagłówki strony       |
| `headline-large`  | `h1`             | Nagłówki najwyższego poziomu |
| `headline-medium` | `h2`             | Nagłówki sekcji              |
| `headline-small`  | `h3`             | Nagłówki podsekcji           |
| `title-large`     | `h2`             | Tytuły kart/komponentów      |
| `title-medium`    | `h3`             | Tytuły formularzy            |
| `title-small`     | `h4`             | Tytuły elementów             |
| `body-*`          | `p`              | Tekst podstawowy, paragrafy  |
| `label-*`         | `span`           | Etykiety, interfejs          |

## Stylowanie i theming

### CSS Custom Properties

Komponent wykorzystuje zmienne CSS z systemu motywów Aurora UI:

```scss
// Kolory typografii (automatycznie zarządzane)
--color-on-surface          // Główny kolor tekstu
--color-on-surface-variant  // Kolor tekstu drugorzędnego
--color-primary             // Kolor akcentujący
--color-error               // Kolor błędów
--color-success             // Kolor sukcesów

// Typografia Material Design 3
--font-display-large-size: 57px;
--font-display-large-line-height: 64px;
--font-display-large-weight: 400;

--font-headline-medium-size: 28px;
--font-headline-medium-line-height: 36px;
--font-headline-medium-weight: 400;

--font-body-medium-size: 14px;
--font-body-medium-line-height: 20px;
--font-body-medium-weight: 400;

// ... pozostałe warianty typografii
```

### Nadpisywanie stylów

```tsx
// Style inline
<Text style={{ fontSize: '18px', letterSpacing: '0.5px' }}>
  Niestandardowy tekst
</Text>

// Klasy CSS
<Text className="custom-text">Tekst z niestandardową klasą</Text>

// CSS Modules
import styles from './MyComponent.module.scss';
<Text className={styles.specialText}>Tekst ze stylami</Text>
```

### Responsywność

```scss
// Automatyczna responsywność w CSS
.custom-text {
  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (min-width: 1200px) {
    font-size: 18px;
  }
}
```

## Dostępność (A11y)

### WCAG 2.1 AA Compliance

- ✅ **Kontrast**: Automatyczne zarządzanie kontrastem kolorów (minimum 4.5:1)
- ✅ **Semantyka**: Automatyczne mapowanie na semantyczne elementy HTML
- ✅ **Screen readers**: Pełne wsparcie dla czytników ekranu
- ✅ **Keyboard navigation**: Naturalna nawigacja klawiaturą

### Dobre praktyki

```tsx
// ✅ POPRAWNIE - semantyczne nagłówki
<Text variant="headline-medium">Główny nagłówek</Text>
<Text variant="title-small">Podtytuł sekcji</Text>

// ✅ POPRAWNIE - etykiety formularzy
<Text variant="label-medium" as="label" htmlFor="username">
  Nazwa użytkownika
</Text>

// ✅ POPRAWNIE - automatyczny kontrast
<Text color="primary" autoContrast>
  Tekst z gwarantowanym kontrastem
</Text>

// ❌ BŁĘDNIE - niewłaściwa hierarchia nagłówków
<Text variant="headline-large">H1</Text>
<Text variant="title-small">H4 - pomija H2 i H3</Text>

// ✅ POPRAWNIE - właściwa hierarchia
<Text variant="headline-large">H1</Text>
<Text variant="headline-medium">H2</Text>
<Text variant="headline-small">H3</Text>
```

### Testowanie dostępności

```tsx
import { render, screen } from '@testing-library/preact';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Text component meets accessibility standards', async () => {
  const { container } = render(<Text variant="headline-medium">Accessible heading</Text>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Wzorce testowania

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('Text Component', () => {
  it('renders text content correctly', () => {
    render(<Text>Hello Aurora UI</Text>);
    expect(screen.getByText('Hello Aurora UI')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<Text variant="headline-large">Heading</Text>);
    const element = screen.getByText('Heading');
    expect(element).toHaveClass('text--headline-large');
  });

  it('renders as specified HTML element', () => {
    render(
      <Text as="h2" variant="body-medium">
        Custom heading
      </Text>,
    );
    const element = screen.getByRole('heading', { level: 2 });
    expect(element).toBeInTheDocument();
  });
});
```

### Testy kolorów i motywu

```tsx
it('applies theme colors correctly', () => {
  render(<Text color="primary">Primary text</Text>);
  const element = screen.getByText('Primary text');
  expect(element).toHaveAttribute('data-color', 'primary');
});

it('applies automatic contrast', () => {
  render(
    <Text color="primary" autoContrast>
      Contrast text
    </Text>,
  );
  const element = screen.getByText('Contrast text');
  expect(element).toHaveAttribute('data-auto-contrast', 'true');
});
```

### Testy polimorfizmu

```tsx
it('renders as different HTML elements', () => {
  const { rerender } = render(<Text as="span">Span text</Text>);
  expect(screen.getByText('Span text').tagName).toBe('SPAN');

  rerender(<Text as="div">Div text</Text>);
  expect(screen.getByText('Div text').tagName).toBe('DIV');
});
```

## Integracja z innymi komponentami

### Z Card i Button

```tsx
import { Card, Button, Text } from 'preact-aurora-ui';

function ProductCard({ product }) {
  return (
    <Card>
      <Text variant="title-medium">{product.name}</Text>
      <Text variant="body-small" color="on-surface-variant">
        {product.description}
      </Text>
      <Button variant="filled">
        <Text variant="label-large">Dodaj do koszyka</Text>
      </Button>
    </Card>
  );
}
```

### Z formularzami

```tsx
import { TextField, Text } from 'preact-aurora-ui';

function FormField({ label, error, children }) {
  return (
    <div>
      <Text variant="label-medium" as="label">
        {label}
      </Text>
      {children}
      {error && (
        <Text variant="body-small" color="error">
          {error}
        </Text>
      )}
    </div>
  );
}
```

## FAQ

**Q: Kiedy używać `variant` a kiedy `size`?**
A: Używaj `variant` dla semantyki i hierarchii (headline, title, body). Używaj `size` tylko do drobnych korekt rozmiaru bez zmiany semantyki.

**Q: Czy mogę używać niestandardowych kolorów?**
A: Tak, ale zalecamy kolory z palety motywu dla spójności. Niestandardowe kolory można przekazać przez `style` lub `className`.

**Q: Jak działa automatyczne mapowanie na elementy HTML?**
A: Komponent automatycznie wybiera semantyczny element (h1, h2, p, span) na podstawie wariantu typografii zgodnie z hierarchią MD3.

**Q: Czy komponent obsługuje RTL (right-to-left)?**
A: Tak, komponent automatycznie dostosowuje się do kierunku tekstu ustawionego w dokumencie HTML.

**Q: Jak przetestować automatyczne zarządzanie kolorami?**
A: Użyj data-attributes (`data-color`, `data-auto-contrast`) do sprawdzenia w testach, ponieważ rzeczywiste kolory zależą od motywu.

---

**Wersja:** v0.0.13  
**Dokumentacja:** [GitHub](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/Text)  
**Storybook:** [Text Stories](https://aurora-ui-storybook.vercel.app/?path=/story/components-text--default)
<Text variant="body-small" color="success">
Operacja zakończona sukcesem
</Text>
)}
{error && (
<Text variant="body-small" color="error">
Wystąpił błąd: {error}
</Text>
)}
</div>
);
}

```
// Renderowanie jako różne elementy
<Text as="h1" variant="display-large">Nagłówek H1</Text>
<Text as="p" variant="body-medium">Paragraf</Text>
<Text as="span" variant="label-small">Span</Text>
<Text as="strong" variant="body-large">Pogrubiony tekst</Text>
```

## 🔧 API

### Props

| Prop           | Typ                 | Domyślna wartość | Opis                               |
| -------------- | ------------------- | ---------------- | ---------------------------------- |
| `variant`      | `TypographyVariant` | `'body-medium'`  | Wariant typograficzny MD3          |
| `color`        | `ThemeColor`        | `undefined`      | Kolor tekstu z palety motywu       |
| `autoContrast` | `boolean`           | `false`          | Automatyczne dopasowanie kontrastu |
| `as`           | `ElementType`       | `'span'`         | Element HTML do renderowania       |
| `className`    | `string`            | `undefined`      | Dodatkowe klasy CSS                |
| `children`     | `ComponentChildren` | -                | Zawartość tekstowa                 |

### TypographyVariant

```typescript
type TypographyVariant =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small';
```

### ThemeColor

```typescript
type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'surface'
  | 'background'
  | 'on-primary'
  | 'on-secondary'
  | 'on-surface';
```

## 🎨 Style i theming

### CSS Custom Properties

Komponent wykorzystuje następujące zmienne CSS:

```css
/* Typografia */
--font-display-large-size: 57px;
--font-display-large-weight: 400;
--font-headline-medium-size: 28px;
--font-body-medium-size: 14px;

/* Kolory */
--color-primary: #6750a4;
--color-on-surface: #1d1b20;
--color-surface: #fffbfe;
```

### Dostosowywanie

```scss
// Nadpisanie lokalnych zmiennych
.custom-text {
  --font-body-medium-size: 16px;
  --color-primary: #custom-color;
}
```

## ♿ Accessibility

- **Semantyczne znaczniki**: Automatyczne używanie odpowiednich tagów HTML
- **Screen reader support**: Poprawne etykiety i opisy
- **Kontrast kolorów**: Automatyczne sprawdzanie kontrastu z `autoContrast`
- **Focus management**: Właściwe zarządzanie focusem dla interaktywnych elementów

## 🧪 Testowanie

```tsx
import { render, screen } from '@testing-library/preact';
import { Text } from './Text';

test('renders text content', () => {
  render(<Text>Hello World</Text>);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});

test('applies correct variant class', () => {
  render(<Text variant="headline-large">Title</Text>);
  const element = screen.getByText('Title');
  expect(element).toHaveClass('headline-large');
});

test('renders as specified element', () => {
  render(<Text as="h1">Heading</Text>);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
```

## 📊 Storybook

Interaktywne przykłady dostępne w Storybooku:

[Zobacz w Storybooku](https://prachwal.github.io/preact-aurora-ui/?path=/story/components-text--default)

## ❓ FAQ

**P: Czy można łączyć różne warianty w jednym komponencie?**  
O: Nie, każdy komponent Text reprezentuje jeden wariant typograficzny. Dla złożonych tekstów użyj wielu komponentów.

**P: Jak działa autoContrast?**  
O: Automatycznie analizuje kolor tła i dobiera odpowiedni kolor tekstu dla zapewnienia czytelności.

**P: Czy komponent wspiera rich text?**  
O: Komponent jest przeznaczony dla prostego tekstu. Dla rich text użyj kompozycji komponentów.

## 🤝 Wkład

Chcesz pomóc w rozwoju? Zobacz [przewodnik kontrybutora](../../../docs/CONTRIBUTING.md).

## 📄 Licencja

MIT License - zobacz [LICENSE](../../../LICENSE) dla szczegółów.
