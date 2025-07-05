"use strict";
/**
 * CSS Utilities Generator - Aurora UI Enhanced Theme System
 * Generates utility classes for colors, spacing, and other design tokens
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUtilityClasses = generateUtilityClasses;
exports.injectUtilityStyles = injectUtilityStyles;
exports.getUtilityClassNames = getUtilityClassNames;
exports.createUtilityBuilder = createUtilityBuilder;
/**
 * Default spacing scale based on Material Design 3
 */
var DEFAULT_SPACING = {
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
var BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};
/**
 * Generate background color utility classes
 */
function generateBackgroundUtilities(prefix) {
    var css = [];
    var classNames = [];
    // MD3 color tokens
    var md3Colors = [
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
    var semanticColors = ['success', 'warning', 'info', 'danger'];
    // Generate MD3 background utilities
    md3Colors.forEach(function (color) {
        var className = ".".concat(prefix, "-bg-").concat(color);
        var cssVar = "var(--md-sys-color-".concat(color, ")");
        css.push("".concat(className, " { background-color: ").concat(cssVar, "; }"));
        classNames.push(className.substring(1)); // Remove leading dot
    });
    // Generate semantic background utilities
    semanticColors.forEach(function (color) {
        var className = ".".concat(prefix, "-bg-").concat(color);
        var cssVar = "var(--md-sys-color-".concat(color, ")");
        css.push("".concat(className, " { background-color: ").concat(cssVar, "; }"));
        classNames.push(className.substring(1));
    });
    return {
        css: css.join('\n'),
        classNames: classNames,
    };
}
/**
 * Generate text color utility classes
 */
function generateTextUtilities(prefix) {
    var css = [];
    var classNames = [];
    // All color tokens for text
    var allColors = [
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
    allColors.forEach(function (color) {
        var className = ".".concat(prefix, "-text-").concat(color);
        var cssVar = "var(--md-sys-color-".concat(color, ")");
        css.push("".concat(className, " { color: ").concat(cssVar, "; }"));
        classNames.push(className.substring(1));
    });
    return {
        css: css.join('\n'),
        classNames: classNames,
    };
}
/**
 * Generate border color utility classes
 */
function generateBorderUtilities(prefix) {
    var css = [];
    var classNames = [];
    // Focus on outline and semantic colors for borders
    var borderColors = [
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
    borderColors.forEach(function (color) {
        var className = ".".concat(prefix, "-border-").concat(color);
        var cssVar = "var(--md-sys-color-".concat(color, ")");
        css.push("".concat(className, " { border-color: ").concat(cssVar, "; }"));
        classNames.push(className.substring(1));
    });
    return {
        css: css.join('\n'),
        classNames: classNames,
    };
}
/**
 * Generate spacing utility classes (margin and padding)
 */
function generateSpacingUtilities(prefix, customSpacing) {
    var css = [];
    var classNames = [];
    var spacing = customSpacing || DEFAULT_SPACING;
    // Spacing directions
    var directions = {
        '': 'all', // p-4, m-4
        t: 'top', // pt-4, mt-4
        r: 'right', // pr-4, mr-4
        b: 'bottom', // pb-4, mb-4
        l: 'left', // pl-4, ml-4
        x: 'horizontal', // px-4, mx-4
        y: 'vertical', // py-4, my-4
    };
    Object.entries(spacing).forEach(function (_a) {
        var scale = _a[0], value = _a[1];
        Object.entries(directions).forEach(function (_a) {
            var dir = _a[0];
            // Padding utilities
            var paddingClass = ".".concat(prefix, "-p").concat(dir, "-").concat(scale);
            var paddingRule = '';
            switch (dir) {
                case '':
                    paddingRule = "padding: ".concat(value, ";");
                    break;
                case 't':
                    paddingRule = "padding-top: ".concat(value, ";");
                    break;
                case 'r':
                    paddingRule = "padding-right: ".concat(value, ";");
                    break;
                case 'b':
                    paddingRule = "padding-bottom: ".concat(value, ";");
                    break;
                case 'l':
                    paddingRule = "padding-left: ".concat(value, ";");
                    break;
                case 'x':
                    paddingRule = "padding-left: ".concat(value, "; padding-right: ").concat(value, ";");
                    break;
                case 'y':
                    paddingRule = "padding-top: ".concat(value, "; padding-bottom: ").concat(value, ";");
                    break;
            }
            css.push("".concat(paddingClass, " { ").concat(paddingRule, " }"));
            classNames.push(paddingClass.substring(1));
            // Margin utilities
            var marginClass = ".".concat(prefix, "-m").concat(dir, "-").concat(scale);
            var marginRule = '';
            switch (dir) {
                case '':
                    marginRule = "margin: ".concat(value, ";");
                    break;
                case 't':
                    marginRule = "margin-top: ".concat(value, ";");
                    break;
                case 'r':
                    marginRule = "margin-right: ".concat(value, ";");
                    break;
                case 'b':
                    marginRule = "margin-bottom: ".concat(value, ";");
                    break;
                case 'l':
                    marginRule = "margin-left: ".concat(value, ";");
                    break;
                case 'x':
                    marginRule = "margin-left: ".concat(value, "; margin-right: ").concat(value, ";");
                    break;
                case 'y':
                    marginRule = "margin-top: ".concat(value, "; margin-bottom: ").concat(value, ";");
                    break;
            }
            css.push("".concat(marginClass, " { ").concat(marginRule, " }"));
            classNames.push(marginClass.substring(1));
        });
    });
    return {
        css: css.join('\n'),
        classNames: classNames,
    };
}
/**
 * Generate responsive variants for utility classes
 */
function generateResponsiveVariants(css, classNames) {
    var responsiveCss = [css]; // Include base utilities
    var responsiveClassNames = __spreadArray([], classNames, true);
    Object.entries(BREAKPOINTS).forEach(function (_a) {
        var breakpoint = _a[0], minWidth = _a[1];
        var breakpointCss = [];
        classNames.forEach(function (className) {
            var _a;
            var responsiveClassName = "".concat(breakpoint, "\\:").concat(className);
            var originalRule = (_a = css.match(new RegExp("\\.".concat(className.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), " \\{[^}]*\\}")))) === null || _a === void 0 ? void 0 : _a[0];
            if (originalRule) {
                var responsiveRule = originalRule.replace(".".concat(className), ".".concat(responsiveClassName));
                breakpointCss.push(responsiveRule);
                responsiveClassNames.push(responsiveClassName);
            }
        });
        if (breakpointCss.length > 0) {
            responsiveCss.push("@media (min-width: ".concat(minWidth, ") {\n").concat(breakpointCss.join('\n'), "\n}"));
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
function generateUtilityClasses(config) {
    if (config === void 0) { config = {}; }
    var _a = config.prefix, prefix = _a === void 0 ? 'aurora' : _a, _b = config.generateBackgrounds, generateBackgrounds = _b === void 0 ? true : _b, _c = config.generateTextColors, generateTextColors = _c === void 0 ? true : _c, _d = config.generateBorderColors, generateBorderColors = _d === void 0 ? true : _d, _e = config.generateSpacing, generateSpacing = _e === void 0 ? true : _e, customSpacing = config.customSpacing, _f = config.includeResponsive, includeResponsive = _f === void 0 ? false : _f;
    var allCss = [];
    var allClassNames = [];
    var stats = {
        backgroundClasses: 0,
        textClasses: 0,
        borderClasses: 0,
        spacingClasses: 0,
        total: 0,
    };
    // Generate background utilities
    if (generateBackgrounds) {
        var _g = generateBackgroundUtilities(prefix), css = _g.css, classNames = _g.classNames;
        allCss.push("/* Background Color Utilities */\n".concat(css));
        allClassNames.push.apply(allClassNames, classNames);
        stats.backgroundClasses = classNames.length;
    }
    // Generate text utilities
    if (generateTextColors) {
        var _h = generateTextUtilities(prefix), css = _h.css, classNames = _h.classNames;
        allCss.push("/* Text Color Utilities */\n".concat(css));
        allClassNames.push.apply(allClassNames, classNames);
        stats.textClasses = classNames.length;
    }
    // Generate border utilities
    if (generateBorderColors) {
        var _j = generateBorderUtilities(prefix), css = _j.css, classNames = _j.classNames;
        allCss.push("/* Border Color Utilities */\n".concat(css));
        allClassNames.push.apply(allClassNames, classNames);
        stats.borderClasses = classNames.length;
    }
    // Generate spacing utilities
    if (generateSpacing) {
        var _k = generateSpacingUtilities(prefix, customSpacing), css = _k.css, classNames = _k.classNames;
        allCss.push("/* Spacing Utilities */\n".concat(css));
        allClassNames.push.apply(allClassNames, classNames);
        stats.spacingClasses = classNames.length;
    }
    var finalCss = allCss.join('\n\n');
    var finalClassNames = allClassNames;
    // Add responsive variants if requested
    if (includeResponsive) {
        var _l = generateResponsiveVariants(finalCss, finalClassNames), css = _l.css, classNames = _l.classNames;
        finalCss = css;
        finalClassNames = classNames;
    }
    stats.total = finalClassNames.length;
    return {
        css: finalCss,
        classNames: finalClassNames,
        stats: stats,
    };
}
/**
 * Create a style element with generated utilities and inject it into the document
 */
function injectUtilityStyles(config) {
    if (config === void 0) { config = {}; }
    if (typeof document === 'undefined') {
        // Return no-op cleanup function for SSR
        return function () { };
    }
    var css = generateUtilityClasses(config).css;
    var styleId = "aurora-ui-utilities-".concat(config.prefix || 'aurora');
    // Remove existing styles with same ID
    var existingStyle = document.getElementById(styleId);
    if (existingStyle) {
        existingStyle.remove();
    }
    // Create and inject new style element
    var styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
    // Return cleanup function
    return function () {
        var element = document.getElementById(styleId);
        if (element) {
            element.remove();
        }
    };
}
/**
 * Get available utility class names for autocomplete/intellisense
 */
function getUtilityClassNames(config) {
    if (config === void 0) { config = {}; }
    var classNames = generateUtilityClasses(config).classNames;
    return classNames;
}
/**
 * Create a type-safe utility class builder
 */
function createUtilityBuilder(prefix) {
    if (prefix === void 0) { prefix = 'aurora'; }
    return {
        bg: function (color) { return "".concat(prefix, "-bg-").concat(color); },
        text: function (color) { return "".concat(prefix, "-text-").concat(color); },
        border: function (color) { return "".concat(prefix, "-border-").concat(color); },
        p: function (scale) { return "".concat(prefix, "-p-").concat(scale); },
        px: function (scale) { return "".concat(prefix, "-px-").concat(scale); },
        py: function (scale) { return "".concat(prefix, "-py-").concat(scale); },
        pt: function (scale) { return "".concat(prefix, "-pt-").concat(scale); },
        pr: function (scale) { return "".concat(prefix, "-pr-").concat(scale); },
        pb: function (scale) { return "".concat(prefix, "-pb-").concat(scale); },
        pl: function (scale) { return "".concat(prefix, "-pl-").concat(scale); },
        m: function (scale) { return "".concat(prefix, "-m-").concat(scale); },
        mx: function (scale) { return "".concat(prefix, "-mx-").concat(scale); },
        my: function (scale) { return "".concat(prefix, "-my-").concat(scale); },
        mt: function (scale) { return "".concat(prefix, "-mt-").concat(scale); },
        mr: function (scale) { return "".concat(prefix, "-mr-").concat(scale); },
        mb: function (scale) { return "".concat(prefix, "-mb-").concat(scale); },
        ml: function (scale) { return "".concat(prefix, "-ml-").concat(scale); },
    };
}
