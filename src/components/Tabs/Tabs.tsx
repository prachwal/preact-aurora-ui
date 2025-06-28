import { isValidElement, cloneElement, toChildArray } from 'preact';
import { useRef, useLayoutEffect, useState } from 'preact/hooks';

import type { TabsProps } from './types';
import { useTabs } from './useTabs';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import styles from './Tabs.module.scss';

export function Tabs({
  children,
  variant = 'primary',
  value: controlledValue,
  defaultValue,
  onChange,
  alignment = 'start',
  scrollable = false,
  centered = false,
  fullWidth = false,
  className = '',
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: TabsProps) {
  const { value, tabProps, panelProps } = useTabs({
    value: controlledValue,
    defaultValue,
    onChange,
  });

  const tabListRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<Record<string, any>>({});

  // Extract tabs and panels from children - direct type comparison
  const childrenArray = toChildArray(children);
  const tabs = childrenArray.filter((child) => {
    return isValidElement(child) && child.type === Tab;
  });
  const panels = childrenArray.filter((child) => {
    return isValidElement(child) && child.type === TabPanel;
  });

  // Update indicator position
  useLayoutEffect(() => {
    if (!tabListRef.current) return;

    const activeTab = tabListRef.current.querySelector(`[aria-selected="true"]`) as HTMLElement;

    if (activeTab) {
      const tabListRect = tabListRef.current.getBoundingClientRect();
      const activeTabRect = activeTab.getBoundingClientRect();

      setIndicatorStyle({
        width: activeTabRect.width,
        transform: `translateX(${activeTabRect.left - tabListRect.left}px)`,
      });
    }
  }, [value, tabs.length]); // Use tabs.length instead of tabs reference

  // Tab keyboard navigation
  const handleTabListKeyDown = (event: KeyboardEvent) => {
    const tabElements = Array.from(
      tabListRef.current?.querySelectorAll('[role="tab"]:not([disabled])') || [],
    ) as HTMLElement[];

    const currentIndex = tabElements.findIndex((tab) => tab === event.target);

    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabElements.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = currentIndex < tabElements.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = tabElements.length - 1;
        break;
      default:
        return;
    }

    tabElements[nextIndex]?.focus();
  };

  const tabsClasses = [
    styles.tabs,
    styles[`tabs--${variant}`],
    scrollable ? styles['tabs--scrollable'] : '',
    centered ? styles['tabs--centered'] : '',
    fullWidth ? styles['tabs--fullWidth'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const tabListClasses = [styles.tabList, styles[`tabList--${alignment}`]]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={tabsClasses} style={style}>
      {/* Tab List */}
      <div
        ref={tabListRef}
        className={tabListClasses}
        role="tablist"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        onKeyDown={handleTabListKeyDown}
      >
        {tabs.map((tab, index) => {
          if (!isValidElement(tab)) return null;

          const tabValue = (tab.props as any).value || `tab-${index}`;
          const isSelected = value === tabValue;
          const currentTabProps = tabProps(tabValue);

          return cloneElement(tab, {
            key: tabValue,
            ...currentTabProps,
            className: [(tab.props as any).className || '', isSelected ? styles['tab--active'] : '']
              .filter(Boolean)
              .join(' '),
            onClick: (event: MouseEvent) => {
              currentTabProps.onClick(event);
              (tab.props as any).onClick?.(event);
            },
            onKeyDown: (event: KeyboardEvent) => {
              currentTabProps.onKeyDown(event);
              (tab.props as any).onKeyDown?.(event);
            },
          });
        })}

        {/* Active indicator */}
        <div ref={indicatorRef} className={styles.indicator} style={indicatorStyle} />
      </div>

      {/* Tab Panels */}
      <div className={styles.tabPanels}>
        {panels.map((panel, index) => {
          if (!isValidElement(panel)) return null;

          const panelValue = (panel.props as any).value || `panel-${index}`;
          const currentPanelProps = panelProps(panelValue);

          return cloneElement(panel, {
            key: panelValue,
            ...currentPanelProps,
            className: [(panel.props as any).className || '', ''].filter(Boolean).join(' '),
          });
        })}
      </div>
    </div>
  );
}

// Add displayName for better debugging
Tabs.displayName = 'Tabs';

// Re-export components for convenience
export { Tab } from './Tab';
export { TabPanel } from './TabPanel';
