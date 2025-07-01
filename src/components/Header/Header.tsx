import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import { Menu } from '../Menu/Menu';
import type { MenuItem } from '../Menu/Menu';
import { ThemeToggle } from '../ThemeProvider/ThemeToggle';
import { useTheme } from '../ThemeProvider/ThemeProvider';

import styles from './Header.module.scss';
import { useScrollBehavior } from './useScrollBehavior';
import { useActionsOverflow } from './useActionsOverflow';

export interface HeaderProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  logo?: preact.VNode;
  nav?: preact.VNode;
  actions?: preact.VNode;
  'aria-label'?: string;
  variant?: 'default' | 'compact' | 'prominent' | 'minimal';
  elevation?: 0 | 1 | 2 | 3 | 4;
  sticky?: boolean;
  borderless?: boolean;

  // NOWE - MD3 App Bar enhancements
  scrollBehavior?: 'fixed' | 'scroll' | 'hide' | 'elevate';
  centerTitle?: boolean;

  // Navigation integration
  navigationIcon?: ComponentChildren;
  onNavigationClick?: () => void;

  // Action overflow
  moreActions?: MenuItem[];
  moreActionsIcon?: ComponentChildren;
  maxVisibleActions?: number;

  // Advanced scrolling
  scrollTarget?: HTMLElement | string;
  scrollThreshold?: number;

  // FAZA 4: Theme Integration Features
  showThemeToggle?: boolean;
  themeTogglePosition?: 'left' | 'right' | 'center';
  autoColorManagement?: boolean;
  themeToggleVariant?: 'icon' | 'button' | 'switch';
  themeToggleSize?: 'sm' | 'md' | 'lg';
}

/**
 * Header – górny pasek nawigacyjny dashboardu z MD3 App Bar enhancements
 *
 * @param variant - Wariant headera: default, compact, prominent, minimal
 * @param elevation - Poziom cienia (0-4, Material Design)
 * @param sticky - Czy header ma być sticky
 * @param borderless - Czy ukryć obramowanie
 * @param scrollBehavior - Zachowanie przy scrollowaniu: fixed, scroll, hide, elevate
 * @param centerTitle - Czy wyśrodkować tytuł
 * @param navigationIcon - Ikona nawigacji (hamburger menu)
 * @param onNavigationClick - Callback dla ikony nawigacji
 * @param moreActions - Dodatkowe akcje w overflow menu
 * @param maxVisibleActions - Maksymalna liczba widocznych akcji
 */
export function Header({
  children,
  className = '',
  style,
  logo,
  nav,
  actions,
  'aria-label': ariaLabel = 'Header',
  variant = 'default',
  elevation = 1,
  sticky = false,
  borderless = false,

  // MD3 enhancements
  scrollBehavior = 'fixed',
  centerTitle = false,
  navigationIcon,
  onNavigationClick,
  moreActions = [],
  moreActionsIcon = '⋮',
  maxVisibleActions = 3,
  scrollTarget,
  scrollThreshold = 10,

  // FAZA 4: Theme Integration Features
  showThemeToggle = false,
  themeTogglePosition = 'right',
  autoColorManagement = false,
  themeToggleVariant = 'icon',
  themeToggleSize = 'md',
}: HeaderProps) {
  const { isDark } = useTheme();

  const { scrolled, hidden } = useScrollBehavior({
    scrollBehavior,
    scrollTarget,
    scrollThreshold,
  });

  const { visibleActions, overflowActions, hasOverflow, showOverflow, setShowOverflow } =
    useActionsOverflow({
      actions,
      moreActions,
      maxVisibleActions,
    });

  const classes = [
    styles.header,
    styles[`header--variant-${variant}`],
    styles[`header--elevation-${elevation}`],
    styles[`header--scroll-${scrollBehavior}`],
    sticky ? styles['header--sticky'] : '',
    borderless ? styles['header--borderless'] : '',
    centerTitle ? styles['header--center-title'] : '',
    scrolled ? styles['header--scrolled'] : '',
    hidden ? styles['header--hidden'] : '',
    autoColorManagement && isDark ? styles['header--auto-dark'] : '',
    autoColorManagement && !isDark ? styles['header--auto-light'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleNavigationClick = () => {
    if (onNavigationClick) {
      onNavigationClick();
    }
  };

  const handleMoreActionsClick = () => {
    setShowOverflow(!showOverflow);
  };

  // Create enhanced actions with theme toggle
  const getEnhancedActions = () => {
    const themeToggle = showThemeToggle ? (
      <ThemeToggle
        variant={themeToggleVariant}
        size={themeToggleSize}
        className={styles['theme-toggle']}
      />
    ) : null;

    if (themeTogglePosition === 'left') {
      return (
        <>
          {themeToggle}
          {visibleActions}
        </>
      );
    } else if (themeTogglePosition === 'center') {
      return (
        <>
          {visibleActions}
          {themeToggle}
        </>
      );
    } else {
      // right (default)
      return (
        <>
          {visibleActions}
          {themeToggle}
        </>
      );
    }
  };

  return (
    <header className={classes} style={style} aria-label={ariaLabel} role="banner">
      {navigationIcon && (
        <button
          className={styles['navigation-icon']}
          onClick={handleNavigationClick}
          aria-label="Open navigation menu"
          type="button"
        >
          {navigationIcon}
        </button>
      )}

      {logo && <div className={styles.logo}>{logo}</div>}

      {nav && (
        <nav className={styles.nav} aria-label="Header navigation">
          {nav}
        </nav>
      )}

      <div className={styles.spacer} />

      {(visibleActions || hasOverflow || showThemeToggle) && (
        <div className={styles['actions-container']}>
          <div className={styles['visible-actions']}>{getEnhancedActions()}</div>

          {hasOverflow && (
            <div className={styles['more-actions-wrapper']}>
              <button
                className={styles['more-actions-button']}
                onClick={handleMoreActionsClick}
                aria-label="More actions"
                aria-expanded={showOverflow}
                type="button"
              >
                {moreActionsIcon}
              </button>

              {showOverflow && (
                <div className={styles['overflow-menu']}>
                  <Menu
                    items={overflowActions}
                    variant="dropdown"
                    onSelect={() => setShowOverflow(false)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {children}
    </header>
  );
}
