import type { Meta, StoryObj } from '@storybook/preact';

import { Banner } from './Banner';
import { BannerVariant, BannerPosition } from './types';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Banner component for displaying system messages and notifications with Material Design 3 styling.',
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Banner message content',
    },
    variant: {
      control: 'select',
      options: Object.values(BannerVariant),
      description: 'Banner variant',
    },
    position: {
      control: 'select',
      options: Object.values(BannerPosition),
      description: 'Banner position',
    },
    open: {
      control: 'boolean',
      description: 'Whether the banner is visible',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the banner can be dismissed',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show default variant icon',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Auto-dismiss timer in milliseconds (0 to disable)',
    },
  },
  args: {
    message: 'This is a banner message',
    variant: BannerVariant.INFO,
    open: true,
    dismissible: true,
    showIcon: true,
    autoHideDuration: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    message: 'This is an informational banner message',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Banner message="Information banner" variant={BannerVariant.INFO} />
      <Banner message="Warning banner" variant={BannerVariant.WARNING} />
      <Banner message="Error banner" variant={BannerVariant.ERROR} />
      <Banner message="Success banner" variant={BannerVariant.SUCCESS} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Banner supports different variants for different message types.',
      },
    },
  },
};

export const WithActions: Story = {
  args: {
    message: 'Your changes have been saved successfully',
    variant: BannerVariant.SUCCESS,
    action: {
      label: 'View Changes',
      onClick: () => alert('Primary action clicked'),
    },
    secondaryAction: {
      label: 'Undo',
      onClick: () => alert('Secondary action clicked'),
      variant: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Banner can include primary and secondary action buttons.',
      },
    },
  },
};

export const NonDismissible: Story = {
  args: {
    message: 'This banner cannot be dismissed',
    variant: BannerVariant.WARNING,
    dismissible: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Banner can be configured to not be dismissible.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    message: 'Banner without icon',
    variant: BannerVariant.INFO,
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Banner can be displayed without an icon.',
      },
    },
  },
};

export const CustomIcon: Story = {
  args: {
    message: 'Banner with custom icon',
    variant: BannerVariant.INFO,
    icon: <span style={{ fontSize: '20px' }}>🎉</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Banner can use a custom icon instead of the default variant icon.',
      },
    },
  },
};

export const AutoHide: Story = {
  args: {
    message: 'This banner will auto-hide after 5 seconds',
    variant: BannerVariant.SUCCESS,
    autoHideDuration: 5000,
    onClose: () => alert('Banner auto-closed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Banner can be configured to automatically hide after a specified duration.',
      },
    },
  },
};

export const Positioned: Story = {
  render: () => (
    <div style={{ height: '300px', position: 'relative', border: '1px dashed #ccc' }}>
      <Banner
        message="Top positioned banner"
        variant={BannerVariant.INFO}
        position={BannerPosition.TOP}
      />
      <div style={{ padding: '20px', textAlign: 'center', marginTop: '60px' }}>
        <p>Page content area</p>
      </div>
      <Banner
        message="Bottom positioned banner"
        variant={BannerVariant.WARNING}
        position={BannerPosition.BOTTOM}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Banner can be positioned at the top or bottom of a container.',
      },
    },
  },
};

export const ComplexContent: Story = {
  args: {
    message: (
      <div>
        <strong>Update Available:</strong> A new version of the application is available.{' '}
        <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
          Learn more
        </a>
      </div>
    ),
    variant: BannerVariant.INFO,
    action: {
      label: 'Update Now',
      onClick: () => alert('Update started'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Banner can display complex content including formatted text and links.',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    message: 'Important accessibility announcement',
    variant: BannerVariant.WARNING,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Banner includes proper ARIA attributes for accessibility. It uses role="alert" and aria-live="polite" to announce messages to screen readers.',
      },
    },
  },
};
