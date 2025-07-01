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

- [x] Utwórz folder `src/components/PageHeader/`
- [x] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`PageHeader.tsx`)

- [x] Import zależności: Preact, JSX, SCSS Module
- [x] Definicja interfejsów PageHeaderProps (title, subtitle, actions, className, style, aria-label)
- [x] Renderowanie semantycznego tagu `<header>` z aria-label
- [x] Renderowanie tytułu, podtytułu, akcji
- [x] Obsługa propsów `className`, `style`, `aria-label`, `actions`
- [x] Integracja z Breadcrumbs – do rozbudowy w przyszłości
- [x] Zaawansowane propsy (description, breadcrumbs, warianty) – do rozbudowy w przyszłości

### 2.3 Style (`PageHeader.module.scss`)

- [x] Importy SCSS: colors, spacing, typography, breakpoints
- [x] Lokalne zmienne na bazie custom properties
- [x] Layout: flex, padding, typografia, spacing
- [x] Zaawansowane style (warianty, responsywność) – do rozbudowy w przyszłości

### 2.4 Testy jednostkowe (`PageHeader.test.tsx`)

- [x] Renderowanie z różnymi propsami (title, subtitle, actions, className, style, aria-label)
- [x] Testy interakcji i responsywności – do rozbudowy w przyszłości

### 2.5 Storybook (`PageHeader.stories.tsx`)

- [x] Podstawowe stories: title, subtitle, actions
- [x] Warianty, interaktywność, motywy – do rozbudowy w przyszłości

### 2.6 Eksport (`index.ts`)

- [x] Eksport głównego komponentu

### 2.7 Iteracyjne poprawki

- [x] Wykonano lint, build, build-storybook
- [x] Poprawiono błędy formatowania i typowania
- [x] W razie błędów poprawiano kod iteracyjnie aż do uzyskania pełnej zgodności

---

**Zaawansowane funkcje i rozbudowa** (breadcrumbs, description, warianty, aria, mocki, motywy) – do wdrożenia w kolejnych iteracjach zgodnie z checklistą i potrzebami projektu.
