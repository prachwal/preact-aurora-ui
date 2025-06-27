import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Sidebar.module.scss";

export interface SidebarProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  nav?: preact.VNode;
  actions?: preact.VNode;
  "aria-label"?: string;

  // Enhanced props for flexibility
  variant?: "default" | "rail" | "temporary" | "permanent";
  width?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
  elevation?: 0 | 1 | 2 | 3 | 4;
  borderless?: boolean;
  position?: "left" | "right";
}

/**
 * Sidebar – boczny panel nawigacyjny dashboardu (menu, ikony, akcje)
 *
 * @param variant - Wariant sidebara: default, rail (wąski), temporary (modalny), permanent (stały)
 * @param width - Szerokość sidebara w px lub rem
 * @param collapsible - Czy sidebar może być zwijany
 * @param collapsed - Czy sidebar jest zwinięty
 * @param elevation - Poziom cienia (0-4, Material Design)
 * @param borderless - Czy ukryć obramowanie
 * @param position - Pozycja sidebara (left/right)
 */
export function Sidebar({
  children,
  className = "",
  style,
  nav,
  actions,
  "aria-label": ariaLabel = "Sidebar",
  variant = "default",
  width,
  collapsible = false,
  collapsed = false,
  onToggle: _onToggle,
  elevation = 1,
  borderless = false,
  position = "left",
}: SidebarProps) {
  const classes = [
    styles.sidebar,
    styles[`sidebar--variant-${variant}`],
    styles[`sidebar--elevation-${elevation}`],
    collapsible ? styles["sidebar--collapsible"] : "",
    collapsed ? styles["sidebar--collapsed"] : "",
    borderless ? styles["sidebar--borderless"] : "",
    styles[`sidebar--position-${position}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sidebarStyle = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
  };

  return (
    <aside
      className={classes}
      style={sidebarStyle}
      aria-label={ariaLabel}
      role="complementary"
      data-variant={variant}
      data-collapsed={collapsed}
    >
      {actions && <div className={styles.actions}>{actions}</div>}
      {nav && (
        <nav className={styles.nav} aria-label="Sidebar navigation">
          {nav}
        </nav>
      )}
      <div className={styles.spacer} />
      {children}
    </aside>
  );
}
