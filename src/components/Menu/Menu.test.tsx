import { render, screen, fireEvent } from '@testing-library/preact';
import { describe, it, expect, vi } from 'vitest';

import { Menu } from './Menu';
import type { MenuItem } from './Menu';
import styles from './Menu.module.scss';
import '@testing-library/jest-dom';

describe('Menu', () => {
  const basicItems: MenuItem[] = [
    { key: '1', label: 'Item 1', icon: '📝' },
    { key: '2', label: 'Item 2', disabled: true },
    { key: '3', label: 'Item 3' },
  ];

  describe('Basic functionality', () => {
    it('renders items', () => {
      render(<Menu items={basicItems} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('calls onSelect when item clicked', () => {
      const onSelect = vi.fn();
      render(<Menu items={basicItems} onSelect={onSelect} />);
      fireEvent.click(screen.getByText('Item 1'));
      expect(onSelect).toHaveBeenCalledWith('1');
    });

    it('does not call onSelect for disabled items', () => {
      const onSelect = vi.fn();
      render(<Menu items={basicItems} onSelect={onSelect} />);
      fireEvent.click(screen.getByText('Item 2'));
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('applies selectedKey styling', () => {
      render(<Menu items={basicItems} selectedKey="3" />);
      const item = screen.getByText('Item 3').closest('[role="menuitem"]');
      expect(item).toHaveClass(styles.selected);
    });

    it('renders icons', () => {
      render(<Menu items={basicItems} />);
      expect(screen.getByText('📝')).toBeInTheDocument();
    });
  });

  describe('Menu variants', () => {
    it('applies dropdown variant class', () => {
      const { container } = render(<Menu items={basicItems} variant="dropdown" />);
      const menu = container.querySelector('nav');
      expect(menu).toHaveClass(styles['menu--variant-dropdown']);
    });

    it('applies context variant class', () => {
      const { container } = render(<Menu items={basicItems} variant="context" />);
      const menu = container.querySelector('nav');
      expect(menu).toHaveClass(styles['menu--variant-context']);
    });

    it('applies navigation variant class', () => {
      const { container } = render(<Menu items={basicItems} variant="navigation" />);
      const menu = container.querySelector('nav');
      expect(menu).toHaveClass(styles['menu--variant-navigation']);
    });
  });

  describe('Dense and elevation', () => {
    it('applies dense class', () => {
      const { container } = render(<Menu items={basicItems} dense />);
      const menu = container.querySelector('nav');
      expect(menu).toHaveClass(styles['menu--dense']);
    });

    it('applies elevation classes', () => {
      const { container } = render(<Menu items={basicItems} elevation={2} />);
      const menu = container.querySelector('nav');
      expect(menu).toHaveClass(styles['menu--elevation-2']);
    });

    it('does not apply elevation class for elevation 0', () => {
      const { container } = render(<Menu items={basicItems} elevation={0} />);
      const menu = container.querySelector('nav');
      expect(menu).not.toHaveClass(styles['menu--elevation-0']);
    });
  });

  describe('Multi-select functionality', () => {
    it('handles multi-select mode', () => {
      const onSelectionChange = vi.fn();
      render(<Menu items={basicItems} multiSelect onSelectionChange={onSelectionChange} />);

      fireEvent.click(screen.getByText('Item 1'));
      expect(onSelectionChange).toHaveBeenCalledWith(['1']);

      fireEvent.click(screen.getByText('Item 3'));
      expect(onSelectionChange).toHaveBeenCalledWith(['1', '3']);
    });

    it('toggles selection in multi-select mode', () => {
      const onSelectionChange = vi.fn();
      render(
        <Menu
          items={basicItems}
          multiSelect
          selectedKeys={['1']}
          onSelectionChange={onSelectionChange}
        />,
      );

      // Click already selected item to deselect
      fireEvent.click(screen.getByText('Item 1'));
      expect(onSelectionChange).toHaveBeenCalledWith([]);
    });

    it('displays selected items in multi-select mode', () => {
      render(<Menu items={basicItems} multiSelect selectedKeys={['1', '3']} />);

      const item1 = screen.getByText('Item 1').closest('[role="menuitem"]');
      const item3 = screen.getByText('Item 3').closest('[role="menuitem"]');

      expect(item1).toHaveClass(styles.selected);
      expect(item3).toHaveClass(styles.selected);
    });
  });

  describe('Submenu functionality', () => {
    const itemsWithSubmenu: MenuItem[] = [
      { key: '1', label: 'Item 1' },
      {
        key: '2',
        label: 'Item with Submenu',
        submenu: [
          { key: '2-1', label: 'Subitem 1' },
          { key: '2-2', label: 'Subitem 2' },
        ],
      },
      { key: '3', label: 'Item 3' },
    ];

    it('renders submenu items when expanded', () => {
      render(<Menu items={itemsWithSubmenu} defaultExpandedKeys={['2']} />);
      expect(screen.getByText('Subitem 1')).toBeInTheDocument();
      expect(screen.getByText('Subitem 2')).toBeInTheDocument();
    });

    it('toggles submenu on parent click', () => {
      const { container } = render(<Menu items={itemsWithSubmenu} />);

      // Initially submenu should not be expanded
      const submenu = container.querySelector(`.${styles.submenu}`);
      expect(submenu).not.toHaveClass(styles.submenuExpanded);

      // Click parent to expand
      fireEvent.click(screen.getByText('Item with Submenu'));
      expect(submenu).toHaveClass(styles.submenuExpanded);
      expect(screen.getByText('Subitem 1')).toBeVisible();

      // Click again to collapse
      fireEvent.click(screen.getByText('Item with Submenu'));
      expect(submenu).not.toHaveClass(styles.submenuExpanded);
    });

    it('calls onExpandedChange when submenu toggled', () => {
      const onExpandedChange = vi.fn();
      render(<Menu items={itemsWithSubmenu} onExpandedChange={onExpandedChange} />);

      fireEvent.click(screen.getByText('Item with Submenu'));
      expect(onExpandedChange).toHaveBeenCalledWith(['2']);
    });

    it('renders expand icon for items with submenu', () => {
      render(<Menu items={itemsWithSubmenu} expandIcon="▶" />);
      expect(screen.getByText('▶')).toBeInTheDocument();
    });

    it('shows collapse icon when submenu is expanded', () => {
      render(
        <Menu
          items={itemsWithSubmenu}
          expandIcon="▶"
          collapseIcon="▼"
          defaultExpandedKeys={['2']}
        />,
      );
      expect(screen.getByText('▼')).toBeInTheDocument();
    });
  });

  describe('Badge and shortcut features', () => {
    const itemsWithExtras: MenuItem[] = [
      { key: '1', label: 'Item 1', badge: '5' },
      { key: '2', label: 'Item 2', shortcut: 'Ctrl+S' },
      { key: '3', label: 'Item 3', badge: 99, shortcut: 'Ctrl+P' },
    ];

    it('renders badges', () => {
      render(<Menu items={itemsWithExtras} />);
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('renders shortcuts', () => {
      render(<Menu items={itemsWithExtras} />);
      expect(screen.getByText('Ctrl+S')).toBeInTheDocument();
      expect(screen.getByText('Ctrl+P')).toBeInTheDocument();
    });
  });

  describe('Divider support', () => {
    const itemsWithDivider: MenuItem[] = [
      { key: '1', label: 'Item 1' },
      { key: 'div1', label: '', divider: true },
      { key: '2', label: 'Item 2' },
    ];

    it('renders dividers', () => {
      const { container } = render(<Menu items={itemsWithDivider} />);
      const divider = container.querySelector('hr');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass(styles.divider);
    });
  });

  describe('Description support', () => {
    const itemsWithDescription: MenuItem[] = [
      { key: '1', label: 'Item 1', description: 'This is a description' },
      { key: '2', label: 'Item 2' },
    ];

    it('renders descriptions', () => {
      render(<Menu items={itemsWithDescription} />);
      expect(screen.getByText('This is a description')).toBeInTheDocument();
    });
  });

  describe('Keyboard navigation', () => {
    it('handles Enter key for item selection', () => {
      const onSelect = vi.fn();
      render(<Menu items={basicItems} onSelect={onSelect} />);

      const item = screen.getByText('Item 1').closest('[role="menuitem"]');
      fireEvent.keyDown(item!, { key: 'Enter' });
      expect(onSelect).toHaveBeenCalledWith('1');
    });

    it('handles Space key for item selection', () => {
      const onSelect = vi.fn();
      render(<Menu items={basicItems} onSelect={onSelect} />);

      const item = screen.getByText('Item 1').closest('[role="menuitem"]');
      fireEvent.keyDown(item!, { key: ' ' });
      expect(onSelect).toHaveBeenCalledWith('1');
    });
  });

  describe('Accessibility', () => {
    it('sets proper ARIA attributes', () => {
      render(<Menu items={basicItems} aria-label="Custom menu" />);
      const nav = screen.getByLabelText('Custom menu');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Custom menu');
    });

    it('sets aria-disabled for disabled items', () => {
      render(<Menu items={basicItems} />);
      const disabledItem = screen.getByText('Item 2').closest('[role="menuitem"]');
      expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets aria-current for selected items', () => {
      render(<Menu items={basicItems} selectedKey="1" />);
      const selectedItem = screen.getByText('Item 1').closest('[role="menuitem"]');
      expect(selectedItem).toHaveAttribute('aria-current', 'true');
    });

    it('sets aria-expanded for items with submenu', () => {
      const itemsWithSubmenu: MenuItem[] = [
        {
          key: '1',
          label: 'Item with Submenu',
          submenu: [{ key: '1-1', label: 'Subitem 1' }],
        },
      ];

      render(<Menu items={itemsWithSubmenu} />);
      const parentItem = screen.getByText('Item with Submenu').closest('[role="menuitem"]');
      expect(parentItem).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(parentItem!);
      expect(parentItem).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('href navigation', () => {
    const itemsWithHref: MenuItem[] = [
      { key: '1', label: 'Link Item', href: '/test-url' },
      { key: '2', label: 'Regular Item' },
    ];

    it('handles href navigation', () => {
      // Mock window.location.href assignment
      const mockAssign = vi.fn();
      Object.defineProperty(window, 'location', {
        value: { href: '', assign: mockAssign },
        writable: true,
      });

      render(<Menu items={itemsWithHref} />);
      fireEvent.click(screen.getByText('Link Item'));

      // Should set href to the target URL
      expect(window.location.href).toBe('/test-url');
    });
  });
});
