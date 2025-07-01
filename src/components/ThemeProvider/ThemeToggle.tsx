import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.scss';

export interface ThemeToggleProps {
  variant?: 'icon' | 'button' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  style?: preact.JSX.CSSProperties;

  // FAZA 4: Enhanced Features
  animated?: boolean;
  customIcons?: {
    light?: string;
    dark?: string;
    auto?: string;
  };
  position?: 'left' | 'right' | 'center';
  tooltip?: boolean;
  rounded?: boolean;
}

export function ThemeToggle({
  variant = 'icon',
  size = 'md',
  showLabel = false,
  className,
  style,
  animated = true,
  customIcons,
  position = 'center',
  tooltip = true,
  rounded = true,
}: ThemeToggleProps) {
  const { theme, toggleMode, isDark } = useTheme();

  const getIcon = () => {
    if (customIcons) {
      if (theme.mode === 'auto') return customIcons.auto || '🌗';
      return isDark ? customIcons.dark || '🌙' : customIcons.light || '☀️';
    }

    if (theme.mode === 'auto') return '🌗';
    return isDark ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (theme.mode === 'auto') return 'Auto';
    return isDark ? 'Dark' : 'Light';
  };

  const getTooltip = () => {
    if (!tooltip) return undefined;
    return `Switch to ${theme.mode === 'auto' ? 'light' : isDark ? 'light' : 'dark'} theme`;
  };

  const classNames = [
    styles.themeToggle,
    styles[`themeToggle--variant-${variant}`],
    styles[`themeToggle--size-${size}`],
    styles[`themeToggle--position-${position}`],
    animated ? styles['themeToggle--animated'] : '',
    rounded ? styles['themeToggle--rounded'] : '',
    isDark ? styles['themeToggle--dark'] : styles['themeToggle--light'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'switch') {
    return (
      <label className={classNames} style={style} title={getTooltip()}>
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleMode}
          className={styles.switchInput}
          aria-label={getTooltip()}
        />
        <span className={styles.switchSlider}>
          <span className={styles.switchHandle}>
            <span className={styles.icon}>{getIcon()}</span>
          </span>
        </span>
        {showLabel && <span className={styles.label}>{getLabel()}</span>}
      </label>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      onClick={toggleMode}
      style={style}
      aria-label={getTooltip()}
      title={getTooltip()}
    >
      <span className={styles.iconContainer}>
        <span className={styles.icon}>{getIcon()}</span>
        {animated && <span className={styles.iconOverlay}>{isDark ? '☀️' : '🌙'}</span>}
      </span>
      {variant === 'button' && showLabel && <span className={styles.label}>{getLabel()}</span>}
    </button>
  );
}
