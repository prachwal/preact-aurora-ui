import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import { DocsLayout } from '../../components/DocsLayout';
import styles from './ComponentsPage.module.scss';

export interface ComponentsPageProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;
}

/**
 * ComponentsPage – Strona dokumentacji z listą wszystkich komponentów
 */
export function ComponentsPage({
  children,
  className = '',
  style,
  'aria-label': ariaLabel = 'Aurora UI Components Documentation',
}: ComponentsPageProps) {
  return (
    <DocsLayout
      className={className}
      style={style}
      aria-label={ariaLabel}
      backgroundVariant="default"
    >
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb}>
        <a href="/" className={styles.breadcrumbLink}>Home</a>
        <span className={styles.breadcrumbSeparator}>›</span>
        <a href="/docs" className={styles.breadcrumbLink}>Documentation</a>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>Components</span>
      </nav>

      {/* Main Content */}
      <article className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleIcon}>🧩</span>
            Component Library
          </h1>
          <p className={styles.subtitle}>
            Complete reference for all 34 Aurora UI components
          </p>
        </div>

        {/* Component Categories */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Form Components</h2>
          <div className={styles.componentGrid}>
            <div className={styles.componentCard}>
              <h3>Button</h3>
              <p>Material Design 3 buttons with multiple variants</p>
              <a href="/storybook/?path=/docs/components-button--docs" className={styles.viewButton}>
                View in Storybook
              </a>
            </div>
            <div className={styles.componentCard}>
              <h3>TextField</h3>
              <p>Text input with labels, validation, and accessibility</p>
              <a href="/storybook/?path=/docs/components-textfield--docs" className={styles.viewButton}>
                View in Storybook
              </a>
            </div>
            <div className={styles.componentCard}>
              <h3>Checkbox</h3>
              <p>Checkboxes with indeterminate state support</p>
              <a href="/storybook/?path=/docs/components-checkbox--docs" className={styles.viewButton}>
                View in Storybook
              </a>
            </div>
            <div className={styles.componentCard}>
              <h3>Radio</h3>
              <p>Radio buttons for exclusive selections</p>
              <a href="/storybook/?path=/docs/components-radio--docs" className={styles.viewButton}>
                View in Storybook
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Layout Components</h2>
          <div className={styles.componentGrid}>
            <div className={styles.componentCard}>
              <h3>Card</h3>
              <p>Flexible content containers with elevation</p>
              <a href="/storybook/?path=/docs/components-card--docs" className={styles.viewButton}>
                View in Storybook
              </a>
            </div>
            <div className={styles.componentCard}>
              <h3>Grid</h3>
              <p>Responsive grid system for layouts</p>
              <a href="/storybook/?path=/docs/components-grid--docs" className={styles.viewButton}>
                View in Storybook
              </a>
            </div>
          </div>
        </section>

        {children}
      </article>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="/docs" className={styles.footerLink}>← Back to Documentation</a>
          <a href="/storybook" className={styles.footerLink}>Open Storybook →</a>
        </div>
        <p className={styles.footerText}>
          Explore all components in our interactive Storybook
        </p>
      </footer>
    </DocsLayout>
  );
}
