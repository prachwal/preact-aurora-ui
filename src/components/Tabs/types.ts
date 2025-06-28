import type { ComponentChildren, JSX } from 'preact';

export type TabsVariant = 'primary' | 'secondary';
export type TabsAlignment = 'start' | 'center' | 'end';

export interface TabItem {
  id: string;
  label: string;
  icon?: ComponentChildren;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  children?: ComponentChildren;
  variant?: TabsVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  alignment?: TabsAlignment;
  scrollable?: boolean;
  centered?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: Record<string, any>;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface TabProps {
  value: string;
  label?: string;
  icon?: ComponentChildren;
  disabled?: boolean;
  badge?: string | number;
  className?: string;
  style?: JSX.CSSProperties;
  children?: ComponentChildren;
  onClick?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export interface TabPanelProps {
  value: string;
  className?: string;
  style?: JSX.CSSProperties;
  children?: ComponentChildren;
  lazy?: boolean;
  keepMounted?: boolean;
  hidden?: boolean;
}

export interface UseTabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export interface UseTabsReturn {
  value: string;
  setValue: (value: string) => void;
  tabProps: (value: string) => {
    'aria-selected': boolean;
    'aria-controls': string;
    id: string;
    role: string;
    tabIndex: number;
    onClick: (event: MouseEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;
  };
  panelProps: (value: string) => {
    'aria-labelledby': string;
    id: string;
    role: string;
    hidden: boolean;
    tabIndex: number;
  };
}
