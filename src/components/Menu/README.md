# Menu Component

## Overview

The Menu component provides contextual navigation and action menus that follow Material Design 3 guidelines. It supports various menu types including dropdown menus, context menus, navigation menus, and submenus with extensive customization options.

## Installation

```bash
npm install preact-aurora-ui@0.0.13
```

## Usage

### Basic Menu

```tsx
import { Menu } from 'preact-aurora-ui';

function BasicExample() {
  const items = [
    { key: 'new', label: 'New File', icon: '📄' },
    { key: 'open', label: 'Open...', icon: '📁' },
    { key: 'save', label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
    { key: 'divider1', divider: true },
    { key: 'exit', label: 'Exit', icon: '🚪' },
  ];

  return <Menu items={items} onSelect={(key) => console.log('Selected:', key)} />;
}
```

### Dropdown Menu

```tsx
function DropdownExample() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
    { key: 'help', label: 'Help', icon: '❓' },
    { key: 'divider', divider: true },
    { key: 'logout', label: 'Logout', icon: '🚪' },
  ];

  return (
    <div className="dropdown-container">
      <Button onClick={() => setIsOpen(!isOpen)}>User Menu</Button>
      {isOpen && (
        <Menu
          variant="dropdown"
          items={menuItems}
          onSelect={(key) => {
            handleMenuAction(key);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
```

### Context Menu

```tsx
function ContextMenuExample() {
  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const contextItems = [
    { key: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
    { key: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
    { key: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
    { key: 'divider', divider: true },
    { key: 'delete', label: 'Delete', icon: '🗑️' },
  ];

  return (
    <div onContextMenu={handleRightClick} className="context-area">
      Right-click here
      {contextMenu && (
        <Menu
          variant="context"
          items={contextItems}
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
          }}
          onSelect={(key) => {
            handleContextAction(key);
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
}
```

## API Reference

### Menu Props

| Prop                  | Type                                                   | Default     | Description                    |
| --------------------- | ------------------------------------------------------ | ----------- | ------------------------------ |
| `items`               | `MenuItem[]`                                           | _required_  | Array of menu items            |
| `variant`             | `'default' \| 'dropdown' \| 'context' \| 'navigation'` | `'default'` | Menu style variant             |
| `selectedKey`         | `string`                                               | `undefined` | Currently selected item key    |
| `selectedKeys`        | `string[]`                                             | `undefined` | Selected keys for multi-select |
| `multiSelect`         | `boolean`                                              | `false`     | Enable multiple selection      |
| `dense`               | `boolean`                                              | `false`     | Compact spacing                |
| `elevation`           | `0 \| 1 \| 2 \| 3 \| 4`                                | `0`         | Shadow elevation level         |
| `expandIcon`          | `ReactNode`                                            | `'▶'`      | Icon for collapsed submenu     |
| `collapseIcon`        | `ReactNode`                                            | `'▼'`       | Icon for expanded submenu      |
| `defaultExpandedKeys` | `string[]`                                             | `[]`        | Initially expanded submenus    |
| `className`           | `string`                                               | `undefined` | Additional CSS classes         |
| `onSelect`            | `(key: string) => void`                                | `undefined` | Item selection handler         |
| `onSelectionChange`   | `(keys: string[]) => void`                             | `undefined` | Multi-select change handler    |
| `onExpandedChange`    | `(keys: string[]) => void`                             | `undefined` | Submenu expansion handler      |

### MenuItem Interface

```tsx
interface MenuItem {
  key: string; // Unique identifier
  label: ReactNode; // Display text/content
  icon?: ReactNode; // Leading icon
  disabled?: boolean; // Disabled state
  divider?: boolean; // Show as divider
  shortcut?: string; // Keyboard shortcut text
  description?: string; // Secondary description
  badge?: string | number; // Badge/counter
  href?: string; // Link URL
  onClick?: () => void; // Click handler
  submenu?: MenuItem[]; // Child menu items
  selectable?: boolean; // Can be selected
  group?: string; // Selection group
}
```

## Examples

### Navigation Menu

```tsx
function NavigationExample() {
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const navItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      href: '/dashboard',
    },
    {
      key: 'projects',
      label: 'Projects',
      icon: '📁',
      submenu: [
        { key: 'all-projects', label: 'All Projects' },
        { key: 'my-projects', label: 'My Projects' },
        { key: 'shared', label: 'Shared with Me' },
      ],
    },
    {
      key: 'team',
      label: 'Team',
      icon: '👥',
      badge: 3,
    },
    { key: 'divider1', divider: true },
    {
      key: 'settings',
      label: 'Settings',
      icon: '⚙️',
    },
  ];

  return (
    <Menu
      variant="navigation"
      items={navItems}
      selectedKey={selectedKey}
      onSelect={setSelectedKey}
      defaultExpandedKeys={['projects']}
    />
  );
}
```

### Multi-Select Menu

```tsx
function MultiSelectExample() {
  const [selectedItems, setSelectedItems] = useState(['option1']);

  const options = [
    { key: 'option1', label: 'Option 1', selectable: true },
    { key: 'option2', label: 'Option 2', selectable: true },
    { key: 'option3', label: 'Option 3', selectable: true },
    { key: 'option4', label: 'Option 4', selectable: true, disabled: true },
  ];

  return (
    <Menu
      items={options}
      multiSelect
      selectedKeys={selectedItems}
      onSelectionChange={setSelectedItems}
    />
  );
}
```

### Menu with Descriptions and Badges

```tsx
function RichMenuExample() {
  const items = [
    {
      key: 'inbox',
      label: 'Inbox',
      icon: '📥',
      description: 'Recent messages',
      badge: 12,
    },
    {
      key: 'drafts',
      label: 'Drafts',
      icon: '📝',
      description: 'Unsent messages',
      badge: 3,
    },
    {
      key: 'sent',
      label: 'Sent',
      icon: '📤',
      description: 'Sent messages',
    },
    {
      key: 'trash',
      label: 'Trash',
      icon: '🗑️',
      description: 'Deleted items',
      badge: '99+',
    },
  ];

  return <Menu items={items} onSelect={(key) => navigateToFolder(key)} />;
}
```

### Nested Submenus

```tsx
function NestedMenuExample() {
  const menuStructure = [
    {
      key: 'file',
      label: 'File',
      submenu: [
        { key: 'new', label: 'New', shortcut: 'Ctrl+N' },
        { key: 'open', label: 'Open', shortcut: 'Ctrl+O' },
        {
          key: 'recent',
          label: 'Recent Files',
          submenu: [
            { key: 'doc1', label: 'Document 1.txt' },
            { key: 'doc2', label: 'Document 2.txt' },
            { key: 'doc3', label: 'Document 3.txt' },
          ],
        },
        { key: 'divider1', divider: true },
        { key: 'save', label: 'Save', shortcut: 'Ctrl+S' },
      ],
    },
    {
      key: 'edit',
      label: 'Edit',
      submenu: [
        { key: 'undo', label: 'Undo', shortcut: 'Ctrl+Z' },
        { key: 'redo', label: 'Redo', shortcut: 'Ctrl+Y' },
        { key: 'divider2', divider: true },
        { key: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
        { key: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
      ],
    },
  ];

  return <Menu items={menuStructure} onSelect={(key) => executeCommand(key)} />;
}
```

### Dynamic Menu Loading

```tsx
function DynamicMenuExample() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMenuItems = async () => {
    setLoading(true);
    try {
      const data = await fetchMenuItems();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  return <Menu items={items} onSelect={(key) => handleDynamicAction(key)} />;
}
```

## Accessibility

### ARIA Support

The Menu component implements comprehensive ARIA attributes:

- `role="menu"` on menu container
- `role="menuitem"` on each menu item
- `role="menuitemcheckbox"` for selectable items
- `role="separator"` for dividers
- `aria-expanded` for submenu state
- `aria-haspopup` for items with submenus
- `aria-checked` for selected items
- `aria-disabled` for disabled items
- `aria-describedby` for descriptions

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate to/from menu
- **Arrow Up/Down**: Navigate menu items
- **Arrow Right**: Open submenu
- **Arrow Left**: Close submenu or go to parent
- **Enter/Space**: Select item
- **Escape**: Close menu/submenu
- **Home/End**: First/last item

### Screen Reader Support

- Menu role and structure announced
- Item labels and descriptions read
- Selection state communicated
- Submenu navigation supported
- Keyboard shortcuts announced

```tsx
// Accessibility example
<Menu
  items={items}
  aria-label="Main navigation menu"
  onSelect={(key) => {
    // Announce selection
    announceToScreenReader(`Selected ${getItemLabel(key)}`);
    handleSelection(key);
  }}
/>
```

## Theming

### CSS Custom Properties

Menu components support extensive theming:

```css
.custom-menu {
  --menu-background: var(--md-sys-color-surface);
  --menu-border: 1px solid var(--md-sys-color-outline-variant);
  --menu-border-radius: 8px;
  --menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --menu-padding: 8px 0;
  --menu-min-width: 200px;
  --menu-max-width: 320px;

  /* Menu Items */
  --menu-item-height: 48px;
  --menu-item-padding: 12px 16px;
  --menu-item-gap: 12px;
  --menu-item-background-hover: var(--md-sys-color-secondary-container);
  --menu-item-background-selected: var(--md-sys-color-primary-container);
  --menu-item-text-color: var(--md-sys-color-on-surface);
  --menu-item-text-color-selected: var(--md-sys-color-on-primary-container);
  --menu-item-icon-size: 20px;

  /* Submenu */
  --submenu-indicator-size: 16px;
  --submenu-offset: 4px;

  /* Dividers */
  --menu-divider-color: var(--md-sys-color-outline-variant);
  --menu-divider-margin: 8px 0;

  /* Dense variant */
  --menu-dense-item-height: 36px;
  --menu-dense-padding: 4px 0;
}
```

### Material Design Tokens

Components use Material Design 3 tokens:

- `--md-sys-color-surface` - Menu background
- `--md-sys-color-on-surface` - Text color
- `--md-sys-color-primary-container` - Selected item background
- `--md-sys-color-secondary-container` - Hover state
- `--md-sys-color-outline-variant` - Borders and dividers

### Variant Styling

```scss
// Context menu theme
.context-menu {
  --menu-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  --menu-border-radius: 4px;
}

// Navigation menu theme
.navigation-menu {
  --menu-background: transparent;
  --menu-border: none;
  --menu-shadow: none;
  --menu-item-background-selected: var(--md-sys-color-primary);
}
```

## Advanced Usage

### Menu Positioning

```tsx
function PositionedMenu() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <Menu
      items={items}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
    />
  );
}
```

### Menu with Custom Icons

```tsx
function CustomIconMenu() {
  const items = [
    {
      key: 'save',
      label: 'Save Document',
      icon: <SaveIcon size={20} />,
      shortcut: 'Ctrl+S',
    },
    {
      key: 'print',
      label: 'Print',
      icon: <PrintIcon size={20} />,
      shortcut: 'Ctrl+P',
    },
  ];

  return <Menu items={items} />;
}
```

### Conditional Menu Items

```tsx
function ConditionalMenu() {
  const { user, permissions } = useAuth();

  const items = [
    { key: 'view', label: 'View Details' },
    ...(permissions.canEdit ? [{ key: 'edit', label: 'Edit' }] : []),
    ...(permissions.canDelete ? [{ key: 'delete', label: 'Delete', icon: '🗑️' }] : []),
    ...(user.isAdmin
      ? [
          { key: 'divider', divider: true },
          { key: 'admin', label: 'Admin Panel' },
        ]
      : []),
  ];

  return <Menu items={items} />;
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Menu } from 'preact-aurora-ui';
import userEvent from '@testing-library/user-event';

test('selects menu item', async () => {
  const handleSelect = vi.fn();
  const items = [
    { key: 'item1', label: 'Item 1' },
    { key: 'item2', label: 'Item 2' },
  ];

  render(<Menu items={items} onSelect={handleSelect} />);

  await userEvent.click(screen.getByText('Item 1'));
  expect(handleSelect).toHaveBeenCalledWith('item1');
});
```

### Integration Tests

```tsx
test('menu navigation flow', async () => {
  const items = [
    {
      key: 'file',
      label: 'File',
      submenu: [
        { key: 'new', label: 'New' },
        { key: 'open', label: 'Open' },
      ],
    },
  ];

  render(<Menu items={items} />);

  // Navigate to submenu
  await userEvent.click(screen.getByText('File'));
  expect(screen.getByText('New')).toBeVisible();

  // Select submenu item
  await userEvent.click(screen.getByText('New'));
  expect(handleAction).toHaveBeenCalledWith('new');
});
```

### Accessibility Tests

```tsx
test('menu accessibility', () => {
  const items = [
    { key: 'item1', label: 'Item 1' },
    { key: 'item2', label: 'Item 2', disabled: true },
  ];

  render(<Menu items={items} />);

  const menu = screen.getByRole('menu');
  const items = screen.getAllByRole('menuitem');

  expect(menu).toBeInTheDocument();
  expect(items).toHaveLength(2);
  expect(items[1]).toHaveAttribute('aria-disabled', 'true');
});
```

## FAQ

### How do I create a dropdown menu button?

Combine Menu with a Button and state management:

```tsx
function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-wrapper">
      <Button onClick={() => setIsOpen(!isOpen)}>Actions ▼</Button>
      {isOpen && (
        <Menu
          items={menuItems}
          onSelect={(key) => {
            handleAction(key);
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
```

### How do I handle menu positioning?

Use positioning logic based on available space:

```tsx
function SmartMenu({ anchorEl, items }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceRight = window.innerWidth - rect.right;

      setPosition({
        x: spaceRight < 200 ? rect.left - 200 : rect.right,
        y: spaceBelow < 300 ? rect.top - 300 : rect.bottom,
      });
    }
  }, [anchorEl]);

  return (
    <Menu
      items={items}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
      }}
    />
  );
}
```

### Can I use Menu for breadcrumb navigation?

For breadcrumbs, use the dedicated Breadcrumbs component. Menu is better for action lists and dropdown navigation.

### How do I create keyboard shortcuts?

Use the `shortcut` property and handle global key events:

```tsx
function MenuWithShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const items = [
    { key: 'save', label: 'Save', shortcut: 'Ctrl+S' },
    { key: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
  ];

  return <Menu items={items} />;
}
```

### How do I create a mega menu?

Use submenus with custom styling for complex navigation:

```tsx
function MegaMenu() {
  const items = [
    {
      key: 'products',
      label: 'Products',
      submenu: [
        {
          key: 'category1',
          label: 'Category 1',
          submenu: [
            { key: 'product1', label: 'Product 1' },
            { key: 'product2', label: 'Product 2' },
          ],
        },
      ],
    },
  ];

  return <Menu items={items} variant="navigation" className="mega-menu" />;
}
```
