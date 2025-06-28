import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import styles from './Breadcrumbs.module.scss';
import { useBreadcrumbsCollapse } from './useBreadcrumbsCollapse';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
  icon?: ComponentChildren;
  // MD3 enhancements
  description?: string; // Tooltip description
  priority?: number; // For smart collapse (keep important items)
}

export interface BreadcrumbsProps {
  // Existing props (preserved)
  items: BreadcrumbItem[];
  separator?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  onItemClick?: (item: BreadcrumbItem, idx: number, e: Event) => void;
  'aria-label'?: string;

  // MD3 enhancements
  maxItems?: number; // Collapse with ellipsis after this number
  expandText?: string; // Text for "Show more" button
  variant?: 'default' | 'condensed';

  // Advanced props
  collapsedIcon?: ComponentChildren; // Icon for collapsed state
  expandIcon?: ComponentChildren; // Icon for expand button
  showExpandButton?: boolean; // Whether to show expand functionality

  // Responsive behavior
  responsive?: boolean; // Auto-collapse on small screens
  responsiveBreakpoint?: number; // px width for auto-collapse
}

/**
 * Breadcrumbs – okruszki nawigacyjne dashboardu z MD3 enhancements
 */
export function Breadcrumbs({
  items,
  separator = '/',
  className = '',
  style,
  onItemClick,
  'aria-label': ariaLabel = 'Breadcrumb',
  // MD3 enhancements
  maxItems,
  expandText = 'Show more',
  variant = 'default',
  collapsedIcon = '...',
  expandIcon = '▼',
  showExpandButton = true,
  responsive = true,
  responsiveBreakpoint = 768,
}: BreadcrumbsProps) {
  const {
    visibleItems,
    hiddenCount,
    collapsePosition,
    shouldCollapse,
    isExpanded,
    isMobile,
    toggleExpanded,
  } = useBreadcrumbsCollapse(items, maxItems, responsive, responsiveBreakpoint);

  if (!items || items.length === 0) return null;

  const classes = [
    styles.breadcrumbs,
    variant === 'condensed' && styles['breadcrumbs--variant-condensed'],
    shouldCollapse && styles['breadcrumbs--collapsible'],
    isExpanded && styles['breadcrumbs--expanded'],
    isMobile && responsive && styles['breadcrumbs--responsive'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleExpandClick = (e: Event) => {
    e.preventDefault();
    toggleExpanded();
  };

  const handleExpandKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  };

  const renderEllipsis = () => {
    if (!shouldCollapse || isExpanded || collapsePosition === -1) return null;

    return (
      <li key="ellipsis" className={styles.item}>
        {showExpandButton ? (
          <button
            type="button"
            className={styles.expandButton}
            onClick={handleExpandClick}
            onKeyDown={handleExpandKeyDown}
            aria-label={`${expandText} (${hiddenCount} hidden items)`}
            title={`${expandText} (${hiddenCount} hidden items)`}
          >
            <span className={styles.expandIcon}>{collapsedIcon}</span>
            {!isMobile && (
              <>
                <span className={styles.expandText}>{expandText}</span>
                <span className={styles.expandArrow}>{expandIcon}</span>
              </>
            )}
          </button>
        ) : (
          <span
            className={styles.ellipsis}
            aria-label={`${hiddenCount} hidden items`}
            title={`${hiddenCount} hidden items`}
          >
            {collapsedIcon}
          </span>
        )}
        <span className={styles.separator} aria-hidden="true">
          {separator}
        </span>
      </li>
    );
  };

  const renderBreadcrumbItem = (item: BreadcrumbItem, originalIdx: number) => {
    const isLast = originalIdx === items.length - 1;
    const isLink = !!item.href && !isLast;

    const linkProps = {
      className: isLast ? styles.active : styles.link,
      tabIndex: 0,
      onClick: (e: Event) => {
        if (onItemClick) onItemClick(item, originalIdx, e);
        if (item.href && !isLast) return;
        e.preventDefault?.();
      },
      onKeyDown: (e: KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && onItemClick) {
          onItemClick(item, originalIdx, e as any);
        }
      },
    };

    return (
      <li key={originalIdx} className={styles.item}>
        {isLink ? (
          <a
            href={item.href}
            {...linkProps}
            aria-label={item.label}
            title={item.description || item.label}
          >
            {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
            {item.label}
          </a>
        ) : (
          <span
            className={styles.active}
            tabIndex={0}
            aria-label={item.label}
            aria-current={isLast ? ('page' as const) : undefined}
            title={item.description || item.label}
          >
            {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
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
  };

  const renderItems = () => {
    if (!shouldCollapse || isExpanded) {
      // Show all items
      return items.map((item, idx) => renderBreadcrumbItem(item, idx));
    }

    // Show collapsed view
    const result: any[] = [];

    // Add visible items with ellipsis in between
    for (let i = 0; i < visibleItems.length; i++) {
      const item = visibleItems[i];
      const originalIdx = items.findIndex((originalItem) => originalItem === item);

      // Add the item
      result.push(renderBreadcrumbItem(item, originalIdx));

      // Add ellipsis between first visible items and last item
      if (i === 0 && visibleItems.length > 1 && hiddenCount > 0) {
        result.push(renderEllipsis());
      }
    }

    return result;
  };

  return (
    <nav className={classes} style={style} aria-label={ariaLabel} role="navigation">
      <ol className={styles.list}>{renderItems()}</ol>
    </nav>
  );
}
