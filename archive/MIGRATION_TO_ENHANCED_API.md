# Migration to Enhanced API - Aurora UI

Przewodnik migracji do ulepszonych funkcjonalności FAZY 5, które wprowadzają rozszerzone API i nowe możliwości.

## 🎯 Przegląd zmian

Aurora UI FAZA 5 wprowadza zaawansowane funkcjonalności dokumentacji i przykładów, które nie wpływają na istniejące API, ale oferują nowe możliwości:

- **Enhanced Storybook**: Rozszerzona dokumentacja z theme switching
- **Color Palette Showcase**: Interaktywny system kolorów
- **Improved Development Experience**: Lepsze narzędzia deweloperskie

## 🔄 Breaking Changes

**Brak Breaking Changes!** - FAZA 5 jest w pełni backwards compatible.

## ✨ Nowe funkcjonalności

### 1. Enhanced Storybook Configuration

#### Theme Switching w Storybook

Nowa konfiguracja Storybook umożliwia przełączanie motywów podczas przeglądania komponentów.

**Nowe funkcjonalności:**

- Global theme toolbar
- Automatic ThemeProvider wrapping
- Theme-aware backgrounds
- Responsive viewport presets

**Jak korzystać:**

1. Otwórz Storybook
2. Użyj toolbar "Theme" do przełączania między Light/Dark/Auto
3. Sprawdź jak komponenty reagują na różne motywy

### 2. Color Palette Showcase

#### Interaktywny system kolorów

Nowa sekcja dokumentacji prezentuje kompletny system kolorów Material Design 3.

**Lokalizacja:** `FAZA 5/Documentation/Color Palette`

**Funkcjonalności:**

- Click-to-copy CSS variables
- Live theme switching preview
- Complete MD3 color documentation
- Accessibility information

**Przykład użycia:**

```tsx
// Skopiuj CSS variable z Storybook
background-color: var(--md-sys-color-primary);
color: var(--md-sys-color-on-primary);
```

### 3. Enhanced Viewport and Background Controls

#### Nowe ustawienia Storybook

**Viewport presets:**

- Mobile (360x640)
- Tablet (768x1024)
- Desktop (1200x800)

**Background presets:**

- Light theme
- Dark theme
- Surface color (theme-aware)

## 📚 Dokumentacja Enhancement

### Improved Story Structure

Wszystkie komponenty otrzymały rozszerzone stories z:

**Nowe kategorie stories:**

- `Basic Usage` - podstawowe wykorzystanie
- `All Variants` - wszystkie warianty w jednym miejscu
- `Interactive Demo` - interaktywne przykłady
- `Accessibility Features` - funkcje dostępności
- `Theme Integration` - integracja z systemem motywów

### Auto-documentation

Każdy komponent ma teraz:

- Automatyczną dokumentację props przez TypeScript
- Descriptions dla każdego story
- Usage examples w dokumentacji
- Links do related components

## 🛠️ Development Experience Improvements

### 1. Better Error Handling

Storybook teraz lepiej obsługuje błędy i pokazuje informacje diagnostyczne.

### 2. Performance Monitoring

Nowe narzędzia do monitorowania performance komponentów:

```tsx
// Console output dla theme changes
console.log('Theme changed to:', newTheme);
```

### 3. Copy-to-Clipboard Features

Możliwość kopiowania:

- CSS custom properties z Color Palette
- Code examples z dokumentacji
- Component usage patterns

## 🎨 Theme System Enhancements

### Enhanced Preview Decorator

Nowy decorator automatycznie:

- Wrappuje stories w ThemeProvider
- Stosuje theme-aware styling
- Zapewnia proper surface colors
- Enableuje utility classes

**Przykład automatycznego wrappingu:**

```tsx
// Automatycznie dodawane do każdego story
<ThemeProvider
  defaultTheme={{ mode: selectedTheme }}
  autoGlobalStyles={true}
  generateUtilities={true}
>
  <div
    style={{
      backgroundColor: 'var(--md-sys-color-surface)',
      color: 'var(--md-sys-color-on-surface)',
    }}
  >
    <YourComponent />
  </div>
</ThemeProvider>
```

## 📖 Best Practices

### 1. Exploring New Documentation

**Zaczynaj od Color Palette:**

- Poznaj kompletny system kolorów
- Testuj różne motywy
- Kopiuj CSS variables do swojego kodu

**Używaj Enhanced Stories:**

- Sprawdzaj "All Variants" dla pełnego przeglądu
- Testuj "Interactive Demo" z różnymi ustawieniami
- Korzystaj z "Accessibility Features" dla a11y

### 2. Theme Development

**Testuj w różnych motywach:**

1. Otwórz komponent w Storybook
2. Przełączaj między Light/Dark/Auto
3. Sprawdź czy kolory są poprawne
4. Testuj na różnych viewport'ach

### 3. Color Usage

**Używaj semantic colors:**

```tsx
// ✅ Dobrze - semantic naming
background: 'var(--md-sys-color-primary-container)',
color: 'var(--md-sys-color-on-primary-container)',

// ❌ Źle - hardcoded colors
background: '#6750A4',
color: '#FFFFFF',
```

## 🔧 Migration Checklist

### Immediate Actions (Optional)

- [ ] Explore new Color Palette showcase
- [ ] Test components with new theme switching
- [ ] Review enhanced documentation
- [ ] Try new viewport presets

### Development Workflow Updates

- [ ] Use Storybook theme toolbar during development
- [ ] Reference Color Palette for CSS variables
- [ ] Test responsive behavior with new viewport presets
- [ ] Utilize enhanced documentation for component APIs

### Team Adoption

- [ ] Share new Color Palette with design team
- [ ] Update development guidelines to reference new docs
- [ ] Train team on theme switching capabilities
- [ ] Establish color usage best practices

## 🚀 What's Next

### Future Enhancements (Planned)

1. **Performance Benchmarks**: Visual performance metrics in Storybook
2. **A11y Testing Integration**: Automated accessibility testing
3. **Design Tokens Export**: Export design tokens for design tools
4. **Component Playground**: Interactive component builder

### Community Features

1. **Component Gallery**: Showcase of community components
2. **Usage Analytics**: Popular component patterns
3. **Feature Requests**: Community-driven development

## 🆘 Troubleshooting

### Common Issues

**Theme not switching properly:**

- Clear browser cache
- Check console for errors
- Verify ThemeProvider is wrapping your app

**Colors not displaying correctly:**

- Ensure CSS custom properties are loaded
- Check if global styles are applied
- Verify theme mode is set correctly

**Storybook performance issues:**

- Disable unnecessary addons
- Clear Storybook cache: `npm run storybook:clean`
- Update to latest Storybook version

### Getting Help

1. **Documentation**: Check enhanced stories first
2. **Color Issues**: Reference Color Palette showcase
3. **Theme Problems**: Test with theme switching toolbar
4. **Performance**: Use browser dev tools profiler

---

## 📊 Summary

FAZA 5 nie wprowadza breaking changes, ale znacznie ulepsza developer experience przez:

- ✅ **Enhanced Storybook** z theme switching
- ✅ **Color Palette Showcase** z interactive examples
- ✅ **Improved Documentation** z better organization
- ✅ **Better Development Tools** dla efektywnej pracy

Wszystkie istniejące komponenty i API pozostają bez zmian, ale zyskują lepszą dokumentację i narzędzia deweloperskie.
