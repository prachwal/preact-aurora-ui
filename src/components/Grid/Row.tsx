import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import styles from './Row.module.scss';

export interface RowProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: string;
}

/**
 * Row – wiersz siatki
 */
export function Row({
  children,
  className = '',
  style,
  align = 'stretch',
  justify = 'start',
  gap,
}: RowProps) {
  return (
    <div
      className={[styles.row, styles[`align-${align}`], styles[`justify-${justify}`], className]
        .filter(Boolean)
        .join(' ')}
      style={{ ...style, ...(gap ? { gap } : {}) }}
      role="row"
    >
      {children}
    </div>
  );
}
