# TextField

Zaawansowany komponent pola tekstowego zgodny z Material Design 3, oferujący trzy warianty wizualne, pełne wsparcie dla walidacji, ikon, multiline oraz automatyczne zarządzanie stanem fokusa i błędów.

## Opis

`TextField` to uniwersalny komponent do wprowadzania tekstu, obsługujący wszystkie standardowe typy inputów HTML oraz textarea dla dłuższych tekstów. Komponent automatycznie zarządza stanem fokusa, walidacją, liczeniem znaków oraz zapewnia pełną dostępność. Oferuje trzy warianty Material Design 3: filled, outlined i standard.

## Przykłady użycia

### 1. Podstawowe warianty Material Design 3

Trzy główne style pól tekstowych z różnymi zastosowaniami.

```tsx
import { TextField } from 'preact-aurora-ui';

// Filled - preferowany wariant MD3, mocny visual weight
<TextField
  variant="filled"
  label="Imię i nazwisko"
  placeholder="Wprowadź swoje imię"
/>

// Outlined - drugi najczęściej używany, dobry kontrast
<TextField
  variant="outlined"
  label="Email"
  type="email"
  placeholder="twoj@email.com"
/>

// Standard - minimalistyczny, dla prostych form
<TextField
  variant="standard"
  label="Hasło"
  type="password"
/>
```

### 2. Rozmiary i szerokość

Trzy rozmiary plus opcja pełnej szerokości dla różnych layoutów.

```tsx
// Rozmiary
<TextField size="small" label="Małe pole" />
<TextField size="medium" label="Średnie pole" />  {/* domyślne */}
<TextField size="large" label="Duże pole" />

// Pełna szerokość - dostosowuje się do kontenera
<TextField
  fullWidth
  label="Adres zamieszkania"
  placeholder="Ulica, numer domu, miasto"
/>
```

### 3. Stany walidacji i komunikaty

Obsługa błędów, komunikatów pomocniczych i wymaganych pól.

```tsx
// Pole wymagane
<TextField
  required
  label="Email"
  type="email"
  helperText="Adres email jest wymagany do rejestracji"
/>

// Stan błędu z komunikatem
<TextField
  error
  label="Hasło"
  type="password"
  helperText="Hasło musi mieć co najmniej 8 znaków"
  value={password}
  onChange={handlePasswordChange}
/>

// Pole tylko do odczytu
<TextField
  readOnly
  label="ID użytkownika"
  value={userId}
  helperText="To pole nie może być edytowane"
/>

// Pole wyłączone
<TextField
  disabled
  label="Niedostępne pole"
  value="Wartość systemowa"
/>
```

### 4. Ikony i akcje

Ikony na początku, końcu oraz funkcja czyszczenia pola.

```tsx
// Ikona na początku
<TextField
  label="Wyszukaj"
  startIcon="🔍"
  placeholder="Wpisz frazę do wyszukania"
/>

// Ikona na końcu
<TextField
  label="Kwota"
  endIcon="PLN"
  type="number"
  placeholder="0.00"
/>

// Przycisk czyszczenia (clearable)
<TextField
  label="Tekst z możliwością czyszczenia"
  clearable
  onClear={() => setValue('')}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Kombinacja ikon i przycisków
<TextField
  label="Hasło"
  type={showPassword ? 'text' : 'password'}
  startIcon="🔒"
  endIcon={
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? '👁️' : '👁️‍🗨️'}
    </button>
  }
/>
```

### 5. Różne typy inputów

Wsparcie dla wszystkich standardowych typów HTML input.

```tsx
// Typy podstawowe
<TextField type="text" label="Tekst" />
<TextField type="email" label="Email" />
<TextField type="password" label="Hasło" />
<TextField type="url" label="Strona WWW" />
<TextField type="tel" label="Telefon" />

// Typ numeryczny z walidacją
<TextField
  type="number"
  label="Wiek"
  min={18}
  max={120}
  helperText="Podaj wiek od 18 do 120 lat"
/>

// Pole wyszukiwania
<TextField
  type="search"
  label="Wyszukaj produkty"
  clearable
  startIcon="🔍"
/>
```

### 6. Obszar tekstowy (multiline)

Obsługa dłuższych tekstów z automatycznym dostosowaniem wysokości.

```tsx
// Podstawowy textarea
<TextField
  multiline
  label="Opis"
  placeholder="Opisz swoje doświadczenie..."
  rows={4}
/>

// Dynamiczna wysokość
<TextField
  multiline
  label="Komentarz"
  minRows={2}
  maxRows={8}
  placeholder="Twój komentarz będzie automatycznie rozszerzał pole..."
/>

// Textarea z liczeniem znaków
<TextField
  multiline
  label="Recenzja produktu"
  maxLength={500}
  showCharacterCount
  helperText="Podziel się swoją opinią o produkcie"
  rows={6}
/>
```

### 7. Walidacja i liczenie znaków

Kontrola długości tekstu i wizualizacja limitów.

```tsx
// Liczenie znaków bez limitu
<TextField
  label="Tytuł"
  showCharacterCount
  helperText="Podaj krótki i opisowy tytuł"
/>

// Z limitem znaków
<TextField
  label="Tweet"
  maxLength={280}
  showCharacterCount
  helperText="Maksymalnie 280 znaków"
  multiline
  rows={3}
/>

// Walidacja w czasie rzeczywistym
function ValidatedTextField() {
  const [value, setValue] = useState('');
  const isValid = value.length >= 3;

  return (
    <TextField
      label="Nazwa użytkownika"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={value.length > 0 && !isValid}
      helperText={
        value.length === 0
          ? "Wprowadź nazwę użytkownika"
          : isValid
          ? "Nazwa jest dostępna"
          : "Nazwa musi mieć co najmniej 3 znaki"
      }
      showCharacterCount
      maxLength={20}
    />
  );
}
```

### 8. Przykłady w kontekście formularzy

Praktyczne zastosowania w rzeczywistych formularzach.

```tsx
// Formularz logowania
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        type="email"
        label="Adres email"
        placeholder="twoj@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email || 'Wprowadź swój adres email'}
        required
        startIcon="📧"
      />

      <TextField
        fullWidth
        type="password"
        label="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password || 'Wprowadź swoje hasło'}
        required
        startIcon="🔒"
      />

      <button type="submit">Zaloguj się</button>
    </form>
  );
}

// Formularz kontaktowy
function ContactForm() {
  return (
    <form>
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
        <TextField label="Imię" required placeholder="Jan" />
        <TextField label="Nazwisko" required placeholder="Kowalski" />
      </div>

      <TextField fullWidth type="email" label="Email" required startIcon="📧" />

      <TextField fullWidth label="Temat" placeholder="Krótki opis sprawy" />

      <TextField
        fullWidth
        multiline
        label="Wiadomość"
        placeholder="Opisz szczegółowo swoją sprawę..."
        rows={6}
        maxLength={1000}
        showCharacterCount
        required
      />
    </form>
  );
}

// Wyszukiwarka z filtrem
function SearchWithFilter() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <TextField
        type="search"
        label="Wyszukaj"
        placeholder="Nazwa produktu, kategoria..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        clearable
        onClear={() => setQuery('')}
        startIcon="🔍"
        style={{ flex: 2 }}
      />

      <TextField
        label="Filtr"
        placeholder="Kategoria"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ flex: 1 }}
      />
    </div>
  );
}
```

## API

| Prop                  | Typ                                                                         | Domyślnie    | Opis                                             |
| :-------------------- | :-------------------------------------------------------------------------- | :----------- | :----------------------------------------------- |
| `label`               | `string`                                                                    | `undefined`  | Etykieta pola (wyświetlana nad inputem)          |
| `helperText`          | `string`                                                                    | `undefined`  | Tekst pomocniczy pod polem (instrukcje lub błąd) |
| `placeholder`         | `string`                                                                    | `undefined`  | Tekst zastępczy w pustym polu                    |
| `value`               | `string`                                                                    | `undefined`  | Kontrolowana wartość pola                        |
| `defaultValue`        | `string`                                                                    | `undefined`  | Początkowa wartość dla niekontrolowanego pola    |
| **Wygląd i warianty** |                                                                             |              |                                                  |
| `variant`             | `'filled' \| 'outlined' \| 'standard'`                                      | `'outlined'` | Wariant wizualny zgodny z Material Design 3      |
| `size`                | `'small' \| 'medium' \| 'large'`                                            | `'medium'`   | Rozmiar pola                                     |
| `fullWidth`           | `boolean`                                                                   | `false`      | Pole zajmuje całą dostępną szerokość             |
| `multiline`           | `boolean`                                                                   | `false`      | Renderuje jako textarea zamiast input            |
| `rows`                | `number`                                                                    | `undefined`  | Stała liczba wierszy (tylko multiline)           |
| `minRows`             | `number`                                                                    | `undefined`  | Minimalna liczba wierszy (tylko multiline)       |
| `maxRows`             | `number`                                                                    | `undefined`  | Maksymalna liczba wierszy (tylko multiline)      |
| **Stany**             |                                                                             |              |                                                  |
| `disabled`            | `boolean`                                                                   | `false`      | Pole jest wyłączone                              |
| `error`               | `boolean`                                                                   | `false`      | Stan błędu (czerwone obramowanie i tekst)        |
| `required`            | `boolean`                                                                   | `false`      | Pole jest wymagane (dodaje gwiazdkę)             |
| `readOnly`            | `boolean`                                                                   | `false`      | Pole tylko do odczytu                            |
| **Ikony i akcje**     |                                                                             |              |                                                  |
| `startIcon`           | `ComponentChildren`                                                         | `undefined`  | Ikona na początku pola                           |
| `endIcon`             | `ComponentChildren`                                                         | `undefined`  | Ikona na końcu pola                              |
| `clearable`           | `boolean`                                                                   | `false`      | Pokazuje przycisk X do czyszczenia pola          |
| **Walidacja**         |                                                                             |              |                                                  |
| `maxLength`           | `number`                                                                    | `undefined`  | Maksymalna liczba znaków                         |
| `showCharacterCount`  | `boolean`                                                                   | `false`      | Pokazuje licznik znaków                          |
| **Typy input**        |                                                                             |              |                                                  |
| `type`                | `'text' \| 'email' \| 'password' \| 'url' \| 'tel' \| 'search' \| 'number'` | `'text'`     | Typ HTML input                                   |
| **Eventy**            |                                                                             |              |                                                  |
| `onClear`             | `() => void`                                                                | `undefined`  | Callback przy kliknięciu przycisku czyszczenia   |
| `onFocus`             | `(event: FocusEvent) => void`                                               | `undefined`  | Callback przy uzyskaniu fokusa                   |
| `onBlur`              | `(event: FocusEvent) => void`                                               | `undefined`  | Callback przy utracie fokusa                     |
| `onChange`            | `(event: Event) => void`                                                    | `undefined`  | Callback przy zmianie wartości                   |
| `onInput`             | `(event: InputEvent) => void`                                               | `undefined`  | Callback przy każdym wprowadzeniu znaku          |
| **Dostępność**        |                                                                             |              |                                                  |
| `aria-label`          | `string`                                                                    | `undefined`  | Alternatywna etykieta dla screen readerów        |
| `aria-describedby`    | `string`                                                                    | `undefined`  | ID elementu opisującego pole                     |
| `aria-labelledby`     | `string`                                                                    | `undefined`  | ID elementu będącego etykietą                    |
| **Inne**              |                                                                             |              |                                                  |
| `className`           | `string`                                                                    | `''`         | Dodatkowe klasy CSS                              |
| `id`                  | `string`                                                                    | _auto_       | ID elementu (auto-generowane jeśli nie podane)   |

**Dziedziczone props:** Wszystkie standardowe props HTML dla `<input>` i `<textarea>` (gdzie applicable).

## Stylowanie i theming

### CSS Custom Properties

Komponent wykorzystuje zmienne CSS z systemu motywów Aurora UI:

```scss
// Kolory pól tekstowych
--color-surface              // Tło pola
--color-on-surface           // Tekst w polu
--color-on-surface-variant   // Etykiety i placeholder
--color-outline              // Obramowanie nieaktywne
--color-outline-variant      // Obramowanie hover
--color-primary              // Obramowanie fokus i kursor
--color-error                // Kolor błędu

// Stany interaktywne
--color-primary-container    // Tło filled hover
--color-surface-variant      // Tło filled
--color-on-primary-container // Tekst filled

// Typografia
--font-body-large-size: 16px;
--font-body-medium-size: 14px;
--font-body-small-size: 12px;
--font-label-medium-weight: 500;

// Spacing i rozmiary
--space-xs: 4px;     // Padding wewnętrzny
--space-sm: 8px;     // Marginesy
--space-md: 12px;    // Wysokość pola
--space-lg: 16px;    // Padding większy
```

### Warianty Material Design 3

```scss
// Filled - preferowany wariant MD3
.textfield--filled {
  background-color: var(--color-surface-variant);
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid var(--color-outline);

  &:hover {
    background-color: var(--color-primary-container);
  }

  &:focus-within {
    border-bottom-color: var(--color-primary);
    border-bottom-width: 2px;
  }
}

// Outlined - drugi najczęściej używany
.textfield--outlined {
  border: 1px solid var(--color-outline);
  border-radius: 4px;

  &:hover {
    border-color: var(--color-outline-variant);
  }

  &:focus-within {
    border-color: var(--color-primary);
    border-width: 2px;
  }
}

// Standard - minimalistyczny
.textfield--standard {
  border-bottom: 1px solid var(--color-outline);

  &:focus-within {
    border-bottom-color: var(--color-primary);
    border-bottom-width: 2px;
  }
}
```

### Nadpisywanie stylów

```tsx
// Style inline
<TextField
  style={{
    '--color-primary': '#ff5722',
    borderRadius: '8px'
  }}
  label="Pole z niestandardowym stylem"
/>

// Klasy CSS
<TextField
  className="custom-field"
  label="Pole z klasą"
/>

// CSS Modules
import styles from './MyForm.module.scss';
<TextField
  className={styles.specialField}
  label="Pole ze stylami"
/>
```

### Responsywność

```scss
// Automatyczne dostosowanie na urządzeniach mobilnych
.textfield {
  @media (max-width: 768px) {
    font-size: 16px; // Zapobiega zoom na iOS
  }

  @media (min-width: 1200px) {
    --space-lg: 20px; // Większy padding na desktop
  }
}

// Full width na mobile
@media (max-width: 768px) {
  .textfield {
    width: 100%;
  }
}
```

## Dostępność (A11y)

### WCAG 2.1 AA Compliance

- ✅ **Kontrast**: Wszystkie kolory spełniają wymagania kontrastu 4.5:1
- ✅ **Focus management**: Widoczne focus ring, prawidłowy focus order
- ✅ **Keyboard navigation**: Pełna obsługa klawiatury (Tab, Shift+Tab, Enter, Escape)
- ✅ **Screen readers**: Automatyczne aria-labels, live regions dla błędów
- ✅ **Labels**: Automatyczne powiązanie etykiet z polami

### Wymagania implementacyjne

```tsx
// ✅ POPRAWNIE - pole z etykietą i opisem
<TextField
  label="Email"
  helperText="Wprowadź swój adres email"
  required
  type="email"
/>

// ✅ POPRAWNIE - pole z walidacją
<TextField
  label="Hasło"
  type="password"
  error={hasError}
  helperText={error || "Minimum 8 znaków"}
  aria-describedby="password-requirements"
/>

// ✅ POPRAWNIE - pole z custom aria-label
<TextField
  aria-label="Wyszukaj produkty"
  placeholder="Nazwa produktu..."
  type="search"
/>

// ❌ BŁĘDNIE - brak etykiety
<TextField placeholder="Email" />

// ❌ BŁĘDNIE - nieokreślony typ dla hasła
<TextField label="Hasło" type="text" />
```

### Automatyczne features

```tsx
// Automatycznie dodane atrybuty:
<TextField label="Email" required error helperText="Błąd" />
// Generuje:
// id="textfield-123"
// aria-labelledby="textfield-123-label"
// aria-describedby="textfield-123-helper"
// aria-required="true"
// aria-invalid="true"
// role="textbox"
```

## Wzorce testowania

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TextField } from './TextField';

describe('TextField Component', () => {
  it('renders with label and placeholder', () => {
    render(<TextField label="Email" placeholder="Enter your email" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('handles controlled value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TextField label="Name" value="" onChange={handleChange} />);

    const input = screen.getByLabelText('Name');
    await user.type(input, 'John Doe');

    expect(handleChange).toHaveBeenCalledTimes(8); // każdy znak
  });
});
```

### Testy walidacji i stanów

```tsx
it('shows error state correctly', () => {
  render(<TextField label="Email" error helperText="Invalid email format" />);

  const input = screen.getByLabelText('Email');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByText('Invalid email format')).toBeInTheDocument();
});

it('handles required field validation', () => {
  render(<TextField label="Required Field" required />);

  const input = screen.getByLabelText(/Required Field/);
  expect(input).toHaveAttribute('aria-required', 'true');
  expect(input).toBeRequired();
});
```

### Testy interakcji

```tsx
it('calls onFocus and onBlur handlers', async () => {
  const user = userEvent.setup();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(<TextField label="Test Field" onFocus={handleFocus} onBlur={handleBlur} />);

  const input = screen.getByLabelText('Test Field');

  await user.click(input);
  expect(handleFocus).toHaveBeenCalled();

  await user.tab(); // moves focus away
  expect(handleBlur).toHaveBeenCalled();
});

it('handles clear button interaction', async () => {
  const user = userEvent.setup();
  const handleClear = vi.fn();

  render(<TextField label="Clearable Field" value="test value" clearable onClear={handleClear} />);

  const clearButton = screen.getByRole('button', { name: /clear/i });
  await user.click(clearButton);

  expect(handleClear).toHaveBeenCalled();
});
```

### Testy multiline

```tsx
it('renders as textarea when multiline', () => {
  render(<TextField label="Description" multiline rows={4} />);

  const textarea = screen.getByLabelText('Description');
  expect(textarea.tagName).toBe('TEXTAREA');
  expect(textarea).toHaveAttribute('rows', '4');
});
```

### Testy dostępności

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('meets accessibility standards', async () => {
  const { container } = render(
    <TextField label="Accessible Field" helperText="This is a helper text" required />,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Integracja z innymi komponentami

### Z Button i formularzami

```tsx
import { TextField, Button, Card } from 'preact-aurora-ui';

function LoginCard() {
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" type="email" required margin="normal" />
        <TextField fullWidth label="Password" type="password" required margin="normal" />
        <Button type="submit" variant="filled" fullWidth>
          Sign In
        </Button>
      </form>
    </Card>
  );
}
```

### Z walidacją zewnętrzną

```tsx
import { TextField } from 'preact-aurora-ui';
import { useForm } from 'react-hook-form';

function ValidatedForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message || 'Enter your email'}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />
    </form>
  );
}
```

## FAQ

**Q: Kiedy używać którego wariantu?**
A: `filled` - główne pola w formach, `outlined` - pola drugoplanowe lub w kartach, `standard` - minimalistyczne layouty.

**Q: Jak obsłużyć walidację w czasie rzeczywistym?**
A: Użyj eventów `onChange` lub `onInput` z kontrolowanym stanem i warunkowo ustaw prop `error`.

**Q: Czy można używać ikon z zewnętrznych bibliotek?**
A: Tak, `startIcon` i `endIcon` przyjmują dowolny `ComponentChildren` - komponenty ikon, SVG, tekst.

**Q: Jak zaimplementować autocomplete?**
A: Użyj standardowego atrybutu HTML `autoComplete` wraz z listą `<datalist>` lub własnym komponentem dropdown.

**Q: Czy TextField obsługuje maski input?**
A: Nie bezpośrednio, ale można zintegrować z bibliotekami jak `react-input-mask` przez forward ref.

**Q: Jak stylować placeholder dla różnych stanów?**
A: Użyj CSS selektorów `:placeholder-shown`, `:focus::placeholder` i custom properties.

---

**Wersja:** v0.0.13  
**Dokumentacja:** [GitHub](https://github.com/prachwal/preact-aurora-ui/tree/main/src/components/TextField)  
**Storybook:** [TextField Stories](https://aurora-ui-storybook.vercel.app/?path=/story/components-textfield--default)
