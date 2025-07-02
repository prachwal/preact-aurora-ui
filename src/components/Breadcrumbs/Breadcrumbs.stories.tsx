import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { Button } from '../Button';

import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbItem } from './Breadcrumbs';

const meta: Meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'condensed'],
    },
    maxItems: {
      control: { type: 'number', min: 2, max: 10, step: 1 },
    },
    expandText: {
      control: { type: 'text' },
    },
    showExpandButton: {
      control: { type: 'boolean' },
    },
    responsive: {
      control: { type: 'boolean' },
    },
    responsiveBreakpoint: {
      control: { type: 'number', min: 480, max: 1200, step: 1 },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: <span>🏠</span> },
  { label: 'Products', href: '/products' },
  { label: 'Current Page' },
];

const longBreadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/', icon: <span>🏠</span> },
  { label: 'Category', href: '/category', icon: <span>📁</span> },
  { label: 'Subcategory', href: '/category/subcategory' },
  { label: 'Product', href: '/category/subcategory/product' },
  { label: 'Details', href: '/category/subcategory/product/details' },
  { label: 'Reviews', href: '/category/subcategory/product/details/reviews' },
  { label: 'Current Page' },
];

export const Default: Story = {
  render: () => <Breadcrumbs items={items} />,
};

export const OnlyCurrent: Story = {
  render: () => <Breadcrumbs items={[{ label: 'Current Page' }]} />,
};

export const CustomSeparator: Story = {
  render: () => <Breadcrumbs items={items} separator=">" />,
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/', icon: <span>🏠</span> },
        { label: 'Section', href: '/section', icon: <span>📁</span> },
        { label: 'Current', icon: <span>📄</span> },
      ]}
    />
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/', description: 'Go to homepage', icon: <span>🏠</span> },
        { label: 'Docs', href: '/docs', description: 'Documentation section' },
        { label: 'Current', description: 'Current page you are viewing' },
      ]}
    />
  ),
};

// MD3 Enhancement Stories

export const CollapsedBreadcrumbs: Story = {
  render: () => (
    <div>
      <h3>Long breadcrumbs collapsed to 3 items</h3>
      <Breadcrumbs items={longBreadcrumbItems} maxItems={3} />
    </div>
  ),
};

export const CollapsedWithCustomExpandText: Story = {
  render: () => (
    <div>
      <h3>Custom expand text and icons</h3>
      <Breadcrumbs
        items={longBreadcrumbItems}
        maxItems={4}
        expandText="Show all"
        collapsedIcon="•••"
        expandIcon="↓"
      />
    </div>
  ),
};

export const CollapsedWithoutExpandButton: Story = {
  render: () => (
    <div>
      <h3>Collapsed with ellipsis only (no expand button)</h3>
      <Breadcrumbs items={longBreadcrumbItems} maxItems={3} showExpandButton={false} />
    </div>
  ),
};

export const CondensedVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>Default variant</h3>
        <Breadcrumbs items={items} />
      </div>
      <div>
        <h3>Condensed variant</h3>
        <Breadcrumbs items={items} variant="condensed" />
      </div>
      <div>
        <h3>Condensed with collapse</h3>
        <Breadcrumbs items={longBreadcrumbItems} variant="condensed" maxItems={4} />
      </div>
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div>
      <h3>Responsive breadcrumbs (try resizing the window)</h3>
      <p>Below 768px width, breadcrumbs automatically collapse to show first and last items.</p>
      <Breadcrumbs items={longBreadcrumbItems} responsive={true} responsiveBreakpoint={768} />

      <h3 style={{ marginTop: '30px' }}>Non-responsive breadcrumbs</h3>
      <p>These breadcrumbs do not auto-collapse on mobile.</p>
      <Breadcrumbs items={longBreadcrumbItems} responsive={false} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h3>Basic breadcrumbs</h3>
        <Breadcrumbs items={items} />
      </div>

      <div>
        <h3>With custom separator</h3>
        <Breadcrumbs items={items} separator=" → " />
      </div>

      <div>
        <h3>Condensed variant</h3>
        <Breadcrumbs items={items} variant="condensed" separator="/" />
      </div>

      <div>
        <h3>Collapsed (maxItems = 3)</h3>
        <Breadcrumbs items={longBreadcrumbItems} maxItems={3} />
      </div>

      <div>
        <h3>Collapsed condensed</h3>
        <Breadcrumbs items={longBreadcrumbItems} variant="condensed" maxItems={4} />
      </div>

      <div>
        <h3>Ellipsis only (no expand button)</h3>
        <Breadcrumbs items={longBreadcrumbItems} maxItems={3} showExpandButton={false} />
      </div>
    </div>
  ),
};

export const LongLabels: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Very Long Home Label', href: '/' },
        { label: 'Section With A Very Long Name', href: '/section' },
        { label: 'Current Page With Even Longer Name' },
      ]}
    />
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: 'https://example.com' },
        { label: 'Docs', href: 'https://docs.example.com' },
        { label: 'Current' },
      ]}
    />
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Dark theme - Default</h3>
        <Breadcrumbs items={items} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Dark theme - Collapsed</h3>
        <Breadcrumbs items={longBreadcrumbItems} maxItems={3} />
      </div>

      <div>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Dark theme - Condensed</h3>
        <Breadcrumbs items={items} variant="condensed" />
      </div>
    </div>
  ),
};

export const DynamicPath: Story = {
  render: () => {
    const [path, setPath] = useState<BreadcrumbItem[]>([
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current' },
    ]);
    return (
      <div>
        <Breadcrumbs items={path} maxItems={4} />
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <Button
            onClick={() => setPath(path.slice(0, -1))}
            disabled={path.length <= 1}
            variant="outlined"
            size="small"
          >
            Remove last
          </Button>
          <Button
            onClick={() =>
              setPath([...path, { label: `Page ${path.length}`, href: `/page-${path.length}` }])
            }
            variant="filled"
            size="small"
          >
            Add page
          </Button>
        </div>
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    items: longBreadcrumbItems,
    separator: '/',
    maxItems: undefined,
    expandText: 'Show more',
    variant: 'default',
    showExpandButton: true,
    responsive: true,
    responsiveBreakpoint: 768,
    collapsedIcon: '...',
    expandIcon: '▼',
  },
};
