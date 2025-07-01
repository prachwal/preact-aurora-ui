# Text

Uniwersalny komponent tekstowy z pełnym wsparciem dla systemu typografii Material Design 3 i automatycznym zarządzaniem kolorami.

## 🎯 Kluczowe cechy

- **Pełna typografia MD3** - wszystkie warianty tekstowe zgodne z Material Design 3
- **Automatyczne zarządzanie kolorami** - inteligentne dopasowanie kontrastu tekstu do tła
- **Polimorficzny komponent** - możliwość renderowania jako dowolny element HTML
- **TypeScript support** - pełne wsparcie typów dla wszystkich props
- **Accessibility first** - semantyczne znaczniki i wsparcie dla screen readerów

## 📖 Przykłady użycia

### Podstawowe warianty

```tsx
import { Text } from 'preact-aurora-ui';

// Nagłówki
<Text variant="display-large">Duży wyświetlacz</Text>
<Text variant="headline-medium">Średni nagłówek</Text>
<Text variant="title-small">Mały tytuł</Text>

// Tekst podstawowy
<Text variant="body-large">Duży tekst podstawowy</Text>
<Text variant="body-medium">Średni tekst podstawowy</Text>
<Text variant="body-small">Mały tekst podstawowy</Text>

// Etykiety
<Text variant="label-large">Duża etykieta</Text>
<Text variant="label-medium">Średnia etykieta</Text>
<Text variant="label-small">Mała etykieta</Text>
```

### Zarządzanie kolorami

```tsx
// Kolory z palety motywu
<Text color="primary">Tekst podstawowy</Text>
<Text color="secondary">Tekst drugorzędny</Text>
<Text color="error">Tekst błędu</Text>

// Automatyczny kontrast
<Text autoContrast>Automatyczne dopasowanie koloru</Text>
```

### Polimorficzny komponent

```tsx
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
