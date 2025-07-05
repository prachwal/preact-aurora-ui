"use strict";
/**
 * Enhanced Types Export - Easy import for all Aurora UI types
 * Centralized export for improved developer experience
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidThemeVariant = exports.isValidThemeSpacing = exports.isValidThemeColor = void 0;
// Type guards
var theme_1 = require("./theme");
Object.defineProperty(exports, "isValidThemeColor", { enumerable: true, get: function () { return theme_1.isValidThemeColor; } });
Object.defineProperty(exports, "isValidThemeSpacing", { enumerable: true, get: function () { return theme_1.isValidThemeSpacing; } });
Object.defineProperty(exports, "isValidThemeVariant", { enumerable: true, get: function () { return theme_1.isValidThemeVariant; } });
