import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

// eslint-disable-next-line import/no-unresolved
import styles from "./Breadcrumbs.module.scss";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: Event) => void;
  "aria-current"?: "page" | undefined;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  "aria-label"?: string;
}

/**
 * Breadcrumbs – okruszki nawigacyjne dashboardu
 */
export function Breadcrumbs({
  items,
  separator = "/",
  className = "",
  style,
  "aria-label": ariaLabel = "Breadcrumbs",
}: BreadcrumbsProps) {
  return (
    <nav
      className={`${styles.breadcrumbs} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
    >
      <ol className={styles.list}>
        {items.map((item, idx) => (
          <li key={idx} className={styles.item}>
            {item.href ? (
              <a
                href={item.href}
                onClick={item.onClick}
                aria-current={item["aria-current"]}
                className={styles.link}
              >
                {item.label}
              </a>
            ) : (
              <span aria-current={item["aria-current"]} className={styles.text}>
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && (
              <span className={styles.separator}>{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
