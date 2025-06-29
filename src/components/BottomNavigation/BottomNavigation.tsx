import { useEffect, useRef, useState } from 'preact/hooks';

import styles from './BottomNavigation.module.scss';
import type { BottomNavigationProps } from './types';
import { BottomNavigationTab } from './BottomNavigationTab';

export function BottomNavigation({
  activeTab,
  onTabChange,
  children,
  className,
  showLabels = true,
  autoHide = false,
}: BottomNavigationProps) {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoHide) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      if (scrollingDown && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoHide]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!navigationRef.current) return;

    const tabs = Array.from(
      navigationRef.current.querySelectorAll('[role="tab"]'),
    ) as HTMLElement[];
    const currentIndex = tabs.findIndex((tab) => tab === event.target);

    if (currentIndex === -1) return;

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    tabs[newIndex]?.focus();
    onTabChange(newIndex);
  };

  const navigationClasses = [
    styles.bottomNavigation,
    !showLabels && styles.compact,
    isHidden && styles.hidden,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav
      ref={navigationRef}
      className={navigationClasses}
      role="tablist"
      aria-label="Bottom navigation"
      onKeyDown={handleKeyDown}
    >
      {Array.isArray(children)
        ? children.map((child, index) => {
          if (child && typeof child === 'object' && 'props' in child) {
            return (
              <BottomNavigationTab
                key={child.props.id || index}
                {...child.props}
                active={activeTab === index}
                showLabel={showLabels}
                index={index}
                onClick={() => onTabChange(index)}
                tabIndex={activeTab === index ? 0 : -1}
              />
            );
          }
          return child;
        })
        : children}
    </nav>
  );
}
