/**
 * Storybook Component Categories Configuration
 *
 * Mapowanie komponentów na kategorie zgodnie z organizacją w README.md
 */

export const STORYBOOK_CATEGORIES = {
  // Form Components
  Button: 'Form/Button',
  TextField: 'Form/TextField',
  Checkbox: 'Form/Checkbox',
  Radio: 'Form/Radio',
  Switch: 'Form/Switch',
  Select: 'Form/Select',
  Slider: 'Form/Slider',

  // Layout Components
  AppLayout: 'Layout/AppLayout',
  Container: 'Layout/Container',
  Grid: 'Layout/Grid',
  Row: 'Layout/Row',
  Col: 'Layout/Col',
  Header: 'Layout/Header',
  Footer: 'Layout/Footer',
  Sidebar: 'Layout/Sidebar',
  Layout: 'Layout/Layout',
  Content: 'Layout/Content',
  PageHeader: 'Layout/PageHeader',

  // Navigation Components
  Menu: 'Navigation/Menu',
  Tabs: 'Navigation/Tabs',
  Breadcrumbs: 'Navigation/Breadcrumbs',
  BottomNavigation: 'Navigation/BottomNavigation',

  // Communication Components
  Dialog: 'Communication/Dialog',
  Drawer: 'Communication/Drawer',
  Snackbar: 'Communication/Snackbar',
  Tooltip: 'Communication/Tooltip',
  Banner: 'Communication/Banner',
  Badge: 'Communication/Badge',

  // Advanced Components
  DataTable: 'Advanced/DataTable',
  Stepper: 'Advanced/Stepper',
  FAB: 'Advanced/FAB',
  SpeedDial: 'Advanced/SpeedDial',
  IconButton: 'Advanced/IconButton',
  Chip: 'Advanced/Chip',
  Card: 'Advanced/Card',
  Text: 'Advanced/Text',
  Progress: 'Advanced/Progress',
  Loader: 'Advanced/Loader',

  // Providers & Theme
  ThemeProvider: 'Providers/ThemeProvider',
  ThemeToggle: 'Providers/ThemeToggle',

  // Design System
  MD3Colors: 'Design System/MD3 Colors',
  ColorPalette: 'Design System/Color Palette',

  // Examples & Demos
  ExampleButton: 'Examples/ExampleButton',
  UsageExamples: 'Examples/Usage Examples',
  PerformanceA11y: 'Examples/Performance & A11y',
  Responsive: 'Examples/Responsive',
} as const;

/**
 * Pobiera kategorię dla komponentu na podstawie nazwy pliku
 */
export function getComponentCategory(componentName: string): string {
  return (
    STORYBOOK_CATEGORIES[componentName as keyof typeof STORYBOOK_CATEGORIES] ||
    `Components/${componentName}`
  );
}

/**
 * Lista wszystkich kategorii w kolejności wyświetlania
 */
export const CATEGORY_ORDER = [
  'Form',
  'Layout',
  'Navigation',
  'Communication',
  'Advanced',
  'Providers',
  'Design System',
  'Examples',
] as const;
