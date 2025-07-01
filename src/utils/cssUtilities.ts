/**
 * CSS Utilities Generator - Aurora UI Enhanced Theme System
 * Generates utility classes for colors, spacing, and other design tokens
 */

import type { ThemeColors, MD3ColorToken, SemanticColor } from '../types/theme';

export interface UtilityClassConfig {
  /** Prefix for all utility classes (default: 'aurora') */
  prefix?: string;
  /** Whether to generate background color utilities */
  generateBackgrounds?: boolean;
  /** Whether to generate text color utilities */
  generateTextColors?: boolean;
  /** Whether to generate border color utilities */
  generateBorderColors?: boolean;
  /** Whether to generate spacing utilities */
  generateSpacing?: boolean;
  /** Custom spacing scale override */
  customSpacing?: Record<string, string>;
  /** Whether to include responsive variants */
  includeResponsive?: boolean;
}

export interface GeneratedUtilities {
  /** Generated CSS rules as string */
  css: string;
  /** Array of generated class names */
  classNames: string[];
  /** Statistics about generated utilities */
  stats: {
    backgroundClasses: number;
    textClasses: number;
    borderClasses: number;
    spacingClasses: number;
    total: number;
  };
}

/**
 * Default spacing scale based on Material Design 3
 */
const DEFAULT_SPACING: Record<string, string> = {
  '0': '0',
  '1': '0.25rem', // 4px
  '2': '0.5rem', // 8px
  '3': '0.75rem', // 12px
  '4': '1rem', // 16px
  '5': '1.25rem', // 20px
  '6': '1.5rem', // 24px
  '7': '1.75rem', // 28px
  '8': '2rem', // 32px
  '10': '2.5rem', // 40px
  '12': '3rem', // 48px
  '16': '4rem', // 64px
  '20': '5rem', // 80px
  '24': '6rem', // 96px
};

/**
 * Responsive breakpoints for responsive utilities
 */
const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Generate background color utility classes
 */
function generateBackgroundUtilities(prefix: string): { css: string; classNames: string[] } {
  const css: string[] = [];
  const classNames: string[] = [];

  // MD3 color tokens
  const md3Colors: MD3ColorToken[] = [
    'primary',
    'on-primary',
    'primary-container',
    'on-primary-container',
    'secondary',
    'on-secondary',
    'secondary-container',
    'on-secondary-container',
    'tertiary',
    'on-tertiary',
    'tertiary-container',
    'on-tertiary-container',
    'error',
    'on-error',
    'error-container',
    'on-error-container',
    'background',
    'on-background',
    'surface',
    'on-surface',
    'surface-variant',
    'on-surface-variant',
    'surface-dim',
    'surface-bright',
    'surface-container-lowest',
    'surface-container-low',
    'surface-container',
    'surface-container-high',
    'surface-container-highest',
    'outline',
    'outline-variant',
    'shadow',
    'scrim',
    'inverse-surface',
    'inverse-on-surface',
    'inverse-primary',
  ];

  // Semantic colors
  const semanticColors: SemanticColor[] = ['success', 'warning', 'info', 'danger'];

  // Generate MD3 background utilities
  md3Colors.forEach((color) => {
    const className = `.${prefix}-bg-${color}`;
    const cssVar = `var(--md-sys-color-${color})`;
    css.push(`${className} { background-color: ${cssVar}; }`);
    classNames.push(className.substring(1)); // Remove leading dot
  });

  // Generate semantic background utilities
  semanticColors.forEach((color) => {
    const className = `.${prefix}-bg-${color}`;
    const cssVar = `var(--md-sys-color-${color})`;
    css.push(`${className} { background-color: ${cssVar}; }`);
    classNames.push(className.substring(1));
  });

  return {
    css: css.join('\n'),
    classNames,
  };
}

/**
 * Generate text color utility classes
 */
function generateTextUtilities(prefix: string): { css: string; classNames: string[] } {
  const css: string[] = [];
  const classNames: string[] = [];

  // All color tokens for text
  const allColors = [
    'primary',
    'on-primary',
    'primary-container',
    'on-primary-container',
    'secondary',
    'on-secondary',
    'secondary-container',
    'on-secondary-container',
    'tertiary',
    'on-tertiary',
    'tertiary-container',
    'on-tertiary-container',
    'error',
    'on-error',
    'error-container',
    'on-error-container',
    'background',
    'on-background',
    'surface',
    'on-surface',
    'surface-variant',
    'on-surface-variant',
    'outline',
    'outline-variant',
    'inverse-surface',
    'inverse-on-surface',
    'inverse-primary',
    'success',
    'warning',
    'info',
    'danger',
  ];

  allColors.forEach((color) => {
    const className = `.${prefix}-text-${color}`;
    const cssVar = `var(--md-sys-color-${color})`;
    css.push(`${className} { color: ${cssVar}; }`);
    classNames.push(className.substring(1));
  });

  return {
    css: css.join('\n'),
    classNames,
  };
}

/**
 * Generate border color utility classes
 */
function generateBorderUtilities(prefix: string): { css: string; classNames: string[] } {
  const css: string[] = [];
  const classNames: string[] = [];

  // Focus on outline and semantic colors for borders
  const borderColors = [
    'outline',
    'outline-variant',
    'primary',
    'secondary',
    'tertiary',
    'error',
    'success',
    'warning',
    'info',
    'danger',
  ];

  borderColors.forEach((color) => {
    const className = `.${prefix}-border-${color}`;
    const cssVar = `var(--md-sys-color-${color})`;
    css.push(`${className} { border-color: ${cssVar}; }`);
    classNames.push(className.substring(1));
  });

  return {
    css: css.join('\n'),
    classNames,
  };
}

/**
 * Generate spacing utility classes (margin and padding)
 */
function generateSpacingUtilities(
  prefix: string,
  customSpacing?: Record<string, string>,
): { css: string; classNames: string[] } {
  const css: string[] = [];
  const classNames: string[] = [];
  const spacing = customSpacing || DEFAULT_SPACING;

  // Spacing directions
  const directions = {
    '': 'all', // p-4, m-4
    t: 'top', // pt-4, mt-4
    r: 'right', // pr-4, mr-4
    b: 'bottom', // pb-4, mb-4
    l: 'left', // pl-4, ml-4
    x: 'horizontal', // px-4, mx-4
    y: 'vertical', // py-4, my-4
  };

  Object.entries(spacing).forEach(([scale, value]) => {
    Object.entries(directions).forEach(([dir]) => {
      // Padding utilities
      const paddingClass = `.${prefix}-p${dir}-${scale}`;
      let paddingRule = '';

      switch (dir) {
        case '':
          paddingRule = `padding: ${value};`;
          break;
        case 't':
          paddingRule = `padding-top: ${value};`;
          break;
        case 'r':
          paddingRule = `padding-right: ${value};`;
          break;
        case 'b':
          paddingRule = `padding-bottom: ${value};`;
          break;
        case 'l':
          paddingRule = `padding-left: ${value};`;
          break;
        case 'x':
          paddingRule = `padding-left: ${value}; padding-right: ${value};`;
          break;
        case 'y':
          paddingRule = `padding-top: ${value}; padding-bottom: ${value};`;
          break;
      }

      css.push(`${paddingClass} { ${paddingRule} }`);
      classNames.push(paddingClass.substring(1));

      // Margin utilities
      const marginClass = `.${prefix}-m${dir}-${scale}`;
      let marginRule = '';

      switch (dir) {
        case '':
          marginRule = `margin: ${value};`;
          break;
        case 't':
          marginRule = `margin-top: ${value};`;
          break;
        case 'r':
          marginRule = `margin-right: ${value};`;
          break;
        case 'b':
          marginRule = `margin-bottom: ${value};`;
          break;
        case 'l':
          marginRule = `margin-left: ${value};`;
          break;
        case 'x':
          marginRule = `margin-left: ${value}; margin-right: ${value};`;
          break;
        case 'y':
          marginRule = `margin-top: ${value}; margin-bottom: ${value};`;
          break;
      }

      css.push(`${marginClass} { ${marginRule} }`);
      classNames.push(marginClass.substring(1));
    });
  });

  return {
    css: css.join('\n'),
    classNames,
  };
}

/**
 * Generate responsive variants for utility classes
 */
function generateResponsiveVariants(
  css: string,
  classNames: string[],
): { css: string; classNames: string[] } {
  const responsiveCss: string[] = [css]; // Include base utilities
  const responsiveClassNames = [...classNames];

  Object.entries(BREAKPOINTS).forEach(([breakpoint, minWidth]) => {
    const breakpointCss: string[] = [];

    classNames.forEach((className) => {
      const responsiveClassName = `${breakpoint}\\:${className}`;
      const originalRule = css.match(
        new RegExp(`\\.${className.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')} \\{[^}]*\\}`),
      )?.[0];

      if (originalRule) {
        const responsiveRule = originalRule.replace(`.${className}`, `.${responsiveClassName}`);
        breakpointCss.push(responsiveRule);
        responsiveClassNames.push(responsiveClassName);
      }
    });

    if (breakpointCss.length > 0) {
      responsiveCss.push(`@media (min-width: ${minWidth}) {\n${breakpointCss.join('\n')}\n}`);
    }
  });

  return {
    css: responsiveCss.join('\n\n'),
    classNames: responsiveClassNames,
  };
}

/**
 * Main utility class generator function
 */
export function generateUtilityClasses(config: UtilityClassConfig = {}): GeneratedUtilities {
  const {
    prefix = 'aurora',
    generateBackgrounds = true,
    generateTextColors = true,
    generateBorderColors = true,
    generateSpacing = true,
    customSpacing,
    includeResponsive = false,
  } = config;

  let allCss: string[] = [];
  let allClassNames: string[] = [];

  const stats = {
    backgroundClasses: 0,
    textClasses: 0,
    borderClasses: 0,
    spacingClasses: 0,
    total: 0,
  };

  // Generate background utilities
  if (generateBackgrounds) {
    const { css, classNames } = generateBackgroundUtilities(prefix);
    allCss.push(`/* Background Color Utilities */\n${css}`);
    allClassNames.push(...classNames);
    stats.backgroundClasses = classNames.length;
  }

  // Generate text utilities
  if (generateTextColors) {
    const { css, classNames } = generateTextUtilities(prefix);
    allCss.push(`/* Text Color Utilities */\n${css}`);
    allClassNames.push(...classNames);
    stats.textClasses = classNames.length;
  }

  // Generate border utilities
  if (generateBorderColors) {
    const { css, classNames } = generateBorderUtilities(prefix);
    allCss.push(`/* Border Color Utilities */\n${css}`);
    allClassNames.push(...classNames);
    stats.borderClasses = classNames.length;
  }

  // Generate spacing utilities
  if (generateSpacing) {
    const { css, classNames } = generateSpacingUtilities(prefix, customSpacing);
    allCss.push(`/* Spacing Utilities */\n${css}`);
    allClassNames.push(...classNames);
    stats.spacingClasses = classNames.length;
  }

  let finalCss = allCss.join('\n\n');
  let finalClassNames = allClassNames;

  // Add responsive variants if requested
  if (includeResponsive) {
    const { css, classNames } = generateResponsiveVariants(finalCss, finalClassNames);
    finalCss = css;
    finalClassNames = classNames;
  }

  stats.total = finalClassNames.length;

  return {
    css: finalCss,
    classNames: finalClassNames,
    stats,
  };
}

/**
 * Create a style element with generated utilities and inject it into the document
 */
export function injectUtilityStyles(config: UtilityClassConfig = {}): () => void {
  if (typeof document === 'undefined') {
    // Return no-op cleanup function for SSR
    return () => {};
  }

  const { css } = generateUtilityClasses(config);
  const styleId = `aurora-ui-utilities-${config.prefix || 'aurora'}`;

  // Remove existing styles with same ID
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create and inject new style element
  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = css;
  document.head.appendChild(styleElement);

  // Return cleanup function
  return () => {
    const element = document.getElementById(styleId);
    if (element) {
      element.remove();
    }
  };
}

/**
 * Get available utility class names for autocomplete/intellisense
 */
export function getUtilityClassNames(config: UtilityClassConfig = {}): string[] {
  const { classNames } = generateUtilityClasses(config);
  return classNames;
}

/**
 * Type-safe utility class builder
 */
export type UtilityClass = string;

export interface UtilityBuilder {
  bg: (color: keyof ThemeColors) => UtilityClass;
  text: (color: keyof ThemeColors) => UtilityClass;
  border: (color: keyof ThemeColors) => UtilityClass;
  p: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  px: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  py: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  pt: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  pr: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  pb: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  pl: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  m: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  mx: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  my: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  mt: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  mr: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  mb: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
  ml: (scale: keyof typeof DEFAULT_SPACING) => UtilityClass;
}

/**
 * Create a type-safe utility class builder
 */
export function createUtilityBuilder(prefix: string = 'aurora'): UtilityBuilder {
  return {
    bg: (color) => `${prefix}-bg-${color}`,
    text: (color) => `${prefix}-text-${color}`,
    border: (color) => `${prefix}-border-${color}`,
    p: (scale) => `${prefix}-p-${scale}`,
    px: (scale) => `${prefix}-px-${scale}`,
    py: (scale) => `${prefix}-py-${scale}`,
    pt: (scale) => `${prefix}-pt-${scale}`,
    pr: (scale) => `${prefix}-pr-${scale}`,
    pb: (scale) => `${prefix}-pb-${scale}`,
    pl: (scale) => `${prefix}-pl-${scale}`,
    m: (scale) => `${prefix}-m-${scale}`,
    mx: (scale) => `${prefix}-mx-${scale}`,
    my: (scale) => `${prefix}-my-${scale}`,
    mt: (scale) => `${prefix}-mt-${scale}`,
    mr: (scale) => `${prefix}-mr-${scale}`,
    mb: (scale) => `${prefix}-mb-${scale}`,
    ml: (scale) => `${prefix}-ml-${scale}`,
  };
}
