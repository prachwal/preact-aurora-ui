# Strategia Testowania

Aurora UI wykorzystuje wielopoziomową strategię testowania, aby zapewnić najwyższą jakość i stabilność komponentów.

## 🧪 Poziomy Testów

1.  **Testy Jednostkowe (Vitest):**
    - Weryfikują pojedyncze komponenty w izolacji.
    - Sprawdzają logikę, renderowanie i interakcje.
    - Używają `@testing-library/preact` do interakcji z komponentami.

2.  **Testy Dostępności (Axe):**
    - Zintegrowane z Vitest i Storybookiem.
    - Automatycznie sprawdzają zgodność ze standardami WCAG.

3.  **Testy Wydajności (Vitest):**
    - Mierzą czas renderowania i użycie pamięci.
    - Definiują progi wydajnościowe, aby zapobiegać regresjom.

4.  **Testy Wizualne (Storybook):**
    - Umożliwiają ręczne i automatyczne porównywanie wyglądu komponentów w różnych stanach.

5.  **Testy End-to-End (Playwright):**
    - Weryfikują całe scenariusze użycia w przeglądarce.
    - Sprawdzają kompatybilność z różnymi przeglądarkami.

## 🚀 Jak Uruchamiać Testy?

- `npm test`: Uruchamia wszystkie testy jednostkowe.
- `npm run test:a11y`: Uruchamia testy dostępności.
- `npm run test:performance`: Uruchamia testy wydajności.
- `npm run storybook`: Uruchamia Storybooka do testów wizualnych.
- `npm run test:e2e`: Uruchamia testy end-to-end.
