export interface BottomNavigationProps {
  /** Current active tab index */
  activeTab: number;
  /** Callback when tab is changed */
  onTabChange: (index: number) => void;
  /** Navigation items */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Show labels on tabs */
  showLabels?: boolean;
  /** Auto-hide on scroll */
  autoHide?: boolean;
}

export interface BottomNavigationTabProps {
  /** Tab label */
  label: string;
  /** Tab icon */
  icon: React.ReactNode;
  /** Whether tab is active */
  active?: boolean;
  /** Badge count for notifications */
  badge?: number;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Tab index for accessibility */
  tabIndex?: number;
  /** Show label text */
  showLabel?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export interface BottomNavigationTabData {
  /** Unique identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Tab icon */
  icon: React.ReactNode;
  /** Badge count */
  badge?: number;
  /** Disabled state */
  disabled?: boolean;
}
