---
applyTo: '**'
---

# SCSS Style System

- Każdy komponent znajduje się w osobnym podfolderze w `src/components/ComponentName/`:
  - `ComponentName.tsx` – kod komponentu (TSX, typowanie z Preact, import SCSS Module przez `import styles from './ComponentName.module.scss'`).
  - `ComponentName.module.scss` – styl lokalny komponentu, korzystający z `@use` do ładowania bazowych zmiennych i definiowania lokalnych zmiennych na bazie globalnych custom properties.
  - `ComponentName.test.tsx` – testy jednostkowe (Vitest + Testing Library).
  - `ComponentName.stories.tsx` – plik Storybooka (jeśli dokumentujesz komponent).
  - `index.ts` – eksporty komponentów z folderu (ułatwia importy w innych projektach).

## SCSS
- Każdy plik SCSS komponentu powinien:
  - Używać `@use` (nie `@import`) do ładowania bazowych plików SCSS:
    ```scss
    @use '../../styles/colors.scss' as *;
    @use '../../styles/typography.scss' as *;
    @use '../../styles/spacing.scss' as *;
    ```
  - W nagłówku definiować lokalne zmienne SCSS (np. `$button-bg`) i przypisywać im wartości z globalnych custom properties (np. `var(--color-primary)`).
  - Dzięki temu można nadpisać dowolny parametr lokalnie lub globalnie przez kaskadę.
  - To samo dotyczy innych parametrów (spacing, font, border-radius itd.).
- Globalne zmienne CSS (np. kolory, spacing, fonty) są zdefiniowane w `src/styles/colors.scss`, `src/styles/typography.scss`, `src/styles/spacing.scss`.
- Motyw jasny/ciemny oraz podmiana palety kolorów odbywa się przez nadpisanie custom properties na `:root` lub `[data-theme='dark']`.
- Przykład w `ExampleButton/ExampleButton.module.scss`.

## Przykład nagłówka SCSS komponentu
```scss
@use '../../styles/colors.scss' as *;
@use '../../styles/typography.scss' as *;
@use '../../styles/spacing.scss' as *;

// Lokalne zmienne na bazie globalnych custom properties
$button-bg: var(--color-primary);
$button-bg-hover: var(--color-primary-dark);
$button-color: var(--color-text);
$button-radius: 4px;
$button-padding: var(--space-sm) var(--space-lg);
$button-font-size: var(--font-size-base);
```

## Testy komponentów
- Używaj `vitest`, `@testing-library/preact`, `@testing-library/jest-dom`.
- Importy w testach:
  ```tsx
  import { render, screen } from '@testing-library/preact';
  import { describe, it, expect } from 'vitest';
  import { ExampleButton } from './ExampleButton';
  import '@testing-library/jest-dom';
  ```

## Zasady
- Nie używamy już goober ani CSS-in-JS.
- Wszystkie style komponentów są w SCSS Modules.
- Zmienne lokalne zawsze pobierają wartości z globalnych custom properties.
- Łatwość nadpisania dowolnego parametru przez kaskadę lub motyw.
- Struktura folderu i plików powinna być spójna dla wszystkich komponentów.