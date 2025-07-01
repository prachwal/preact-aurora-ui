---
applyTo: '**'
---

# Organizacja plików checklist

- Wszystkie pliki z checklistami, dokumentacją wdrożeniową i podobnymi należy umieszczać w podfolderze `docs/` w katalogu głównym projektu, a nie bezpośrednio w katalogu głównym.
- Przykład: checklistę dashboardu znajdziesz w `docs/DASHBOARD_CHECKLIST.md`.

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
    @use '../styles/colors.scss' as *;
    @use '../styles/typography.scss' as *;
    @use '../styles/spacing.scss' as *;
    ```
  - W nagłówku definiować lokalne zmienne SCSS (np. `$button-bg`) i przypisywać im wartości z globalnych custom properties (np. `var(--color-primary)`).
  - Dzięki temu można nadpisać dowolny parametr lokalnie lub globalnie przez kaskadę.
  - To samo dotyczy innych parametrów (spacing, font, border-radius itd.).
- Globalne zmienne CSS (np. kolory, spacing, fonty) są zdefiniowane w `src/styles/colors.scss`, `src/styles/typography.scss`, `src/styles/spacing.scss`.
- Motyw jasny/ciemny oraz podmiana palety kolorów odbywa się przez nadpisanie custom properties na `:root` lub `[data-theme='dark']`.
- Przykład w `ExampleButton/ExampleButton.module.scss`.

## Przykład nagłówka SCSS komponentu

```scss
@use '../styles/colors.scss' as *;
@use '../styles/typography.scss' as *;
@use '../styles/spacing.scss' as *;

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
  import { render, screen, fireEvent } from '@testing-library/preact';
  import userEvent from '@testing-library/user-event';
  import { describe, it, expect, vi } from 'vitest';
  import { ExampleButton } from './ExampleButton';
  import '@testing-library/jest-dom';
  ```

### Testy eventów (focus, blur, click, keyboard)

- **ZAWSZE używaj `userEvent` i `async/await` dla testów związanych z eventami użytkownika** (focus, blur, click, keyboard, hover).
- **NIE używaj `fireEvent` dla interakcji użytkownika** - zostaw `fireEvent` tylko dla testów niskiego poziomu (np. `fireEvent.input` do symulacji zmiany wartości).
- Przykład prawidłowego testu eventów:

```tsx
it('calls onFocus and onBlur', async () => {
  const user = userEvent.setup();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();
  render(<TextField onFocus={handleFocus} onBlur={handleBlur} />);

  const input = screen.getByRole('textbox');

  await user.click(input); // powoduje focus
  expect(handleFocus).toHaveBeenCalled();

  await user.tab(); // przenosi focus gdzie indziej = blur
  expect(handleBlur).toHaveBeenCalled();
});

it('handles keyboard events', async () => {
  const user = userEvent.setup();
  const handleKeyDown = vi.fn();
  render(<Component onKeyDown={handleKeyDown} />);

  const element = screen.getByRole('...');
  await user.type(element, 'Hello');
  await user.keyboard('{Escape}');

  expect(handleKeyDown).toHaveBeenCalled();
});
```

- `userEvent` symuluje prawdziwe zachowanie użytkownika i jest bardziej niezawodny niż `fireEvent`.
- Wszystkie funkcje `userEvent` są asynchroniczne - zawsze używaj `await`.

## Zasady

- Nie używamy już goober ani CSS-in-JS.
- Wszystkie style komponentów są w SCSS Modules.
- Zmienne lokalne zawsze pobierają wartości z globalnych custom properties.
- Łatwość nadpisania dowolnego parametru przez kaskadę lub motyw.
- Struktura folderu i plików powinna być spójna dla wszystkich komponentów.
