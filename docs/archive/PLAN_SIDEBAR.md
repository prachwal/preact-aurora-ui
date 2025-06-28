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
```

---

## Checklist wdrożenia

### 1. Przygotowanie struktury projektu

- [x] Utwórz folder `src/components/Sidebar/`.
- [x] Sprawdź brak konfliktów nazw.

### 2. Implementacja komponentu `Sidebar.tsx`

- [x] Importuj zależności oraz style modułowe przez `import styles from './Sidebar.module.scss'`.
- [x] Zdefiniuj typy propsów (children, nav, actions, aria-label, className, style).
- [x] Komponuj elementy: nav, actions, children.
- [x] Forwarduj propsy do głównego kontenera.
- [x] Ustaw domyślną klasę CSS (np. `sidebar`).
- [x] Podstawowa obsługa a11y (aria-label, role="complementary", aria-label na nav).
- [ ] Obsługa stanu collapsed/expanded, active item, submenu visibility, mobile overlay – do rozbudowy w przyszłości.
- [ ] Obsługa zdarzeń nawigacji (kliknięcia, submenu, keyboard navigation) – do rozbudowy w przyszłości.
- [ ] Zaawansowane typy MenuItem, badge, submenu – do rozbudowy w przyszłości.
- [x] Dodaj komentarze wyjaśniające nietypowe rozwiązania (jeśli są).

---

### 3. Styling i SCSS (`Sidebar.module.scss`)

- [x] Importuj SCSS przez `@use` z folderu `styles/` (colors, spacing, typography, breakpoints).
- [x] Zdefiniuj lokalne zmienne na bazie custom properties.
- [x] Layout: flex, min-width, height, padding, z-index.
- [x] Style dla nav, actions, spacer.
- [ ] Zaawansowane style (fixed/sticky, width transitions, menu items, badge, responsywność) – do rozbudowy w przyszłości.

---

### 4. Testy jednostkowe (`Sidebar.test.tsx`)

- [x] Renderowanie z różnymi propsami (nav, actions, children).
- [x] Testy className, style, aria-label.
- [ ] Testy interakcji i responsywności – do rozbudowy w przyszłości.

---

### 5. Storybook (`Sidebar.stories.tsx`)

- [x] Podstawowe stories: nav, actions, children.
- [ ] Warianty, interaktywność, motywy – do rozbudowy w przyszłości.

---

### 6. Eksport (`index.ts`)

- [x] Eksport głównego komponentu.

---

### 7. Iteracyjne poprawki

- [x] Wykonano lint, build, build-storybook.
- [x] Poprawiono błędy formatowania i typowania.
- [x] W razie błędów poprawiano kod iteracyjnie aż do uzyskania pełnej zgodności.

---

**Zaawansowane funkcje i rozbudowa** (collapsed, submenu, badge, mocki, integracja z routingiem, mobile overlay) – do wdrożenia w kolejnych iteracjach zgodnie z checklistą i potrzebami projektu.
