import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Grid.module.scss";

export interface GridProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  gap?: string;

  // Enhanced props for flexibility
  columns?: number | string;
  responsive?: boolean;
  gutter?: number | [number, number];
  justify?: "start" | "center" | "end" | "between" | "around";
  align?: "start" | "center" | "end" | "stretch";
}

/**
 * Grid – kontener siatki (row/col)
 *
 * @param columns - Liczba kolumn lub string CSS grid-template-columns
 * @param responsive - Czy włączyć automatyczne responsive breakpoints
 * @param gutter - Odstęp między elementami [horizontal, vertical] lub single value
 * @param justify - Justyfikacja elementów w grid
 * @param align - Wyrównanie elementów w grid
 */
export function Grid({
  children,
  className = "",
  style,
  gap,
  columns = 12,
  responsive = true,
  gutter,
  justify = "start",
  align = "stretch",
}: GridProps) {
  const classes = [
    styles.grid,
    responsive ? styles["grid--responsive"] : "",
    styles[`grid--justify-${justify}`],
    styles[`grid--align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const gridStyle: JSX.CSSProperties = {
    ...style,
  };

  // Handle columns
  if (typeof columns === "number") {
    gridStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  } else {
    gridStyle.gridTemplateColumns = columns;
  }

  // Handle gap/gutter
  if (gutter) {
    if (Array.isArray(gutter)) {
      gridStyle.columnGap = `${gutter[0]}px`;
      gridStyle.rowGap = `${gutter[1]}px`;
    } else {
      gridStyle.gap = `${gutter}px`;
    }
  } else if (gap) {
    gridStyle.gap = gap;
  }

  return (
    <div className={classes} style={gridStyle} role="grid">
      {children}
    </div>
  );
}
