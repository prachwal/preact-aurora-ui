# Plan implementacji: **Komponent Card**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie uniwersalnego i elastycznego komponentu "kafelka" (Card) do grupowania i prezentowania danych, statystyk, akcji lub innych treści.
- Spójny wygląd i struktura dla różnych typów informacji w dashboardzie.
- Łatwa kompozycja zawartości przez sloty (tytuł, treść, akcje, stopka).
- Wysoka dostępność (WCAG) i optymalna wydajność renderowania.
- Integracja z systemem siatki (Grid, Row, Col) dla responsywnych layoutów.

### Architektura folderu

```
Card/
├── Card.tsx             # Główny komponent
├── Card.module.scss     # Style modułowe
├── Card.test.tsx        # Testy jednostkowe
├── Card.stories.tsx     # Storybook
├── index.ts             # Eksport publiczny
// (opcjonalnie) types.ts # Typy dla propsów (jeśli potrzeba)
```

---

## 2. Checklist: Implementacja komponentu Card

### 2.1 Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/Card/`
- [ ] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Card.tsx`)

- [ ] Import zależności: Preact, JSX, SCSS Module
- [ ] Definicja interfejsu:

  ```ts
  import { ComponentChildren, JSX } from "preact";
  import styles from "./Card.module.scss";

  export interface CardProps {
    children: ComponentChildren;
    title?: ComponentChildren;
    headerActions?: ComponentChildren;
    footer?: ComponentChildren;
    variant?: "elevated" | "outlined" | "flat";
    clickable?: boolean;
    onClick?: () => void;
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie i sloty:
  - [ ] Główny kontener (div/article/section lub button/a jeśli clickable)
  - [ ] Nagłówek: jeśli `title` lub `headerActions`, renderuj sekcję nagłówka
  - [ ] Wewnątrz nagłówka: `title` (np. `<h2>`/`<h3>`) i `headerActions`
  - [ ] Sekcja treści: `children`
  - [ ] Stopka: jeśli `footer`, renderuj sekcję stopki
  - [ ] Props `className`, `style`
- [ ] Obsługa interakcji: clickable, onClick, interaktywność headerActions
- [ ] Accessibility: semantyka (article/section, h2/h3), klikalność klawiaturą, aria

### 2.3 Styling i responsywność (`Card.module.scss`)

- [ ] Importy SCSS:
  ```scss
  @use "../../styles/colors.scss" as *;
  @use "../../styles/spacing.scss" as *;
  @use "../../styles/typography.scss" as *;
  @use "../../styles/mixins.scss" as *;
  @use "../../styles/breakpoints.scss" as *;
  ```
- [ ] Lokalne zmienne:
  ```scss
  $card-bg: var(--color-surface-primary);
  $card-border-radius: $spacing-xs;
  $card-padding: $spacing-md;
  $card-header-padding-y: $spacing-sm;
  $card-footer-padding-y: $spacing-sm;
  $card-border-color: var(--color-border-subtle);
  $card-shadow-elevated: var(--shadow-md);
  $card-transition: 0.2s ease-out;
  $card-title-color: var(--color-text-primary);
  $card-text-color: var(--color-text-secondary);
  ```
- [ ] Layout: background, border-radius, overflow, warianty (elevated, outlined, flat), flexbox dla nagłówka, sekcje z paddingami
- [ ] Stylizacja title, treści, headerActions, footer
- [ ] Efekty hover/focus dla clickable
- [ ] Responsive design: paddingy, rozmiary czcionek, media queries
- [ ] Theme support: custom properties, transitions

### 2.4 Testy jednostkowe (`Card.test.tsx`)

- [ ] Renderowanie: tylko children, z title, z headerActions, z footer, ze wszystkimi elementami
- [ ] Klasy CSS dla wariantów
- [ ] Renderowanie slotów: title, headerActions, children, footer
- [ ] Interakcje: kliknięcie, onClick, nieklikalna karta
- [ ] Accessibility: aria, klawiatura, semantyka

### 2.5 Storybook (`Card.stories.tsx`)

- [ ] Basic: children, title, title+headerActions, footer
- [ ] Variants: elevated, outlined, flat
- [ ] Content: różne typy danych, ikony, przyciski, długie treści
- [ ] Interactive: clickable, dynamiczna zawartość
- [ ] Theme: tryb jasny/ciemny

### 2.6 Eksport (`index.ts`)

- [ ] Eksportuj `Card` i ewentualne typy

### 2.7 Manualne testy integracyjne

- [ ] Integracja z Grid/Row/Col: dopasowanie do szerokości kolumn, gap
- [ ] Integracja z Content/Layout: poprawne wyświetlanie, brak overflow
- [ ] Responsywność: przeglądarki, urządzenia
- [ ] Wydajność
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
