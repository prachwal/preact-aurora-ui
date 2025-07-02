import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import { DocsLayout } from '../../components/DocsLayout';
import styles from './DocsHomepage.module.scss';

export interface StatsItem {
  number: string;
  label: string;
}

export interface CardItem {
  title: string;
  description: string;
  link: string;
  buttonText: string;
  icon?: string;
}

export interface DocsHomepageProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;

  // Enhanced props for docs content
  title?: string;
  subtitle?: string;
  stats?: StatsItem[];
  cards?: CardItem[];
  footerText?: string;
}

/**
 * DocsHomepage – strona główna dokumentacji Aurora UI
 *
 * @param title - Główny tytuł strony
 * @param subtitle - Podtytuł strony
 * @param stats - Lista statystyk do wyświetlenia
 * @param cards - Lista kart z linkami do sekcji dokumentacji
 * @param footerText - Tekst stopki
 */
export function DocsHomepage({
  children,
  className = '',
  style,
  'aria-label': ariaLabel = 'Aurora UI Documentation Homepage',
  title = '🌟 Aurora UI',
  subtitle = 'Modern Material Design 3 components for Preact applications',
  stats = [
    { number: '34', label: 'Components' },
    { number: '✅', label: 'Complete' },
    { number: 'v0.0.13', label: 'Version' },
    { number: 'MD3', label: 'Design System' },
  ],
  cards = [
    {
      title: '📚 Documentation',
      description: 'Complete documentation for all 34 components with examples, API reference, accessibility guidelines, and testing patterns.',
      link: '/docs/readme',
      buttonText: 'View Documentation',
      icon: '📚',
    },
    {
      title: '🧩 Components',
      description: 'Explore all available components from buttons and forms to advanced data tables and navigation systems.',
      link: '/docs/components',
      buttonText: 'Browse Components',
      icon: '🧩',
    },
    {
      title: '🎨 Storybook',
      description: 'Interactive component playground with all variants, states, and customization options.',
      link: '/storybook',
      buttonText: 'Open Storybook',
      icon: '🎨',
    },
    {
      title: '🚀 Quick Start',
      description: 'Get started with Aurora UI in minutes using our zero-config AuroraProvider setup.',
      link: '/docs/quick-start',
      buttonText: 'Quick Start Guide',
      icon: '🚀',
    },
    {
      title: '💻 GitHub',
      description: 'Source code, issues, and contributions. Built with Preact, TypeScript, and Material Design 3.',
      link: 'https://github.com/prachwal/preact-aurora-ui',
      buttonText: 'View on GitHub',
      icon: '💻',
    },
    {
      title: '📦 NPM Package',
      description: 'Install Aurora UI in your project and start building beautiful applications.',
      link: 'https://www.npmjs.com/package/preact-aurora-ui',
      buttonText: 'NPM Package',
      icon: '📦',
    },
  ],
  footerText = '© 2025 Aurora UI • Built with ❤️ for the Preact community',
}: DocsHomepageProps) {
  return (
    <DocsLayout
      className={className}
      style={style}
      aria-label={ariaLabel}
      backgroundVariant="homepage"
    >
      <section className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </section>

      {stats.length > 0 && (
        <section className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </section>
      )}

      <section className={styles.cards}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>
              {card.icon && <span className={styles.cardIcon}>{card.icon}</span>}
              {card.title}
            </h3>
            <p className={styles.cardDescription}>{card.description}</p>
            <a
              href={card.link}
              className={styles.btn}
              target={card.link.startsWith('http') ? '_blank' : undefined}
              rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {card.buttonText}
            </a>
          </div>
        ))}
      </section>

      {children}

      <footer className={styles.footer}>
        <p>{footerText}</p>
      </footer>
    </DocsLayout>
  );
}
