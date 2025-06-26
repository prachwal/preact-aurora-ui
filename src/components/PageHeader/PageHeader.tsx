import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./PageHeader.module.scss";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  "aria-label"?: string;
}

/**
 * PageHeader – nagłówek sekcji/strony dashboardu
 */
export function PageHeader({
  title,
  subtitle,
  actions,
  className = "",
  style,
  "aria-label": ariaLabel = "Page header",
}: PageHeaderProps) {
  return (
    <header
      className={`${styles.pageHeader} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
    >
      <div className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </header>
  );
}
