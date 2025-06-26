# Plan implementacji: Layout Dashboard Component

## Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego, responsywnego layoutu dashboardu
- Zapewnienie konsistentnego układu dla całej aplikacji
- Obsługa różnych wariantów layoutu (z/bez sidebar, różne pozycje)
- Pełna kontrola nad kompozycją komponentów

### Architektura komponentu

```
Layout/
├── Layout.tsx           # Główny komponent
├── Layout.module.scss   # Style modułowe
├── Layout.test.tsx      # Testy jednostkowe
├── Layout.stories.tsx   # Dokumentacja Storybook
├── index.ts             # Eksport publiczny
```

## Detailed Implementation Checklist

### 1. Przygotowanie struktury projektu

- [ ] **Utworzenie folderu głównego**
  - Lokalizacja: `src/components/Layout/`
  - Sprawdzenie konfliktów z istniejącymi komponentami

### 2. Implementacja głównego komponentu

#### **Plik: `Layout.tsx`**

- [ ] **Podstawowa struktura komponentu**

  ```typescript
  import { ComponentChildren } from "preact";
  import styles from "./Layout.module.scss";

  interface LayoutProps {
    children: ComponentChildren;
    variant?: "sidebar" | "full" | "compact";
    sidebarPosition?: "left" | "right";
    header?: ComponentChildren;
    sidebar?: ComponentChildren;
    footer?: ComponentChildren;
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] **Implementacja renderowania**
  - Conditional rendering dla różnych wariantów
  - Kompozycja slotów: header, sidebar, content, footer
  - Forwarding propsów do głównego kontenera
  - Domyślna klasa CSS (np. `layout`)

- [ ] **Obsługa stanu layoutu** (opcjonalnie)
  - Stan sidebar (collapsed/expanded)
  - Stan responsywności (mobile/desktop)

- [ ] **Accessibility features**
  - ARIA labels i roles
  - Keyboard navigation support
  - Screen reader compatibility

### 3. Styling i responsywność

#### **Plik: `Layout.module.scss`**

- [ ] **Setup zmiennych i importów**

  ```scss
  @use "../../styles/colors.scss" as *;
  @use "../../styles/spacing.scss" as *;
  @use "../../styles/typography.scss" as *;
  // opcjonalnie: @use '../../styles/breakpoints.scss' as *;
  ```

- [ ] **Definicja lokalnych zmiennych**

  ```scss
  $layout-header-height: 4rem;
  $layout-sidebar-width: 16rem;
  $layout-sidebar-collapsed: 4rem;
  $layout-footer-height: 3rem;
  $layout-bg: var(--color-bg);
  ```

- [ ] **Implementacja Grid/Flexbox layoutu**
  - CSS Grid lub Flexbox dla głównej struktury
  - Sticky positioning dla header/sidebar

- [ ] **Responsive design**
  - Mobile-first approach
  - Media queries dla tablet/desktop
  - Adaptive sidebar behavior (overlay na mobile)

- [ ] **Theme support**
  - Light/dark mode przez custom properties
  - Smooth transitions

### 4. Testy jednostkowe

#### **Plik: `Layout.test.tsx`**

- [ ] Renderowanie Layoutu z dziećmi
- [ ] Obecność klas CSS i struktury DOM
- [ ] Responsywność (np. snapshoty dla różnych szerokości)
- [ ] Integracja z Header, Sidebar, Content, Footer (mock)
- [ ] Accessibility (ARIA, keyboard)

### 5. Storybook

#### **Plik: `Layout.stories.tsx`**

- [ ] Story z podstawowym układem (Header, Sidebar, Content, Footer)
- [ ] Warianty: bez Sidebar, z Footer, różne szerokości
- [ ] Motyw jasny/ciemny
- [ ] Interaktywność: sidebar toggle, responsywność

### 6. Eksport

#### **Plik: `index.ts`**

- [ ] Eksportuj Layout z folderu

### 7. Manualne testy integracyjne

- [ ] Sprawdź Layout w aplikacji z innymi komponentami
- [ ] Zweryfikuj zachowanie na urządzeniach mobilnych i desktop
- [ ] Zweryfikuj możliwość nadpisania stylów przez propsy/className

---

**Uwagi:**

- Importy SCSS muszą być względne względem folderu komponentu.
- Dodatkowe pliki typu `types.ts`, `hooks/` są opcjonalne – twórz je tylko jeśli są potrzebne.
- Przestrzegaj zasad SCSS Modules i typowania Preact.
- Dokumentuj nietypowe rozwiązania w kodzie lub w Storybooku.
