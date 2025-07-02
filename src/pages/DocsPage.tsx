import { DocsHomepage } from './DocsHomepage';

/**
 * DocsPage - Homepage for the documentation with Preact component
 * Replaces the static docs/index.html with a dynamic Preact component
 */
export function DocsPage() {
  return (
    <DocsHomepage
      title="🌟 Aurora UI"
      subtitle="Modern Material Design 3 components for Preact applications"
      stats={[
        { number: '34', label: 'Components' },
        { number: '✅', label: 'Complete' },
        { number: 'v0.0.13', label: 'Version' },
        { number: 'MD3', label: 'Design System' },
      ]}
      cards={[
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
      ]}
      footerText="© 2025 Aurora UI • Built with ❤️ for the Preact community"
    />
  );
}
