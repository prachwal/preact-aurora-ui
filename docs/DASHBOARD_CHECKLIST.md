# Dashboard – Czeklista komponentów (aktualizacja zgodna z MSUI)

Aby stworzyć w pełni responsywny layout typu dashboard zgodny z Material Design 3 (MS## 🔄 FAZA 2B - KOMPONENTY DO ROZBUDOWY (ŚREDNI PRIORYTET)

### 1. Menu Component ✅ **UKOŃCZONY**

- [x] **Menu → MD3 Menu enhancements** ✅ **UKOŃCZONY 2025-06-28**
  - [x] Warianty: default, dropdown, context, navigation ✅
  - [x] Submenu support z animacjami ✅
  - [x] Dense variant, multiselect ✅
  - [x] Badge i shortcut support ✅
  - [x] Divider support ✅
  - [x] Description support ✅
  - [x] Enhanced keyboard navigation ✅
  - [x] Proper accessibility (ARIA) ✅
  - [x] 30 testów, wszystkie przechodzą ✅
  - [x] 12 Storybook stories ✅
  - [x] Backwards compatibility ✅

**Priorytet:** ✅ UKOŃCZONY zgodnie z MD3  
**Data ukończenia:** 2025-06-28 ✅

---

### Pozostałe komponenty do rozbudowy:

### Rozbudowa istniejących komponentów zgodnie z MD3:raz instrukcjami SCSS, należy zaimplementować następujące komponenty (każdy w osobnym folderze wg wzorca):

**Stan:** Faza 1 ✅ ukończona | Faza 2A ✅ ukończona | Faza 2B � w trakcie (Menu ✅ ukończony)

## Podstawowe komponenty layoutu (✅ GOTOWE - Faza 1)

- [x] **Layout** ⭐⭐⭐⭐⭐  
       Główny kontener layoutu (flex row/column, obsługa direction, fullHeight, przekazywanie children, className, style)
  - Layout.tsx ✅
  - Layout.module.scss ✅
  - Layout.test.tsx ✅
  - Layout.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_LAYOUT.md) ✅

- [x] **Header** ⭐⭐⭐⭐⭐  
       Pasek górny (logo, nawigacja, akcje użytkownika) - zgodny z MD3 App Bar
  - Header.tsx ✅
  - Header.module.scss ✅
  - Header.test.tsx ✅
  - Header.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_HEADER.md) ✅
  - 🔄 [Plan ulepszeń MD3](./PLAN_HEADER_MD3_ENHANCEMENTS.md) - do utworzenia

- [x] **Sidebar** ⭐⭐⭐⭐⭐  
       Nawigacja boczna (menu, ikony, collapse) - zgodny z MD3 Navigation Drawer
  - Sidebar.tsx ✅
  - Sidebar.module.scss ✅
  - Sidebar.test.tsx ✅
  - Sidebar.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_SIDEBAR.md) ✅

- [x] **Content** ⭐⭐⭐⭐⭐  
       Główna część na treść dashboardu - zgodny z MD3 Surface
  - Content.tsx ✅
  - Content.module.scss ✅
  - Content.test.tsx ✅
  - Content.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_CONTENT.md) ✅

- [x] **Footer** ⭐⭐⭐⭐  
       Pasek dolny (opcjonalnie)
  - Footer.tsx ✅
  - Footer.module.scss ✅
  - Footer.test.tsx ✅
  - Footer.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_FOOTER.md) ✅

## Komponenty wspierające (✅ GOTOWE - Faza 1)

- [x] **Breadcrumbs** ⭐⭐⭐⭐  
       Ścieżka nawigacji
  - Breadcrumbs.tsx ✅
  - Breadcrumbs.module.scss ✅
  - Breadcrumbs.test.tsx ✅
  - Breadcrumbs.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_BREADCRUMBS.md) ✅
  - 🔄 [Plan ulepszeń MD3](./PLAN_BREADCRUMBS_MD3_ENHANCEMENTS.md) - do utworzenia

- [x] **PageHeader** ⭐⭐⭐⭐  
       Nagłówek sekcji/strony (tytuł, akcje, opis)
  - PageHeader.tsx ✅
  - PageHeader.module.scss ✅
  - PageHeader.test.tsx ✅
  - PageHeader.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_PAGEHEADER.md) ✅

- [x] **Grid / Row / Col** ⭐⭐⭐⭐  
       System siatki do responsywnego układu
  - Grid.tsx ✅
  - Row.tsx ✅
  - Col.tsx ✅
  - Grid.module.scss ✅
  - Row.module.scss ✅
  - Col.module.scss ✅
  - testy, stories, index ✅
  - [Plan implementacji](./PLAN_GRID_ROW_COL.md) ✅

- [x] **Card** ⭐⭐⭐⭐⭐  
       Kafelek na dane/statystyki - w pełni zgodny z MD3
  - Card.tsx ✅
  - Card.module.scss ✅
  - Card.test.tsx ✅
  - Card.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_CARD.md) ✅

- [x] **Menu** ⭐⭐⭐⭐⭐  
       Komponent menu (sidebar/topbar) - w pełni zgodny z MD3
  - Menu.tsx ✅
  - Menu.module.scss ✅
  - Menu.test.tsx ✅
  - Menu.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_MENU.md) ✅
  - ✅ [Plan rozbudowy MD3](./PLAN_MENU_MD3_ENHANCEMENTS.md) ✅ **UKOŃCZONY 2025-06-28**

- [x] **Drawer / Modal** ⭐⭐⭐⭐  
       Panel wysuwany/modalny (opcjonalnie)
  - Drawer.tsx ✅
  - Drawer.module.scss ✅
  - Drawer.test.tsx ✅
  - Drawer.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji](./PLAN_DRAWER.md) ✅

- [x] **Loader / Spinner** ⭐⭐⭐⭐⭐  
       Komponent ładowania - w pełni zgodny z MD3 Progress Indicators
  - Loader.tsx ✅
  - Loader.module.scss ✅
  - Loader.test.tsx ✅
  - Loader.stories.tsx ✅
  - Progress.tsx ✅ NEW
  - Progress.module.scss ✅ NEW
  - Progress.test.tsx ✅ NEW
  - Progress.stories.tsx ✅ NEW
  - index.ts ✅
  - [Plan implementacji](./PLAN_LOADER.md) ✅
  - ✅ [Plan rozbudowy MD3 Progress](./PLAN_LOADER_MD3_PROGRESS.md) ✅ **UKOŃCZONY 2025-06-28**

- [x] **Responsive utilities** ⭐⭐⭐⭐  
       Hooki/utilsy do obsługi responsywności (np. useBreakpoint)
  - [Plan implementacji](./PLAN_RESPONSIVE.md) ✅

---

## ✅ FAZA 2A UKOŃCZONA - Button Component

### 1. Button Component ✅ **UKOŃCZONY**

- [x] **Button** (Material Design 3 Button)  
       Główny komponent akcji - jeden z najważniejszych w MSUI
  - Button.tsx ✅
  - Button.module.scss ✅
  - Button.test.tsx ✅
  - Button.stories.tsx ✅
  - index.ts ✅
  - [Plan implementacji MD3](./PLAN_BUTTON_MD3.md) ✅

**MD3 Warianty:** elevated, filled, filled-tonal, outlined, text ✅  
**Wszystkie funkcje:** rozmiary (S/M/L), ikony (start/end), loading state, link support, accessibility ✅  
**Jakość:** testy (100% pokrycie), Storybook, build/lint bez błędów ✅  
**Priorytet:** 🔥 KRYTYCZNY - ✅ UKOŃCZONY zgodnie z MSUI  
**Data ukończenia:** 2025-06-27 ✅

---

## � FAZA 2B - KOMPONENTY DO ROZBUDOWY (ŚREDNI PRIORYTET)

### Rozbudowa istniejących komponentów zgodnie z MD3:

### Rozbudowa istniejących komponentów zgodnie z MD3:

- [ ] **Header → MD3 App Bar enhancements**
  - [ ] scrollBehavior (hide, elevate)
  - [ ] navigationIcon support
  - [ ] centerTitle option
  - [ ] Action overflow menu

- [x] **Loader → MD3 Progress Indicators** ✅ **UKOŃCZONY 2025-06-28**
  - [x] Circular i Linear variants ✅
  - [x] Determinate/indeterminate modes ✅
  - [x] Buffer support dla linear ✅
  - [x] Color system integration (primary, secondary, tertiary) ✅

- [ ] **Breadcrumbs → MD3 enhancements**
  - [ ] maxItems z ellipsis collapse
  - [ ] expandText ("Show more")
  - [ ] variant: condensed

---

## 🎨 SYSTEM DESIGN TOKENS - Faza 2 (ŚREDNI PRIORYTET)

### Material Design 3 Color System

- [ ] **MD3 Color Tokens**
  - [ ] Primary/Secondary/Tertiary colors
  - [ ] Surface variants
  - [ ] Outline colors
  - [ ] Error/Warning/Success colors

- [ ] **Theme System**
  - [ ] Dark theme support
  - [ ] Custom theme generator
  - [ ] CSS custom properties migration

- [ ] **Enhanced Elevation System**
  - [ ] MD3 precise elevation levels
  - [ ] Dynamic elevation (scroll-based)

---

## 📱 DODATKOWE KOMPONENTY MSUI - Faza 3 (NISKI PRIORYTET)

### Form Components

- [ ] **TextField** (Text Fields MD3)
  - [ ] Outlined variant
  - [ ] Filled variant
  - [ ] Standard variant
  - [ ] Validation states

- [ ] **Checkbox** (Selection MD3)
  - [ ] Checked/unchecked/indeterminate
  - [ ] Error states

- [ ] **Radio** (Selection MD3)
  - [ ] Radio groups
  - [ ] Validation states

- [ ] **Switch** (Selection MD3)
  - [ ] On/off states
  - [ ] Disabled states

### Communication Components

- [ ] **Snackbar** (Communication MD3)
  - [ ] Action buttons
  - [ ] Auto-dismiss
  - [ ] Positioning

- [ ] **Tooltip** (Communication MD3)
  - [ ] Positioning variants
  - [ ] Trigger modes

- [ ] **Badge** (Communication MD3)
  - [ ] Notification badges
  - [ ] Status indicators

### Navigation Components

- [ ] **Tabs** (Navigation MD3)
  - [ ] Primary/Secondary tabs
  - [ ] Scrollable tabs
  - [ ] Icon support

- [ ] **Bottom Navigation** (Navigation MD3)
  - [ ] 3-5 top-level destinations
  - [ ] Icon + label support

### Action Components

- [ ] **FAB** (Floating Action Button MD3)
  - [ ] Regular/Mini/Extended
  - [ ] Surface/Primary/Secondary
  - [ ] Position variants

- [ ] **Icon Button** (Action MD3)
  - [ ] Standard/Filled/Outlined/Tonal
  - [ ] Toggle states

---

Każdy komponent zgodnie z instrukcją: SCSS Modules, zmienne lokalne na bazie custom properties, testy, stories, index.ts.

## Priorytety implementacji

**🔥 Faza 2A - KRYTYCZNA:** ✅ UKOŃCZONA

1. ✅ Button Component (MD3) - UKOŃCZONY 2025-06-27

**🔄 Faza 2B - WAŻNA:** 2. Loader → Progress Indicators 🔄 **NASTĘPNY PRIORYTET**  
3. Header App Bar enhancements 4. Breadcrumbs enhancements 5. Design Tokens System

**📱 Faza 3 - ROZBUDOWA:** 7. Form Components (TextField, Checkbox, Radio, Switch) 8. Communication Components (Snackbar, Tooltip, Badge) 9. Advanced Navigation (Tabs, Bottom Nav) 10. Action Components (FAB, Icon Button)

## Dalsze iteracje i rozbudowa

- [x] ✅ Podstawowe komponenty layoutu (Faza 1 - ukończona)
- [x] ✅ Button Component + MD3 enhancements (Faza 2A - ukończona 2025-06-27)
- [x] ✅ Menu Component + MD3 enhancements (Faza 2B - ukończona 2025-06-28)
- [ ] 🎨 Design Tokens System + Dark Theme (Faza 2B)
- [ ] � Loader → Progress Indicators (Faza 2B - następny cel)
- [ ] �📱 Advanced MSUI Components (Faza 3)
- [ ] 🔧 Zaawansowane funkcje, accessibility, performance
- [ ] 🧪 Comprehensive testing suite, mocki
- [ ] 📚 Dokumentacja API, przykłady użycia

**Aktualny status:** Faza 1 ✅ | Faza 2A ✅ | Menu MD3 ✅ | Zgodność MSUI: ~85%
