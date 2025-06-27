import type { JSX } from 'preact/jsx-runtime';

import styles from './SidebarToggle.module.scss';

export interface SidebarToggleProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
  style?: JSX.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'outlined' | 'filled';
  iconType?: 'hamburger' | 'arrow' | 'chevron';
}

/**
 * SidebarToggle - Przycisk do zwijania/rozwijania sidebara
 *
 * @param collapsed - Czy sidebar jest zwinięty
 * @param onToggle - Funkcja wywoływana po kliknięciu
 * @param size - Rozmiar przycisku
 * @param variant - Wariant stylu przycisku
 * @param iconType - Typ ikony (hamburger, arrow, chevron)
 */
export function SidebarToggle({
  collapsed,
  onToggle,
  className = '',
  style,
  size = 'md',
  variant = 'default',
  iconType = 'hamburger',
}: SidebarToggleProps) {
  const getIcon = () => {
    switch (iconType) {
      case 'arrow':
        return collapsed ? '→' : '←';
      case 'chevron':
        return collapsed ? '❯' : '❮';
      case 'hamburger':
      default:
        return '☰';
    }
  };

  const getLabel = () => {
    return collapsed ? 'Menu' : 'Menu';
  };
  const classes = [
    styles.sidebarToggle,
    styles[`sidebarToggle--size-${size}`],
    styles[`sidebarToggle--variant-${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      style={style}
      onClick={onToggle}
      aria-label="Toggle menu"
      aria-expanded={!collapsed}
      type="button"
    >
      <span className={styles.icon} aria-hidden="true">
        {getIcon()}
      </span>
      {!collapsed && <span className={styles.label}>{getLabel()}</span>}
    </button>
  );
}
