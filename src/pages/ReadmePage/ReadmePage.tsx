import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import { DocsLayout } from '../../components/DocsLayout';
import styles from './ReadmePage.module.scss';

export interface ReadmePageProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;
}

/**
 * ReadmePage – Strona dokumentacji z treścią README.md
 * Renderuje statyczną treść README.md w postaci HTML
 */
export function ReadmePage({
  children,
  className = '',
  style,
  'aria-label': ariaLabel = 'Aurora UI Documentation',
}: ReadmePageProps) {
  return (
    <DocsLayout
      className={className}
      style={style}
      aria-label={ariaLabel}
      backgroundVariant="readme"
    >
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb}>
        <a href="/" className={styles.breadcrumbLink}>Home</a>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>Documentation</span>
      </nav>

      {/* Main Content */}
      <article className={styles.content}>
        <div className={styles.markdownContent}>
          {/* Header */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}>🌟</span>
              Aurora UI
            </h1>
            <p className={styles.subtitle}>
              <strong>Modern Material Design 3 components for Preact applications</strong>
            </p>
          </div>

          {/* Badges */}
          <div className={styles.badges}>
            <span className={styles.badge}>
              <a href="https://www.npmjs.com/package/preact-aurora-ui" target="_blank" rel="noopener noreferrer">
                NPM Package
              </a>
            </span>
            <span className={styles.badge}>TypeScript Ready</span>
            <span className={styles.badge}>MIT License</span>
            <span className={styles.badge}>
              <a href="https://prachwal.github.io/preact-aurora-ui/" target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </span>
          </div>

          {/* Description */}
          <blockquote className={styles.description}>
            A comprehensive, accessible, and performant UI component library built with Preact and Material Design 3 principles.
          </blockquote>

          {/* Key Features */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>✨ Key Features</h2>
            <div className={styles.featureGrid}>
              <div className={styles.feature}>
                <strong>🚀 Zero-Config Setup</strong>
                <span>Get started in 2 minutes with automatic style injection</span>
              </div>
              <div className={styles.feature}>
                <strong>🎨 Material Design 3</strong>
                <span>Complete MD3 design system with dynamic theming</span>
              </div>
              <div className={styles.feature}>
                <strong>⚡ Smooth Theme Switching</strong>
                <span>Flicker-free light/dark/auto modes</span>
              </div>
              <div className={styles.feature}>
                <strong>♿ Full Accessibility</strong>
                <span>WCAG 2.1 AA compliant with screen reader support</span>
              </div>
              <div className={styles.feature}>
                <strong>💅 Flexible Theming</strong>
                <span>CSS Custom Properties with easy customization</span>
              </div>
              <div className={styles.feature}>
                <strong>✅ TypeScript First</strong>
                <span>Complete type safety and IntelliSense support</span>
              </div>
              <div className={styles.feature}>
                <strong>📚 Rich Documentation</strong>
                <span>Interactive Storybook + comprehensive guides</span>
              </div>
              <div className={styles.feature}>
                <strong>🔧 Developer Experience</strong>
                <span>Helpful warnings, debugging tools, and error messages</span>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>🚀 Quick Start</h2>

            <h3 className={styles.subsectionTitle}>Installation</h3>
            <pre className={styles.codeBlock}>
              <code>npm install preact-aurora-ui</code>
            </pre>

            <h3 className={styles.subsectionTitle}>Setup (Zero-Config)</h3>
            <pre className={styles.codeBlock}>
              <code>{`// main.tsx
import { render } from 'preact';
import { AuroraProvider } from 'preact-aurora-ui';
import App from './App';

render(
  <AuroraProvider>
    <App />
  </AuroraProvider>,
  document.getElementById('app')!,
);`}</code>
            </pre>

            <h3 className={styles.subsectionTitle}>Use Components</h3>
            <pre className={styles.codeBlock}>
              <code>{`// App.tsx
import { Button, Card, TextField, useTheme } from 'preact-aurora-ui';

export default function App() {
  const { toggleMode, isDark } = useTheme();

  return (
    <Card>
      <h2>Welcome to Aurora UI! 🌟</h2>
      <TextField label="Your name" placeholder="Enter your name" />
      <Button onClick={toggleMode} variant="filled">
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </Button>
    </Card>
  );
}`}</code>
            </pre>

            <p className={styles.callout}>
              That's it! 🎉 Your app now has beautiful, accessible components with automatic theming.
            </p>
          </section>

          {/* What's Included */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📦 What's Included</h2>

            <h3 className={styles.subsectionTitle}>Core Components (34 total)</h3>
            <pre className={styles.codeBlock}>
              <code>{`// Form Components
import { Button, TextField, Checkbox, Radio, Switch, Select, Slider } from 'preact-aurora-ui';

// Layout Components
import { AppLayout, Container, Grid, Header, Footer, Sidebar } from 'preact-aurora-ui';

// Navigation
import { Menu, Tabs, Breadcrumbs, BottomNavigation } from 'preact-aurora-ui';

// Communication
import { Dialog, Drawer, Snackbar, Tooltip, Banner } from 'preact-aurora-ui';

// Advanced
import { DataTable, Stepper, FAB, IconButton, Chip } from 'preact-aurora-ui';

// Providers
import { AuroraProvider, ThemeProvider, useTheme } from 'preact-aurora-ui';`}</code>
            </pre>
          </section>

          {/* Documentation Links */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📚 Documentation</h2>
            <div className={styles.linkGrid}>
              <a href="/docs/components" className={styles.docLink}>
                <strong>🧩 Component Library</strong>
                <span>Individual component docs</span>
              </a>
              <a href="/storybook" className={styles.docLink}>
                <strong>📖 Interactive Storybook</strong>
                <span>Live component playground</span>
              </a>
              <a href="/docs/quick-start" className={styles.docLink}>
                <strong>🚀 Quick Start Guide</strong>
                <span>Detailed setup instructions</span>
              </a>
              <a href="https://github.com/prachwal/preact-aurora-ui" className={styles.docLink}>
                <strong>💻 GitHub Repository</strong>
                <span>Source code and issues</span>
              </a>
            </div>
          </section>

          {/* Browser Support */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📱 Browser Support</h2>
            <div className={styles.browserList}>
              <span className={styles.browserItem}>✅ Chrome 90+</span>
              <span className={styles.browserItem}>✅ Firefox 88+</span>
              <span className={styles.browserItem}>✅ Safari 14+</span>
              <span className={styles.browserItem}>✅ Edge 90+</span>
              <span className={styles.browserItem}>✅ Mobile browsers</span>
            </div>
          </section>

          {children}
        </div>
      </article>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="/" className={styles.footerLink}>← Back to Home</a>
          <a href="/docs/components" className={styles.footerLink}>Components →</a>
        </div>
        <p className={styles.footerText}>
          Made with ❤️ for the Preact community
        </p>
      </footer>
    </DocsLayout>
  );
}
