import type { TabProps } from './types';
import styles from './Tabs.module.scss';

export function Tab({
  value: _value,
  label,
  icon,
  disabled = false,
  badge,
  className = '',
  style,
  children,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: TabProps) {
  const tabClasses = [
    styles.tab,
    icon ? styles['tab--with-icon'] : '',
    disabled ? styles['tab--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: MouseEvent) => {
    if (disabled) return;
    onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    onKeyDown?.(event);
  };

  return (
    <button
      type="button"
      className={tabClasses}
      style={style}
      disabled={disabled}
      onClick={handleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className={styles.tabLabel}>
        {icon && <span className={styles.tabIcon}>{icon}</span>}
        {label || children}
        {badge && <span className={styles.tabBadge}>{badge}</span>}
      </span>
    </button>
  );
}

// Add displayName for better debugging and component identification
Tab.displayName = 'Tab';
