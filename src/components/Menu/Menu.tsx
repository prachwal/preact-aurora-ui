import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import styles from './Menu.module.scss';

export interface MenuItem {
  key: string;
  label: ComponentChildren;
  icon?: ComponentChildren;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

export interface MenuProps {
  items: MenuItem[];
  className?: string;
  style?: JSX.CSSProperties;
  selectedKey?: string;
  onSelect?: (key: string) => void;
  'aria-label'?: string;
}

/**
 * Menu – komponent menu (sidebar/topbar)
 */
export function Menu({
  items,
  className = '',
  style,
  selectedKey,
  onSelect,
  'aria-label': ariaLabel = 'Menu nawigacyjne',
}: MenuProps) {
  return (
    <nav className={`${styles.menu} ${className}`.trim()} style={style} aria-label={ariaLabel}>
      <ul className={styles.list} role="menu">
        {items.map((item) => (
          <li
            key={item.key}
            className={[
              styles.item,
              item.disabled ? styles.disabled : '',
              selectedKey === item.key ? styles.selected : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role="menuitem"
            aria-disabled={item.disabled}
            aria-current={selectedKey === item.key}
            tabIndex={item.disabled ? -1 : 0}
            onClick={() => {
              if (!item.disabled) {
                item.onClick?.();
                onSelect?.(item.key);
              }
            }}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
