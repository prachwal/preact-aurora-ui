# System Themingu

System themingu w Aurora UI jest oparty na CSS Custom Properties, co zapewnia maksymalną elastyczność i dynamiczne zmiany motywów bez potrzeby przeładowywania strony.

## 🎨 Zmienne CSS

- **Globalne Zmienne:** Zdefiniowane w `src/styles/` (np. `colors.scss`, `typography.scss`). Definiują podstawową paletę kolorów, skalę typograficzną, odstępy itp.
- **Lokalne Zmienne:** Każdy komponent definiuje swoje własne zmienne SCSS, które pobierają wartości z globalnych custom properties. Pozwala to na łatwe nadpisywanie stylów na poziomie komponentu.

### Przykład

```scss
// src/components/Button/Button.module.scss
@use '../../styles/colors.scss' as *;

$button-bg: var(--color-primary); // Użycie globalnej zmiennej

.button {
  background-color: $button-bg;
}
```

## 🌗 Motyw Jasny i Ciemny

Zmiana motywu odbywa się przez nadpisanie globalnych custom properties na selektorze `[data-theme='dark']`. Komponent `ThemeProvider` automatycznie zarządza tym atrybutem.

## `useThemeColors` Hook

Hook `useThemeColors` dostarcza deweloperom dostęp do pełnej palety kolorów z motywu, co ułatwia dynamiczne stylowanie komponentów w kodzie TypeScript.

## `ThemeProvider`

Komponent `ThemeProvider` jest kluczowym elementem systemu. Odpowiada za:

- Wstrzykiwanie globalnych stylów.
- Zarządzanie atrybutem `data-theme`.
- Opcjonalne generowanie klas pomocniczych (utility classes).
