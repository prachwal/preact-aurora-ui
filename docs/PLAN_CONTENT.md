# Plan implementacji: Komponent Content

---

## Cel

Stworzenie elastycznego, dostępnego i rozszerzalnego komponentu `Content` jako głównego kontenera na dynamiczną zawartość dashboardu, zgodnie z architekturą projektu, zasadami SCSS Modules oraz checklistami wdrożeniowymi.

---

## Struktura plików

```
src/components/Content/
├── Content.tsx           # Główny komponent
├── Content.module.scss   # Style modułowe
├── Content.test.tsx      # Testy jednostkowe (Vitest + Testing Library)
├── Content.stories.tsx   # Storybook (dokumentacja i demo)
├── index.ts              # Eksporty
```

---

## Checklist wdrożenia

### 1. Przygotowanie struktury projektu

- [x] Utwórz folder `src/components/Content/`.
- [x] Sprawdź brak konfliktów nazw.

### 2. Implementacja komponentu `Content.tsx`

- [x] Importuj `ComponentChildren`, `JSX` z `preact` oraz style modułowe przez `import styles from './Content.module.scss'`.
- [x] Zdefiniuj interfejs `ContentProps` (children, className, style, aria-label).
- [x] Renderuj semantyczny `<main>` z odpowiednimi klasami na podstawie propsów.
- [x] Przekazuj dodatkowe propsy (`className`, `style`).
- [x] Dodaj komentarze wyjaśniające nietypowe rozwiązania (jeśli są).
- [ ] Zaawansowane propsy (overflow, padding) – do rozbudowy w przyszłości.

---

### 3. Styling i SCSS (`Content.module.scss`)

- [x] Importuj SCSS przez `@use` z folderu `styles/` (colors, spacing, typography, breakpoints).
- [x] Zdefiniuj lokalne zmienne na bazie custom properties.
- [x] Layout: flex, width, min-height, padding, box-sizing.
- [ ] Zaawansowane style (overflow, padding warianty, responsywność) – do rozbudowy w przyszłości.

---

### 4. Testy jednostkowe (`Content.test.tsx`)

- [x] Renderowanie z różnymi propsami (children, className, style, aria-label).
- [ ] Testy interakcji i responsywności – do rozbudowy w przyszłości.

---

### 5. Storybook (`Content.stories.tsx`)

- [x] Podstawowe stories: children, custom class.
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

**Zaawansowane funkcje i rozbudowa** (overflow, padding, mocki, integracja z routingiem, motywy) – do wdrożenia w kolejnych iteracjach zgodnie z checklistą i potrzebami projektu.
