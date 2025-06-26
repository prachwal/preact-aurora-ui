# Plan implementacji: **Komponent Drawer / Modal**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie uniwersalnego komponentu do wyświetlania tymczasowej zawartości: panel wysuwany (Drawer) lub modalne okno (Modal).
- Elastyczność pozycjonowania i rozmiaru (góra, dół, lewo, prawo, center).
- Obsługa otwierania/zamykania (przycisk, overlay, Escape).
- Wysoka dostępność (WCAG), zarządzanie fokusem, aria-modal, płynne animacje.
- Integracja z Menu, Content, innymi komponentami.

### Architektura folderu

```
Drawer/
├── Drawer.tsx           # Główny komponent
├── Drawer.module.scss   # Style modułowe
├── Drawer.test.tsx      # Testy jednostkowe
├── Drawer.stories.tsx   # Storybook
├── index.ts             # Eksport publiczny
// (opcjonalnie) types.ts # Typy dla propsów (jeśli potrzeba)
```

---

## 2. Checklist: Implementacja komponentu Drawer / Modal

### 2.1 Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/Drawer/`
- [ ] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Drawer.tsx`)

- [ ] Import zależności: Preact, JSX, useState/useEffect/useRef, SCSS Module
- [ ] Definicja interfejsu:

  ```ts
  import { ComponentChildren, JSX } from "preact";
  import { useState, useEffect, useRef } from "preact/hooks";
  import styles from "./Drawer.module.scss";

  export type DrawerPosition = "top" | "bottom" | "left" | "right" | "center";

  export interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: ComponentChildren;
    position?: DrawerPosition;
    width?: string;
    height?: string;
    isModal?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    title?: string;
    showCloseButton?: boolean;
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie:
  - [ ] Warunkowe renderowanie (isOpen/animacja)
  - [ ] Overlay (jeśli isModal)
  - [ ] Panel Drawer/Modal z children
  - [ ] Nagłówek: title, showCloseButton
  - [ ] Przycisk zamknięcia
  - [ ] Props `className`, `style`
- [ ] Obsługa stanu i cyklu życia: animacje (is-opening, is-closing), useEffect (keydown, overlay click), blokowanie scrolla, zarządzanie fokusem (focus trap)
- [ ] Obsługa interakcji: onClose (przycisk, overlay, Escape), przejścia CSS
- [ ] Accessibility: role="dialog"/"alertdialog", aria-modal, aria-labelledby, aria-describedby, aria-label, focus trap

### 2.3 Styling i responsywność (`Drawer.module.scss`)

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
  $drawer-bg: var(--color-surface-primary);
  $drawer-border-radius: $spacing-xs;
  $drawer-shadow: var(--shadow-xl);
  $drawer-transition-duration: 0.3s;
  $drawer-z-index: 2000;
  $overlay-bg: rgba(0, 0, 0, 0.5);
  $close-button-color: var(--color-text-secondary);
  $close-button-hover-color: var(--color-text-primary);
  $close-button-size: 2rem;
  ```
- [ ] Layout: overlay, panel, pozycjonowanie (fixed, transform), wymiary, nagłówek, przycisk zamknięcia
- [ ] Animacje/przejścia: transition, transform, opacity, klasy .is-opening/.is-closing
- [ ] Responsive design: media queries, width/height na mobile, centrowanie
- [ ] Theme support: custom properties, transitions

### 2.4 Testy jednostkowe (`Drawer.test.tsx`)

- [ ] Renderowanie: isOpen, różne position, title, przycisk zamknięcia
- [ ] Interakcje: kliknięcie przycisku, overlay, Escape, warunki zamknięcia
- [ ] Accessibility: role, aria, focus, blokowanie scrolla

### 2.5 Storybook (`Drawer.stories.tsx`)

- [ ] Basic: Drawer z prawej, Modal center, otwieranie/zamykanie
- [ ] Variants: top, bottom, left, custom width/height
- [ ] Content: tekst, formularz, długa zawartość, tytuł, przycisk zamknięcia
- [ ] Interaction: overlay click, tylko przycisk, mobile, Addon Viewports
- [ ] Theme: tryb jasny/ciemny

### 2.6 Eksport (`index.ts`)

- [ ] Eksportuj `Drawer` i ewentualne typy

### 2.7 Manualne testy integracyjne

- [ ] Integracja z Content: formularze, detale, overlay
- [ ] Integracja z Menu: Drawer jako mobilne menu
- [ ] Responsywność: przeglądarki, urządzenia
- [ ] Wydajność: animacje, płynność
- [ ] Nadpisywanie stylów przez `className` i `style`

---

## 3. Opcjonalne rozszerzenia

- [ ] Custom hook `useDrawer`/`useModal` do zarządzania stanem, blokowaniem scrolla, fokusem
- [ ] Przenieś typy do `types.ts` jeśli komponent jest złożony

---

## 4. Uwagi końcowe

- Importy SCSS zawsze względne względem folderu komponentu.
- Dodatkowe pliki (`types.ts`, `hooks/`) tylko jeśli złożoność tego wymaga.
- Priorytet: najpierw funkcjonalność i użyteczność, potem rozszerzenia.
- Testuj na prawdziwych urządzeniach mobilnych.
- Zachowaj spójność z Header, Sidebar, Layout, Menu i ogólnymi wytycznymi projektu.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
