# Plan implementacji: **Breadcrumbs Dashboard Component**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego i dostępnego komponentu "okruszków" nawigacyjnych (Breadcrumbs), wizualizującego hierarchiczną ścieżkę użytkownika w aplikacji.
- Intuicyjny mechanizm nawigacji, umożliwiający cofanie się do poprzednich poziomów.
- Obsługa dynamicznego generowania ścieżki na podstawie lokalizacji użytkownika (np. z routingu) oraz niestandardowych etykiet.
- Wysoka dostępność (WCAG) i optymalna wydajność, nawet dla głębokich ścieżek.
- Integracja z Header/PageHeader lub Layout.

### Architektura folderu

```
Breadcrumbs/
├── Breadcrumbs.tsx           # Główny komponent
├── Breadcrumbs.module.scss   # Style SCSS Modules
├── Breadcrumbs.test.tsx      # Testy jednostkowe
├── Breadcrumbs.stories.tsx   # Storybook
├── index.ts                  # Eksport publiczny
// (opcjonalnie) types.ts     # Typy dla propsów (jeśli potrzeba)
```

---

## 2. Checklist: Implementacja komponentu Breadcrumbs

### 2.1 Przygotowanie struktury projektu

- [x] Utwórz folder `src/components/Breadcrumbs/`
- [x] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Breadcrumbs.tsx`)

- [x] Import zależności: Preact, JSX, SCSS Module
- [x] Definicja interfejsów:

  ```ts
  import { JSX, ComponentChildren } from "preact";
  import styles from "./Breadcrumbs.module.scss";

  export interface BreadcrumbItem {
    label: string;
    href?: string;
    isActive?: boolean;
    icon?: ComponentChildren;
  }

  export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: ComponentChildren;
    className?: string;
    style?: JSX.CSSProperties;
    onItemClick?: (item: BreadcrumbItem) => void;
  }
  ```

- [x] Renderowanie:
  - [x] Semantyczny tag `<nav>` z `role="navigation"` i `aria-label="Breadcrumb"`
  - [x] Iteracja po `items` i renderowanie elementów jako `<a>` lub `<span>`
  - [x] Ostatni element: tekst, nie link (`aria-current="page"`)
  - [x] Renderowanie separatora między elementami
  - [x] Obsługa propsów `className`, `style`
- [x] Obsługa interakcji: kliknięcia, wywołanie `onItemClick`
- [x] Dostępność: aria, focus, tab

### 2.3 Style (`Breadcrumbs.module.scss`)

- [x] Importy SCSS:
  ```scss
  @use "../styles/colors.scss" as *;
  @use "../styles/spacing.scss" as *;
  @use "../styles/typography.scss" as *;
  @use "../styles/mixins.scss" as *;
  @use "../styles/breakpoints.scss" as *;
  ```
- [x] Lokalne zmienne:
  ```scss
  $breadcrumbs-text-color: var(--color-text-secondary);
  $breadcrumbs-link-color: var(--color-link-primary);
  $breadcrumbs-active-color: var(--color-text-primary);
  $breadcrumbs-separator-color: var(--color-text-tertiary);
  $breadcrumbs-font-size: $font-size-sm;
  $breadcrumbs-padding: $spacing-xs 0;
  $breadcrumbs-gap: $spacing-xs;
  ```
- [x] Flexbox layout: rozkład elementów, gap, padding
- [x] Stylizacja linków, aktywnego elementu, separatora, ikon
- [x] Responsive design (mobile-first, media queries)
- [x] Obsługa motywu jasny/ciemny (custom properties, transitions)

### 2.4 Testy jednostkowe (`Breadcrumbs.test.tsx`)

- [x] Renderowanie z pustą tablicą `items`
- [x] Renderowanie z pojedynczym i wieloma elementami
- [x] Testy separatorów (tekst, ikona)
- [x] Testy linków (href, label, aktywny element)
- [x] Interakcje: kliknięcia, wywołanie `onItemClick`
- [x] Testy dostępności (aria, focus, tab)

### 2.5 Storybook (`Breadcrumbs.stories.tsx`)

- [x] Story: typowa ścieżka (np. Home > Products > Current Page)
- [x] Story: tylko aktualna strona
- [x] Story: różne separatory (tekst, ikona)
- [x] Story: elementy z ikonami
- [x] Story: długie etykiety
- [x] Story: linki wewnętrzne i zewnętrzne
- [x] Story: tryb jasny/ciemny
- [x] Story: dynamiczne zmiany ścieżki

### 2.6 Eksport (`index.ts`)

- [x] Eksportuj `Breadcrumbs` i ewentualne typy

### 2.7 Manualne testy integracyjne

- [ ] Integracja z Layout/PageHeader
- [ ] Dynamiczne aktualizowanie ścieżki (routowanie)
- [ ] Testy w przeglądarkach i na urządzeniach
- [ ] Testy wydajności
- [ ] Testy nadpisywania stylów przez `className` i `style`

---

## 3. Opcjonalne rozszerzenia

- [ ] Custom hook `useBreadcrumbs` do generowania ścieżki na podstawie routingu
- [ ] Przenieś interfejsy do `types.ts` jeśli komponent jest złożony

---

## 4. Uwagi końcowe

- Importy SCSS zawsze względne względem folderu komponentu.
- Dodatkowe pliki (`types.ts`, `hooks/`) tylko jeśli złożoność tego wymaga.
- Priorytet: najpierw funkcjonalność i użyteczność, potem rozszerzenia.
- Testuj na prawdziwych urządzeniach mobilnych.
- Zachowaj spójność z Header, Layout i ogólnymi wytycznymi projektu.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
