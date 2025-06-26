import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Content.module.scss";

export interface ContentProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  "aria-label"?: string;
}

/**
 * Content – główna część na treść dashboardu
 */
export function Content({
  children,
  className = "",
  style,
  "aria-label": ariaLabel = "Content",
}: ContentProps) {
  return (
    <main
      className={`${styles.content} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
      role="main"
    >
      {children}
    </main>
  );
}
