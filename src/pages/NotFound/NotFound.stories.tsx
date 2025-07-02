import type { Meta, StoryObj } from '@storybook/preact';
import { NotFound } from './NotFound';

const meta: Meta<typeof NotFound> = {
  title: 'Components/NotFound',
  component: NotFound,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# NotFound

Komponent wyświetlający stronę błędu 404 dla nieistniejących ścieżek.

## Funkcjonalności:
- 🎨 Modern glassmorphism design z animacjami
- 🔄 Przycisk "Wróć" z inteligentną obsługą historii
- 🏠 Link do strony głównej
- 📱 W pełni responsywny
- ♿ Dostępny (ARIA, keyboard navigation)
- 🌙 Obsługa motywów jasnego/ciemnego
- 🔗 Sugerowane linki do ważnych sekcji

## Kiedy używać:
- Jako domyślna strona dla nieistniejących ścieżek w routingu
- W miejsce usuwanych/przenoszonych stron
- Jako fallback w przypadku błędów nawigacji
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Główny tytuł błędu',
    },
    subtitle: {
      control: 'text',
      description: 'Podtytuł z opisem błędu',
    },
    showHomeLink: {
      control: 'boolean',
      description: 'Czy pokazać link do strony głównej',
    },
    showBackLink: {
      control: 'boolean',
      description: 'Czy pokazać przycisk "Wróć"',
    },
    className: {
      control: 'text',
      description: 'Dodatkowe klasy CSS',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotFound>;

/**
 * Podstawowa strona 404 z domyślnymi ustawieniami.
 */
export const Default: Story = {
  args: {},
};

/**
 * Strona 404 z niestandardowym tytułem i opisem.
 */
export const CustomContent: Story = {
  args: {
    title: 'Oops! Something went wrong',
    subtitle: 'We\'re sorry, but the page you were looking for has been moved or deleted.',
  },
};

/**
 * Strona 404 z ukrytymi przyciskami nawigacji.
 */
export const NoNavigation: Story = {
  args: {
    showHomeLink: false,
    showBackLink: false,
  },
};

/**
 * Strona 404 tylko z linkiem do strony głównej.
 */
export const OnlyHomeLink: Story = {
  args: {
    showBackLink: false,
  },
};

/**
 * Strona 404 tylko z przyciskiem "Wróć".
 */
export const OnlyBackButton: Story = {
  args: {
    showHomeLink: false,
  },
};

/**
 * Strona 404 z dodatkową zawartością.
 */
export const WithCustomContent: Story = {
  args: {
    children: (
      <div style={{
        background: 'var(--md-sys-color-error-container)',
        color: 'var(--md-sys-color-on-error-container)',
        padding: 'var(--space-lg)',
        borderRadius: '8px',
        margin: 'var(--space-lg) 0',
        textAlign: 'center',
      }}>
        <h4 style={{ margin: '0 0 var(--space-sm) 0' }}>Need Help?</h4>
        <p style={{ margin: 0 }}>
          Contact our support team at{' '}
          <a href="mailto:support@aurora-ui.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
            support@aurora-ui.com
          </a>
        </p>
      </div>
    ),
  },
};

/**
 * Minimalna wersja strony 404.
 */
export const Minimal: Story = {
  args: {
    title: '404',
    subtitle: 'Page not found',
    showBackLink: false,
  },
};
