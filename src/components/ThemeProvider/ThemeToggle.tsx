import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.scss';

export interface ThemeToggleProps {
  variant?: 'icon' | 'button';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  style?: preact.JSX.CSSProperties;
}

export function ThemeToggle({
  variant = 'icon',
  size = 'md',
  showLabel = false,
  className,
  style,
}: ThemeToggleProps) {
  const { theme, toggleMode, isDark } = useTheme();

  const getIcon = () => {
    if (theme.mode === 'auto') return '🌗';
    return isDark ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (theme.mode === 'auto') return 'Auto';
    return isDark ? 'Dark' : 'Light';
  };

  const classNames = [
    styles.themeToggle,
    styles[`themeToggle--variant-${variant}`],
    styles[`themeToggle--size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={toggleMode}
      style={style}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Current theme: ${getLabel()}`}
    >
      <span className={styles.icon}>{getIcon()}</span>
      {variant === 'button' && showLabel && <span>{getLabel()}</span>}
    </button>
  );
}
