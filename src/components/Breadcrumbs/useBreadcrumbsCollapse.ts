import { useState, useMemo, useEffect } from 'preact/hooks';

import type { BreadcrumbItem } from './Breadcrumbs';

/**
 * Hook for managing breadcrumbs collapse behavior
 */
export function useBreadcrumbsCollapse(
  items: BreadcrumbItem[],
  maxItems?: number,
  responsive = true,
  responsiveBreakpoint = 768,
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    if (!responsive) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < responsiveBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [responsive, responsiveBreakpoint]);

  // Determine if we should collapse
  const shouldCollapse = useMemo(() => {
    // First check maxItems condition
    if (maxItems && items.length > maxItems) return true;
    // Then check mobile condition
    if (isMobile && responsive) return true;
    return false;
  }, [items.length, maxItems, isMobile, responsive]);

  // Calculate visible items based on collapse state
  const visibleItems = useMemo(() => {
    if (!shouldCollapse || isExpanded) return items;

    // On mobile, show first and last item
    if (isMobile && responsive) {
      if (items.length <= 2) return items;
      return [items[0], items[items.length - 1]];
    }

    // For maxItems, show first item and last item (ellipsis takes up a "slot")
    if (maxItems && items.length > maxItems) {
      // With ellipsis, we can show maxItems-1 actual items
      // Show first item and last item
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      return [firstItem, lastItem];
    }

    return items;
  }, [items, shouldCollapse, isExpanded, maxItems, isMobile, responsive]);

  // Calculate hidden count
  const hiddenCount = items.length - visibleItems.length;

  // Find collapse position (where to insert ellipsis)
  const collapsePosition = useMemo(() => {
    if (!shouldCollapse || isExpanded) return -1;

    if (isMobile && responsive && items.length > 2) {
      return 1; // After first item
    }

    if (maxItems && items.length > maxItems) {
      return maxItems - 1; // Before last item
    }

    return -1;
  }, [shouldCollapse, isExpanded, isMobile, responsive, maxItems, items.length]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return {
    visibleItems,
    hiddenCount,
    collapsePosition,
    shouldCollapse,
    isExpanded,
    isMobile,
    toggleExpanded,
  };
}
