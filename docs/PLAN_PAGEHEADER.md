# Plan implementacji: **PageHeader Dashboard Component**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego i responsywnego komponentu nagłówka strony/sekcji (PageHeader), pełniącego rolę wizytówki podstrony dashboardu.
- Spójny interfejs do wyświetlania tytułu, opisu oraz powiązanych akcji (np. przyciski "Dodaj nowy", "Eksportuj").
- Integracja z komponentem Breadcrumbs (ścieżka nawigacji nad tytułem).
- Wysoka dostępność (WCAG) i optymalna wydajność renderowania.
- Łatwa integracja z Layoutem aplikacji.

### Architektura folderu

```
PageHeader/
├── PageHeader.tsx           # Główny komponent
├── PageHeader.module.scss   # Style SCSS Modules
├── PageHeader.test.tsx      # Testy jednostkowe
├── PageHeader.stories.tsx   # Storybook
├── index.ts                 # Eksport publiczny
// (opcjonalnie) types.ts    # Typy dla propsów (jeśli potrzeba)
```

---

## 2. Checklist: Implementacja komponentu PageHeader

### 2.1 Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/PageHeader/`
- [ ] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`PageHeader.tsx`)

- [ ] Import zależności: Preact, JSX, SCSS Module
- [ ] Definicja interfejsów:

  ```ts
  import { JSX, ComponentChildren } from "preact";
  import styles from "./PageHeader.module.scss";

  export interface PageHeaderAction {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary" | "outline" | "text";
    icon?: ComponentChildren;
    disabled?: boolean;
    tooltip?: string;
  }

  export interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: PageHeaderAction[];
    breadcrumbs?: ComponentChildren;
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie:
  - [ ] Slot na breadcrumbs na górze
  - [ ] Tytuł jako `<h1>` (lub inny poziom)
  - [ ] Opis jako `<p>` (jeśli podany)
  - [ ] Akcje jako grupa przycisków/interaktywnych elementów
  - [ ] Obsługa propsów `className`, `style`
  - [ ] Semantyczne tagi HTML (`<section>`, `<h1>`, `<p>`, `<nav>`, `<div>`)
- [ ] Obsługa interakcji: kliknięcia, href, disabled
- [ ] Dostępność: aria, focus, tab, semantyka nagłówków

### 2.3 Style (`PageHeader.module.scss`)

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
  $page-header-padding-y: $spacing-xl;
  $page-header-padding-x: $spacing-lg;
  $page-header-bg: var(--color-background-secondary);
  $page-header-border-bottom: 1px solid var(--color-border-subtle);
  $page-header-title-color: var(--color-text-primary);
  $page-header-description-color: var(--color-text-secondary);
  $page-header-action-gap: $spacing-sm;
  ```
- [ ] Flexbox/Grid layout: rozkład sekcji, gap, padding
- [ ] Stylizacja tytułu, opisu, grupy akcji, slotu breadcrumbs
- [ ] Responsive design (mobile-first, media queries)
- [ ] Obsługa motywu jasny/ciemny (custom properties, transitions)

### 2.4 Testy jednostkowe (`PageHeader.test.tsx`)

- [ ] Renderowanie z tytułem, opisem, akcjami, breadcrumbs
- [ ] Testy przycisków akcji (onClick, href, disabled, warianty)
- [ ] Testy slotu breadcrumbs
- [ ] Testy ikon w akcjach
- [ ] Testy dostępności (aria, focus, tab, nagłówki)

### 2.5 Storybook (`PageHeader.stories.tsx`)

- [ ] Story: tytuł, tytuł+opis, tytuł+akcje, tytuł+akcje+breadcrumbs
- [ ] Story: różne warianty akcji (primary, secondary, outline)
- [ ] Story: akcje z ikonami, wyłączone akcje
- [ ] Story: długi opis/tytuł
- [ ] Story: z Breadcrumbs (mock)
- [ ] Story: tryb jasny/ciemny
- [ ] Story: responsywność (zmiana rozmiaru okna)

### 2.6 Eksport (`index.ts`)

- [ ] Eksportuj `PageHeader` i ewentualne typy

### 2.7 Manualne testy integracyjne

- [ ] Integracja z Breadcrumbs i Layout
- [ ] Spójność z Header, brak kolizji
- [ ] Testy w przeglądarkach i na urządzeniach
- [ ] Testy wydajności
- [ ] Testy nadpisywania stylów przez `className` i `style`

---

## 3. Opcjonalne rozszerzenia

- [ ] Custom hook `usePageHeaderActions` do generowania akcji na podstawie ról/kontekstu
- [ ] Przenieś interfejsy do `types.ts` jeśli komponent jest złożony

---

## 4. Uwagi końcowe

- Importy SCSS zawsze względne względem folderu komponentu.
- Dodatkowe pliki (`types.ts`, `hooks/`) tylko jeśli złożoność tego wymaga.
- Priorytet: najpierw funkcjonalność i użyteczność, potem rozszerzenia.
- Testuj na prawdziwych urządzeniach mobilnych.
- Zachowaj spójność z Header, Breadcrumbs i ogólnymi wytycznymi projektu.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
