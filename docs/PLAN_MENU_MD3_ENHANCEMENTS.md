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

- [ ] Aktualizacja `MenuProps`:

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

- [ ] Rozszerzenie `MenuItem`:

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

- [ ] Dodanie wariantów menu:

```scss
// Menu variants
.menu--variant-dropdown {
  background: var(--md-sys-color-surface-container);
  border-radius: 4px;
  min-width: 112px;
  max-width: 280px;

  .item {
    min-height: 48px; // MD3 standard
  }
}

.menu--variant-context {
  background: var(--md-sys-color-surface-container-high);
  border-radius: 8px;
  padding: var(--space-xs);

  .item {
    min-height: 40px;
    border-radius: 4px;
  }
}

.menu--variant-navigation {
  background: var(--md-sys-color-surface);

  .item {
    min-height: 56px; // Larger for navigation
    padding-left: var(--space-xl);
  }
}
```

- [ ] Dense variant:

```scss
.menu--dense {
  .item {
    min-height: 32px;
    padding: var(--space-xs) var(--space-sm);

    .label {
      font-size: var(--font-size-sm);
    }
  }
}
```

- [ ] Elevation system:

```scss
.menu--elevation-1 {
  box-shadow: var(--md-sys-elevation-level1);
}

.menu--elevation-2 {
  box-shadow: var(--md-sys-elevation-level2);
}

// ... up to level 4
```

- [ ] Submenu styling:

```scss
.item--has-submenu {
  position: relative;

  .expand-icon {
    position: absolute;
    right: var(--space-sm);
    transition: transform 0.2s ease;
  }

  &.expanded .expand-icon {
    transform: rotate(90deg);
  }
}

.submenu {
  padding-left: var(--space-xl);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;

  &.expanded {
    max-height: 500px; // Large enough for content
  }
}
```

- [ ] Badge styling:

```scss
.item-badge {
  position: absolute;
  top: 50%;
  right: var(--space-md);
  transform: translateY(-50%);
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  border-radius: 10px;
  padding: 2px 6px;
  font-size: var(--font-size-xs);
  min-width: 16px;
  text-align: center;
}
```

- [ ] Shortcut styling:

```scss
.item-shortcut {
  position: absolute;
  right: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--md-sys-color-on-surface-variant);
  font-size: var(--font-size-sm);
  font-family: monospace;
}
```

- [ ] Divider styling:

```scss
.divider {
  height: 1px;
  background: var(--md-sys-color-outline-variant);
  margin: var(--space-xs) 0;
  border: none;
}
```

### 2.3 Component Logic Updates

- [ ] State management dla expanded submenu:

```typescript
const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys || []);
```

- [ ] Multi-select logic:

```typescript
const [selectedKeysState, setSelectedKeysState] = useState<string[]>(selectedKeys || []);

const handleSelectionChange = (key: string) => {
  if (multiSelect) {
    const newSelection = selectedKeysState.includes(key)
      ? selectedKeysState.filter((k) => k !== key)
      : [...selectedKeysState, key];

    setSelectedKeysState(newSelection);
    onSelectionChange?.(newSelection);
  } else {
    onSelect?.(key);
  }
};
```

- [ ] Submenu toggle logic:

```typescript
const handleSubmenuToggle = (key: string) => {
  const newExpanded = expandedKeys.includes(key)
    ? expandedKeys.filter((k) => k !== key)
    : [...expandedKeys, key];

  setExpandedKeys(newExpanded);
  onExpandedChange?.(newExpanded);
};
```

- [ ] Recursive rendering dla submenu:

```typescript
const renderMenuItem = (item: MenuItem, level = 0) => {
  if (item.divider) {
    return <hr key={item.key} className={styles.divider} />;
  }

  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isExpanded = expandedKeys.includes(item.key);

  return (
    <li key={item.key}>
      <div className={menuItemClasses} onClick={() => handleItemClick(item)}>
        {/* Icon */}
        {/* Label */}
        {/* Badge */}
        {/* Shortcut */}
        {/* Expand icon for submenu */}
      </div>

      {hasSubmenu && (
        <ul className={`${styles.submenu} ${isExpanded ? styles.expanded : ''}`}>
          {item.submenu!.map(subItem => renderMenuItem(subItem, level + 1))}
        </ul>
      )}
    </li>
  );
};
```

### 2.4 Enhanced Tests

- [ ] Test wariantów menu (dropdown, context, navigation)
- [ ] Test dense variant
- [ ] Test elevation props
- [ ] Test multiselect functionality
- [ ] Test submenu expand/collapse
- [ ] Test badge rendering
- [ ] Test shortcut rendering
- [ ] Test divider rendering
- [ ] Test keyboard navigation w submenu
- [ ] Test accessibility z submenu

### 2.5 Enhanced Storybook

- [ ] Stories dla każdego wariantu:
  - Default Menu
  - Dropdown Menu
  - Context Menu
  - Navigation Menu

- [ ] Advanced features stories:
  - Dense Menu
  - Menu with Elevation
  - Multi-select Menu
  - Menu with Submenu
  - Menu with Badges
  - Menu with Shortcuts
  - Menu with Dividers

- [ ] Interactive playground z wszystkimi props

### 2.6 Backwards Compatibility

- [ ] Upewnienie się, że istniejące użycie Menu pozostaje bez zmian
- [ ] Default values zachowują obecne zachowanie
- [ ] Stopniowa migration path dla nowych features

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

**Priorytet:** 🔄 ŚREDNI - rozbudowa istniejącego komponentu  
**Czas implementacji:** 2-3 dni robocze  
**Zależności:** Podstawowy Menu (już gotowy)
