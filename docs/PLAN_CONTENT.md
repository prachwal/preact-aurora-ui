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
└── types.ts              # (opcjonalnie) Typy propsów
```

---

## Checklist wdrożenia

### 1. Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/Content/`.
- [ ] Sprawdź brak konfliktów nazw.

### 2. Implementacja komponentu `Content.tsx`

- [ ] Importuj `ComponentChildren`, `JSX` z `preact` oraz style modułowe przez `import styles from './Content.module.scss'`.
- [ ] Zdefiniuj interfejs `ContentProps`:
  - `children: ComponentChildren` (wymagane)
  - `className?: string`
  - `style?: JSX.CSSProperties`
  - `overflow?: 'auto' | 'hidden' | 'scroll' | 'visible'` (domyślnie 'auto')
  - `padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'` (domyślnie 'md')
- [ ] Renderuj semantyczny `<main>` z odpowiednimi klasami na podstawie propsów.
- [ ] Przekazuj dodatkowe propsy (`className`, `style`).
- [ ] Dodaj komentarze wyjaśniające nietypowe rozwiązania.

#### Przykład kodu:

```tsx
import { ComponentChildren, JSX } from "preact";
import styles from "./Content.module.scss";

interface ContentProps {
  children: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  overflow?: "auto" | "hidden" | "scroll" | "visible";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export function Content({
  children,
  className = "",
  style,
  overflow = "auto",
  padding = "md",
}: ContentProps) {
  const classes = [
    styles["content-main"],
    styles[`content--overflow-${overflow}`],
    styles[`content--padding-${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <main className={classes} style={style}>
      {children}
    </main>
  );
}
```

---

### 3. Styling i SCSS (`Content.module.scss`)

- [ ] Importuj SCSS przez `@use` z folderu `styles/` (wszystkie importy względne względem folderu komponentu):
  - `@use "../styles/colors.scss" as *;`
  - `@use "../styles/spacing.scss" as *;`
  - `@use "../styles/typography.scss" as *;`
  - `@use "../styles/mixins.scss" as *;` (opcjonalnie)
  - `@use "../styles/breakpoints.scss" as *;`
- [ ] Zdefiniuj lokalne zmienne na bazie custom properties:
  - `$content-bg: var(--color-background-primary);`
  - `$content-default-padding: $spacing-lg;`
  - `$content-border-radius: $spacing-xs;`
- [ ] Zapewnij, że `.content-main` zajmuje całą dostępną przestrzeń (`flex-grow: 1` lub odpowiedni grid).
- [ ] Ustaw domyślny padding i klasy dla różnych wariantów paddingu.
- [ ] Dodaj klasy dla różnych wariantów overflow.
- [ ] Zapewnij responsywność (media queries na bazie breakpoints.scss).
- [ ] Wspieraj motyw jasny/ciemny przez zmienne CSS.

#### Przykład nagłówka SCSS:

```scss
@use "../styles/colors.scss" as *;
@use "../styles/spacing.scss" as *;
@use "../styles/typography.scss" as *;
@use "../styles/breakpoints.scss" as *;

$content-bg: var(--color-background-primary);
$content-default-padding: $spacing-lg;
$content-border-radius: $spacing-xs;
```

---

### 4. Testy jednostkowe (`Content.test.tsx`)

- [ ] Testuj renderowanie z prostym tekstem i złożonymi children.
- [ ] Testuj różne warianty padding i overflow (sprawdź klasy CSS).
- [ ] Testuj przekazywanie `className` i `style`.
- [ ] Testuj, czy główny element to `<main>` i czy jest dostępny.

---

### 5. Storybook (`Content.stories.tsx`)

- [ ] Stwórz historie dla:
  - prostego tekstu
  - długiego tekstu (scrollowanie)
  - wszystkich wariantów padding
  - wszystkich wariantów overflow
  - złożonej zawartości (mockowe Card, Grid, PageHeader)
  - trybu jasnego i ciemnego

---

### 6. Eksport (`index.ts`)

- [ ] Eksportuj komponent i typy z folderu Content.

---

### 7. Manualne testy integracyjne

- [ ] Użyj Content w Layout jako główne `<main>`.
- [ ] Sprawdź współpracę z Header, Sidebar, Footer.
- [ ] Sprawdź integrację z Grid/Row/Col i Card.
- [ ] Testuj responsywność i wydajność na różnych urządzeniach i przeglądarkach.
- [ ] Testuj możliwość nadpisywania stylów przez `className` i `style`.

---

## Opcjonalne rozszerzenia

- [ ] Przenieś typy do osobnego pliku `types.ts`.

---

## Uwagi końcowe

- **Importy SCSS zawsze powinny być względne względem folderu komponentu.**
- **Dodatkowe pliki (`types.ts`) twórz tylko, gdy złożoność komponentu tego wymaga.**
- **Priorytetem jest pełna funkcjonalność i użyteczność komponentu.**
- **Testuj na prawdziwych urządzeniach mobilnych – emulatory nie oddają wszystkich niuansów.**
- **Zachowaj spójność z istniejącymi komponentami i instrukcją projektu (SCSS Modules, struktura plików, checklisty, eksporty, testy, Storybook, accessibility).**
- **Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.**
