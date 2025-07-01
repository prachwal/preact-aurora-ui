/**
 * Text Component - Aurora UI Smart Component
 * Intelligent text component with automatic theme-aware styling
 */

import { forwardRef } from 'preact/compat';
import type { JSX } from 'preact';

import { useThemeColors, useThemeUtils } from '../../hooks/useThemeColors';
import type { ThemeColor, ThemeVariant, SimpleThemeVariant } from '../../types/theme';
import type { BaseComponentProps } from '../../types';

import styles from './Text.module.scss';

export interface TextProps extends BaseComponentProps {
  /** Typography variant - Material Design 3 style */
  variant?: ThemeVariant | SimpleThemeVariant;
  /** Text color - automatically resolves to theme color */
  color?: ThemeColor | 'auto';
  /** HTML element to render as (polymorphic component) */
  as?: keyof JSX.IntrinsicElements;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text weight override */
  weight?: 'normal' | 'medium' | 'bold';
  /** Text size override */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Enable automatic contrast management */
  autoContrast?: boolean;
  /** Text content */
  children: preact.ComponentChildren;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: JSX.CSSProperties;
}

/**
 * Map simple variants to full Material Design 3 variants
 */
const VARIANT_MAP: Record<SimpleThemeVariant, ThemeVariant> = {
  display: 'display-large',
  headline: 'headline-medium',
  title: 'title-medium',
  body: 'body-medium',
  label: 'label-medium',
};

/**
 * Map variants to HTML elements for semantic markup
 */
const SEMANTIC_ELEMENT_MAP: Record<ThemeVariant, keyof JSX.IntrinsicElements> = {
  'display-large': 'h1',
  'display-medium': 'h1',
  'display-small': 'h1',
  'headline-large': 'h1',
  'headline-medium': 'h2',
  'headline-small': 'h3',
  'title-large': 'h2',
  'title-medium': 'h3',
  'title-small': 'h4',
  'label-large': 'span',
  'label-medium': 'span',
  'label-small': 'span',
  'body-large': 'p',
  'body-medium': 'p',
  'body-small': 'p',
};

/**
 * Smart Text component with automatic theme integration
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      color = 'auto',
      as,
      align,
      weight,
      size,
      autoContrast = false,
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const colors = useThemeColors();
    const { getContrastText } = useThemeUtils();

    // Resolve variant to full MD3 variant
    const resolvedVariant =
      variant in VARIANT_MAP
        ? VARIANT_MAP[variant as SimpleThemeVariant]
        : (variant as ThemeVariant);

    // Determine the HTML element to use
    const Element = as || SEMANTIC_ELEMENT_MAP[resolvedVariant];

    // Resolve color with automatic contrast management
    const resolvedColor = (() => {
      if (color === 'auto') {
        // Automatic color based on variant and context
        switch (resolvedVariant) {
          case 'display-large':
          case 'display-medium':
          case 'display-small':
          case 'headline-large':
          case 'headline-medium':
          case 'headline-small':
            return colors['on-surface'] || '#000000';
          case 'title-large':
          case 'title-medium':
          case 'title-small':
            return colors['on-surface'] || '#000000';
          case 'body-large':
          case 'body-medium':
          case 'body-small':
            return colors['on-surface'] || '#000000';
          case 'label-large':
          case 'label-medium':
          case 'label-small':
            return colors['on-surface-variant'] || colors['on-surface'] || '#666666';
          default:
            return colors['on-surface'] || '#000000';
        }
      }

      // If autoContrast is enabled and color is not 'auto', get contrasting color
      if (autoContrast && (color as string) !== 'auto' && (color as string) in colors) {
        return getContrastText(color as keyof typeof colors);
      }

      // Return specified color
      return colors[color as ThemeColor] || color;
    })();

    // Build CSS classes
    const cssClasses = [
      styles.text,
      styles[`text--${resolvedVariant}`],
      align && styles[`text--align-${align}`],
      weight && styles[`text--weight-${weight}`],
      size && styles[`text--size-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build inline styles
    const inlineStyles: JSX.CSSProperties = {
      color: resolvedColor,
      ...style,
    };

    // Create props object to avoid complex union types
    const elementProps = {
      ...rest,
      ref: ref as any,
      className: cssClasses,
      style: inlineStyles,
      'data-variant': resolvedVariant,
      'data-color': color,
      'data-auto-contrast': autoContrast,
    } as any;

    return <Element {...elementProps}>{children}</Element>;
  },
);

Text.displayName = 'Text';

export default Text;
