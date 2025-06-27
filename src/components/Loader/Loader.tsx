import type { JSX } from "preact/jsx-runtime";

import styles from "./Loader.module.scss";

export interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
  style?: JSX.CSSProperties;
  "aria-label"?: string;
}

/**
 * Loader – uniwersalny spinner ładowania
 */
export function Loader({
  size = "md",
  color,
  className = "",
  style,
  "aria-label": ariaLabel = "Ładowanie...",
}: LoaderProps) {
  return (
    <span
      className={[styles.loader, styles[size], className]
        .filter(Boolean)
        .join(" ")}
      style={{ ...style, color }}
      role="status"
      aria-label={ariaLabel}
      data-testid="loader-root"
    >
      <span className={styles.spinner} />
    </span>
  );
}
