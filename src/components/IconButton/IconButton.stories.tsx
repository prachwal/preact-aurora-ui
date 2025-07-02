import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import {
  IconButton,
  HeartIcon,
  StarIcon,
  BookmarkIcon,
  EditIcon,
  DeleteIcon,
  ShareIcon,
  MoreIcon,
  CloseIcon,
} from './IconButton';

/**
 * IconButton component provides compact, iconographic actions following Material Design 3 specifications.
 *
 * ## Features
 *
 * - **Variants**: Standard, Filled, Outlined, Tonal
 * - **Sizes**: Small, Medium, Large
 * - **Toggle Mode**: Stateful toggle functionality
 * - **Icons**: Built-in icon set and custom icon support
 * - **Accessibility**: Full ARIA support and keyboard navigation
 * - **States**: Hover, focus, active, disabled
 */
const meta: Meta<typeof IconButton> = {
  title: 'Advanced/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'IconButton component for compact, iconographic actions with Material Design 3 styling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Default story
export const Default: Story = {
  render: (args) => <IconButton {...args} icon={<HeartIcon />} aria-label="Heart" />,
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton variant="standard" icon={<HeartIcon />} aria-label="Standard heart" />
      <IconButton variant="filled" icon={<HeartIcon />} aria-label="Filled heart" />
      <IconButton variant="outlined" icon={<HeartIcon />} aria-label="Outlined heart" />
      <IconButton variant="tonal" icon={<HeartIcon />} aria-label="Tonal heart" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButton variants: standard, filled, outlined, tonal.',
      },
    },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton size="small" icon={<HeartIcon />} aria-label="Small heart" />
      <IconButton size="medium" icon={<HeartIcon />} aria-label="Medium heart" />
      <IconButton size="large" icon={<HeartIcon />} aria-label="Large heart" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButton sizes: small (32px), medium (40px), large (48px).',
      },
    },
  },
};

// Built-in Icons
export const BuiltInIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <IconButton icon={<HeartIcon />} aria-label="Heart" />
      <IconButton icon={<StarIcon />} aria-label="Star" />
      <IconButton icon={<BookmarkIcon />} aria-label="Bookmark" />
      <IconButton icon={<EditIcon />} aria-label="Edit" />
      <IconButton icon={<DeleteIcon />} aria-label="Delete" />
      <IconButton icon={<ShareIcon />} aria-label="Share" />
      <IconButton icon={<MoreIcon />} aria-label="More" />
      <IconButton icon={<CloseIcon />} aria-label="Close" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Collection of built-in icons: Heart, Star, Bookmark, Edit, Delete, Share, More, Close.',
      },
    },
  },
};

// Toggle Functionality
export const ToggleButtons: Story = {
  render: () => {
    const [heartSelected, setHeartSelected] = useState(false);
    const [starSelected, setStarSelected] = useState(false);
    const [bookmarkSelected, setBookmarkSelected] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <IconButton
          toggle
          selected={heartSelected}
          onToggle={setHeartSelected}
          selectedIcon={<HeartIcon filled />}
          unselectedIcon={<HeartIcon />}
          aria-label="Toggle heart"
        />
        <IconButton
          toggle
          selected={starSelected}
          onToggle={setStarSelected}
          selectedIcon={<StarIcon filled />}
          unselectedIcon={<StarIcon />}
          aria-label="Toggle star"
        />
        <IconButton
          toggle
          selected={bookmarkSelected}
          onToggle={setBookmarkSelected}
          selectedIcon={<BookmarkIcon filled />}
          unselectedIcon={<BookmarkIcon />}
          aria-label="Toggle bookmark"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with different icons for selected/unselected states.',
      },
    },
  },
};

// Toggle Variants
export const ToggleVariants: Story = {
  render: () => {
    const [states, setStates] = useState([false, false, false, false]);

    const toggleState = (index: number) => {
      const newStates = [...states];
      newStates[index] = !newStates[index];
      setStates(newStates);
    };

    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <IconButton
          variant="standard"
          toggle
          selected={states[0]}
          onToggle={() => toggleState(0)}
          selectedIcon={<HeartIcon filled />}
          unselectedIcon={<HeartIcon />}
          aria-label="Standard toggle"
        />
        <IconButton
          variant="filled"
          toggle
          selected={states[1]}
          onToggle={() => toggleState(1)}
          selectedIcon={<HeartIcon filled />}
          unselectedIcon={<HeartIcon />}
          aria-label="Filled toggle"
        />
        <IconButton
          variant="outlined"
          toggle
          selected={states[2]}
          onToggle={() => toggleState(2)}
          selectedIcon={<HeartIcon filled />}
          unselectedIcon={<HeartIcon />}
          aria-label="Outlined toggle"
        />
        <IconButton
          variant="tonal"
          toggle
          selected={states[3]}
          onToggle={() => toggleState(3)}
          selectedIcon={<HeartIcon filled />}
          unselectedIcon={<HeartIcon />}
          aria-label="Tonal toggle"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle button variants showing different selected states.',
      },
    },
  },
};

// Disabled State
export const DisabledState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton disabled icon={<HeartIcon />} aria-label="Disabled heart" />
      <IconButton disabled variant="filled" icon={<StarIcon />} aria-label="Disabled filled star" />
      <IconButton
        disabled
        variant="outlined"
        icon={<BookmarkIcon />}
        aria-label="Disabled outlined bookmark"
      />
      <IconButton disabled variant="tonal" icon={<EditIcon />} aria-label="Disabled tonal edit" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for all IconButton variants.',
      },
    },
  },
};

// Custom Icons
export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton aria-label="Custom emoji">
        <span style={{ fontSize: '20px' }}>🎯</span>
      </IconButton>
      <IconButton aria-label="Custom text">
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>AB</span>
      </IconButton>
      <IconButton aria-label="Custom SVG">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom icons using emojis, text, or custom SVG elements.',
      },
    },
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [config, setConfig] = useState({
      variant: 'standard' as const,
      size: 'medium' as const,
      disabled: false,
      toggle: false,
      selected: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' }}>
          <label>
            Variant:
            <select
              value={config.variant}
              onChange={(e) => setConfig({ ...config, variant: e.currentTarget.value as any })}
              style={{ marginLeft: '8px', padding: '4px' }}
            >
              <option value="standard">Standard</option>
              <option value="filled">Filled</option>
              <option value="outlined">Outlined</option>
              <option value="tonal">Tonal</option>
            </select>
          </label>

          <label>
            Size:
            <select
              value={config.size}
              onChange={(e) => setConfig({ ...config, size: e.currentTarget.value as any })}
              style={{ marginLeft: '8px', padding: '4px' }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>

          <label>
            <input
              type="checkbox"
              checked={config.disabled}
              onChange={(e) => setConfig({ ...config, disabled: e.currentTarget.checked })}
            />
            Disabled
          </label>

          <label>
            <input
              type="checkbox"
              checked={config.toggle}
              onChange={(e) =>
                setConfig({ ...config, toggle: e.currentTarget.checked, selected: false })
              }
            />
            Toggle mode
          </label>

          {config.toggle && (
            <label>
              <input
                type="checkbox"
                checked={config.selected}
                onChange={(e) => setConfig({ ...config, selected: e.currentTarget.checked })}
              />
              Selected
            </label>
          )}
        </div>

        <IconButton
          {...config}
          icon={<HeartIcon />}
          selectedIcon={<HeartIcon filled />}
          unselectedIcon={<HeartIcon />}
          onToggle={config.toggle ? (selected) => setConfig({ ...config, selected }) : undefined}
          aria-label="Interactive demo button"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with controls to test all IconButton features.',
      },
    },
  },
};
