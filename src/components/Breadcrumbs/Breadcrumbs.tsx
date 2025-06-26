import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Breadcrumbs.module.scss";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
  icon?: ComponentChildren;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  onItemClick?: (item: BreadcrumbItem, idx: number, e: Event) => void;
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
  onItemClick,
  "aria-label": ariaLabel = "Breadcrumb",
}: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;
  return (
    <nav
      className={`${styles.breadcrumbs} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel}
      role="navigation"
    >
      <ol className={styles.list}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isLink = !!item.href && !isLast;
          const linkProps = {
            className: isLast ? styles.active : styles.link,
            tabIndex: 0,
            onClick: (e: Event) => {
              if (onItemClick) onItemClick(item, idx, e);
              if (item.href && !isLast) return;
              e.preventDefault?.();
            },
            onKeyDown: (e: KeyboardEvent) => {
              if ((e.key === "Enter" || e.key === " ") && onItemClick) {
                onItemClick(item, idx, e as any);
              }
            },
          };
          return (
            <li key={idx} className={styles.item}>
              {isLink ? (
                <a href={item.href} {...linkProps} aria-label={item.label}>
                  {item.icon ? (
                    <span className={styles.icon}>{item.icon}</span>
                  ) : null}
                  {item.label}
                </a>
              ) : (
                <span
                  className={styles.active}
                  tabIndex={0}
                  aria-label={item.label}
                  aria-current={isLast ? ("page" as const) : undefined}
                >
                  {item.icon ? (
                    <span className={styles.icon}>{item.icon}</span>
                  ) : null}
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
