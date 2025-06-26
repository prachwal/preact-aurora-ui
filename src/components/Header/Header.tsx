import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

// eslint-disable-next-line import/no-unresolved
import styles from "./Header.module.scss";

export interface HeaderProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  logo?: preact.VNode;
  nav?: preact.VNode;
  actions?: preact.VNode;
  "aria-label"?: string;
}

/**
 * Header – górny pasek nawigacyjny dashboardu (logo, nawigacja, akcje użytkownika)
 */
export function Header({
  children,
  className = "",
  style,
  logo,
  nav,
  actions,
  "aria-label": ariaLabel = "Header",
}: HeaderProps) {
  return (
    <header
      className={`${styles.header} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
      role="banner"
    >
      {logo && <div className={styles.logo}>{logo}</div>}
      {nav && (
        <nav className={styles.nav} aria-label="Main navigation">
          {nav}
        </nav>
      )}
      <div className={styles.spacer} />
      {actions && <div className={styles.actions}>{actions}</div>}
      {children}
    </header>
  );
}
