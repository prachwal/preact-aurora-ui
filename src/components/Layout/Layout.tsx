import type { ComponentChildren, JSX } from "preact";

import styles from "./Layout.module.scss";

export interface LayoutProps {
  children: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  direction?: "horizontal" | "vertical";
  fullHeight?: boolean;
  variant?: "default" | "dashboard" | "app" | "minimal";
  padding?: boolean | "none" | "sm" | "md" | "lg" | "xl";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  overflow?: "hidden" | "auto" | "visible";
}

/**
 * Główny kontener layoutu dashboardu. Zapewnia elastyczny układ (flex lub grid),
 * obsługuje kierunek, pełną wysokość oraz przekazuje style i klasy.
 *
 * @param variant - Wariant layoutu: default, dashboard, app, minimal
 * @param padding - Padding wewnętrzny: boolean (używa md) lub konkretny rozmiar
 * @param gap - Odstęp między elementami
 * @param overflow - Sposób obsługi przepełnienia
 */
export function Layout({
  children,
  className = "",
  style,
  direction = "vertical",
  fullHeight = true,
  variant = "default",
  padding = false,
  gap = "none",
  overflow = "hidden",
}: LayoutProps) {
  const paddingClass =
    padding !== false
      ? `layout--padding-${typeof padding === "boolean" ? "md" : padding}`
      : "";

  const classes = [
    styles.layout,
    styles[`layout--${direction}`],
    styles[`layout--variant-${variant}`],
    fullHeight ? styles["layout--fullHeight"] : "",
    paddingClass ? styles[paddingClass] : "",
    gap !== "none" ? styles[`layout--gap-${gap}`] : "",
    overflow !== "hidden" ? styles[`layout--overflow-${overflow}`] : "",
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
