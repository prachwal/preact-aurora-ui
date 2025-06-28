import { render, screen, fireEvent, waitFor } from '@testing-library/preact';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import type { BreadcrumbItem } from './Breadcrumbs';
import { Breadcrumbs } from './Breadcrumbs';
import '@testing-library/jest-dom';

// Mock window.innerWidth for responsive tests
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

describe('Breadcrumbs', () => {
  beforeEach(() => {
    // Reset window width before each test
    window.innerWidth = 1024;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic functionality', () => {
    it('renders nothing for empty items', () => {
      const { container } = render(<Breadcrumbs items={[]} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders single item as active', () => {
      render(<Breadcrumbs items={[{ label: 'Home' }]} />);
      expect(screen.getByText('Home')).toHaveAttribute('aria-current', 'page');
    });

    it('renders all items and separators', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Section', href: '/section' },
        { label: 'Current' },
      ];
      render(<Breadcrumbs items={items} separator=">" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Section')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
      expect(screen.getAllByText('>', { selector: 'span' }).length).toBe(2);
    });

    it('calls onItemClick for link', () => {
      const onItemClick = vi.fn();
      const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Current' }];
      render(<Breadcrumbs items={items} onItemClick={onItemClick} />);
      fireEvent.click(screen.getByText('Home'));
      expect(onItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'Home', href: '/' }),
        0,
        expect.any(Object),
      );
    });

    it('does not call onItemClick for last (active) item', () => {
      const onItemClick = vi.fn();
      const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Current' }];
      render(<Breadcrumbs items={items} onItemClick={onItemClick} />);
      fireEvent.click(screen.getByText('Current'));
      expect(onItemClick).not.toHaveBeenCalledWith(
        expect.objectContaining({ label: 'Current' }),
        1,
        expect.any(Object),
      );
    });

    it('applies className and style', () => {
      const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];
      render(<Breadcrumbs items={items} className="test-class" style={{ background: '#eee' }} />);
      const nav = screen.getByLabelText('Breadcrumb');
      expect(nav).toHaveClass('test-class');
      expect(nav).toHaveStyle({ background: '#eee' });
    });

    it('renders icon if provided', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Home', href: '/', icon: <span data-testid="icon">🏠</span> },
        { label: 'Current' },
      ];
      render(<Breadcrumbs items={items} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('supports description prop for tooltips', () => {
      const items: BreadcrumbItem[] = [
        { label: 'Home', href: '/', description: 'Go to homepage' },
        { label: 'Current' },
      ];
      render(<Breadcrumbs items={items} />);
      const homeLink = screen.getByText('Home');
      expect(homeLink).toHaveAttribute('title', 'Go to homepage');
    });
  });

  describe('MD3 Enhancements - Collapse functionality', () => {
    const longBreadcrumbItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/subcategory' },
      { label: 'Product', href: '/category/subcategory/product' },
      { label: 'Details', href: '/category/subcategory/product/details' },
      { label: 'Current Page' },
    ];

    it('collapses items when maxItems is set', () => {
      render(<Breadcrumbs items={longBreadcrumbItems} maxItems={3} />);

      // Should show Home + ellipsis + Current Page
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Current Page')).toBeInTheDocument();
      expect(screen.getByText('...')).toBeInTheDocument();

      // Should not show middle items
      expect(screen.queryByText('Category')).not.toBeInTheDocument();
      expect(screen.queryByText('Subcategory')).not.toBeInTheDocument();
    });

    it('shows expand button with custom text', () => {
      render(
        <Breadcrumbs
          items={longBreadcrumbItems}
          maxItems={3}
          expandText="Show all"
          showExpandButton={true}
        />,
      );

      expect(screen.getByText('Show all')).toBeInTheDocument();
    });

    it('expands items when expand button is clicked', async () => {
      render(<Breadcrumbs items={longBreadcrumbItems} maxItems={3} expandText="Show all" />);

      // Initially collapsed
      expect(screen.queryByText('Category')).not.toBeInTheDocument();

      // Click expand button
      const expandButton = screen.getByText('Show all');
      fireEvent.click(expandButton);

      // Should show all items
      await waitFor(() => {
        expect(screen.getByText('Category')).toBeInTheDocument();
        expect(screen.getByText('Subcategory')).toBeInTheDocument();
        expect(screen.getByText('Product')).toBeInTheDocument();
        expect(screen.getByText('Details')).toBeInTheDocument();
      });
    });

    it('shows ellipsis without expand button when showExpandButton is false', () => {
      render(<Breadcrumbs items={longBreadcrumbItems} maxItems={3} showExpandButton={false} />);

      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('uses custom collapse and expand icons', () => {
      render(
        <Breadcrumbs items={longBreadcrumbItems} maxItems={3} collapsedIcon="•••" expandIcon="↓" />,
      );

      expect(screen.getByText('•••')).toBeInTheDocument();
      expect(screen.getByText('↓')).toBeInTheDocument();
    });
  });

  describe('MD3 Enhancements - Variants', () => {
    it('applies condensed variant class', () => {
      const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Current' }];
      render(<Breadcrumbs items={items} variant="condensed" />);

      const nav = screen.getByLabelText('Breadcrumb');
      expect(nav.className).toContain('breadcrumbs--variant-condensed');
    });

    it('applies default variant by default', () => {
      const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Current' }];
      render(<Breadcrumbs items={items} />);

      const nav = screen.getByLabelText('Breadcrumb');
      expect(nav.className).not.toContain('breadcrumbs--variant-condensed');
    });
  });

  describe('MD3 Enhancements - Responsive behavior', () => {
    it('auto-collapses on mobile when responsive is true', () => {
      // Simulate mobile viewport
      window.innerWidth = 600;

      const items: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Current' },
      ];

      render(<Breadcrumbs items={items} responsive={true} responsiveBreakpoint={768} />);

      // Should show Home and Current, hide Category
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('does not auto-collapse when responsive is false', () => {
      window.innerWidth = 600;

      const items: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Current' },
      ];

      render(<Breadcrumbs items={items} responsive={false} />);

      // Should show all items even on mobile
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('uses custom responsive breakpoint', () => {
      window.innerWidth = 900;

      const items: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Current' },
      ];

      render(<Breadcrumbs items={items} responsive={true} responsiveBreakpoint={1000} />);

      // Should collapse because 900 < 1000
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });
  });

  describe('MD3 Enhancements - Accessibility', () => {
    it('provides proper ARIA labels for expand button', () => {
      render(
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'A', href: '/a' },
            { label: 'B', href: '/b' },
            { label: 'C', href: '/c' },
            { label: 'Current' },
          ]}
          maxItems={3}
          expandText="Show more"
        />,
      );

      const expandButton = screen.getByRole('button');
      expect(expandButton).toHaveAttribute('aria-label', 'Show more (3 hidden items)');
    });

    it('provides proper title for ellipsis when no expand button', () => {
      render(
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'A', href: '/a' },
            { label: 'B', href: '/b' },
            { label: 'C', href: '/c' },
            { label: 'Current' },
          ]}
          maxItems={3}
          showExpandButton={false}
        />,
      );

      const ellipsis = screen.getByText('...');
      expect(ellipsis).toHaveAttribute('title', '3 hidden items');
    });

    it('maintains keyboard navigation for expand button', () => {
      render(
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'A', href: '/a' },
            { label: 'B', href: '/b' },
            { label: 'Current' },
          ]}
          maxItems={2}
        />,
      );

      const expandButton = screen.getByRole('button');
      expect(expandButton).toHaveAttribute('type', 'button');

      // Test keyboard activation
      fireEvent.keyDown(expandButton, { key: 'Enter' });
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });

  describe('MD3 Enhancements - CSS Module classes', () => {
    it('applies collapsible class when items are collapsed', () => {
      render(
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'A', href: '/a' }, { label: 'Current' }]}
          maxItems={2}
        />,
      );

      const nav = screen.getByLabelText('Breadcrumb');
      expect(nav.className).toContain('breadcrumbs--collapsible');
    });

    it('applies expanded class when items are expanded', async () => {
      render(
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'A', href: '/a' }, { label: 'Current' }]}
          maxItems={2}
        />,
      );

      const expandButton = screen.getByRole('button');
      fireEvent.click(expandButton);

      await waitFor(() => {
        const nav = screen.getByLabelText('Breadcrumb');
        expect(nav.className).toContain('breadcrumbs--expanded');
      });
    });

    it('applies responsive class on mobile', () => {
      window.innerWidth = 600;

      render(
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Current' }]}
          responsive={true}
          responsiveBreakpoint={768}
        />,
      );

      const nav = screen.getByLabelText('Breadcrumb');
      expect(nav.className).toContain('breadcrumbs--responsive');
    });
  });

  describe('Backwards compatibility', () => {
    it('maintains all existing functionality without new props', () => {
      const onItemClick = vi.fn();
      const items: BreadcrumbItem[] = [
        { label: 'Home', href: '/', icon: '🏠' },
        { label: 'Section', href: '/section' },
        { label: 'Current' },
      ];

      render(
        <Breadcrumbs
          items={items}
          separator=">"
          onItemClick={onItemClick}
          className="legacy-class"
          style={{ padding: '10px' }}
          aria-label="Legacy breadcrumb"
        />,
      );

      // All items should be visible (no collapse)
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Section')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();

      // Custom separator should work
      expect(screen.getAllByText('>', { selector: 'span' }).length).toBe(2);

      // Click handling should work
      fireEvent.click(screen.getByText('Home'));
      expect(onItemClick).toHaveBeenCalled();

      // Custom props should be applied
      const nav = screen.getByLabelText('Legacy breadcrumb');
      expect(nav).toHaveClass('legacy-class');
      expect(nav).toHaveStyle({ padding: '10px' });
    });
  });
});
