# Problemy z preact-aurora-ui v0.0.4 - Raport błędów

## Przegląd sytuacji

Podczas migracji z wersji `0.0.3` do `0.0.4` biblioteki preact-aurora-ui napotkano kilka problemów uniemożliwiających prawidłowe działanie aplikacji.

---

## 🔴 Problemy krytyczne

### 1. Błędy modułów podczas import

**Status:** Krytyczny  
**Wpływ:** Aplikacja nie uruchamia się

**Szczegóły błędu:**

```
[plugin:vite:import-analysis] Failed to resolve import "./types/../../types/theme" from "node_modules/preact-aurora-ui/Text/Text.d.ts"
[plugin:vite:import-analysis] Failed to resolve import "./types/../../types" from "node_modules/preact-aurora-ui/Container/Container.d.ts"
```

**Analiza:**

- Relatywne ścieżki importów w plikach `.d.ts` są nieprawidłowe
- Struktura katalogów nie odpowiada ścieżkom używanym w importach
- Problem dotyczy głównie komponentów `Text` i `Container`

**Dotknięte pliki:**

- `Text/Text.d.ts` - błędny import `../../types/theme`
- `Container/Container.d.ts` - błędny import `../../types`
- Prawdopodobnie inne komponenty używające types

---

### 2. Brakujące eksporty w głównym index

**Status:** Wysokiej wagi  
**Wpływ:** Nowe komponenty nie są dostępne

**Problem:**

```typescript
// Błąd podczas importu
import { useThemeColors } from 'preact-aurora-ui';
// Error: 'useThemeColors' is not exported
```

**Analiza:**

- Hook `useThemeColors` istnieje w `/hooks/useThemeColors.d.ts`
- Nie jest eksportowany w głównym `index.d.ts`
- Prawdopodobnie problem dotyczy też innych nowych komponentów/hooks

**Brakujące eksporty:**

- `useThemeColors` hook
- Prawdopodobnie inne nowe hooks z katalogu `/hooks/`

---

### 3. Problemy ze strukturą katalogów types

**Status:** Wysokiej wagi  
**Wpływ:** TypeScript errors w nowych komponentach

**Obserwacje:**

- Komponenty odwołują się do `../../types/theme`
- Ale struktura to: `/types/` (na root level)
- Relatywne ścieżki są nieprawidłowe

**Problematyczne ścieżki:**

```typescript
// W Text/Text.d.ts
import type { ThemeColor, ThemeVariant, SimpleThemeVariant } from '../../types/theme';

// W Container/Container.d.ts
import type { BaseComponentProps } from '../../types';
```

---

## 🟡 Problemy drugorzędne

### 4. Niezgodność API komponentów

**Status:** Średniej wagi  
**Wpływ:** Kod wymaga refaktoryzacji

**Różnice API Text component:**

```typescript
// v0.0.3 (oczekiwane)
<Text variant="headline" as="h1">Content</Text>

// v0.0.4 (rzeczywiste)
<Text variant="headlineMedium" as="h1">Content</Text>
```

**Problemy:**

- Nazwy wariantów nie są zgodne z Material Design 3 guidelines
- Brak jasnej dokumentacji zmian API między wersjami

---

### 5. AppLayout dependencies

**Status:** Niskiej wagi  
**Wpływ:** Funkcjonalność może być ograniczona

**Obserwacje:**

- AppLayout prawdopodobnie używa wewnętrznych komponentów
- Może mieć hidden dependencies na componenty które mają problemy
- Nie testowane ze względu na problemy z importami

---

## 🛠️ Rekomendowane poprawki

### Poprawka 1: Naprawa ścieżek importów

**Priorytet:** Krytyczny

```typescript
// BŁĘDNE (obecne)
import type { ThemeColor } from '../../types/theme';
import type { BaseComponentProps } from '../../types';

// POPRAWNE (powinno być)
import type { ThemeColor } from '../types/theme';
import type { BaseComponentProps } from '../types';
```

**Pliki do poprawy:**

- `Text/Text.d.ts`
- `Container/Container.d.ts`
- Wszystkie inne komponenty używające types

### Poprawka 2: Uzupełnienie eksportów

**Priorytet:** Wysoki

```typescript
// W głównym index.d.ts dodać:
export * from './hooks/useThemeColors';
export * from './hooks'; // jeśli są inne hooks
```

### Poprawka 3: Weryfikacja struktury build

**Priorytet:** Wysoki

**Sprawdzić:**

1. Czy pliki `.js` są prawidłowo zbudowane
2. Czy ścieżki w `.js` odpowiadają tym w `.d.ts`
3. Czy wszystkie zależności są resolved podczas build

### Poprawka 4: Dokumentacja API changes

**Priorytet:** Średni

**Utworzyć:**

- Migration guide v0.0.3 → v0.0.4
- Breaking changes documentation
- Updated examples dla nowych komponentów

---

## 🧪 Plan testowania po poprawkach

### Test 1: Import verification

```typescript
// Powinno działać bez błędów
import {
  Button,
  Card,
  ThemeProvider,
  IconButton,
  useTheme,
  AppLayout, // nowy v0.0.4
  Text, // nowy v0.0.4
  Container, // nowy v0.0.4
  useThemeColors, // nowy v0.0.4
} from 'preact-aurora-ui';
```

### Test 2: Component rendering

```typescript
// Basic functionality test
function TestApp() {
  return (
    <ThemeProvider>
      <AppLayout>
        <Container surface="surface">
          <Text variant="headlineMedium">Test</Text>
        </Container>
      </AppLayout>
    </ThemeProvider>
  );
}
```

### Test 3: Build verification

```bash
# Sprawdzić czy build działa
npm run build

# Sprawdzić czy preview działa
npm run preview
```

---

## 📋 Status komponentów w v0.0.4

| Komponent      | Import Status   | Functional Status | Notes                    |
| -------------- | --------------- | ----------------- | ------------------------ |
| Button         | ✅ OK           | ✅ OK             | Działa                   |
| Card           | ✅ OK           | ✅ OK             | Działa                   |
| ThemeProvider  | ✅ OK           | ✅ OK             | Działa                   |
| IconButton     | ✅ OK           | ✅ OK             | Działa                   |
| useTheme       | ✅ OK           | ✅ OK             | Działa                   |
| AppLayout      | ❌ Import Error | ❓ Unknown        | Module resolution failed |
| Text           | ❌ Import Error | ❓ Unknown        | Module resolution failed |
| Container      | ❌ Import Error | ❓ Unknown        | Module resolution failed |
| useThemeColors | ❌ Not Exported | ❓ Unknown        | Not in main index        |

---

## 💡 Tymczasowe rozwiązanie

Do czasu naprawienia v0.0.4, rekomendacja:

1. **Powrót do v0.0.3** dla stabilności
2. **Ręczna implementacja** brakujących komponentów na bazie propozycji z `aurora-ui-improvements.md`
3. **Upgrade po naprawie** wszystkich krytycznych problemów

```bash
# Tymczasowy downgrade
npm install preact-aurora-ui@0.0.3
```

---

## 📞 Szczegóły techniczne dla developera

### Struktura katalogów (v0.0.4)

```
preact-aurora-ui/
├── Text/
│   ├── Text.d.ts          // ❌ błędne importy
│   └── Text.js
├── Container/
│   ├── Container.d.ts     // ❌ błędne importy
│   └── Container.js
├── hooks/
│   ├── useThemeColors.d.ts // ✅ OK
│   └── useThemeColors.js   // ✅ OK
├── types/                 // ✅ istnieje na root level
│   └── theme.d.ts
└── index.d.ts            // ❌ brak eksportów hooks
```

### Oczekiwana poprawka ścieżek

```typescript
// Text/Text.d.ts - PRZED
import type { ThemeColor } from '../../types/theme';

// Text/Text.d.ts - PO POPRAWIE
import type { ThemeColor } from '../types/theme';
```

**Data raportu:** 1 lipca 2025  
**Testowana wersja:** preact-aurora-ui@0.0.4  
**Środowisko:** Vite + Preact + TypeScript

---

## ✅ POPRAWKI ZASTOSOWANE

### Naprawione problemy krytyczne:

1. **✅ Błędy modułów podczas import** - ROZWIĄZANE
   - Dodano post-processing w build script który naprawia relatywne ścieżki w plikach `.d.ts`
   - Import paths automatycznie zmieniane z `../../types/theme` na `../types/theme`

2. **✅ Brakujące eksporty hooks** - ROZWIĄZANE
   - Dodano `src/hooks/index.ts` z eksportami hooks
   - Zaktualizowano `tsconfig.build.json` aby uwzględnić katalog hooks
   - Poprawiono build script aby eksportować hooks do głównego index

3. **✅ Problemy ze strukturą katalogów types** - ROZWIĄZANE
   - Build script automatycznie naprawia ścieżki podczas kompilacji
   - Usunięto duplikujące się eksporty types (konflikt z ThemeProvider)

### Status komponentów po naprawach:

| Komponent          | Import Status | Functional Status | Notes                          |
| ------------------ | ------------- | ----------------- | ------------------------------ |
| Button             | ✅ OK         | ✅ OK             | Działa                         |
| Card               | ✅ OK         | ✅ OK             | Działa                         |
| ThemeProvider      | ✅ OK         | ✅ OK             | Działa                         |
| IconButton         | ✅ OK         | ✅ OK             | Działa                         |
| useTheme           | ✅ OK         | ✅ OK             | Działa                         |
| **AppLayout**      | ✅ **FIXED**  | ✅ OK             | **Module resolution fixed**    |
| **Text**           | ✅ **FIXED**  | ✅ OK             | **Module resolution fixed**    |
| **Container**      | ✅ **FIXED**  | ✅ OK             | **Module resolution fixed**    |
| **useThemeColors** | ✅ **FIXED**  | ✅ OK             | **Now exported in main index** |

### Testy weryfikacyjne:

```typescript
// ✅ Wszystkie importy działają poprawnie
import {
  Button, Card, ThemeProvider, IconButton, useTheme,
  AppLayout, Text, Container, useThemeColors
} from 'preact-aurora-ui';

// ✅ Prawidłowe API (Material Design 3)
<Text variant="headline-medium">Test</Text> // (nie headlineMedium)
```

### Zmiany w buildzie:

1. **tsconfig.build.json** - dodano hooks do include
2. **build-npm-package.sh** - dodano:
   - Automatyczne eksportowanie hooks
   - Post-processing naprawiający ścieżki importów
   - Fix duplikujących się eksportów types
3. **src/hooks/index.ts** - nowy plik z eksportami hooks
