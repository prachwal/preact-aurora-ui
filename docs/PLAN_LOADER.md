# Plan implementacji: **Komponent Loader / Spinner**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie uniwersalnego, atrakcyjnego komponentu wskaźnika ładowania (Loader / Spinner).
- Spójny wygląd i animacje dla wskaźników ładowania w całej aplikacji.
- Obsługa różnych rozmiarów i wariantów (spinner, dots, bars).
- Wysoka dostępność (WCAG), aria-live, aria-label, optymalna wydajność animacji.
- Integracja z Card, Content, Button i innymi komponentami.

### Architektura folderu

```
Loader/
├── Loader.tsx           # Główny komponent
├── Loader.module.scss   # Style modułowe
├── Loader.test.tsx      # Testy jednostkowe
├── Loader.stories.tsx   # Storybook
├── index.ts             # Eksport publiczny
// (opcjonalnie) types.ts # Typy dla propsów (jeśli potrzeba)
```

---

## 2. Checklist: Implementacja komponentu Loader / Spinner

### 2.1 Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/Loader/`
- [ ] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Loader.tsx`)

- [ ] Import zależności: Preact, JSX, SCSS Module
- [ ] Definicja interfejsu:

  ```ts
  import { JSX } from "preact";
  import styles from "./Loader.module.scss";

  export type LoaderVariant = "spinner" | "dots" | "bars";
  export type LoaderSize = "sm" | "md" | "lg";
  export type LoaderColor = "primary" | "secondary" | "white" | "inherit";

  export interface LoaderProps {
    variant?: LoaderVariant;
    size?: LoaderSize;
    color?: LoaderColor;
    fullscreen?: boolean;
    overlay?: boolean;
    text?: string;
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie:
  - [ ] Overlay (fullscreen/overlay)
  - [ ] Loader (spinner/dots/bars)
  - [ ] Tekst (jeśli podany)
  - [ ] Klasy CSS na podstawie variant, size, color
  - [ ] Props `className`, `style`
- [ ] Accessibility: role="status", aria-live, aria-busy, aria-label, tekst dla czytników

### 2.3 Styling i responsywność (`Loader.module.scss`)

- [ ] Importy SCSS:
  ```scss
  @use "../styles/colors.scss" as *;
  @use "../styles/spacing.scss" as *;
  @use "../styles/typography.scss" as *;
  @use "../styles/mixins.scss" as *;
  @use "../styles/breakpoints.scss" as *;
  ```
- [ ] Lokalne zmienne:
  ```scss
  $loader-sm-size: 1.25rem;
  $loader-md-size: 2.5rem;
  $loader-lg-size: 4rem;
  $loader-default-color: var(--color-brand-primary);
  $loader-text-color: var(--color-text-secondary);
  $loader-z-index-overlay: 3000;
  $overlay-bg: rgba(255, 255, 255, 0.7);
  ```
- [ ] Layout: display, centrowanie, overlay, fullscreen
- [ ] Warianty: spinner (okrąg, animacja spin), dots (kropki, animacja bounce/fade), bars (paski, animacja scale)
- [ ] Rozmiary: sm, md, lg (width/height, skalowanie animacji)
- [ ] Kolory: primary, secondary, white, inherit (border/background/text)
- [ ] Responsive design: media queries, skalowanie na mobile
- [ ] Theme support: custom properties, transitions

### 2.4 Testy jednostkowe (`Loader.test.tsx`)

- [ ] Renderowanie: domyślne, różne variant, size, color
- [ ] Renderowanie tekstu, overlay, fullscreen
- [ ] Accessibility: role, aria, aria-label
- [ ] Animacje: obecność klas animacji

### 2.5 Storybook (`Loader.stories.tsx`)

- [ ] Basic: domyślne, z tekstem, overlay, fullscreen
- [ ] Variants: spinner, dots, bars
- [ ] Size: sm, md, lg
- [ ] Color: primary, secondary, white
- [ ] Combinations: w Card, w Button, różne kombinacje
- [ ] Theme: tryb jasny/ciemny

### 2.6 Eksport (`index.ts`)

- [ ] Eksportuj `Loader` i ewentualne typy

### 2.7 Manualne testy integracyjne

- [ ] Integracja z Content: sekcje dashboardu, centrowanie
- [ ] Integracja z Card: overlay, spójność
- [ ] Integracja z innymi komponentami (Button)
- [ ] Responsywność: przeglądarki, urządzenia
- [ ] Wydajność: animacje
- [ ] Nadpisywanie stylów przez `className` i `style`

---

## 3. Opcjonalne rozszerzenia

- [ ] Przenieś typy do `types.ts` jeśli komponent jest złożony

---

## 4. Uwagi końcowe

- Importy SCSS zawsze względne względem folderu komponentu.
- Dodatkowe pliki (`types.ts`) tylko jeśli złożoność tego wymaga.
- Priorytet: najpierw funkcjonalność i użyteczność, potem rozszerzenia.
- Testuj na prawdziwych urządzeniach mobilnych.
- Zachowaj spójność z istniejącymi komponentami i ogólnymi wytycznymi projektu.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
