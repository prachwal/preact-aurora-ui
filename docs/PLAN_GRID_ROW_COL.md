# Plan implementacji: **Komponenty Grid / Row / Col (System Siatki)**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego i w pełni responsywnego systemu siatki (Grid, Row, Col) do budowy złożonych układów dashboardu.
- Model 12-kolumnowy, łatwe definiowanie szerokości, przesunięć i odstępów na różnych breakpointach (sm, md, lg, xl).
- Wysoka dostępność (WCAG), optymalna wydajność, minimalna złożoność kodu HTML i CSS.
- Integracja z Layoutem, podstawa dla treści w `<main>`.

### Architektura folderów

```
Grid/
├── Grid.tsx           # Komponent kontenera siatki
├── Grid.module.scss   # Style modułowe
├── Grid.test.tsx      # Testy jednostkowe
├── Grid.stories.tsx   # Storybook
├── index.ts           # Eksport publiczny
Row/
├── Row.tsx            # Komponent wiersza
├── Row.module.scss    # Style modułowe
├── Row.test.tsx       # Testy jednostkowe
├── Row.stories.tsx    # Storybook
├── index.ts           # Eksport publiczny
Col/
├── Col.tsx            # Komponent kolumny
├── Col.module.scss    # Style modułowe
├── Col.test.tsx       # Testy jednostkowe
├── Col.stories.tsx    # Storybook
├── index.ts           # Eksport publiczny
// (opcjonalnie) types.ts # Typy dla wszystkich komponentów siatki
```

---

## 2. Checklist: Implementacja Grid / Row / Col

### 2.1 Przygotowanie struktury projektu

- [ ] Utwórz foldery `src/components/Grid/`, `Row/`, `Col/`
- [ ] Sprawdź potencjalne konflikty nazw

### 2.2 Główne komponenty

#### Grid.tsx

- [ ] Import zależności: Preact, JSX, SCSS Module
- [ ] Definicja interfejsu:

  ```ts
  import { ComponentChildren, JSX } from "preact";
  import styles from "./Grid.module.scss";

  export interface GridProps {
    children: ComponentChildren;
    gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie: props `children`, klasa zależna od `gap`, semantyczny tag `div`/`section`

#### Row.tsx

- [ ] Import zależności: Preact, JSX, SCSS Module
- [ ] Definicja interfejsu:

  ```ts
  import { ComponentChildren, JSX } from "preact";
  import styles from "./Row.module.scss";

  type JustifyContent =
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly";
  type AlignItems = "start" | "center" | "end" | "stretch" | "baseline";

  export interface RowProps {
    children: ComponentChildren;
    justify?: JustifyContent;
    align?: AlignItems;
    gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie: props `children`, klasy zależne od `justify`, `align`, `gap`, semantyczny tag `div`

#### Col.tsx

- [ ] Import zależności: Preact, JSX, SCSS Module
- [ ] Definicja interfejsu:

  ```ts
  import { ComponentChildren, JSX } from "preact";
  import styles from "./Col.module.scss";

  type ColSpan =
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
  type ColOffset =
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };

  export interface ColProps {
    children: ComponentChildren;
    span?: ColSpan;
    offset?: ColOffset;
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie: props `children`, dynamiczne klasy CSS na podstawie `span` i `offset` dla breakpointów, semantyczny tag `div`

### 2.3 Styling i responsywność

#### Grid.module.scss

- [ ] Importy SCSS:
  ```scss
  @use "../styles/colors.scss" as *;
  @use "../styles/spacing.scss" as *;
  @use "../styles/typography.scss" as *;
  @use "../styles/mixins.scss" as *;
  @use "../styles/breakpoints.scss" as *;
  ```
- [ ] Lokalne zmienne: `$grid-max-width`, `$grid-column-count`
- [ ] Layout: max-width, centrowanie, padding, klasy gap

#### Row.module.scss

- [ ] Importy SCSS, layout: `display: flex; flex-wrap: wrap;`, ujemne marginesy, klasy justify, align, gap

#### Col.module.scss

- [ ] Importy SCSS, bazowy styl kolumny, padding, generowanie klas span/offset (pętle SCSS), klasy dla breakpointów, mobile-first, media queries

### 2.4 Testy jednostkowe

- [ ] Grid: renderowanie z dziećmi, klasy gap
- [ ] Row: renderowanie z dziećmi, klasy justify, align, gap
- [ ] Col: renderowanie z różnymi span/offset, klasy CSS, domyślne zachowanie, responsywność, accessibility

### 2.5 Storybook

- [ ] Grid: kilka Row i Col, różne gap
- [ ] Row: różne Col, justify, align, gap
- [ ] Col: różne span, offset, responsywność, różne treści

### 2.6 Eksport

- [ ] Eksportuj główny komponent i typy z każdego folderu

### 2.7 Manualne testy integracyjne

- [ ] Integracja z Layout, spójność paddingów/marginesów
- [ ] Responsywność w przeglądarkach i na urządzeniach
- [ ] Wydajność
- [ ] Nadpisywanie stylów przez `className` i `style`

---

## 3. Opcjonalne rozszerzenia

- [ ] Custom hook `useGridBreakpoints` do wykrywania breakpointu
- [ ] Przenieś typy do centralnego pliku `types.ts` jeśli komponent jest złożony

---

## 4. Uwagi końcowe

- Importy SCSS zawsze względne względem folderu komponentu.
- Dodatkowe pliki (`types.ts`, `hooks/`) tylko jeśli złożoność tego wymaga.
- Priorytet: najpierw funkcjonalność i użyteczność, potem rozszerzenia.
- Testuj na prawdziwych urządzeniach mobilnych.
- Zachowaj spójność z Header, Layout, Sidebar, Footer, Breadcrumbs i ogólnymi wytycznymi projektu.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
