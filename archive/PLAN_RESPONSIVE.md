# Plan implementacji: Responsive utilities (`useBreakpoint` Hook)

---

## Cel

Stworzenie profesjonalnego, wydajnego haka `useBreakpoint` do dynamicznego wykrywania aktualnego breakpointa urządzenia (np. sm, md, lg, xl) w aplikacji Preact, zgodnie z architekturą projektu, zasadami SCSS Modules oraz checklistami wdrożeniowymi.

---

## Struktura plików

```
src/components/Responsive/
├── useBreakpoint.ts           # Główny hook
├── useBreakpoint.test.ts      # Testy jednostkowe (Vitest + Testing Library)
├── useBreakpoint.stories.tsx  # Storybook (dokumentacja i demo)
├── index.ts                   # Eksporty
└── types.ts                   # (opcjonalnie) Typy breakpointów
```

---

## Checklist wdrożenia

### 1. Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/Responsive/`.
- [ ] Sprawdź brak konfliktów nazw.

### 2. Implementacja hooka `useBreakpoint.ts`

- [ ] Importuj `useState`, `useEffect`, `useCallback` z `preact/hooks`.
- [ ] Zdefiniuj obiekt `breakpoints` (wartości muszą być identyczne jak w `src/styles/breakpoints.scss`).
- [ ] Zdefiniuj typ `Breakpoint` (`'xs' | 'sm' | 'md' | 'lg' | 'xl'`).
- [ ] Utwórz funkcję `getBreakpoint(width: number): Breakpoint`.
- [ ] Zaimplementuj hook `useBreakpoint`:
  - [ ] Stan początkowy na podstawie `window.innerWidth`.
  - [ ] Obsługa zdarzenia `resize` z debouncingiem (150ms).
  - [ ] Zwracaj aktualny breakpoint jako string.
- [ ] Dodaj komentarze wyjaśniające nietypowe rozwiązania.

#### Przykład kodu:

```ts
import { useState, useEffect, useCallback } from "preact/hooks";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const getBreakpoint = (width: number): Breakpoint => {
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs";
};

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    getBreakpoint(window.innerWidth)
  );

  const handleResize = useCallback(() => {
    setBreakpoint(getBreakpoint(window.innerWidth));
  }, []);

  useEffect(() => {
    let timeoutId: number;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };
    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  return breakpoint;
};
```

---

### 3. Styling i SCSS

- Hak nie posiada pliku SCSS – jest narzędziem logicznym.
- [ ] Upewnij się, że wartości breakpointów w JS i w `src/styles/breakpoints.scss` są identyczne.
- [ ] Synchronizuj zmienne przez dokumentację lub (zaawansowane) automatyczny import.

---

### 4. Testy jednostkowe (`useBreakpoint.test.ts`)

- [ ] Test początkowego breakpointa (mock `window.innerWidth`).
- [ ] Test zmiany breakpointa (mock resize + zmiana szerokości).
- [ ] Test debouncingu (symulacja szybkich resize, sprawdzenie wywołań).
- [ ] Test wartości granicznych (np. 639, 640, 767, 768).

---

### 5. Storybook (`useBreakpoint.stories.tsx`)

- [ ] Stwórz prosty komponent demo wyświetlający aktualny breakpoint.
- [ ] Dodaj opis i parametry do Storybooka.
- [ ] Użyj Addon Viewports do testowania responsywności.

#### Przykład:

```tsx
import { h } from "preact";
import { useBreakpoint } from "./useBreakpoint";

export default {
  title: "Responsive/useBreakpoint",
  component: () => null,
  parameters: {
    docs: {
      description: {
        component:
          "Hook `useBreakpoint` do dynamicznego wykrywania aktualnego breakpointa na podstawie szerokości okna.",
      },
    },
  },
};

const BreakpointDisplay = () => {
  const breakpoint = useBreakpoint();
  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <p>
        Aktualny breakpoint: <strong>{breakpoint}</strong>
      </p>
      <p>Zmień rozmiar okna przeglądarki, aby zobaczyć zmiany.</p>
      <p>
        Breakpointy: xs (&lt;640px), sm (≥640px), md (≥768px), lg (≥1024px), xl
        (≥1280px)
      </p>
    </div>
  );
};

export const Default = () => <BreakpointDisplay />;
```

---

### 6. Eksport (`index.ts`)

- [ ] Eksportuj hook i typy z folderu Responsive.

---

### 7. Manualne testy integracyjne

- [ ] Użyj hooka w Layout, Sidebar, Header, Card, Grid/Row/Col.
- [ ] Sprawdź synchronizację JS/CSS na różnych przeglądarkach i urządzeniach.
- [ ] Monitoruj wydajność (debouncing, płynność).

---

## Opcjonalne rozszerzenia

- [ ] Przenieś typy do osobnego pliku `types.ts`.
- [ ] Rozważ automatyczną synchronizację breakpointów JS/SCSS.

---

## Uwagi końcowe

- **Synchronizacja breakpointów:** wartości w JS i SCSS muszą być identyczne.
- **Debouncing:** kluczowy dla wydajności – nie wywołuj handleResize zbyt często.
- **Testuj na prawdziwych urządzeniach mobilnych** – emulatory nie oddają wszystkich niuansów.
- **Zachowaj spójność z instrukcją projektu** (SCSS Modules, struktura plików, checklisty, eksporty, testy, Storybook, accessibility).
- **Dokumentuj nietypowe rozwiązania** w kodzie lub Storybooku.
