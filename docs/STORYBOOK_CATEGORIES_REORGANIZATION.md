# Reorganizacja kategorii Storybook

## Podsumowanie zmian

Zaktualizowano wszystkie pliki `*.stories.tsx` aby używały spójnego systemu kategoryzacji zgodnego z organizacją komponentów w README.md.

### Nowe kategorie

#### 📝 **Form** (7 komponentów)

- `Form/Button` (było: Components/Button)
- `Form/TextField` (było: Components/TextField)
- `Form/Checkbox` (było: Components/Checkbox)
- `Form/Radio` (było: Components/Radio)
- `Form/RadioGroup` (było: Components/RadioGroup)
- `Form/Switch` (było: Components/Switch)
- `Form/Select` (bez zmian)
- `Form/Slider` (było: Components/Slider)

#### 🏗️ **Layout** (9 komponentów)

- `Layout/AppLayout` (było: FAZA 4/AppLayout)
- `Layout/Container` (było: Smart Components/Container)
- `Layout/Grid` (było: Dashboard/Grid)
- `Layout/Row` (było: Dashboard/Row)
- `Layout/Col` (było: Dashboard/Col)
- `Layout/Header` (było: Dashboard/Header)
- `Layout/Footer` (było: Dashboard/Footer)
- `Layout/Sidebar` (było: Dashboard/Sidebar)
- `Layout/Layout` (było: Dashboard/Layout)
- `Layout/Content` (było: Dashboard/Content)
- `Layout/PageHeader` (było: Dashboard/PageHeader)

#### 🧭 **Navigation** (4 komponenty)

- `Navigation/Menu` (było: Dashboard/Menu)
- `Navigation/Tabs` (było: Components/Tabs)
- `Navigation/Breadcrumbs` (było: Dashboard/Breadcrumbs)
- `Navigation/BottomNavigation` (bez zmian)

#### 💬 **Communication** (6 komponentów)

- `Communication/Dialog` (było: Components/Dialog)
- `Communication/Drawer` (było: Dashboard/Drawer)
- `Communication/Snackbar` (było: Components/Snackbar)
- `Communication/Tooltip` (było: Components/Tooltip)
- `Communication/Banner` (było: Components/Banner)
- `Communication/Badge` (było: Components/Communication/Badge)

#### ⚡ **Advanced** (9 komponentów)

- `Advanced/DataTable` (było: Data/DataTable)
- `Advanced/FAB` (było: Components/Actions/FAB)
- `Advanced/SpeedDial` (było: Components/Actions/SpeedDial)
- `Advanced/IconButton` (było: Components/Action/IconButton)
- `Advanced/Chip` (było: Components/Chip)
- `Advanced/Card` (było: Dashboard/Card)
- `Advanced/Text` (było: Components/Smart/Text)
- `Advanced/Progress` (było: Components/Progress)
- `Advanced/Loader` (było: Dashboard/Loader)

#### 🎨 **Providers** (1 komponent)

- `Providers/ThemeToggle` (było: FAZA 4/ThemeToggle Enhanced)

#### 🎨 **Design System** (2 komponenty)

- `Design System/MD3 Colors` (bez zmian)
- `Design System/Color Palette` (było: FAZA 5/Documentation/Color Palette)

#### 📖 **Examples** (4 komponenty)

- `Examples/ExampleButton` (było: Components/ExampleButton)
- `Examples/Responsive` (było: Dashboard/Responsive/useBreakpoint)
- `Examples/Usage Examples` (było: FAZA 5/Documentation/Usage Examples)
- `Examples/Performance & A11y` (było: FAZA 5/Documentation/Performance & A11y)

### Utworzone pliki

#### `src/storybook-categories.ts`

Globalny plik konfiguracyjny zawierający:

- Mapowanie komponentów na kategorie
- Funkcję `getComponentCategory()` do automatycznego pobierania kategorii
- Lista `CATEGORY_ORDER` definiująca kolejność wyświetlania

### Korzyści z reorganizacji

1. **Spójna organizacja** - kategorie w Storybook odpowiadają grupom w README.md
2. **Łatwiejsza nawigacja** - logiczne grupowanie komponentów według funkcji
3. **Lepsza przejrzystość** - jasna struktura 8 głównych kategorii
4. **Zgodność z dokumentacją** - jednolita klasyfikacja w całym projekcie
5. **Skalowalność** - łatwe dodawanie nowych komponentów do odpowiednich grup

### Kolejność kategorii w Storybook

1. **Form** - komponenty formularzy
2. **Layout** - komponenty układu strony
3. **Navigation** - komponenty nawigacji
4. **Communication** - komponenty komunikacji z użytkownikiem
5. **Advanced** - zaawansowane komponenty
6. **Providers** - dostawcy kontekstu i motywy
7. **Design System** - system projektowy i kolory
8. **Examples** - przykłady użycia i dokumentacja

## Następne kroki

- [x] Zaktualizować wszystkie pliki stories
- [x] Zbudować Storybook z nowymi kategoriami
- [ ] Przetestować nawigację w Storybook
- [ ] Sprawdzić czy wszystkie komponenty są dostępne w odpowiednich kategoriach
