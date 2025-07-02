import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import { ThemeToggle } from '../ThemeProvider/ThemeToggle';
import styles from './DocsLayout.module.scss';

export interface DocsLayoutProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;
  backgroundVariant?: 'homepage' | 'readme' | 'default';
}

/**
 * DocsLayout – Wspólny layout dla wszystkich stron dokumentacji
 * Zawiera sticky header z theme toggle i scrollable main content
 */
export function DocsLayout({
  children,
  className = '',
  style,
  'aria-label': ariaLabel = 'Aurora UI Documentation',
  backgroundVariant = 'default',
}: DocsLayoutProps) {
  const classes = [
    styles.docsLayout,
    styles[`variant-${backgroundVariant}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} aria-label={ariaLabel}>
      {/* Sticky Header with Theme Toggle */}
      <header className={styles.stickyHeader}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🌟</span>
            <span className={styles.logoText}>Aurora UI</span>
          </div>
          <div className={styles.themeToggleWrapper}>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Scrollable Main Content */}
      <main className={styles.mainContent} role="main">
        <div className={styles.container}>
          {children}
        </div>
      </main>
    </div>
  );
}
