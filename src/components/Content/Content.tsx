import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import styles from './Content.module.scss';

export interface ContentProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;

  // Enhanced props for flexibility
  padding?: boolean | 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: string | number;
  centered?: boolean;
  scrollable?: boolean;
  variant?: 'default' | 'article' | 'dashboard' | 'form';
}

/**
 * Content – główna część na treść dashboardu
 *
 * @param padding - Padding wewnętrzny: boolean (używa md) lub konkretny rozmiar
 * @param maxWidth - Maksymalna szerokość contentu
 * @param centered - Czy content ma być wycentrowany
 * @param scrollable - Czy włączyć przewijanie (domyślnie true)
 * @param variant - Wariant contentu: default, article, dashboard, form
 */
export function Content({
  children,
  className = '',
  style,
  'aria-label': ariaLabel = 'Content',
  padding = true,
  maxWidth,
  centered = false,
  scrollable = true,
  variant = 'default',
}: ContentProps) {
  const paddingClass =
    padding !== false ? `content--padding-${typeof padding === 'boolean' ? 'md' : padding}` : '';

  const classes = [
    styles.content,
    styles[`content--variant-${variant}`],
    paddingClass ? styles[paddingClass] : '',
    centered ? styles['content--centered'] : '',
    !scrollable ? styles['content--no-scroll'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentStyle = {
    ...style,
    ...(maxWidth && {
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    }),
  };

  return (
    <main className={classes} style={contentStyle} aria-label={ariaLabel} role="main">
      {children}
    </main>
  );
}
