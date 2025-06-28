# Plan implementacji: **Menu Dashboard Component**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego i responsywnego komponentu Menu do nawigacji (sidebar/topbar).
- Obsługa items, selectedKey, onSelect, aria, className, style, disabled, ikony.
- Wysoka dostępność (WCAG) i optymalna wydajność renderowania.
- Łatwa integracja z Layoutem i Sidebar aplikacji.

### Architektura folderu

```
Menu/
├── Menu.tsx           # Główny komponent
├── Menu.module.scss   # Style SCSS Modules
├── Menu.test.tsx      # Testy jednostkowe
├── Menu.stories.tsx   # Storybook
├── index.ts           # Eksport publiczny
```

---

## 2. Checklist: Implementacja komponentu Menu

### 2.1 Przygotowanie struktury projektu

- [x] Utwórz folder `src/components/Menu/`
- [x] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Menu.tsx`)

- [x] Import zależności: Preact, JSX, SCSS Module
- [x] Definicja interfejsu MenuProps (items, className, style, selectedKey, onSelect, aria-label)
- [x] Renderowanie nawigacji z aria-label
- [x] Renderowanie listy, obsługa selected, disabled, ikony
- [x] Obsługa propsów `className`, `style`, `aria-label`, `selectedKey`, `onSelect`, `items`, `icon`, `disabled`
- [x] Zaawansowane propsy (warianty, submenu, keyboard) – do rozbudowy w przyszłości

### 2.3 Style (`Menu.module.scss`)

- [x] Importy SCSS: colors, spacing, typography, breakpoints
- [x] Lokalne zmienne na bazie custom properties
- [x] Layout: flex, padding, border-radius, selected, disabled
- [x] Zaawansowane style (warianty, responsywność) – do rozbudowy w przyszłości

### 2.4 Testy jednostkowe (`Menu.test.tsx`)

- [x] Renderowanie z różnymi propsami (items, className, style, selectedKey, onSelect, aria-label)
- [x] Testy interakcji i responsywności – do rozbudowy w przyszłości

### 2.5 Storybook (`Menu.stories.tsx`)

- [x] Podstawowe stories: items, selectedKey
- [x] Warianty, interaktywność, motywy – do rozbudowy w przyszłości

### 2.6 Eksport (`index.ts`)

- [x] Eksport głównego komponentu

### 2.7 Iteracyjne poprawki

- [x] Wykonano lint, build, build-storybook
- [x] Poprawiono błędy formatowania i typowania
- [x] W razie błędów poprawiano kod iteracyjnie aż do uzyskania pełnej zgodności

---

**Zaawansowane funkcje i rozbudowa** (warianty, submenu, keyboard, mocki, motywy) – do wdrożenia w kolejnych iteracjach zgodnie z checklistą i potrzebami projektu.
