import { useState, useCallback, useId } from 'preact/hooks';

import type { UseTabsProps, UseTabsReturn } from './types';

export function useTabs({
  value: controlledValue,
  defaultValue = '',
  onChange,
}: UseTabsProps = {}): UseTabsReturn {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const tabsId = useId();

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const handleTabClick = useCallback(
    (tabValue: string) => (event: MouseEvent) => {
      event.preventDefault();
      setValue(tabValue);
    },
    [setValue],
  );

  const handleTabKeyDown = useCallback(
    (tabValue: string) => (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setValue(tabValue);
      }
    },
    [setValue],
  );

  const tabProps = useCallback(
    (tabValue: string) => ({
      'aria-selected': value === tabValue,
      'aria-controls': `${tabsId}-panel-${tabValue}`,
      id: `${tabsId}-tab-${tabValue}`,
      role: 'tab' as const,
      tabIndex: value === tabValue ? 0 : -1,
      onClick: handleTabClick(tabValue),
      onKeyDown: handleTabKeyDown(tabValue),
    }),
    [value, tabsId, handleTabClick, handleTabKeyDown],
  );

  const panelProps = useCallback(
    (tabValue: string) => ({
      'aria-labelledby': `${tabsId}-tab-${tabValue}`,
      id: `${tabsId}-panel-${tabValue}`,
      role: 'tabpanel' as const,
      hidden: value !== tabValue,
      tabIndex: value === tabValue ? 0 : -1,
    }),
    [value, tabsId],
  );

  return {
    value,
    setValue,
    tabProps,
    panelProps,
  };
}
