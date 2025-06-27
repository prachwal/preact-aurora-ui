import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Col.module.scss";

export interface ColProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  span?: number;
  offset?: number;

  // Enhanced responsive props
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  order?: number;
}

/**
 * Col – kolumna siatki
 *
 * @param span - Liczba kolumn do zajęcia (1-12)
 * @param offset - Przesunięcie kolumny
 * @param xs,sm,md,lg,xl - Responsive breakpoint spans
 * @param order - Kolejność wyświetlania (CSS order)
 */
export function Col({
  children,
  className = "",
  style,
  span,
  offset = 0,
  xs,
  sm,
  md,
  lg,
  xl,
  order,
}: ColProps) {
  // Use span only if no responsive props are provided
  const defaultSpan = span || (!xs && !sm && !md && !lg && !xl ? 1 : undefined);

  const classes = [
    styles.col,
    defaultSpan ? styles[`col--span-${defaultSpan}`] : "",
    offset > 0 ? styles[`col--offset-${offset}`] : "",
    xs ? styles[`col--xs-${xs}`] : "",
    sm ? styles[`col--sm-${sm}`] : "",
    md ? styles[`col--md-${md}`] : "",
    lg ? styles[`col--lg-${lg}`] : "",
    xl ? styles[`col--xl-${xl}`] : "",
    order ? styles[`col--order-${order}`] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const colStyle: JSX.CSSProperties = {
    ...style,
    ...(order && { order }),
  };

  return (
    <div className={classes} style={colStyle} role="gridcell">
      {children}
    </div>
  );
}
