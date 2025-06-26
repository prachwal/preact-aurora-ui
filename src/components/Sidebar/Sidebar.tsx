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
}

/**
 * Sidebar – boczny panel nawigacyjny dashboardu (menu, ikony, akcje)
 */
export function Sidebar({
  children,
  className = "",
  style,
  nav,
  actions,
  "aria-label": ariaLabel = "Sidebar",
}: SidebarProps) {
  return (
    <aside
      className={`${styles.sidebar} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
      role="complementary"
    >
      {nav && (
        <nav className={styles.nav} aria-label="Sidebar navigation">
          {nav}
        </nav>
      )}
      <div className={styles.spacer} />
      {actions && <div className={styles.actions}>{actions}</div>}
      {children}
    </aside>
  );
}
