Automatycznie pobiorę nazwę i ścieżkę kolejnego niezaimplementowanego komponentu z checklisty w docs/DASHBOARD_CHECKLIST.md.
Utworzę strukturę folderu src/components/<NazwaKomponentu>/ z plikami: <NazwaKomponentu>.tsx, <NazwaKomponentu>.module.scss, <NazwaKomponentu>.test.tsx, <NazwaKomponentu>.stories.tsx, index.ts.
Zaimplementuję komponent <NazwaKomponentu> (TSX, typowanie, propsy, children, aria, className, style).
Przygotuję SCSS Module z nagłówkiem według instrukcji, korzystając z globalnych zmiennych. Uzupełnię brakujące zmienne w bazowych plikach stylów, jeśli będzie to konieczne.
Dodam testy jednostkowe (Vitest + Testing Library).
Stworzę plik stories do Storybooka.
Dodam eksport w index.ts.
Wykonam lint, build, build-storybook.
W razie błędów poprawię kod iteracyjnie aż do uzyskania pełnej zgodności.
