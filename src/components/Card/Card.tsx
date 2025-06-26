import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Card.module.scss";

export interface CardProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  title?: string;
  subtitle?: string;
  actions?: ComponentChildren;
  "aria-label"?: string;
}

/**
 * Card – kafelek na dane/statystyki
 */
export function Card({
  children,
  className = "",
  style,
  title,
  subtitle,
  actions,
  "aria-label": ariaLabel = "Kafelek",
}: CardProps) {
  return (
    <section
      className={`${styles.card} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
    >
      {(title || actions) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
