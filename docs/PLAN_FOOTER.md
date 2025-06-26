# Plan implementacji: **Footer Dashboard Component**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie elastycznego i responsywnego komponentu stopki (Footer) dla dashboardu.
- Wyświetlanie informacji o prawach autorskich, linków prawnych (polityka prywatności, warunki użytkowania) oraz ewentualnie numeru wersji aplikacji lub krótkiego menu.
- Spójny wygląd i umiejscowienie stopki we wszystkich widokach aplikacji, w harmonii z komponentem Layout.
- Obsługa różnych wariantów zawartości (z/bez linków, różne informacje) – reużywalność.
- Wysoka dostępność (WCAG) i optymalna wydajność renderowania.

### Architektura folderu

```
Footer/
├── Footer.tsx             # Główny komponent stopki
├── Footer.module.scss     # Style modułowe (SCSS Modules)
├── Footer.test.tsx        # Testy jednostkowe
├── Footer.stories.tsx     # Storybook
├── index.ts               # Eksport publiczny
// (opcjonalnie) types.ts  # Typy dla propsów (jeśli potrzeba)
```

---

## 2. Checklist: Implementacja komponentu Footer

### 2.1 Przygotowanie struktury projektu

- [ ] Utwórz folder `src/components/Footer/`
- [ ] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Footer.tsx`)

- [ ] Import zależności: Preact, JSX, SCSS Module
- [ ] Definicja interfejsów:

  ```ts
  import { JSX } from "preact";
  import styles from "./Footer.module.scss";

  export interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
  }

  export interface FooterProps {
    copyrightText?: string;
    links?: FooterLink[];
    version?: string;
    className?: string;
    style?: JSX.CSSProperties;
  }
  ```

- [ ] Renderowanie:
  - [ ] Semantyczny tag `<footer>` z `role="contentinfo"`
  - [ ] Renderowanie `copyrightText`
  - [ ] Warunkowe renderowanie linków (`links`)
  - [ ] Warunkowe renderowanie numeru wersji (`version`)
  - [ ] Obsługa propsów `className`, `style`
- [ ] Obsługa linków zewnętrznych (`target="_blank"`, `rel="noopener noreferrer"`)
- [ ] Dostępność: klawiatura, focus, aria

### 2.3 Style (`Footer.module.scss`)

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
  $footer-height: 3rem;
  $footer-bg: var(--color-surface-secondary);
  $footer-text-color: var(--color-text-secondary);
  $footer-border-top: 1px solid var(--color-border-subtle);
  $footer-padding: var(--space-md) var(--space-lg);
  $footer-transition: 0.3s ease-out;
  ```
- [ ] Flexbox layout: rozkład elementów, gap, padding
- [ ] Stylizacja tekstu i linków (hover, focus)
- [ ] Responsive design (mobile-first, media queries)
- [ ] Obsługa motywu jasny/ciemny (custom properties, transitions)

### 2.4 Testy jednostkowe (`Footer.test.tsx`)

- [ ] Renderowanie z różnymi propsami
- [ ] Sprawdzenie obecności kluczowych elementów
- [ ] Testy linków (href, label, atrybuty zewnętrzne)
- [ ] Testy dostępności (rola, focus, tab)
- [ ] Testy braku propsów (brak błędów, brak renderowania niepotrzebnych elementów)

### 2.5 Storybook (`Footer.stories.tsx`)

- [ ] Story: tylko tekst praw autorskich
- [ ] Story: wszystkie elementy (copyright, linki, wersja)
- [ ] Story: linki wewnętrzne i zewnętrzne
- [ ] Story: tylko numer wersji
- [ ] Story: długi tekst (przepełnienie)
- [ ] Story: tryb jasny/ciemny
- [ ] Story: responsywność (zmiana rozmiaru okna)

### 2.6 Eksport (`index.ts`)

- [ ] Eksportuj `Footer` i ewentualne typy

### 2.7 Manualne testy integracyjne

- [ ] Integracja z Layoutem (pozycjonowanie na dole strony)
- [ ] Zgodność wysokości (`footer-height` w Layout.module.scss)
- [ ] Testy w przeglądarkach i na urządzeniach
- [ ] Testy wydajności
- [ ] Testy nadpisywania stylów przez `className` i `style`

---

## 3. Opcjonalne rozszerzenia

- [ ] Przenieś interfejsy do `types.ts` jeśli komponent jest złożony

---

## 4. Uwagi końcowe

- Importy SCSS zawsze względne względem folderu komponentu.
- Dodatkowe pliki (`types.ts`) tylko jeśli złożoność tego wymaga.
- Priorytet: najpierw funkcjonalność i użyteczność, potem rozszerzenia.
- Testuj na prawdziwych urządzeniach mobilnych.
- Zachowaj spójność z Header, Layout i ogólnymi wytycznymi projektu.
- Dokumentuj nietypowe rozwiązania w kodzie lub Storybooku.
