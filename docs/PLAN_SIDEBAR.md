# Plan implementacji: Komponent Sidebar

---

## Cel

Stworzenie responsywnego, dostępnego i rozszerzalnego komponentu `Sidebar` jako nawigacji bocznej dashboardu, zgodnie z architekturą projektu, zasadami SCSS Modules oraz checklistami wdrożeniowymi.

---

## Struktura plików

```
src/components/Sidebar/
├── Sidebar.tsx           # Główny komponent
├── Sidebar.module.scss   # Style modułowe
├── Sidebar.test.tsx      # Testy jednostkowe (Vitest + Testing Library)
├── Sidebar.stories.tsx   # Storybook (dokumentacja i demo)
├── index.ts              # Eksporty
└── types.ts              # (opcjonalnie) Typy, hooks/, components/
```

---

## Checklist wdrożenia

### 1. Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/Sidebar/`.
- [ ] Sprawdź brak konfliktów nazw.

### 2. Implementacja komponentu `Sidebar.tsx`

- [ ] Importuj zależności oraz style modułowe przez `import styles from './Sidebar.module.scss'`.
- [ ] Zdefiniuj typy propsów (np. `items`, `collapsed`, `onToggle`, `position`, `variant`, `width`, `collapsedWidth`, `onItemClick`, `activeItem`, `className`, `style`).
- [ ] Komponuj elementy: toggle button, navigation menu, footer section.
- [ ] Forwarduj propsy do głównego kontenera.
- [ ] Ustaw domyślną klasę CSS (np. `sidebar`).
- [ ] Obsłuż stan collapsed/expanded, active item, submenu visibility, mobile overlay.
- [ ] Obsłuż zdarzenia nawigacji (kliknięcia, submenu, keyboard navigation).
- [ ] Dodaj ARIA labels, roles, wsparcie dla screen readerów i klawiatury.
- [ ] Dodaj komentarze wyjaśniające nietypowe rozwiązania.

#### Przykład kodu typu MenuItem:

```typescript
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  children?: MenuItem[];
  divider?: boolean;
}
```

---

### 3. Styling i SCSS (`Sidebar.module.scss`)

- [ ] Importuj SCSS przez `@use` z folderu `styles/` (wszystkie importy względne względem folderu komponentu):
  - `@use "../../styles/colors.scss" as *;`
  - `@use "../../styles/spacing.scss" as *;`
  - `@use "../../styles/typography.scss" as *;`
  - `@use "../../styles/breakpoints.scss" as *;` (opcjonalnie)
- [ ] Zdefiniuj lokalne zmienne na bazie custom properties:
  - `$sidebar-width: 16rem;`
  - `$sidebar-collapsed-width: 4rem;`
  - `$sidebar-z-index: 999;`
  - `$sidebar-bg: var(--color-surface);`
  - `$sidebar-border: var(--color-border);`
  - `$sidebar-shadow: var(--shadow-md);`
  - `$sidebar-transition: 0.3s ease;`
- [ ] Zapewnij layout: fixed/sticky, width transitions, spacing, overflow, z-index.
- [ ] Stwórz style dla menu items: hover/active, ikony, zagnieżdżenia, tooltips, badge/counter.
- [ ] Zapewnij responsywność (mobile overlay, touch, breakpoints, swipe gestures).
- [ ] Wspieraj motyw jasny/ciemny przez zmienne CSS.
- [ ] Dodaj animacje i przejścia (width, hover, submenu, loading, micro-interactions).

#### Przykład nagłówka SCSS:

```scss
@use "../../styles/colors.scss" as *;
@use "../../styles/spacing.scss" as *;
@use "../../styles/typography.scss" as *;
@use "../../styles/breakpoints.scss" as *;

$sidebar-width: 16rem;
$sidebar-collapsed-width: 4rem;
$sidebar-z-index: 999;
$sidebar-bg: var(--color-surface);
$sidebar-border: var(--color-border);
$sidebar-shadow: var(--shadow-md);
$sidebar-transition: 0.3s ease;
```

---

### 4. Testy jednostkowe (`Sidebar.test.tsx`)

- [ ] Testuj renderowanie z różnymi propsami i strukturą menu.
- [ ] Testuj interakcje: toggle, kliknięcia, submenu, keyboard navigation.
- [ ] Testuj responsywność: mobile overlay, breakpoints, touch, swipe.
- [ ] Testuj accessibility: ARIA, role, screen reader, focus.
- [ ] Testuj integrację z Layoutem i Routerem (mock).

---

### 5. Storybook (`Sidebar.stories.tsx`)

- [ ] Stwórz historie dla:
  - podstawowej nawigacji (różne typy menu items)
  - collapsed/expanded
  - różnych pozycji (left/right)
  - minimal/full-featured
  - prostego/nested menu
  - icons, badges, counters
  - długich list (scroll)
  - interakcji (toggle, submenu, responsive)
  - trybu jasnego/ciemnego, brand/high contrast
  - różnych szerokości
  - loading/empty/error/permissions

---

### 6. Eksport (`index.ts`)

- [ ] Eksportuj komponent i typy z folderu Sidebar.

---

### 7. Manualne testy integracyjne

- [ ] Użyj Sidebar w Layout, sprawdź positioning, z-index, współpracę z Headerem i Content.
- [ ] Testuj responsywność na desktop/mobile, overlay, touch, orientation.
- [ ] Testuj integrację z Routerem, synchronizację active state, deep linking, history.
- [ ] Monitoruj wydajność (animacje, memory, bundle size, render).
- [ ] Testuj możliwość nadpisywania stylów przez `className` i `style`, custom rendering, theme/width customization.

---

## Opcjonalne rozszerzenia

- [ ] Search w menu, keyboard shortcuts, recent items.
- [ ] Drag & Drop, reordering, persistence.
- [ ] Multi-level menus, breadcrumbs, collapse/expand all.
- [ ] Custom hooks: `useSidebarState`, `useMenuNavigation` (jeśli złożoność wymaga).
- [ ] Przenieś typy do osobnego pliku `types.ts`.

---

## Uwagi końcowe

- **Importy SCSS muszą być względne względem folderu komponentu.**
- **Rozszerzenia (types.ts, hooks/, components/) twórz tylko, gdy złożoność komponentu tego wymaga.**
- **Priorytetem jest pełna funkcjonalność i użyteczność komponentu.**
- **Testuj na prawdziwych urządzeniach mobilnych – emulatory nie oddają wszystkich niuansów.**
- **Zachowaj spójność z Headerem i instrukcją projektu (SCSS Modules, struktura plików, checklisty, eksporty, testy, Storybook, accessibility).**
- **Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.**
