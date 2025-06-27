import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Header.module.scss";

export interface HeaderProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  logo?: preact.VNode;
  nav?: preact.VNode;
  actions?: preact.VNode;
  "aria-label"?: string;
  variant?: "default" | "compact" | "prominent" | "minimal";
  elevation?: 0 | 1 | 2 | 3 | 4;
  sticky?: boolean;
  borderless?: boolean;
}

/**
 * Header – górny pasek nawigacyjny dashboardu (logo, nawigacja, akcje użytkownika)
 *
 * @param variant - Wariant headera: default, compact, prominent, minimal
 * @param elevation - Poziom cienia (0-4, Material Design)
 * @param sticky - Czy header ma być sticky
 * @param borderless - Czy ukryć obramowanie
 */
export function Header({
  children,
  className = "",
  style,
  logo,
  nav,
  actions,
  "aria-label": ariaLabel = "Header",
  variant = "default",
  elevation = 1,
  sticky = false,
  borderless = false,
}: HeaderProps) {
  const classes = [
    styles.header,
    styles[`header--variant-${variant}`],
    styles[`header--elevation-${elevation}`],
    sticky ? styles["header--sticky"] : "",
    borderless ? styles["header--borderless"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={classes}
      style={style}
      aria-label={ariaLabel}
      role="banner"
    >
      {logo && <div className={styles.logo}>{logo}</div>}
      {nav && (
        <nav className={styles.nav} aria-label="Header navigation">
          {nav}
        </nav>
      )}
      <div className={styles.spacer} />
      {actions && <div className={styles.actions}>{actions}</div>}
      {children}
    </header>
  );
}
