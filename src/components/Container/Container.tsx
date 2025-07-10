/**
 * Container Component - Aurora UI Smart Component
 * Intelligent container with automatic surface styling and responsive behavior
 */

import { forwardRef } from 'preact/compat';
import type { JSX } from 'preact';

import type { BaseComponentProps } from '../../types';

import styles from './Container.module.scss';

// Local simplified theme color implementation to avoid module resolution issues
function useSimpleThemeColors() {
  // Return static fallback colors for now - this ensures build works
  return {
    'primary': 'var(--md-sys-color-primary, #6750a4)',
    'on-primary': 'var(--md-sys-color-on-primary, #ffffff)',
    'primary-container': 'var(--md-sys-color-primary-container, #eaddff)',
    'on-primary-container': 'var(--md-sys-color-on-primary-container, #21005d)',
    'secondary': 'var(--md-sys-color-secondary, #625b71)',
    'on-secondary': 'var(--md-sys-color-on-secondary, #ffffff)',
    'secondary-container': 'var(--md-sys-color-secondary-container, #e8def8)',
    'on-secondary-container': 'var(--md-sys-color-on-secondary-container, #1d192b)',
    'tertiary': 'var(--md-sys-color-tertiary, #7d5260)',
    'on-tertiary': 'var(--md-sys-color-on-tertiary, #ffffff)',
    'tertiary-container': 'var(--md-sys-color-tertiary-container, #ffd8e4)',
    'on-tertiary-container': 'var(--md-sys-color-on-tertiary-container, #31111d)',
    'error': 'var(--md-sys-color-error, #ba1a1a)',
    'on-error': 'var(--md-sys-color-on-error, #ffffff)',
    'error-container': 'var(--md-sys-color-error-container, #ffdad6)',
    'on-error-container': 'var(--md-sys-color-on-error-container, #410002)',
    'background': 'var(--md-sys-color-background, #fef7ff)',
    'on-background': 'var(--md-sys-color-on-background, #1d1b20)',
    'surface': 'var(--md-sys-color-surface, #fef7ff)',
    'on-surface': 'var(--md-sys-color-on-surface, #1d1b20)',
    'surface-variant': 'var(--md-sys-color-surface-variant, #e7e0ec)',
    'on-surface-variant': 'var(--md-sys-color-on-surface-variant, #49454f)',
    'surface-dim': 'var(--md-sys-color-surface-dim, #ded8e1)',
    'surface-bright': 'var(--md-sys-color-surface-bright, #fef7ff)',
    'surface-container-lowest': 'var(--md-sys-color-surface-container-lowest, #ffffff)',
    'surface-container-low': 'var(--md-sys-color-surface-container-low, #f7f2fa)',
    'surface-container': 'var(--md-sys-color-surface-container, #f3edf7)',
    'surface-container-high': 'var(--md-sys-color-surface-container-high, #ece6f0)',
    'surface-container-highest': 'var(--md-sys-color-surface-container-highest, #e6e0e9)',
    'outline': 'var(--md-sys-color-outline, #79747e)',
    'outline-variant': 'var(--md-sys-color-outline-variant, #cac4d0)',
    'shadow': 'var(--md-sys-color-shadow, #000000)',
    'scrim': 'var(--md-sys-color-scrim, #000000)',
    'inverse-surface': 'var(--md-sys-color-inverse-surface, #322f35)',
    'inverse-on-surface': 'var(--md-sys-color-inverse-on-surface, #f5eff7)',
    'inverse-primary': 'var(--md-sys-color-inverse-primary, #d0bcff)',
  };
}

// Simple surface color utility
function useSimpleThemeUtils() {
  return {
    getSurfaceColor: (elevation: 0 | 1 | 2 | 3 | 4 | 5 = 0): string => {
      const surfaceMap = {
        0: 'var(--md-sys-color-surface)',
        1: 'var(--md-sys-color-surface-container-low)',
        2: 'var(--md-sys-color-surface-container)',
        3: 'var(--md-sys-color-surface-container-high)',
        4: 'var(--md-sys-color-surface-container-highest)',
        5: 'var(--md-sys-color-surface-container-highest)',
      };
      return surfaceMap[elevation] || 'var(--md-sys-color-surface)';
    }
  };
}

// Surface type definition
type SurfaceType =
  | 'surface'
  | 'surface-variant'
  | 'surface-container'
  | 'surface-container-low'
  | 'surface-container-high'
  | 'surface-container-highest'
  | 'primary-container'
  | 'secondary-container'
  | 'tertiary-container'
  | 'error-container';

export interface ContainerProps extends BaseComponentProps {
  /** Surface level - affects background color and elevation */
  surface?: SurfaceType;
  /** Padding size using design system spacing */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Elevation level (0-5) for shadow depth */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Maximum width constraint */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  /** Enable automatic text color adjustment based on surface */
  autoTextColor?: boolean;
  /** Enable responsive padding adjustments */
  responsive?: boolean;
  /** Border radius style */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
  /** Container content */
  children: preact.ComponentChildren;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: JSX.CSSProperties;
}

/**
 * Smart Container component with automatic surface and color management
 */
export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      surface = 'surface',
      padding = 'md',
      elevation = 0,
      maxWidth = 'none',
      autoTextColor = true,
      responsive = true,
      radius = 'md',
      as: Element = 'div',
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const colors = useSimpleThemeColors();
    const { getSurfaceColor } = useSimpleThemeUtils();

    // Build CSS classes
    const classes = [
      styles.container,
      padding && styles[`container--padding-${padding}`],
      elevation > 0 && styles[`container--elevation-${elevation}`],
      maxWidth !== 'none' && styles[`container--max-width-${maxWidth}`],
      radius && styles[`container--radius-${radius}`],
      responsive && styles['container--responsive'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Get surface color for background
    const surfaceColor = (() => {
      if (surface === 'surface') {
        return getSurfaceColor(elevation);
      }
      return colors[surface] || colors.surface;
    })();

    // Get appropriate text color for the surface
    const textColor = (() => {
      if (!autoTextColor) return undefined;

      // Map surface to appropriate text color
      const surfaceToTextColorMap: Record<SurfaceType, string> = {
        surface: colors['on-surface'],
        'surface-variant': colors['on-surface-variant'],
        'surface-container': colors['on-surface'],
        'surface-container-low': colors['on-surface'],
        'surface-container-high': colors['on-surface'],
        'surface-container-highest': colors['on-surface'],
        'primary-container': colors['on-primary-container'],
        'secondary-container': colors['on-secondary-container'],
        'tertiary-container': colors['on-tertiary-container'],
        'error-container': colors['on-error-container'],
      };

      return surfaceToTextColorMap[surface] || colors['on-surface'];
    })();

    // Build inline styles
    const inlineStyles: JSX.CSSProperties = {
      backgroundColor: surfaceColor,
    };

    // Add text color conditionally
    if (textColor) {
      inlineStyles.color = textColor;
    }

    // Merge with custom styles
    const finalStyles = { ...inlineStyles, ...style };

    // Create props object to avoid complex union types
    const elementProps = {
      ...rest,
      ref: ref as any,
      className: classes,
      style: finalStyles,
      'data-surface': surface,
      'data-elevation': elevation,
      'data-padding': padding,
      'data-auto-text-color': autoTextColor,
    } as any;

    return <Element {...elementProps}>{children}</Element>;
  },
);

Container.displayName = 'Container';

export default Container;
