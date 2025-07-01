# Analiza błędów preact-aurora-ui v0.0.5

## 🚨 Krytyczne błędy - Build System

### Problem 1: Nieprawidłowe relatywne ścieżki importów

**Lokalizacja:**

- `Container/Container.js:7`
- `Text/Text.js:7`
- `ThemeProvider/ThemeProvider.js:4`

**Błąd:**

```javascript
// ❌ Nieprawidłowa ścieżka
import { useThemeColors, useThemeUtils } from '../../hooks/useThemeColors';
import { injectUtilityStyles } from '../../utils/cssUtilities';
```

**Analiza:**
Struktura katalogów:

```
preact-aurora-ui/
├── Container/
│   └── Container.js
├── Text/
│   └── Text.js
├── ThemeProvider/
│   └── ThemeProvider.js
├── hooks/
│   ├── index.js
│   └── useThemeColors.js
└── utils/
    └── cssUtilities.js
```

Ścieżka `../../hooks/useThemeColors` oznacza:

- Jeden poziom w górę: `preact-aurora-ui/Container/../` = `preact-aurora-ui/`
- Drugi poziom w górę: `preact-aurora-ui/../` = `node_modules/` ❌

**Rozwiązanie:**

```javascript
// ✅ Prawidłowa ścieżka
import { useThemeColors, useThemeUtils } from '../hooks/useThemeColors';
import { injectUtilityStyles } from '../utils/cssUtilities';

// ✅ Lub przez index
import { useThemeColors, useThemeUtils } from '../hooks';
```

### Problem 2: Brak eksportu w głównym index

**Analiza:** Sprawdzenie `index.d.ts`:

```typescript
// ❌ Brakuje eksportu hooks i utils
export * from './Switch';
export * from './Container';
// ... inne komponenty ...

// ✅ Powinno być dodane:
export * from './hooks';
export * from './utils';
```

## 🔧 Zalecenia naprawcze

### 1. Natychmiastowe naprawy (High Priority)

#### A. Popraw ścieżki importów

**Pliki do zmiany:**

- `Container/Container.js` - linia 7
- `Text/Text.js` - linia 7
- `ThemeProvider/ThemeProvider.js` - linia 4

**Zmiana:**

```diff
- import { useThemeColors, useThemeUtils } from '../../hooks/useThemeColors';
+ import { useThemeColors, useThemeUtils } from '../hooks/useThemeColors';

- import { injectUtilityStyles } from '../../utils/cssUtilities';
+ import { injectUtilityStyles } from '../utils/cssUtilities';
```

#### B. Dodaj eksporty w index

**Plik:** `index.d.ts` i `index.js`

```typescript
// Dodaj na końcu
export * from './hooks';
export * from './utils';
```

### 2. Długoterminowe ulepszenia

#### A. Standaryzacja importów

Wszystkie komponenty powinny importować przez główny index:

```javascript
import { useThemeColors } from 'preact-aurora-ui/hooks';
import { injectUtilityStyles } from 'preact-aurora-ui/utils';
```

#### B. Build process validation

Dodaj do procesu build:

1. **Lint ścieżek importów** - sprawdzenie czy wszystkie relatywne ścieżki są prawidłowe
2. **Bundle analysis** - weryfikacja czy wszystkie dependencje są rozwiązane
3. **Integration tests** - test importowania w rzeczywistym projekcie

#### C. Struktura eksportów

```typescript
// index.d.ts - sugerowana struktura
// Components
export * from './Button';
export * from './Card';
// ... wszystkie komponenty

// Advanced components
export * from './AppLayout';
export * from './Text';
export * from './Container';

// Hooks
export * from './hooks';

// Utils
export * from './utils';

// Types
export * from './types';
```

## 🧪 Test case dla weryfikacji

Po naprawie, test powinien przejść:

```javascript
// test.js
import {
  Button,
  Card,
  ThemeProvider,
  AppLayout,
  Text,
  Container,
  useTheme,
} from 'preact-aurora-ui';

console.log('All imports successful!');
```

## 📊 Impact Assessment

**Przed naprawą:**

- ❌ Aplikacja nie startuje
- ❌ Błędy build-time
- ❌ Niemożliwe użycie nowych komponentów

**Po naprawie:**

- ✅ Aplikacja działa
- ✅ Wszystkie komponenty dostępne
- ✅ Możliwość użycia AppLayout, Text, Container
- ✅ Dostęp do hooks (useThemeColors)

## 🎯 Kolejność naprawy

1. **CRITICAL:** Popraw ścieżki importów w Container, Text, ThemeProvider
2. **HIGH:** Dodaj eksporty hooks i utils w index
3. **MEDIUM:** Weryfikuj build process
4. **LOW:** Długoterminowe ulepszenia struktury

## 🔍 Dodatkowe sprawdzenia

Po naprawie sprawdź:

- [ ] `npm run build` - działa bez błędów
- [ ] Import wszystkich nowych komponentów
- [ ] Testy jednostkowe komponentów
- [ ] Dokumentacja API jest aktualna
- [ ] TypeScript definitions są kompletne
