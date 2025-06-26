# Plan implementacji: Layout Dashboard Component

## Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego i w pełni responsywnego komponentu głównego układu (Layout) dla całego dashboardu.
- Zapewnienie spójnego układu wizualnego dla wszystkich widoków aplikacji, niezależnie od urządzenia i rozmiaru ekranu.
- Obsługa różnych wariantów układu: z paskiem bocznym (sidebar), bez paska bocznego (pełna szerokość), kompaktowy.
- Umożliwienie pełnej kontroli nad kompozycją podkomponentów (Header, Sidebar, Footer) poprzez system slotów.
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

- [ ] Utwórz folder `src/components/Layout/`.
- [ ] Sprawdź potencjalne konflikty nazw z istniejącymi komponentami.

### 2. Implementacja głównego komponentu (`Layout.tsx`)

- [ ] Import zależności: `ComponentChildren`, `JSX` z Preact, style modułowe.
- [ ] Zdefiniuj interfejs `LayoutProps`:
  ```ts
  interface LayoutProps {
    children: ComponentChildren;
    variant?: "sidebar" | "full" | "compact";
    sidebarPosition?: "left" | "right";
    hasHeader?: boolean;
    hasSidebar?: boolean;
    hasFooter?: boolean;
    headerComponent?: ComponentChildren;
    sidebarComponent?: ComponentChildren;
    footerComponent?: ComponentChildren;
    className?: string;
    style?: JSX.CSSProperties;
    initialSidebarCollapsed?: boolean;
  }
  ```
- [ ] Domyślna klasa CSS dla głównego kontenera (np. `layout`).
- [ ] Warunkowe renderowanie sekcji (Header, Sidebar, Footer) na podstawie propsów.
- [ ] Kompozycja slotów: wstrzykiwanie `headerComponent`, `sidebarComponent`, `footerComponent`, `children`.
- [ ] Użycie semantycznych tagów HTML (`<header>`, `<aside>`, `<main>`, `<footer>`).
- [ ] Przekazywanie dodatkowych props (`className`, `style`).
- [ ] Obsługa stanu `isSidebarCollapsed` (useState, inicjacja przez `initialSidebarCollapsed`).
- [ ] Funkcja `handleSidebarToggle` do przełączania sidebara (przekazywana do slotów).
- [ ] Wykrywanie urządzenia mobilnego (np. `window.matchMedia`).
- [ ] Przekazywanie stanu sidebara do SidebarComponent i HeaderComponent.
- [ ] Accessibility: ARIA labels, role, keyboard navigation, screen reader compatibility.

### 3. Styling i responsywność (`Layout.module.scss`)

- [ ] Importy SCSS:
  ```scss
  @use "../../styles/colors.scss" as *;
  @use "../../styles/spacing.scss" as *;
  @use "../../styles/typography.scss" as *;
  @use "../../styles/mixins.scss" as *; // opcjonalnie
  @use "../../styles/breakpoints.scss" as *;
  ```
- [ ] Definicja lokalnych zmiennych:
  ```scss
  $layout-header-height: 4rem;
  $layout-sidebar-width: 16rem;
  $layout-sidebar-collapsed-width: 4rem;
  $layout-footer-height: 3rem;
  $layout-bg: var(--color-background-primary);
  $layout-transition: 0.3s ease-out;
  $layout-z-index-header: 1000;
  $layout-z-index-sidebar: 999;
  $layout-z-index-overlay: 998;
  ```
- [ ] CSS Grid jako główny mechanizm układu.
- [ ] Sticky positioning dla header/sidebar.
- [ ] Mobile-first, media queries z `breakpoints.scss`.
- [ ] Sidebar jako overlay na mobile, stały na desktopie.
- [ ] Theme support: custom properties, transitions.

### 4. Testy jednostkowe (`Layout.test.tsx`)

- [ ] Renderowanie Layoutu z różnymi propsami.
- [ ] Sprawdzenie klas CSS i struktury DOM.
- [ ] Testy interakcji (toggle sidebar).
- [ ] Responsywność (zmiana szerokości viewportu).
- [ ] Accessibility (ARIA, role, keyboard).
- [ ] Integracja slotów (mockowanie Header, Sidebar, Footer).

### 5. Storybook (`Layout.stories.tsx`)

- [ ] Story z podstawowym układem (Header, Sidebar, Content, Footer).
- [ ] Warianty: full, compact, sidebar right, bez Header/Footer/Sidebar.
- [ ] Interaktywność: toggle sidebar, responsywność.
- [ ] Theme: light/dark mode.
- [ ] State: długi content, różne kombinacje widoczności slotów.

### 6. Eksport (`index.ts`)

- [ ] Eksportuj Layout z folderu.
- [ ] Eksportuj typy (jeśli w osobnym pliku).

### 7. Manualne testy integracyjne

- [ ] Integracja z Header, Sidebar, Content, Footer w aplikacji.
- [ ] Testy na różnych przeglądarkach i urządzeniach.
- [ ] Testy wydajności i płynności animacji.
- [ ] Testy nadpisywania stylów przez propsy.

### Opcjonalne rozszerzenia

- [ ] `useLayoutState` – hook do globalnego stanu układu (jeśli złożoność wymaga).
- [ ] `useResponsiveLayout` – hook do wykrywania breakpointów.
- [ ] Przeniesienie typów do `types.ts` (jeśli kod rośnie).

---

## Uwagi końcowe

- Importy SCSS zawsze powinny być względne względem folderu komponentu.
- Dodatkowe pliki i podfoldery (`types.ts`, `hooks/`) twórz tylko jeśli złożoność komponentu tego wymaga.
- Priorytet: funkcjonalność i użyteczność, potem rozszerzenia.
- Testuj na prawdziwych urządzeniach mobilnych.
- Zachowaj spójność z Header i Sidebar.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
