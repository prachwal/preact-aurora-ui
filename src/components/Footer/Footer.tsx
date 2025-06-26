import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Footer.module.scss";

export interface FooterProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  "aria-label"?: string;
}

/**
 * Footer – pasek dolny dashboardu
 */
export function Footer({
  children,
  className = "",
  style,
  "aria-label": ariaLabel = "Footer",
}: FooterProps) {
  return (
    <footer
      className={`${styles.footer} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
      role="contentinfo"
    >
      {children}
    </footer>
  );
}
