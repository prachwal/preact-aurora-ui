# Plan implementacji: **Card Dashboard Component**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego i responsywnego komponentu Card do prezentacji danych/statystyk.
- Obsługa tytułu, podtytułu, akcji, children, aria, className, style.
- Wysoka dostępność (WCAG) i optymalna wydajność renderowania.
- Łatwa integracja z Layoutem i Gridem aplikacji.

### Architektura folderu

```
Card/
├── Card.tsx           # Główny komponent
├── Card.module.scss   # Style SCSS Modules
├── Card.test.tsx      # Testy jednostkowe
├── Card.stories.tsx   # Storybook
├── index.ts           # Eksport publiczny
```

---

## 2. Checklist: Implementacja komponentu Card

### 2.1 Przygotowanie struktury projektu

- [x] Utwórz folder `src/components/Card/`
- [x] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Card.tsx`)

- [x] Import zależności: Preact, JSX, SCSS Module
- [x] Definicja interfejsu CardProps (children, className, style, title, subtitle, actions, aria-label)
- [x] Renderowanie sekcji z aria-label
- [x] Renderowanie tytułu, podtytułu, akcji, children
- [x] Obsługa propsów `className`, `style`, `aria-label`, `actions`, `title`, `subtitle`
- [x] Zaawansowane propsy (warianty, loading, skeleton) – do rozbudowy w przyszłości

### 2.3 Style (`Card.module.scss`)

- [x] Importy SCSS: colors, spacing, typography, breakpoints
- [x] Lokalne zmienne na bazie custom properties
- [x] Layout: flex, padding, border-radius, box-shadow
- [x] Zaawansowane style (warianty, responsywność) – do rozbudowy w przyszłości

### 2.4 Testy jednostkowe (`Card.test.tsx`)

- [x] Renderowanie z różnymi propsami (children, className, style, title, subtitle, actions, aria-label)
- [x] Testy interakcji i responsywności – do rozbudowy w przyszłości

### 2.5 Storybook (`Card.stories.tsx`)

- [x] Podstawowe stories: title, subtitle, actions
- [x] Warianty, interaktywność, motywy – do rozbudowy w przyszłości

### 2.6 Eksport (`index.ts`)

- [x] Eksport głównego komponentu

### 2.7 Iteracyjne poprawki

- [x] Wykonano lint, build, build-storybook
- [x] Poprawiono błędy formatowania i typowania
- [x] W razie błędów poprawiano kod iteracyjnie aż do uzyskania pełnej zgodności

---

**Zaawansowane funkcje i rozbudowa** (warianty, loading, skeleton, mocki, motywy) – do wdrożenia w kolejnych iteracjach zgodnie z checklistą i potrzebami projektu.
