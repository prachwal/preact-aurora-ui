import { useState, useEffect } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import { useTheme } from '../ThemeProvider/ThemeProvider';

import styles from './Sidebar.module.scss';

export interface SidebarProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  nav?: preact.VNode;
  actions?: preact.VNode;
  'aria-label'?: string;

  // Enhanced props for flexibility
  variant?: 'default' | 'rail' | 'temporary' | 'permanent';
  width?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
  elevation?: 0 | 1 | 2 | 3 | 4;
  borderless?: boolean;
  position?: 'left' | 'right';

  // FAZA 4: Enhanced Mobile & Theme Features
  autoCollapse?: boolean;
  collapseBreakpoint?: number;
  themeAware?: boolean;
  overlay?: boolean;
  persistent?: boolean;
}

/**
 * Sidebar – boczny panel nawigacyjny dashboardu (menu, ikony, akcje)
 *
 * @param variant - Wariant sidebara: default, rail (wąski), temporary (modalny), permanent (stały)
 * @param width - Szerokość sidebara w px lub rem
 * @param collapsible - Czy sidebar może być zwijany
 * @param collapsed - Czy sidebar jest zwinięty
 * @param elevation - Poziom cienia (0-4, Material Design)
 * @param borderless - Czy ukryć obramowanie
 * @param position - Pozycja sidebara (left/right)
 */
export function Sidebar({
  children,
  className = '',
  style,
  nav,
  actions,
  'aria-label': ariaLabel = 'Sidebar',
  variant = 'default',
  width,
  collapsible = false,
  collapsed = false,
  onToggle,
  elevation = 1,
  borderless = false,
  position = 'left',

  // FAZA 4: Enhanced features
  autoCollapse = false,
  collapseBreakpoint = 768,
  themeAware = false,
  overlay = false,
  persistent = false,
}: SidebarProps) {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);

  // Handle auto-collapse on mobile
  useEffect(() => {
    if (!autoCollapse) return;

    const checkMobile = () => {
      const mobile = window.innerWidth < collapseBreakpoint;
      setIsMobile(mobile);

      if (mobile && !internalCollapsed) {
        setInternalCollapsed(true);
        onToggle?.();
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [autoCollapse, collapseBreakpoint, internalCollapsed, onToggle]);

  // Sync with external collapsed state
  useEffect(() => {
    setInternalCollapsed(collapsed);
  }, [collapsed]);

  const actualCollapsed = autoCollapse ? internalCollapsed : collapsed;
  const actualVariant = isMobile && autoCollapse ? 'temporary' : variant;

  const classes = [
    styles.sidebar,
    styles[`sidebar--variant-${actualVariant}`],
    styles[`sidebar--elevation-${elevation}`],
    collapsible ? styles['sidebar--collapsible'] : undefined,
    actualCollapsed ? styles['sidebar--collapsed'] : undefined,
    borderless ? styles['sidebar--borderless'] : undefined,
    styles[`sidebar--position-${position}`],
    themeAware && isDark ? styles['sidebar--theme-dark'] : undefined,
    themeAware && !isDark ? styles['sidebar--theme-light'] : undefined,
    overlay ? styles['sidebar--overlay'] : undefined,
    persistent ? styles['sidebar--persistent'] : undefined,
    isMobile ? styles['sidebar--mobile'] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sidebarStyle = {
    ...style,
    ...(width && !actualCollapsed
      ? { width: typeof width === 'number' ? `${width}px` : width }
      : {}),
  };

  return (
    <aside
      className={classes}
      style={sidebarStyle}
      aria-label={ariaLabel}
      role="complementary"
      data-variant={actualVariant}
      data-collapsed={actualCollapsed}
    >
      {actions && <div className={styles.actions}>{actions}</div>}
      {nav && (
        <nav className={styles.nav} aria-label="Sidebar navigation">
          {nav}
        </nav>
      )}
      <div className={styles.spacer} />
      {children}
    </aside>
  );
}
