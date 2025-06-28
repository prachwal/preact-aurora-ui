// Test setup file - loads global styles for testing
import '@testing-library/jest-dom';

// Create a style element with MD3 color tokens for testing
const style = document.createElement('style');
style.textContent = `
:root {
  --md-sys-color-primary: #6750a4;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #eaddff;
  --md-sys-color-on-primary-container: #21005d;
  --md-sys-color-secondary: #625b71;
  --md-sys-color-on-secondary: #ffffff;
  --md-sys-color-secondary-container: #e8def8;
  --md-sys-color-on-secondary-container: #1d192b;
  --md-sys-color-tertiary: #7d5260;
  --md-sys-color-on-tertiary: #ffffff;
  --md-sys-color-tertiary-container: #ffd8e4;
  --md-sys-color-on-tertiary-container: #31111d;
  --md-sys-color-error: #ba1a1a;
  --md-sys-color-on-error: #ffffff;
  --md-sys-color-error-container: #ffdad6;
  --md-sys-color-on-error-container: #410002;
  --md-sys-color-surface: #fffbfe;
  --md-sys-color-on-surface: #1c1b1f;
  --md-sys-color-surface-variant: #e7e0ec;
  --md-sys-color-on-surface-variant: #49454f;
  --md-sys-color-surface-container: #f2ecf0;
  --md-sys-color-background: #fffbfe;
  --md-sys-color-on-background: #1c1b1f;
  --md-sys-color-outline: #79747e;
  --md-sys-color-outline-variant: #cab4d0;
  --md-sys-elevation-level0: none;
  --md-sys-elevation-level1: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level2: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level3: 0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level4: 0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level5: 0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15);
  --color-primary: var(--md-sys-color-primary);
  --color-background: var(--md-sys-color-background);
  --color-surface: var(--md-sys-color-surface);
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-info: #2196f3;
  --shadow-1: var(--md-sys-elevation-level1);
}

[data-theme="dark"] {
  --md-sys-color-primary: #d0bcff;
  --md-sys-color-on-primary: #381e72;
  --md-sys-color-primary-container: #4f378b;
  --md-sys-color-on-primary-container: #eaddff;
  --md-sys-color-secondary: #ccc2dc;
  --md-sys-color-on-secondary: #332d41;
  --md-sys-color-secondary-container: #4a4458;
  --md-sys-color-on-secondary-container: #e8def8;
  --md-sys-color-tertiary: #efb8c8;
  --md-sys-color-on-tertiary: #492532;
  --md-sys-color-tertiary-container: #633b48;
  --md-sys-color-on-tertiary-container: #ffd8e4;
  --md-sys-color-error: #ffb4ab;
  --md-sys-color-on-error: #690005;
  --md-sys-color-error-container: #93000a;
  --md-sys-color-on-error-container: #ffdad6;
  --md-sys-color-surface: #1c1b1f;
  --md-sys-color-on-surface: #e6e1e5;
  --md-sys-color-surface-variant: #49454f;
  --md-sys-color-on-surface-variant: #cab4d0;
  --md-sys-color-surface-container: #211f26;
  --md-sys-color-background: #1c1b1f;
  --md-sys-color-on-background: #e6e1e5;
  --md-sys-color-outline: #938f99;
  --md-sys-color-outline-variant: #49454f;
  --color-primary: var(--md-sys-color-primary);
  --color-background: var(--md-sys-color-background);
  --color-surface: var(--md-sys-color-surface);
  --color-success: #66bb6a;
  --color-warning: #ffb74d;
  --color-info: #64b5f6;
}

.md3-surface { background-color: var(--md-sys-color-surface); }
.md3-primary { color: var(--md-sys-color-primary); }
.md3-elevation-2 { box-shadow: var(--md-sys-elevation-level2); }
`;
document.head.appendChild(style);
