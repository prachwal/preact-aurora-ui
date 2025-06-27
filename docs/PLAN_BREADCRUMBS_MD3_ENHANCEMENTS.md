# Plan ulepszeń: **Breadcrumbs → MD3 Enhancements**

---

## 1. Analiza obecnego stanu i wymagań MD3

### Obecny stan Breadcrumbs

**Obecne propsy (już dobre):**

- `items: BreadcrumbItem[]`
- `separator?: ComponentChildren` (default: '/')
- `onItemClick?: (item, idx, e) => void`
- `className`, `style`, `aria-label`

**BreadcrumbItem structure:**

- `label: string`
- `href?: string`
- `isActive?: boolean`
- `icon?: ComponentChildren`

### MD3 Breadcrumbs dodatkowe wymagania

**Collapse behavior:** maxItems z ellipsis  
**Expansion:** "Show more" functionality  
**Variants:** condensed layout  
**Enhanced UX:** better responsive behavior

---

## 2. Checklist: Rozbudowa Breadcrumbs Component

### 2.1 Rozszerzenie interfejsów

- [ ] Aktualizacja `BreadcrumbsProps`:

```typescript
interface BreadcrumbsProps {
  // Istniejące propsy (zachowane)
  items: BreadcrumbItem[];
  separator?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  onItemClick?: (item: BreadcrumbItem, idx: number, e: Event) => void;
  'aria-label'?: string;

  // NOWE - MD3 enhancements
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
```

- [ ] Rozszerzenie `BreadcrumbItem` (optional):

```typescript
interface BreadcrumbItem {
  // Istniejące (zachowane)
  label: string;
  href?: string;
  isActive?: boolean;
  icon?: ComponentChildren;

  // DODATKOWE (optional)
  description?: string; // Tooltip description
  priority?: number; // For smart collapse (keep important items)
}
```

### 2.2 SCSS enhancements

- [ ] Collapse/expand styling:

```scss
.breadcrumbs {
  // Existing styles...

  // Collapsed state
  &.collapsed {
    .item.hidden {
      display: none;
    }
  }

  .expand-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    background: transparent;
    border: none;
    color: var(--md-sys-color-primary);
    cursor: pointer;
    font-size: var(--font-size-sm);
    padding: var(--space-xs);
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: color-mix(in srgb, var(--md-sys-color-primary) 8%, transparent);
    }

    .icon {
      font-size: 12px;
    }
  }

  .ellipsis {
    display: inline-flex;
    align-items: center;
    padding: var(--space-xs);
    color: var(--md-sys-color-on-surface-variant);
    font-weight: bold;
    user-select: none;

    &.clickable {
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s ease;

      &:hover {
        background: color-mix(in srgb, var(--md-sys-color-on-surface) 4%, transparent);
      }
    }
  }
}
```

- [ ] Condensed variant:

```scss
.breadcrumbs--variant-condensed {
  .item {
    .link,
    .active {
      padding: var(--space-xs) var(--space-sm);
      font-size: var(--font-size-sm);
    }

    .icon {
      width: 14px;
      height: 14px;
    }
  }

  .separator {
    font-size: var(--font-size-sm);
    margin: 0 var(--space-xs);
  }
}
```

- [ ] Responsive behavior:

```scss
@media (max-width: 768px) {
  .breadcrumbs--responsive {
    .item {
      // Hide middle items on mobile, keep first and last
      &:not(:first-child):not(:last-child):not(.always-visible) {
        display: none;
      }
    }

    // Show ellipsis between first and last
    .item:first-child + .item:last-child::before {
      content: '...';
      margin: 0 var(--space-sm);
      color: var(--md-sys-color-on-surface-variant);
    }
  }
}
```

- [ ] Enhanced animations:

```scss
.item {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  &.fade-in {
    animation: fadeIn 0.3s ease;
  }

  &.fade-out {
    animation: fadeOut 0.3s ease;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-4px);
  }
}
```

### 2.3 Component Logic Enhancements

- [ ] Collapse/expand state management:

```typescript
const useBreadcrumbsCollapse = (
  items: BreadcrumbItem[],
  maxItems?: number,
  responsive = true,
  responsiveBreakpoint = 768,
) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!responsive) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= responsiveBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [responsive, responsiveBreakpoint]);

  const shouldCollapse = useMemo(() => {
    if (isMobile && responsive) return true;
    return maxItems && items.length > maxItems;
  }, [items.length, maxItems, isMobile, responsive]);

  const visibleItems = useMemo(() => {
    if (!shouldCollapse || isExpanded) return items;

    if (isMobile && responsive) {
      // On mobile, show only first and last
      return items.length > 2 ? [items[0], items[items.length - 1]] : items;
    }

    if (maxItems) {
      // Show first few and last item
      const keepCount = Math.max(1, maxItems - 1);
      return [...items.slice(0, keepCount), items[items.length - 1]];
    }

    return items;
  }, [items, shouldCollapse, isExpanded, maxItems, isMobile, responsive]);

  const hiddenCount = items.length - visibleItems.length;

  return {
    visibleItems,
    hiddenCount,
    shouldCollapse,
    isExpanded,
    setIsExpanded,
    isMobile,
  };
};
```

- [ ] Enhanced component:

```typescript
export function Breadcrumbs({
  items,
  separator = '/',
  className = '',
  style,
  onItemClick,
  'aria-label': ariaLabel = 'Breadcrumb',
  // New props
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
    shouldCollapse,
    isExpanded,
    setIsExpanded,
    isMobile
  } = useBreadcrumbsCollapse(items, maxItems, responsive, responsiveBreakpoint);

  if (!items || items.length === 0) return null;

  const classes = [
    styles.breadcrumbs,
    styles[`breadcrumbs--variant-${variant}`],
    responsive ? styles['breadcrumbs--responsive'] : '',
    shouldCollapse && !isExpanded ? styles.collapsed : '',
    className,
  ].filter(Boolean).join(' ');

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const renderEllipsis = () => {
    if (!shouldCollapse || isExpanded) return null;

    return (
      <li className={styles.item} key="ellipsis">
        {showExpandButton ? (
          <button
            className={styles['expand-button']}
            onClick={handleExpandClick}
            aria-label={`${expandText} (${hiddenCount} hidden items)`}
          >
            <span className={styles.icon}>{collapsedIcon}</span>
            <span>{expandText}</span>
            <span className={styles.icon}>{expandIcon}</span>
          </button>
        ) : (
          <span
            className={`${styles.ellipsis} ${showExpandButton ? styles.clickable : ''}`}
            onClick={showExpandButton ? handleExpandClick : undefined}
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

  const renderItems = () => {
    const itemsToRender = shouldCollapse && !isExpanded ? visibleItems : items;
    const needsEllipsis = shouldCollapse && !isExpanded && hiddenCount > 0;

    return itemsToRender.map((item, idx) => {
      const isLast = idx === itemsToRender.length - 1;
      const isOriginalLast = idx === items.length - 1;

      // Insert ellipsis before last item if needed
      if (needsEllipsis && isLast && !isOriginalLast) {
        return (
          <Fragment key={`item-${idx}`}>
            {renderEllipsis()}
            {renderBreadcrumbItem(item, idx, isLast)}
          </Fragment>
        );
      }

      return renderBreadcrumbItem(item, idx, isLast);
    });
  };

  const renderBreadcrumbItem = (item: BreadcrumbItem, idx: number, isLast: boolean) => {
    // Existing item rendering logic with enhancements...
    const isLink = !!item.href && !isLast;

    return (
      <li key={idx} className={`${styles.item} ${isExpanded ? styles['fade-in'] : ''}`}>
        {/* Existing rendering logic */}
        {!isLast && (
          <span className={styles.separator} aria-hidden="true">
            {separator}
          </span>
        )}
      </li>
    );
  };

  return (
    <nav
      className={classes}
      style={style}
      aria-label={ariaLabel}
      role="navigation"
    >
      <ol className={styles.list}>
        {renderItems()}
      </ol>
    </nav>
  );
}
```

### 2.4 Enhanced Tests

- [ ] Test maxItems collapse functionality
- [ ] Test expand/collapse behavior
- [ ] Test responsive auto-collapse
- [ ] Test condensed variant
- [ ] Test expand button interaction
- [ ] Test custom icons (collapsed, expand)
- [ ] Test responsive breakpoint
- [ ] Test animation states
- [ ] Test accessibility w/ collapsed state
- [ ] Test backwards compatibility

### 2.5 Enhanced Storybook

- [ ] Basic stories (unchanged):
  - Default Breadcrumbs
  - With Icons
  - Custom Separator

- [ ] New enhancement stories:
  - Collapsed Breadcrumbs (maxItems)
  - Responsive Breadcrumbs
  - Condensed Variant
  - With Expand Button
  - Custom Collapse Icons

- [ ] Interactive playground z wszystkimi new props

### 2.6 Backwards Compatibility

- [ ] Wszystkie istniejące propsy działają bez zmian
- [ ] Default behavior zachowany (no collapse)
- [ ] Nowe features są opt-in

---

## 3. Przykłady użycia po rozbudowie

```tsx
// Basic breadcrumbs (unchanged)
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Current Page' }
  ]}
/>

// Collapsed breadcrumbs
<Breadcrumbs
  items={longBreadcrumbItems}
  maxItems={3}
  expandText="Show all"
/>

// Responsive breadcrumbs
<Breadcrumbs
  items={breadcrumbItems}
  responsive
  responsiveBreakpoint={600}
/>

// Condensed variant
<Breadcrumbs
  items={breadcrumbItems}
  variant="condensed"
  maxItems={4}
/>

// Custom collapse styling
<Breadcrumbs
  items={breadcrumbItems}
  maxItems={3}
  collapsedIcon="••••"
  expandIcon="⇣"
  expandText="More"
/>

// No expand button (just ellipsis)
<Breadcrumbs
  items={breadcrumbItems}
  maxItems={3}
  showExpandButton={false}
/>
```

---

## 4. Kryteria akceptacji

- ✅ maxItems collapse functionality
- ✅ Expand/collapse behavior z animacjami
- ✅ Responsive auto-collapse
- ✅ Condensed variant
- ✅ Custom collapse/expand icons
- ✅ Configurable expand button
- ✅ Smooth animations
- ✅ Proper accessibility w/ collapsed state
- ✅ Backwards compatibility
- ✅ Comprehensive tests
- ✅ Complete Storybook documentation

---

**Priorytet:** 🔄 NISKI - istniejący Breadcrumbs już dobry  
**Czas implementacji:** 1-2 dni robocze  
**Zależności:** Podstawowy Breadcrumbs (już gotowy)
