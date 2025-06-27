import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import styles from './Card.module.scss';

export interface CardProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  title?: string;
  subtitle?: string;
  actions?: ComponentChildren;
  'aria-label'?: string;

  // Enhanced props for flexibility
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  elevation?: 0 | 1 | 2 | 3 | 4 | 8 | 12 | 16 | 24;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

/**
 * Card – kafelek na dane/statystyki
 *
 * @param variant - Wariant karty: default, outlined, elevated, filled
 * @param elevation - Poziom cienia (0-24, Material Design)
 * @param padding - Rozmiar paddingu wewnętrznego
 * @param hoverable - Czy karta ma efekt hover
 * @param clickable - Czy karta jest klikalna
 * @param loading - Czy karta jest w stanie ładowania
 */
export function Card({
  children,
  className = '',
  style,
  title,
  subtitle,
  actions,
  'aria-label': ariaLabel = 'Kafelek',
  variant = 'default',
  elevation = 1,
  padding = 'md',
  hoverable = false,
  clickable = false,
  onClick,
  loading = false,
}: CardProps) {
  const classes = [
    styles.card,
    styles[`card--variant-${variant}`],
    styles[`card--elevation-${elevation}`],
    styles[`card--padding-${padding}`],
    hoverable ? styles['card--hoverable'] : '',
    clickable ? styles['card--clickable'] : '',
    loading ? styles['card--loading'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (clickable && onClick && !loading) {
      onClick();
    }
  };

  return (
    <section
      className={classes}
      style={style}
      aria-label={ariaLabel}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      data-loading={loading}
    >
      {loading && <div className={styles.loadingOverlay} />}
      {(title || actions) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
