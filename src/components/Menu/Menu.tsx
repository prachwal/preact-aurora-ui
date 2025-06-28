import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';
import { useState } from 'preact/hooks';

import styles from './Menu.module.scss';

export interface MenuItem {
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

export interface MenuProps {
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

/**
 * Menu – MD3 Menu component with enhanced features
 */
export function Menu({
  items,
  className = '',
  style,
  selectedKey,
  onSelect,
  'aria-label': ariaLabel = 'Menu nawigacyjne',

  // MD3 enhancements
  variant = 'default',
  elevation = 0,
  dense = false,

  // Multi-select
  multiSelect = false,
  selectedKeys: controlledSelectedKeys,
  onSelectionChange,

  // Submenu
  expandIcon = '▶',
  collapseIcon = '▼',
  defaultExpandedKeys = [],
  onExpandedChange,
}: MenuProps) {
  // State for expanded submenu items
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);

  // State for multi-select
  const [selectedKeysState, setSelectedKeysState] = useState<string[]>(
    controlledSelectedKeys || [],
  );

  // Use controlled or internal state for selected keys
  const currentSelectedKeys = multiSelect ? controlledSelectedKeys || selectedKeysState : [];

  // Handle submenu toggle
  const handleSubmenuToggle = (key: string) => {
    const newExpanded = expandedKeys.includes(key)
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key];

    setExpandedKeys(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  // Handle item selection
  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;

    // Handle href navigation
    if (item.href) {
      window.location.href = item.href;
      return;
    }

    // Handle submenu toggle
    if (item.submenu && item.submenu.length > 0) {
      handleSubmenuToggle(item.key);
      return;
    }

    // Handle selection
    if (multiSelect) {
      const newSelection = currentSelectedKeys.includes(item.key)
        ? currentSelectedKeys.filter((k) => k !== item.key)
        : [...currentSelectedKeys, item.key];

      if (!controlledSelectedKeys) {
        setSelectedKeysState(newSelection);
      }
      onSelectionChange?.(newSelection);
    } else {
      onSelect?.(item.key);
    }

    // Call item's onClick
    item.onClick?.();
  };

  // Render individual menu item
  const renderMenuItem = (item: MenuItem, level = 0): JSX.Element => {
    // Render divider
    if (item.divider) {
      return <hr key={item.key} className={styles.divider} />;
    }

    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedKeys.includes(item.key);
    const isSelected = multiSelect
      ? currentSelectedKeys.includes(item.key)
      : selectedKey === item.key;

    const itemClasses = [
      styles.item,
      item.disabled ? styles.disabled : '',
      isSelected ? styles.selected : '',
      hasSubmenu ? styles.hasSubmenu : '',
      isExpanded ? styles.expanded : '',
      level > 0 ? styles.submenuItem : '',
      item.description ? styles.hasDescription : '',
      item.badge ? styles.hasBadge : '',
      item.shortcut ? styles.hasShortcut : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <li key={item.key} className={styles.menuItem}>
        <div
          className={itemClasses}
          role="menuitem"
          aria-disabled={item.disabled}
          aria-current={isSelected}
          aria-expanded={hasSubmenu ? isExpanded : undefined}
          tabIndex={item.disabled ? -1 : 0}
          onClick={() => handleItemClick(item)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick(item);
            }
          }}
        >
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span className={styles.label}>{item.label}</span>
          {item.description && <span className={styles.description}>{item.description}</span>}
          {item.badge && <span className={styles.badge}>{item.badge}</span>}
          {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
          {hasSubmenu && (
            <span className={styles.expandIcon}>{isExpanded ? collapseIcon : expandIcon}</span>
          )}
        </div>

        {hasSubmenu && (
          <ul className={`${styles.submenu} ${isExpanded ? styles.submenuExpanded : ''}`}>
            {item.submenu!.map((subItem) => renderMenuItem(subItem, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  // Menu classes
  const menuClasses = [
    styles.menu,
    styles[`menu--variant-${variant}`],
    elevation > 0 ? styles[`menu--elevation-${elevation}`] : '',
    dense ? styles['menu--dense'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={menuClasses} style={style} aria-label={ariaLabel}>
      <ul className={styles.list} role="menu">
        {items.map((item) => renderMenuItem(item))}
      </ul>
    </nav>
  );
}
