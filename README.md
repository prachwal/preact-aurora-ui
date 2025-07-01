# Preact Aurora UI

**Aurora UI** to nowoczesna, wydajna i w pełni dostępna biblioteka komponentów UI dla Preact, zbudowana w oparciu o Material Design 3.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/prachwal/preact-aurora-ui) [![NPM Version](https://img.shields.io/npm/v/preact-aurora-ui)](https://www.npmjs.com/package/preact-aurora-ui) [![Test Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](https://github.com/prachwal/preact-aurora-ui) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Kluczowe Cechy

- **🚀 Wysoka Wydajność:** Zbudowane na Preact, co gwarantuje minimalny rozmiar i szybkość.
- **🎨 Material Design 3:** Nowoczesny design zgodny z najnowszymi wytycznymi Google.
- **♿ Pełna Dostępność (A11y):** Komponenty zaprojektowane z myślą o standardach WCAG 2.1 AA.
- **💅 Elastyczny Theming:** Łatwe dostosowywanie motywów (jasny/ciemny) za pomocą CSS Custom Properties.
- **✅ TypeScript:** Pełne wsparcie dla TypeScript, zapewniające bezpieczeństwo typów.
- **📚 Kompletna Dokumentacja:** Interaktywny Storybook i szczegółowe przewodniki.

## storybook-static

Zobacz wszystkie komponenty w akcji w naszym interaktywnym Storybooku.

[**Otwórz Storybook**](https://prachwal.github.io/preact-aurora-ui/)

## 📦 Instalacja

```bash
npm install preact-aurora-ui
```

## 🚀 Podstawowe Użycie

```tsx
import { render } from 'preact';
import { ThemeProvider, Button } from 'preact-aurora-ui';
import 'preact-aurora-ui/dist/style.css';

const App = () => (
  <ThemeProvider>
    <Button variant="filled">Witaj w Aurora UI!</Button>
  </ThemeProvider>
);

render(<App />, document.getElementById('app'));
```

## 📚 Dokumentacja

Pełna dokumentacja, w tym przewodniki techniczne, API i przykłady, jest dostępna w folderze `docs`.

[**Przejdź do Dokumentacji**](./docs/README.md)

### 🔧 Dokumentacja Techniczna

- [**Architektura Projektu**](./docs/guides/ARCHITECTURE.md)
- [**System Themingu**](./docs/guides/THEMING.md)
- [**Rozwój Komponentów**](./docs/guides/COMPONENT_DEVELOPMENT.md)
- [**Strategia Testowania**](./docs/guides/TESTING_STRATEGY.md)

## 🤝 Wkład

Chcesz wnieść swój wkład? Zapoznaj się z naszym [przewodnikiem dla kontrybutorów](./docs/CONTRIBUTING.md).

## 📄 Licencja

Projekt jest udostępniany na licencji [MIT](./LICENSE).
