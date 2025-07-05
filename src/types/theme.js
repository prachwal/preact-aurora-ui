"use strict";
/**
 * Enhanced TypeScript Types for Aurora UI
 * Material Design 3 Color System with complete type safety
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidThemeVariant = exports.isValidThemeSpacing = exports.isValidThemeColor = void 0;
// Type guards for runtime validation
var isValidThemeColor = function (color) {
    var validColors = [
        // MD3 Colors
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
        'shadow',
        'scrim',
        'inverse-surface',
        'inverse-on-surface',
        'inverse-primary',
        'surface-dim',
        'surface-bright',
        'surface-container-lowest',
        'surface-container-low',
        'surface-container',
        'surface-container-high',
        'surface-container-highest',
        // Semantic colors
        'success',
        'warning',
        'info',
        'danger',
    ];
    return validColors.includes(color);
};
exports.isValidThemeColor = isValidThemeColor;
var isValidThemeSpacing = function (spacing) {
    var validSpacing = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
    return validSpacing.includes(spacing);
};
exports.isValidThemeSpacing = isValidThemeSpacing;
var isValidThemeVariant = function (variant) {
    var validVariants = [
        'display-large',
        'display-medium',
        'display-small',
        'headline-large',
        'headline-medium',
        'headline-small',
        'title-large',
        'title-medium',
        'title-small',
        'label-large',
        'label-medium',
        'label-small',
        'body-large',
        'body-medium',
        'body-small',
    ];
    return validVariants.includes(variant);
};
exports.isValidThemeVariant = isValidThemeVariant;
