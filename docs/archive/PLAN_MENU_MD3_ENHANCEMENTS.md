# Plan rozbudowy: **Menu Component → MD3 Menu Enhancements**

---

## 1. Analiza obecnego stanu i wymagań MD3

### Obecny stan Menu

**Obecne propsy:**

- `items: MenuItem[]`
- `selectedKey?: string`
- `onSelect?: (key: string) => void`
- `className`, `style`, `aria-label`

**MenuItem structure:**

- `key: string`
- `label: ComponentChildren`
- `icon?: ComponentChildren`
- `disabled?: boolean`
- `onClick?: () => void`
- `href?: string`

### MD3 Menu wymagania

**Nowe warianty:** dropdown, context, navigation  
**Advanced features:** submenu, badges, shortcuts, dividers, multiselect

---

## 2. Checklist: Rozbudowa Menu Component

### 2.1 Rozszerzenie interfejsów

- [x] ✅ Aktualizacja `MenuProps`:

```typescript
interface MenuProps {
  // Istniejące
  items: MenuItem[];
  className?: string;
  style?: JSX.CSSProperties;
  selectedKey?: string;
  onSelect?: (key: string) => void;
  'aria-label'?: string;

  // NOWE - MD3 Menu props
  variant?: 'default' | 'dropdown' | 'context' | 'navigation';
  elevation?: 0 | 1 | 2 | 3 | 4;
  dense?: boolean;

  // Advanced selection
  multiSelect?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;

  // Submenu support
  expandIcon?: ComponentChildren;
  collapseIcon?: ComponentChildren;
  defaultExpandedKeys?: string[];
  onExpandedChange?: (keys: string[]) => void;
}
```

- [x] ✅ Rozszerzenie `MenuItem`:

```typescript
interface MenuItem {
  // Istniejące
  key: string;
  label: ComponentChildren;
  icon?: ComponentChildren;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;

  // NOWE - MD3 MenuItem props
  divider?: boolean;
  submenu?: MenuItem[];
  badge?: string | number;
  shortcut?: string;
  description?: string;

  // Advanced props
  selectable?: boolean;
  group?: string;
}
```

### 2.2 SCSS enhancements

- [x] ✅ Dodanie wariantów menu (dropdown, context, navigation)
- [x] ✅ Dense variant
- [x] ✅ Elevation system (0-4)
- [x] ✅ Submenu styling z animacjami
- [x] ✅ Badge styling
- [x] ✅ Shortcut styling
- [x] ✅ Divider styling
- [x] ✅ Obsługa nakładania się elementów (description + badge + shortcut)

Wszystkie warianty zostały zaimplementowane zgodnie z MD3 guidelines.

### 2.3 Component Logic Updates

- [x] ✅ State management dla expanded submenu
- [x] ✅ Multi-select logic
- [x] ✅ Submenu toggle logic
- [x] ✅ Recursive rendering dla submenu
- [x] ✅ Keyboard navigation support
- [x] ✅ href navigation support
- [x] ✅ Conditional CSS classes for layout optimization

Wszystkie funkcje zostały zaimplementowane z pełną obsługą state management i logiki interakcji.

### 2.4 Enhanced Tests

- [x] ✅ Test wariantów menu (dropdown, context, navigation)
- [x] ✅ Test dense variant
- [x] ✅ Test elevation props
- [x] ✅ Test multiselect functionality
- [x] ✅ Test submenu expand/collapse
- [x] ✅ Test badge rendering
- [x] ✅ Test shortcut rendering
- [x] ✅ Test divider rendering
- [x] ✅ Test keyboard navigation w submenu
- [x] ✅ Test accessibility z submenu
- [x] ✅ Test description rendering
- [x] ✅ Test href navigation

**Rezultat:** 30 testów, wszystkie przechodzą ✅

### 2.5 Enhanced Storybook

- [x] ✅ Stories dla każdego wariantu:
  - Default Menu ✅
  - Dropdown Menu ✅
  - Context Menu ✅
  - Navigation Menu ✅

- [x] ✅ Advanced features stories:
  - Dense Menu ✅
  - Menu with Elevation ✅
  - Multi-select Menu ✅
  - Menu with Submenu ✅
  - Menu with Badges ✅
  - Menu with Shortcuts ✅
  - Menu with Dividers ✅
  - Complex Menu (wszystkie features) ✅

- [x] ✅ Interactive playground z wszystkimi props
- [x] ✅ Interactive demos (MultiSelect, InteractiveSubmenu)
- [x] ✅ AllVariants showcase

**Rezultat:** Kompletna dokumentacja Storybook z 12 story variants ✅

### 2.6 Backwards Compatibility

- [x] ✅ Upewnienie się, że istniejące użycie Menu pozostaje bez zmian
- [x] ✅ Default values zachowują obecne zachowanie
- [x] ✅ Stopniowa migration path dla nowych features

**Status:** Pełna kompatybilność wsteczna zachowana ✅

---

## 3. Przykłady użycia po rozbudowie

```tsx
// Dropdown menu with badges and shortcuts
<Menu
  variant="dropdown"
  elevation={2}
  items={[
    {
      key: 'profile',
      label: 'Profile',
      icon: '👤',
      badge: '2',
      shortcut: '⌘P'
    },
    {
      key: 'settings',
      label: 'Settings',
      submenu: [
        { key: 'general', label: 'General' },
        { key: 'privacy', label: 'Privacy' },
        { key: 'security', label: 'Security' }
      ]
    },
    { key: 'divider1', divider: true },
    {
      key: 'logout',
      label: 'Logout',
      shortcut: '⌘Q',
      icon: '🚪'
    }
  ]}
/>

// Context menu
<Menu
  variant="context"
  dense
  items={contextMenuItems}
/>

// Navigation menu with multiselect
<Menu
  variant="navigation"
  multiSelect
  selectedKeys={selectedItems}
  onSelectionChange={setSelectedItems}
  items={navigationItems}
/>
```

---

## 4. Migracja z obecnego Menu

```tsx
// PRZED (nadal działa)
<Menu
  items={basicItems}
  selectedKey={selected}
  onSelect={setSelected}
/>

// PO (nowe możliwości)
<Menu
  variant="dropdown"
  elevation={1}
  items={enhancedItems}
  selectedKey={selected}
  onSelect={setSelected}
  expandIcon="▶"
  collapseIcon="▼"
/>
```

---

## 5. Kryteria akceptacji

- ✅ Wszystkie warianty MD3 (dropdown, context, navigation)
- ✅ Dense variant
- ✅ Elevation system (0-4)
- ✅ Submenu support z animacjami
- ✅ Multi-select functionality
- ✅ Badge support
- ✅ Shortcut support
- ✅ Divider support
- ✅ Backwards compatibility
- ✅ Enhanced keyboard navigation
- ✅ Proper accessibility z submenu
- ✅ Comprehensive tests
- ✅ Complete Storybook documentation

---

**Priorytet:** ✅ UKOŃCZONY - rozbudowa istniejącego komponentu  
**Czas implementacji:** 3 dni robocze (planowano 2-3)  
**Zależności:** Podstawowy Menu (już gotowy) ✅  
**Data ukończenia:** 2025-06-28 ✅

## PODSUMOWANIE IMPLEMENTACJI

### ✅ Zaimplementowane funkcje:

1. **Wszystkie warianty MD3**: default, dropdown, context, navigation
2. **Dense variant** z odpowiednimi proporcjami
3. **Elevation system** (0-4) z prawdziwymi cieniami
4. **Submenu support** z animacjami expand/collapse
5. **Multi-select functionality** z zarządzaniem stanem
6. **Badge support** z inteligentnym pozycjonowaniem
7. **Shortcut support** z obsługą nakładania się elementów
8. **Divider support** dla separacji grup
9. **Description support** z optymalizacją layoutu
10. **Enhanced keyboard navigation** (Enter, Space)
11. **Proper accessibility** (ARIA attributes)
12. **Backwards compatibility** (100%)

### 🧪 Testy: 30/30 ✅

### 📚 Storybook: 12 stories ✅

### 🏗️ Build: bez błędów ✅

### 🎨 SCSS: MD3 compliant ✅

**Następny cel:** Loader → Progress Indicators MD3
