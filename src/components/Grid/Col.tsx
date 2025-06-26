import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Col.module.scss";

export interface ColProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  span?: number;
  offset?: number;
}

/**
 * Col – kolumna siatki
 */
export function Col({
  children,
  className = "",
  style,
  span = 1,
  offset = 0,
}: ColProps) {
  return (
    <div
      className={`${styles.col} ${className}`.trim()}
      style={{
        ...style,
        gridColumn: `span ${span} / span ${span}`,
        marginLeft: offset
          ? `calc(${offset} * var(--grid-col-width, 1fr))`
          : undefined,
      }}
      role="gridcell"
    >
      {children}
    </div>
  );
}
