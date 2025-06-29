import styles from './BottomNavigation.module.scss';
import type { BottomNavigationTabProps } from './types';

interface BottomNavigationTabComponentProps extends BottomNavigationTabProps {
  index: number;
}

export function BottomNavigationTab({
  label,
  icon,
  active = false,
  badge,
  onClick,
  className,
  tabIndex = 0,
  showLabel = true,
  disabled = false,
  index: _index,
}: BottomNavigationTabComponentProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const tabClasses = [styles.tab, active && styles.active, showLabel && styles.showLabel, className]
    .filter(Boolean)
    .join(' ');

  const badgeClasses = [styles.badge, badge && badge > 99 && styles.dot].filter(Boolean).join(' ');

  return (
    <button
      className={tabClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      role="tab"
      aria-selected={active}
      aria-label={`${label}${badge ? ` (${badge} notifications)` : ''}`}
      disabled={disabled}
    >
      <div className={styles.icon}>
        {icon}
        {badge !== undefined && badge > 0 && (
          <span className={badgeClasses}>{badge > 99 ? '' : badge}</span>
        )}
      </div>
      {showLabel && <span className={styles.label}>{label}</span>}
    </button>
  );
}
