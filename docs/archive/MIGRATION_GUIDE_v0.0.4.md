# Przewodnik migracji preact-aurora-ui v0.0.3 → v0.0.4

## 🎉 Nowe funkcjonalności v0.0.4

### Nowe komponenty:

- **AppLayout** - Inteligentny layout aplikacji
- **Text** - Smart komponent tekstu z automatycznym themingiem
- **Container** - Inteligentny kontener z surface styling

### Nowe hooks:

- **useThemeColors** - Runtime dostęp do kolorów motywu

---

## 🔄 Zmiany w API

### Text Component

```typescript
// ✅ POPRAWNE (Material Design 3)
<Text variant="headline-medium" as="h1">Nagłówek</Text>
<Text variant="body-large" color="primary">Tekst</Text>

// ❌ NIEPOPRAWNE (stary format)
<Text variant="headlineMedium" as="h1">Nagłówek</Text>
```

**Dostępne warianty:**

- Typography: `display-large`, `headline-medium`, `title-small`, `body-large`, `label-medium`, etc.
- Uproszczone: `display`, `headline`, `title`, `body`, `label`

### Container Component

```typescript
// Nowy inteligentny kontener
<Container
  surface="surface-container"
  padding="lg"
  elevation={2}
  maxWidth="md"
>
  Zawartość
</Container>
```

---

## 📦 Instalacja i import

### Instalacja

```bash
npm install preact-aurora-ui@latest
# lub
npm update preact-aurora-ui
```

### Import (bez zmian)

```typescript
// Główne importy działają tak samo
import {
  Button,
  Card,
  ThemeProvider,
  // Nowe komponenty v0.0.4
  AppLayout,
  Text,
  Container,
  useThemeColors,
} from 'preact-aurora-ui';
```

---

## 🛠️ Rozwiązane problemy

### Problem 1: Błędy importów modułów ✅ NAPRAWIONE

```
// Błąd (v0.0.4 early):
[plugin:vite:import-analysis] Failed to resolve import "./types/../../types/theme"

// ✅ Rozwiązanie: Automatyczne naprawianie ścieżek w build process
```

### Problem 2: Brakujące eksporty hooks ✅ NAPRAWIONE

```typescript
// Teraz działa:
import { useThemeColors } from 'preact-aurora-ui';
```

### Problem 3: TypeScript errors ✅ NAPRAWIONE

- Naprawione relatywne ścieżki w `.d.ts` files
- Usunięte duplikujące się eksporty types

---

## 🧪 Testowanie po migracji

### Test 1: Importy

```typescript
import {
  Button,
  Card,
  ThemeProvider,
  IconButton,
  useTheme,
  AppLayout,
  Text,
  Container,
  useThemeColors,
} from 'preact-aurora-ui';

// Powinno kompilować się bez błędów
```

### Test 2: Podstawowa aplikacja

```typescript
function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <Container surface="surface" padding="lg">
          <Text variant="headline-medium">
            Aurora UI v0.0.4 działa!
          </Text>
        </Container>
      </AppLayout>
    </ThemeProvider>
  );
}
```

### Test 3: Nowe hooks

```typescript
function ThemeAwareComponent() {
  const colors = useThemeColors();

  return (
    <div style={{ color: colors.primary }}>
      Tekst w kolorze primary
    </div>
  );
}
```

---

## 🚀 Zalecenia

1. **Przetestuj aplikację** po upgrade na v0.0.4
2. **Zaktualizuj warianty Text** z camelCase na kebab-case format
3. **Skorzystaj z nowych komponentów** AppLayout, Text, Container dla lepszego UX
4. **Wypróbuj useThemeColors** dla dynamicznych kolorów motywu

---

## 📞 Pomoc

Jeśli napotkasz problemy po migracji:

1. Sprawdź [dokumentację komponentów](../components/)
2. Zobacz [przykłady](../examples/) wykorzystania nowych funkcjonalności
3. Zgłoś issue na GitHub repository

**Pomyślnej migracji! 🎉**
