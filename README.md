# Preact Aurora UI

**Aurora UI** to nowoczesna, wydajna i w pełni dostępna biblioteka komponentów UI dla Preact, zbudowana w oparciu o Material Design 3.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/prachwal/preact-aurora-ui) [![NPM Version](https://img.shields.io/npm/v/preact-aurora-ui)](https://www.npmjs.com/package/preact-aurora-ui) [![Test Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](https://github.com/prachwal/preact-aurora-ui) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Kluczowe Cechy

- **🚀 Zero-Config Setup:** Automatyczny import stylów i setup w 2 minuty (v0.0.8+)
- **🎨 Material Design 3:** Nowoczesny design zgodny z najnowszymi wytycznymi Google
- **⚡ Płynne Przełączanie Motywów:** Smooth transitions bez migotania
- **♿ Pełna Dostępność (A11y):** Komponenty zaprojektowane z myślą o standardach WCAG 2.1 AA
- **💅 Elastyczny Theming:** Łatwe dostosowywanie motywów (jasny/ciemny/auto) za pomocą CSS Custom Properties
- **✅ TypeScript:** Pełne wsparcie dla TypeScript, zapewniające bezpieczeństwo typów
- **📚 Kompletna Dokumentacja:** Interaktywny Storybook i szczegółowe przewodniki
- **🔧 Developer Experience:** Warnings, debugging tools, helpful error messages

## 🚀 Instalacja i Setup (2 minuty)

### 1. Zainstaluj pakiet

```bash
npm install preact-aurora-ui
```

### 2. Użyj AuroraProvider (v0.0.8+)

```tsx
// src/main.tsx
import { render } from 'preact';
import { AuroraProvider } from 'preact-aurora-ui';
import App from './App';

render(
  <AuroraProvider>
    <App />
  </AuroraProvider>,
  document.getElementById('app')!,
);
```

### 3. Używaj komponentów

```tsx
// src/App.tsx
import { Button, Card, useTheme } from 'preact-aurora-ui';

export default function App() {
  const { toggleMode, isDark } = useTheme();

  return (
    <Card title="Hello Aurora UI!">
      <p>Beautiful components with zero configuration.</p>
      <Button onClick={toggleMode}>Switch to {isDark ? 'Light' : 'Dark'} Mode</Button>
    </Card>
  );
}
```

🎉 **Gotowe!** Twoja aplikacja ma teraz piękne motywy i komponenty.

## 🆕 Co Nowego w v0.0.8

- ✅ **Automatyczny import stylów** - koniec z ręcznym importowaniem CSS
- ✅ **Płynne przejścia motywów** - bez migotania i przeładowań
- ✅ **Enhanced useTheme hook** - `forceUpdate()` i `themeReady` state
- ✅ **Ostrzeżenia deweloperskie** - pomocne debugowanie w trybie dev
- ✅ **Lepsze error handling** - jasne komunikaty błędów z rozwiązaniami
- ✅ **100% backwards compatible** - cały kod v0.0.7 działa bez zmian

📖 **[Przewodnik Szybkiego Startu v0.0.8](./docs/QUICK_START_v0.0.8.md)**

## storybook-static

- [**Architektura Projektu**](./docs/guides/ARCHITECTURE.md)
- [**System Themingu**](./docs/guides/THEMING.md)
- [**Rozwój Komponentów**](./docs/guides/COMPONENT_DEVELOPMENT.md)
- [**Strategia Testowania**](./docs/guides/TESTING_STRATEGY.md)

## 🤝 Wkład

Chcesz wnieść swój wkład? Zapoznaj się z naszym [przewodnikiem dla kontrybutorów](./docs/CONTRIBUTING.md).

## 📄 Licencja

Projekt jest udostępniany na licencji [MIT](./LICENSE).
