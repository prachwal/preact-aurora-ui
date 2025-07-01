/**
 * Container Component - Aurora UI Smart Component
 * Intelligent container with automatic surface styling and responsive behavior
 */

import { forwardRef } from 'preact/compat';
import type { JSX } from 'preact';

import { useThemeColors, useThemeUtils } from '../../hooks/useThemeColors';
import type { BaseComponentProps } from '../../types';

import styles from './Container.module.scss';

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
    const colors = useThemeColors();
    const { getSurfaceColor } = useThemeUtils();

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
