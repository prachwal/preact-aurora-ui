# Plan implementacji: **Komponent Menu**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie uniwersalnego i elastycznego komponentu menu (Menu) do nawigacji bocznej (Sidebar) i górnej (Header).
- Obsługa różnych typów elementów menu (linki, grupy zagnieżdżone, separatory).
- Obsługa stanu aktywnego elementu, zwijania/rozwijania podmenu.
- Wysoka dostępność (WCAG), optymalna wydajność.
- Integracja z routingiem, Sidebar, Header.

### Architektura folderu

```
Menu/
├── Menu.tsx             # Główny komponent
├── Menu.module.scss     # Style modułowe
├── Menu.test.tsx        # Testy jednostkowe
├── Menu.stories.tsx     # Storybook
├── index.ts             # Eksport publiczny
// (opcjonalnie) types.ts        # Typy dla propsów
// (opcjonalnie) MenuLink.tsx    # Komponent linku
// (opcjonalnie) MenuGroup.tsx   # Komponent grupy
```

---

## 2. Checklist: Implementacja komponentu Menu

### 2.1 Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/Menu/`
- [ ] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Menu.tsx`)

- [ ] Import zależności: Preact, JSX, useState/useEffect, SCSS Module
- [ ] Definicja interfejsów:

  ```ts
  import { JSX, ComponentChildren } from "preact";
  // import styles from "./Menu.module.scss";

  export interface MenuItem {
    id: string;
    label: string;
    type: "link" | "group" | "divider";
    href?: string;
    icon?: ComponentChildren;
    badge?: string | number;
    active?: boolean;
    disabled?: boolean;
    onClick?: (item: MenuItem) => void;
    children?: MenuItem[];
    isExpanded?: boolean;
  }

  export interface MenuProps {
    items: MenuItem[];
    direction?: "vertical" | "horizontal";
    isCollapsed?: boolean;
    activeItemId?: string;
    onItemClick?: (item: MenuItem) => void;
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie:
  - [ ] Główny kontener menu
  - [ ] Iteracja po `items`, warunkowe renderowanie po `type`
  - [ ] Link: `<a>` lub `<div>`
  - [ ] Group: nagłówek, podmenu (rekurencyjne lub dedykowany komponent)
  - [ ] Divider: pozioma linia
  - [ ] Props `className`, `style`
- [ ] Obsługa stanu: rozwinięcie podmenu (useState/isExpanded), aktywny element (activeItemId), podświetlanie grup nadrzędnych
- [ ] Obsługa interakcji: kliknięcia, rozwijanie grup, obsługa href
- [ ] Accessibility: role="menu", role="menuitem", role="group", aria-haspopup, aria-expanded, nawigacja klawiaturą

### 2.3 Styling i responsywność (`Menu.module.scss`)

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
  $menu-item-height: 3rem;
  $menu-item-padding-x: $spacing-lg;
  $menu-item-padding-y: $spacing-sm;
  $menu-bg: var(--color-surface-primary);
  $menu-item-text-color: var(--color-text-secondary);
  $menu-item-hover-bg: var(--color-action-hover);
  $menu-item-active-bg: var(--color-action-active);
  $menu-item-active-text-color: var(--color-text-primary);
  $menu-item-icon-size: 1.25rem;
  $menu-transition: 0.2s ease-out;
  ```
- [ ] Layout: kontener menu, direction (vertical/horizontal), elementy MenuItem, divider
- [ ] Styling linków, badge, ikon
- [ ] Styling grup: nagłówek, animacja strzałki, wcięcie, przejścia podmenu
- [ ] Styling isCollapsed: tylko ikony, ukryty tekst, tooltips
- [ ] Responsive design: czytelność etykiet/ikon, media queries
- [ ] Theme support: custom properties, transitions

### 2.4 Testy jednostkowe (`Menu.test.tsx`)

- [ ] Renderowanie: pusta tablica, proste linki, grupy, zagnieżdżenia, separatory
- [ ] Klasy direction (vertical/horizontal)
- [ ] Renderowanie MenuItem: typy, icon, badge
- [ ] Interakcje: kliknięcia, rozwijanie grup, stany hover/focus
- [ ] Stany: active, isCollapsed, disabled
- [ ] Accessibility: role, aria, klawiatura

### 2.5 Storybook (`Menu.stories.tsx`)

- [ ] Basic: linki, pionowe/horizontalne menu
- [ ] Content: ikony, badge, głębokie zagnieżdżenia, wyłączone, długie etykiety
- [ ] Interactive: rozwijanie podmenu, activeItemId, isCollapsed, stany hover/focus
- [ ] Theme: tryb jasny/ciemny
- [ ] Responsywność

### 2.6 Eksport (`index.ts`)

- [ ] Eksportuj `Menu` i ewentualne typy

### 2.7 Manualne testy integracyjne

- [ ] Integracja z Sidebar: isCollapsed, linki, podmenu
- [ ] Integracja z Header: menu poziome, overlay
- [ ] Integracja z routingiem: kliknięcia, synchronizacja activeItemId
- [ ] Responsywność: przeglądarki, urządzenia
- [ ] Wydajność
- [ ] Nadpisywanie stylów przez `className` i `style`

---

## 3. Opcjonalne rozszerzenia

- [ ] Custom hook `useMenuNavigation` do zarządzania aktywnym elementem i rozwinięciem grup
- [ ] Przenieś typy do `types.ts` jeśli komponent jest złożony
- [ ] Dedykowane komponenty: `MenuLink.tsx`, `MenuGroup.tsx`

---

## 4. Uwagi końcowe

- Importy SCSS zawsze względne względem folderu komponentu.
- Dodatkowe pliki (`types.ts`, `hooks/`, mniejsze komponenty) tylko jeśli złożoność tego wymaga.
- Priorytet: najpierw funkcjonalność i użyteczność, potem rozszerzenia.
- Testuj na prawdziwych urządzeniach mobilnych.
- Zachowaj spójność z Header, Sidebar, Layout i ogólnymi wytycznymi projektu.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
