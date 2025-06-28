import { useState, useMemo } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

import type { MenuItem } from '../Menu/Menu';

export interface UseActionsOverflowOptions {
  actions?: ComponentChildren;
  moreActions?: MenuItem[];
  maxVisibleActions?: number;
}

export interface UseActionsOverflowResult {
  visibleActions: ComponentChildren;
  overflowActions: MenuItem[];
  hasOverflow: boolean;
  showOverflow: boolean;
  setShowOverflow: (show: boolean) => void;
}

export function useActionsOverflow({
  actions,
  moreActions = [],
  maxVisibleActions = 3,
}: UseActionsOverflowOptions = {}): UseActionsOverflowResult {
  const [showOverflow, setShowOverflow] = useState(false);

  const { visibleActions, overflowActions, hasOverflow } = useMemo(() => {
    // For now, we'll keep actions as-is and only use moreActions for overflow
    // In a more advanced implementation, we could analyze the actions VNode
    // and extract individual action buttons to move some to overflow

    const hasOverflowItems = moreActions.length > 0;

    return {
      visibleActions: actions,
      overflowActions: moreActions,
      hasOverflow: hasOverflowItems,
    };
  }, [actions, moreActions, maxVisibleActions]);

  return {
    visibleActions,
    overflowActions,
    hasOverflow,
    showOverflow,
    setShowOverflow,
  };
}
