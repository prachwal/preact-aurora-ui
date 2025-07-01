# Rozwój Komponentów

Ten przewodnik opisuje, jak tworzyć nowe komponenty w bibliotece Aurora UI, zgodnie z przyjętymi standardami.

## 🧱 Struktura Komponentu

Każdy komponent powinien znajdować się w osobnym folderze w `src/components/` i składać się z następujących plików:

- **`ComponentName.tsx`**: Kod komponentu w Preact.
- **`ComponentName.module.scss`**: Style SCSS (CSS Modules).
- **`ComponentName.test.tsx`**: Testy jednostkowe (Vitest).
- **`ComponentName.stories.tsx`**: Dokumentacja w Storybooku.
- **`index.ts`**: Eksport komponentu.

## ✅ Standardy

1.  **Style w SCSS Modules:** Wszystkie style muszą być pisane w plikach `.module.scss`, aby uniknąć globalnych konfliktów.
2.  **Theming:** Używaj zmiennych z globalnego systemu themingu (`var(--color-primary)`), aby komponent wspierał motywy.
3.  **Testy:** Każdy komponent musi mieć testy jednostkowe z co najmniej 90% pokryciem kodu.
4.  **Dostępność (A11y):** Komponenty muszą spełniać standardy WCAG 2.1 AA.
5.  **Dokumentacja w Storybooku:** Każdy komponent musi mieć plik `.stories.tsx` z przykładami użycia.
