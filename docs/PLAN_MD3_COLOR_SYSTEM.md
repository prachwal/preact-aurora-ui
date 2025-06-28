# Plan: Material Design 3 Color System Implementation

## 📋 Przegląd

Implementacja kompletnego systemu kolorów Material Design 3 w Aurora UI, zapewniająca pełną zgodność ze specyfikacją MD3 oraz zachowanie wstecznej kompatybilności z istniejącymi komponentami.

## 🎯 Cele

1. **Pełna zgodność z MD3** - implementacja wszystkich wymaganych tokenów kolorów
2. **Backwards compatibility** - zachowanie funkcjonalności istniejących komponentów
3. **Dark mode support** - kompletne wsparcie trybu ciemnego
4. **Developer experience** - łatwe w użyciu utility classes i tokeny
5. **Semantic color system** - logiczna organizacja kolorów według funkcji

## 📊 Specyfikacja MD3 Color System

### Główne grupy kolorów MD3:

#### 1. Primary Colors

```scss
--md-sys-color-primary: #6750a4;
--md-sys-color-on-primary: #ffffff;
--md-sys-color-primary-container: #eaddff;
--md-sys-color-on-primary-container: #21005d;
```

#### 2. Secondary Colors

```scss
--md-sys-color-secondary: #625b71;
--md-sys-color-on-secondary: #ffffff;
--md-sys-color-secondary-container: #e8def8;
--md-sys-color-on-secondary-container: #1d192b;
```

#### 3. Tertiary Colors

```scss
--md-sys-color-tertiary: #7d5260;
--md-sys-color-on-tertiary: #ffffff;
--md-sys-color-tertiary-container: #ffd8e4;
--md-sys-color-on-tertiary-container: #31111d;
```

#### 4. Error Colors

```scss
--md-sys-color-error: #ba1a1a;
--md-sys-color-on-error: #ffffff;
--md-sys-color-error-container: #ffdad6;
--md-sys-color-on-error-container: #410002;
```

#### 5. Surface Colors

```scss
--md-sys-color-surface: #fffbfe;
--md-sys-color-on-surface: #1c1b1f;
--md-sys-color-surface-variant: #e7e0ec;
--md-sys-color-on-surface-variant: #49454f;
--md-sys-color-surface-container-highest: #e6e1e5;
--md-sys-color-surface-container-high: #ece6f0;
--md-sys-color-surface-container: #f2ecf0;
--md-sys-color-surface-container-low: #f7f2fa;
--md-sys-color-surface-container-lowest: #ffffff;
```

#### 6. Outline Colors

```scss
--md-sys-color-outline: #79747e;
--md-sys-color-outline-variant: #cab4d0;
```

## 🌙 Dark Theme Implementation

Wszystkie kolory MD3 mają swoje odpowiedniki w dark theme z zachowaniem hierarchii kontrastów i czytelności.

### Kluczowe różnice w dark theme:

- **Surface colors**: ciemne tła z odpowiednimi kontrastami
- **Primary colors**: jaśniejsze odcienie dla lepszej widoczności
- **Enhanced shadows**: wzmocnione cienie dla lepszej separacji elementów

## 🔄 Backwards Compatibility Strategy

### Mapowanie starych tokenów na MD3:

```scss
// Legacy → MD3 mapping
--color-primary: var(--md-sys-color-primary);
--color-background: var(--md-sys-color-background);
--color-surface: var(--md-sys-color-surface);
--color-text: var(--md-sys-color-on-surface);
--color-border: var(--md-sys-color-outline);
```

### Zachowane semantic colors:

- `--color-success`, `--color-warning`, `--color-info`
- `--color-error` zmapowane na `--md-sys-color-error`

## 🛠️ Implementowane funkcje

### ✅ ZAIMPLEMENTOWANE:

1. **Complete MD3 Color Tokens**
   - ✅ Primary, Secondary, Tertiary color groups
   - ✅ Error colors with containers
   - ✅ Surface hierarchy (5 levels)
   - ✅ Outline and variant colors
   - ✅ Inverse colors for special cases

2. **Dark Theme Support**
   - ✅ Complete dark color palette
   - ✅ Enhanced shadows for dark theme
   - ✅ Proper contrast ratios maintained

3. **MD3 Elevation System**
   - ✅ 6 elevation levels (0-5)
   - ✅ Precise shadow specifications per MD3
   - ✅ Dark theme elevation adjustments

4. **Backwards Compatibility**
   - ✅ All legacy color tokens preserved
   - ✅ Semantic color system maintained
   - ✅ Legacy shadow system mapped to MD3

5. **Utility Classes**
   - ✅ `.md3-surface`, `.md3-primary`, etc.
   - ✅ `.md3-elevation-1` through `.md3-elevation-5`
   - ✅ Text, background, and border utilities

## 📖 Przykłady użycia

### Korzystanie z MD3 tokenów:

```scss
.my-component {
  background: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface);
  border: 1px solid var(--md-sys-color-outline);
  box-shadow: var(--md-sys-elevation-level2);
}

.primary-button {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);

  &:hover {
    background: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
  }
}
```

### Korzystanie z utility classes:

```tsx
<div className="md3-surface-container md3-elevation-2">
  <h2 className="md3-on-surface">Title</h2>
  <p className="md3-on-surface-variant">Description</p>
</div>
```

## 🧪 Testing Strategy

### Testy do zaimplementowania:

1. **Color Contrast Tests**
   - Sprawdzenie wszystkich kombinacji text/background
   - Weryfikacja WCAG AA compliance
   - Test dark theme contrast ratios

2. **Legacy Compatibility Tests**
   - Weryfikacja że stare komponenty działają bez zmian
   - Test mapowania starych tokenów na MD3
   - Regression testing dla istniejących styli

3. **Theme Switching Tests**
   - Test przełączania light/dark theme
   - Weryfikacja animacji przejść
   - Test persistance wybranego theme

## 🎨 Integration z komponentami

### Komponenty do aktualizacji:

1. **Button** - wykorzystanie MD3 primary/secondary/tertiary colors
2. **Card** - surface containers i elevation system
3. **Header/AppBar** - surface colors i elevation
4. **Menu** - surface containers i outline colors
5. **Form components** - outline colors i error states

### Migration strategy:

- Stopniowa migracja komponentów do MD3 tokenów
- Zachowanie backwards compatibility przez mapowanie
- Dodanie MD3 variant props gdzie potrzebne

## 📋 Checklist implementacji

### ✅ Ukończone:

- ✅ **MD3 Color Tokens** - kompletna implementacja wszystkich kolorów MD3
- ✅ **Dark Theme** - pełne wsparcie trybu ciemnego z MD3 palette
- ✅ **Elevation System** - 6 poziomów elevation zgodnie z MD3
- ✅ **Backwards Compatibility** - mapowanie legacy colors na MD3
- ✅ **Utility Classes** - helper classes dla szybkiego developmentu
- ✅ **Documentation** - kompletna dokumentacja systemu

### 🚧 W kolejnej iteracji:

- [ ] **Theme Generator** - narzędzie do generowania custom MD3 palettes
- [ ] **Color Contrast Checker** - automatyczne sprawdzanie WCAG compliance
- [ ] **Component Migration** - ✅ **UKOŃCZONE** - wszystkie główne komponenty używają MD3 tokenów
- [ ] **Storybook Integration** - dokumentacja kolorów w Storybook
- [ ] **Design Tokens Export** - eksport do JSON/innych formatów

## 🔄 Następne kroki

1. **Testing** ✅ **UKOŃCZONE** - testy dla color system zintegrowane z komponentami
2. **Component Updates** ✅ **UKOŃCZONE** - wszystkie główne komponenty używają MD3
3. **Documentation** ✅ **UKOŃCZONE** - kompletna dokumentacja systemu
4. **Storybook** - dodanie color palette do Storybook (następna iteracja)
5. **Theme Generator** - narzędzie do custom themes (następna iteracja)

---

**Status:** ✅ **UKOŃCZONE** - Podstawowa implementacja MD3 Color System  
**Data ukończenia:** 28 czerwca 2025  
**Kolejna faza:** Advanced tooling (Theme Generator, Storybook integration) - Faza 3
