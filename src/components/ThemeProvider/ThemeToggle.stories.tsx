import type { Meta, StoryObj } from '@storybook/preact';

import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'FAZA 4/ThemeToggle Enhanced',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme={{ mode: 'light' }}>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Enhanced ThemeToggle component z zaawansowanymi funkcjonalnościami FAZY 4.

## Nowe funkcjonalności:
- 🎨 **Switch variant** - elegancki przełącznik w stylu Material Design
- ✨ **Animowane przejścia** - smooth transitions między ikonami
- 🎯 **Custom icons** - możliwość własnych ikon dla każdego motywu
- 📍 **Position control** - kontrola pozycji (left, center, right)
- 🔄 **Enhanced tooltips** - intelligent tooltip management
- 🎭 **Theme-aware styling** - automatyczne dopasowanie do motywu

## Design System:
- Material Design 3 guidelines
- Accessibility first approach
- Reduced motion support
- High contrast mode compatibility
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['icon', 'button', 'switch'],
      description: 'Wariant wyświetlania przełącznika',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Rozmiar komponentu',
    },
    animated: {
      control: 'boolean',
      description: 'Animowane przejścia między ikonami',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Pozycja komponentu w kontenerze',
    },
    tooltip: {
      control: 'boolean',
      description: 'Pokazuj tooltip z informacją o motywie',
    },
    rounded: {
      control: 'boolean',
      description: 'Zaokrąglone rogi (pełny okrąg dla icon)',
    },
    showLabel: {
      control: 'boolean',
      description: 'Pokazuj etykietę tekstową (tylko button/switch)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {
    variant: 'icon',
    size: 'md',
    animated: true,
    position: 'center',
    tooltip: true,
    rounded: true,
  },
};

export const IconVariant: Story = {
  args: {
    variant: 'icon',
    size: 'md',
    animated: true,
    tooltip: true,
    rounded: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standardowy przełącznik w formie ikony z animacjami.',
      },
    },
  },
};

export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    size: 'md',
    showLabel: true,
    animated: true,
    tooltip: true,
    rounded: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Przełącznik w formie przycisku z tekstową etykietą.',
      },
    },
  },
};

export const SwitchVariant: Story = {
  args: {
    variant: 'switch',
    size: 'md',
    showLabel: true,
    animated: true,
    tooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Elegancki przełącznik w stylu Material Design switch.',
      },
    },
  },
};

export const CustomIcons: Story = {
  args: {
    variant: 'icon',
    size: 'lg',
    animated: true,
    customIcons: {
      light: '🔆',
      dark: '🌚',
      auto: '🔄',
    },
    tooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Przełącznik z niestandardowymi ikonami dla każdego motywu.',
      },
    },
  },
};

export const SizeVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ThemeToggle size="sm" />
      <ThemeToggle size="md" />
      <ThemeToggle size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Różne rozmiary przełącznika - small, medium, large.',
      },
    },
  },
};

export const PositionVariations: Story = {
  render: () => (
    <div style={{ width: '100%', border: '1px dashed #ccc', borderRadius: '8px', padding: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Left:</strong>
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '0.5rem',
            background: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <ThemeToggle position="left" />
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Center:</strong>
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '0.5rem',
            background: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <ThemeToggle position="center" />
        </div>
      </div>
      <div>
        <strong>Right:</strong>
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '0.5rem',
            background: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <ThemeToggle position="right" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstracja różnych pozycji przełącznika w kontenerze.',
      },
    },
  },
};

export const AnimatedVsStatic: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Animated</div>
        <ThemeToggle animated={true} size="lg" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Static</div>
        <ThemeToggle animated={false} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Porównanie animowanej vs statycznej wersji przełącznika.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Icon Variant</div>
        <ThemeToggle variant="icon" size="lg" animated={true} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Button Variant</div>
        <ThemeToggle variant="button" size="md" showLabel={true} animated={true} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Switch Variant</div>
        <ThemeToggle variant="switch" size="md" showLabel={true} animated={true} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Wszystkie warianty przełącznika motywów w jednym miejscu.',
      },
    },
  },
};

export const IntegrationExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'var(--md-sys-color-surface)',
        borderRadius: '12px',
        border: '1px solid var(--md-sys-color-outline-variant)',
        minWidth: '400px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🚀</span>
        <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Aurora UI</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ThemeToggle variant="switch" showLabel={true} />
        <span style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>⋮</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Przykład integracji ThemeToggle w header aplikacji.',
      },
    },
  },
};
