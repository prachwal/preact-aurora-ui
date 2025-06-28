# Plan implementacji: Layout Dashboard Component

## Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego i w pełni responsywnego komponentu głównego układu (Layout) dla całego dashboardu.
- Zapewnienie spójnego układu wizualnego dla wszystkich widoków aplikacji, niezależnie od urządzenia i rozmiaru ekranu.
- Umożliwienie pełnej kontroli nad kompozycją podkomponentów poprzez system slotów (children).
- Zapewnienie wysokiej dostępności (WCAG) i optymalnej wydajności renderowania.

### Architektura komponentu

```
Layout/
├── Layout.tsx           # Główny komponent
├── Layout.module.scss   # Style modułowe (SCSS Modules)
├── Layout.test.tsx      # Testy jednostkowe
├── Layout.stories.tsx   # Storybook
├── index.ts             # Eksport publiczny
// (opcjonalnie) types.ts, hooks/
```

## Szczegółowa checklista implementacji

### 1. Przygotowanie struktury projektu

- [x] Utwórz folder `src/components/Layout/`.
- [x] Sprawdź potencjalne konflikty nazw z istniejącymi komponentami.

### 2. Implementacja głównego komponentu (`Layout.tsx`)

- [x] Import zależności: `ComponentChildren`, `JSX` z Preact, style modułowe.
- [x] Zdefiniuj interfejs `LayoutProps`:
  ```ts
  interface LayoutProps {
    children: ComponentChildren;
    className?: string;
    style?: JSX.CSSProperties;
    direction?: "horizontal" | "vertical";
    fullHeight?: boolean;
  }
  ```
- [x] Domyślna klasa CSS dla głównego kontenera (np. `layout`).
- [x] Przekazywanie dodatkowych props (`className`, `style`).
- [x] Obsługa propsów `direction` i `fullHeight` (flex row/column, min-height).
- [x] Renderowanie children w kontenerze.
- [x] Komponent nie zarządza slotami Header/Sidebar/Footer – to zadanie Layoutu wyższego poziomu.
- [x] Użycie semantycznego `<div>` jako kontenera.
- [x] Komponent nie obsługuje stanu (stateless, prosty layout).
- [x] Komentarze i typowanie zgodne z projektem.

### 3. Styling i responsywność (`Layout.module.scss`)

- [x] Importy SCSS:
  ```scss
  @use "../styles/colors.scss" as *;
  @use "../styles/spacing.scss" as *;
  @use "../styles/typography.scss" as *;
  @use "../styles/breakpoints.scss" as *;
  ```
- [x] Definicja lokalnych zmiennych:
  ```scss
  $layout-bg: var(--color-background);
  $layout-padding: $spacing-lg;
  $layout-gap: $spacing-md;
  ```
- [x] Flexbox jako główny mechanizm układu.
- [x] Klasy: `.layout`, `.layout--horizontal`, `.layout--vertical`, `.layout--fullHeight`.
- [x] Responsywność: media queries dla padding/gap na mobile.
- [x] Theme support: custom properties.

### 4. Testy jednostkowe (`Layout.test.tsx`)

- [x] Renderowanie Layoutu z children.
- [x] Sprawdzenie klas CSS i struktury DOM.
- [x] Test przekazywania propsów `className`, `style`.
- [x] Test obsługi `direction` i `fullHeight`.

### 5. Storybook (`Layout.stories.tsx`)

- [x] Story z podstawowym układem (Header, Content, Footer jako children).
- [x] Warianty: horizontal, vertical, custom class/style.

### 6. Eksport (`index.ts`)

- [x] Eksportuj Layout z folderu.
- [x] Eksportuj typy (jeśli w osobnym pliku).

### 7. Manualne testy integracyjne

- [x] Integracja z Header, Sidebar, Content, Footer w aplikacji (przykłady w Storybooku).
- [x] Testy na różnych przeglądarkach i urządzeniach.
- [x] Testy nadpisywania stylów przez propsy.

### Opcjonalne rozszerzenia

- [ ] Rozbudowa o sloty Header/Sidebar/Footer, obsługa stanu, hooki, typy w osobnym pliku – jeśli projekt tego wymaga.

---

## Uwagi końcowe

- Importy SCSS zawsze powinny być względne względem folderu komponentu.
- Priorytet: prostota, funkcjonalność, zgodność z projektem.
- Testuj na prawdziwych urządzeniach mobilnych.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
