import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { Menu } from './Menu';
import type { MenuItem } from './Menu';

const meta: Meta = {
  title: 'Dashboard/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dropdown', 'context', 'navigation'],
    },
    elevation: {
      control: { type: 'range', min: 0, max: 4, step: 1 },
    },
    dense: {
      control: { type: 'boolean' },
    },
    multiSelect: {
      control: { type: 'boolean' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Menu>;

// Basic items for simple stories
const basicItems: MenuItem[] = [
  { key: '1', label: 'Dashboard', icon: '📊' },
  { key: '2', label: 'Analytics', icon: '📈' },
  { key: '3', label: 'Users', icon: '👥' },
  { key: '4', label: 'Settings', icon: '⚙️', disabled: true },
  { key: '5', label: 'Profile', icon: '👤' },
];

// Items with badges and shortcuts
const itemsWithExtras: MenuItem[] = [
  {
    key: '1',
    label: 'Messages',
    icon: '💬',
    badge: '12',
    shortcut: '⌘M',
  },
  {
    key: '2',
    label: 'Notifications',
    icon: '🔔',
    badge: '3',
    shortcut: '⌘N',
  },
  {
    key: '3',
    label: 'Profile',
    icon: '👤',
    shortcut: '⌘P',
  },
  {
    key: '4',
    label: 'Settings',
    icon: '⚙️',
    shortcut: '⌘S',
  },
];

// Items with submenu
const itemsWithSubmenu: MenuItem[] = [
  { key: '1', label: 'Dashboard', icon: '📊' },
  {
    key: '2',
    label: 'Analytics',
    icon: '📈',
    submenu: [
      { key: '2-1', label: 'Overview', icon: '👁️' },
      { key: '2-2', label: 'Reports', icon: '📄' },
      { key: '2-3', label: 'Exports', icon: '📤' },
    ],
  },
  {
    key: '3',
    label: 'Users',
    icon: '👥',
    submenu: [
      { key: '3-1', label: 'All Users', icon: '👥' },
      { key: '3-2', label: 'Active Users', icon: '🟢' },
      { key: '3-3', label: 'Inactive Users', icon: '🔴' },
      { key: '3-4', label: 'User Groups', icon: '👨‍👩‍👧‍👦' },
    ],
  },
  { key: 'divider1', label: '', divider: true },
  { key: '4', label: 'Settings', icon: '⚙️' },
  { key: '5', label: 'Help', icon: '❓' },
];

// Complex items with descriptions
const complexItems: MenuItem[] = [
  {
    key: '1',
    label: 'Dashboard',
    icon: '📊',
    description: 'Main overview',
    badge: 'New',
    shortcut: '⌘1',
  },
  {
    key: '2',
    label: 'Advanced Analytics',
    icon: '📈',
    description: 'Detailed reports',
    submenu: [
      { key: '2-1', label: 'Revenue', icon: '💰', badge: '5' },
      { key: '2-2', label: 'Traffic', icon: '🚦', shortcut: '⌘T' },
      { key: '2-3', label: 'Conversion', icon: '🎯' },
    ],
  },
  { key: 'divider1', label: '', divider: true },
  {
    key: '3',
    label: 'User Management',
    icon: '👥',
    description: 'Manage users',
    badge: '12',
  },
  {
    key: '4',
    label: 'System Settings',
    icon: '⚙️',
    description: 'Configure system',
    disabled: true,
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
    variant: 'default',
  },
};

export const Dropdown: Story = {
  args: {
    items: itemsWithExtras,
    variant: 'dropdown',
    elevation: 2,
  },
};

export const Context: Story = {
  args: {
    items: [
      { key: '1', label: 'Copy', icon: '📋', shortcut: '⌘C' },
      { key: '2', label: 'Paste', icon: '📋', shortcut: '⌘V' },
      { key: '3', label: 'Cut', icon: '✂️', shortcut: '⌘X' },
      { key: 'divider1', label: '', divider: true },
      { key: '4', label: 'Delete', icon: '🗑️', shortcut: 'Del' },
    ],
    variant: 'context',
    dense: true,
  },
};

export const Navigation: Story = {
  args: {
    items: [
      { key: '1', label: 'Home', icon: '🏠' },
      { key: '2', label: 'Products', icon: '📦' },
      { key: '3', label: 'Orders', icon: '📋', badge: '5' },
      { key: '4', label: 'Customers', icon: '👥' },
      { key: '5', label: 'Analytics', icon: '📊' },
      { key: '6', label: 'Settings', icon: '⚙️' },
    ],
    variant: 'navigation',
  },
};

export const Dense: Story = {
  args: {
    items: basicItems,
    dense: true,
  },
};

export const WithElevation: Story = {
  args: {
    items: basicItems,
    variant: 'dropdown',
    elevation: 4,
  },
};

export const WithBadgesAndShortcuts: Story = {
  args: {
    items: itemsWithExtras,
  },
};

export const WithSubmenu: Story = {
  args: {
    items: itemsWithSubmenu,
    expandIcon: '▶',
    collapseIcon: '▼',
    defaultExpandedKeys: ['2'],
  },
};

export const Complex: Story = {
  args: {
    items: complexItems,
    variant: 'dropdown',
    elevation: 1,
    expandIcon: '›',
    collapseIcon: '‹',
  },
};

// Interactive multi-select story
export const MultiSelect: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1', '3']);

    return (
      <div style={{ padding: '20px' }}>
        <h3>Multi-Select Menu</h3>
        <p>Selected: {selectedKeys.join(', ')}</p>
        <Menu
          items={basicItems}
          multiSelect={true}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          variant="dropdown"
          elevation={1}
        />
      </div>
    );
  },
};

// Interactive submenu story
export const InteractiveSubmenu: Story = {
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>('');

    return (
      <div style={{ padding: '20px' }}>
        <h3>Interactive Submenu</h3>
        <p>Selected: {selectedKey}</p>
        <p>Expanded: {expandedKeys.join(', ')}</p>
        <Menu
          items={itemsWithSubmenu}
          selectedKey={selectedKey}
          onSelect={setSelectedKey}
          onExpandedChange={setExpandedKeys}
          expandIcon="+"
          collapseIcon="-"
          variant="navigation"
        />
      </div>
    );
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        padding: '20px',
      }}
    >
      <div>
        <h4>Default</h4>
        <Menu items={basicItems} />
      </div>

      <div>
        <h4>Dropdown</h4>
        <Menu items={basicItems} variant="dropdown" elevation={1} />
      </div>

      <div>
        <h4>Context</h4>
        <Menu
          items={[
            { key: '1', label: 'Action 1', icon: '⚡' },
            { key: '2', label: 'Action 2', icon: '🔥' },
            { key: 'div', label: '', divider: true },
            { key: '3', label: 'Delete', icon: '🗑️' },
          ]}
          variant="context"
          dense
        />
      </div>

      <div>
        <h4>Navigation</h4>
        <Menu items={basicItems} variant="navigation" selectedKey="2" />
      </div>
    </div>
  ),
};

// Playground for testing all features
export const Playground: Story = {
  args: {
    items: complexItems,
    variant: 'dropdown',
    elevation: 2,
    dense: false,
    multiSelect: false,
    expandIcon: '▶',
    collapseIcon: '▼',
  },
  argTypes: {
    items: { control: false },
    selectedKey: { control: 'text' },
    selectedKeys: { control: false },
    onSelect: { action: 'onSelect' },
    onSelectionChange: { action: 'onSelectionChange' },
    onExpandedChange: { action: 'onExpandedChange' },
  },
};
