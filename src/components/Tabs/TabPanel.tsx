import { useState, useEffect } from 'preact/hooks';

import type { TabPanelProps } from './types';
import styles from './Tabs.module.scss';

export function TabPanel({
  value: _value,
  className = '',
  style,
  children,
  lazy = false,
  keepMounted = true, // Default to true for accessibility
  ...props
}: TabPanelProps) {
  const [hasBeenVisible, setHasBeenVisible] = useState(!lazy);
  const isHidden = props.hidden;

  useEffect(() => {
    if (!isHidden && lazy && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isHidden, lazy, hasBeenVisible]);

  const panelClasses = [
    styles.tabPanel,
    lazy ? styles['tabPanel--lazy'] : '',
    lazy && hasBeenVisible ? styles['tabPanel--loaded'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Don't render content if lazy and never been visible
  if (lazy && !hasBeenVisible) {
    return (
      <div className={panelClasses} style={style} {...props}>
        <span>Loading...</span>
      </div>
    );
  }

  // Always render panels for accessibility (they can be hidden with hidden attribute)
  // Only return null if explicitly set to NOT keep mounted
  if (isHidden && keepMounted === false) {
    return null;
  }

  return (
    <div className={panelClasses} style={style} {...props}>
      {children}
    </div>
  );
}

// Add displayName for better debugging and component identification
TabPanel.displayName = 'TabPanel';
