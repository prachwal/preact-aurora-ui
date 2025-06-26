import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Grid.module.scss";

export interface GridProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  gap?: string;
}

/**
 * Grid – kontener siatki (row/col)
 */
export function Grid({ children, className = "", style, gap }: GridProps) {
  return (
    <div
      className={`${styles.grid} ${className}`.trim()}
      style={{ ...style, ...(gap ? { gap } : {}) }}
      role="grid"
    >
      {children}
    </div>
  );
}
