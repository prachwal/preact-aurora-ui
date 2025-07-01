# Badge

Komponent `Badge` służy do wyświetlania wskaźników statusu, powiadomień i liczników, zgodnie ze specyfikacją Material Design 3. Jest wszechstronny i łatwy do zintegrowania z innymi komponentami.

## Przykłady użycia

### 1. Badge jako wskaźnik (Dot)

Najprostszy wariant, idealny do sygnalizowania statusu lub nowych, nieprzeczytanych powiadomień bez pokazywania konkretnej liczby.

```tsx
import { Badge, BadgeWrapper } from 'preact-aurora-ui';
import { Icon } from '../Icon'; // Załóżmy, że mamy komponent ikony

// Przykład z ikoną powiadomień
<BadgeWrapper>
  <Icon name="notifications" />
  <Badge variant="dot" color="error" />
</BadgeWrapper>

// Przykład w menu nawigacyjnym
<a href="/messages">
  Wiadomości
  <Badge variant="dot" color="primary" style={{ marginLeft: '8px' }} />
</a>
```

### 2. Badge numeryczny (Numeric)

Służy do wyświetlania konkretnej liczby, np. liczby nowych wiadomości, produktów w koszyku czy zadań do wykonania.

```tsx
import { Badge, BadgeWrapper } from 'preact-aurora-ui';
import { Button } from '../Button';

// Liczba produktów w koszyku
<BadgeWrapper>
  <Icon name="shopping_cart" />
  <Badge variant="numeric" count={5} />
</BadgeWrapper>

// Powiadomienia z limitem
<BadgeWrapper>
  <Button>Powiadomienia</Button>
  <Badge variant="numeric" count={120} max={99} color="error" />
</BadgeWrapper>

// Pokazywanie zera (np. w filtrach)
<BadgeWrapper>
  <span>Filtry aktywne</span>
  <Badge variant="numeric" count={0} showZero />
</BadgeWrapper>
```

### 3. Badge statusowy (Status)

Wyświetla krótki tekst lub ikonę, aby opisać status obiektu, np. "online", "offline", "weryfikacja".

```tsx
import { Badge } from 'preact-aurora-ui';

// Status użytkownika
<div>
  <span>Jan Kowalski</span>
  <Badge variant="status" content="online" color="success" />
</div>

// Status zadania
<div>
  <span>Zadanie #123</span>
  <Badge variant="status" content="W trakcie" color="info" />
</div>
```

## API

| Prop        | Typ                                                | Domyślnie     | Opis                                                                                     |
| ----------- | -------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| `variant`   | `'dot'`, `'numeric'`, `'status'`                   | `'dot'`       | Określa wariant badge.                                                                   |
| `color`     | `'primary'`, `'secondary'`, `'error'`, ...         | `'primary'`   | Kolor badge.                                                                             |
| `position`  | `'top-right'`, `'top-left'`, `'bottom-right'`, ... | `'top-right'` | Pozycja względem elementu w `BadgeWrapper`.                                              |
| `size`      | `'small'`, `'medium'`, `'large'`                   | `'medium'`    | Rozmiar badge.                                                                           |
| `visible`   | `boolean`                                          | `true`        | Czy badge jest widoczny.                                                                 |
| `animated`  | `boolean`                                          | `true`        | Czy animować pojawianie się i znikanie.                                                  |
| `count`     | `number`                                           | -             | **Wymagane dla `variant="numeric"`**. Liczba do wyświetlenia.                            |
| `max`       | `number`                                           | `99`          | **Dla `variant="numeric"`**. Maksymalna wartość, powyżej której wyświetlane jest `max+`. |
| `showZero`  | `boolean`                                          | `false`       | **Dla `variant="numeric"`**. Czy pokazywać badge, gdy `count` jest `0`.                  |
| `content`   | `ComponentChildren`                                | -             | **Wymagane dla `variant="status"`**. Zawartość do wyświetlenia (tekst, ikona).           |
| `ariaLabel` | `string`                                           | (generowany)  | Etykieta ARIA dla dostępności. Domyślnie generowana na podstawie wariantu i zawartości.  |
| `className` | `string`                                           | `''`          | Dodatkowe klasy CSS.                                                                     |
| `style`     | `JSX.CSSProperties`                                | `{}`          | Style inline.                                                                            |
| `testId`    | `string`                                           | `''`          | ID do celów testowych.                                                                   |

## Dostępność (Accessibility)

- `Badge` z wariantem `dot` ma `role="status"`.
- Pozostałe warianty mają `role="img"` (jako że wizualnie przekazują informację).
- Etykiety `aria-label` są generowane automatycznie, aby zapewnić kontekst dla czytników ekranu, np. "Nowe powiadomienie" dla wariantu `dot` lub "5 powiadomień" dla `numeric`. Można je nadpisać za pomocą propa `ariaLabel`.

## Stylowanie

Badge wykorzystuje CSS Custom Properties z systemu Material Design 3:

- Kolory automatycznie dostosowują się do motywu (jasny/ciemny)
- Wsparcie dla reduced motion
- Responsywne rozmiary i pozycjonowanie

See [`Badge.test.tsx`](./Badge.test.tsx) for unit tests.

## Storybook

[Link to Storybook story] (Coming soon)

## FAQ

**Q: How do I change the badge's color?**  
A: Use the `color` prop or override the CSS custom properties in your application's CSS or theme.

**Q: How do I display a badge without a number?**  
A: Use the `variant="dot"` prop.

## Contribution

Contributions are welcome! Please follow the contribution guidelines.

## License

MIT
