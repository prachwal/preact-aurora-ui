import type { ComponentChildren, JSX } from "preact";

import styles from "./Layout.module.scss";

export interface LayoutProps {
  children: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  direction?: "horizontal" | "vertical";
  fullHeight?: boolean;
}

/**
 * Główny kontener layoutu dashboardu. Zapewnia elastyczny układ (flex lub grid),
 * obsługuje kierunek, pełną wysokość oraz przekazuje style i klasy.
 */
export function Layout({
  children,
  className = "",
  style,
  direction = "vertical",
  fullHeight = true,
}: LayoutProps) {
  const classes = [
    styles.layout,
    styles[`layout--${direction}`],
    fullHeight ? styles["layout--fullHeight"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

export default Layout;
