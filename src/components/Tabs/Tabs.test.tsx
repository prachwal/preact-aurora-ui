import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'preact/hooks';

import { Tabs, Tab, TabPanel } from './Tabs';
import '@testing-library/jest-dom';

describe('Tabs', () => {
  const BasicTabs = ({ onChange }: { onChange?: (value: string) => void }) => (
    <Tabs defaultValue="tab1" onChange={onChange}>
      <Tab value="tab1" label="Tab 1" />
      <Tab value="tab2" label="Tab 2" />
      <Tab value="tab3" label="Tab 3" disabled />
      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
      <TabPanel value="tab3">Content 3</TabPanel>
    </Tabs>
  );

  describe('Basic Functionality', () => {
    it('renders tabs and panels correctly', () => {
      render(<BasicTabs />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();

      expect(screen.getByRole('tabpanel', { hidden: false })).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('shows correct initial active tab', () => {
      render(<BasicTabs />);

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      expect(tab1).toHaveAttribute('tabindex', '0');
      expect(tab2).toHaveAttribute('tabindex', '-1');
    });

    it('switches tabs when clicked', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('calls onChange when tab is switched', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<BasicTabs onChange={handleChange} />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(handleChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles arrow key navigation', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab1.focus();
      await user.keyboard('{ArrowRight}');

      expect(tab2).toHaveFocus();
    });

    it('wraps around when navigating with arrows', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab2.focus();
      await user.keyboard('{ArrowRight}');

      expect(tab1).toHaveFocus();
    });

    it('handles Home and End keys', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab1.focus();
      await user.keyboard('{End}');
      expect(tab2).toHaveFocus();

      await user.keyboard('{Home}');
      expect(tab1).toHaveFocus();
    });

    it('activates tab with Enter key', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      tab2.focus();
      await user.keyboard('{Enter}');

      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('activates tab with Space key', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      tab2.focus();
      await user.keyboard(' ');

      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
    });
  });

  describe('Controlled Mode', () => {
    it('works in controlled mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const ControlledTabs = () => {
        const [value, setValue] = useState('tab1');

        const handleTabChange = (newValue: string) => {
          setValue(newValue);
          handleChange(newValue);
        };

        return (
          <Tabs value={value} onChange={handleTabChange}>
            <Tab value="tab1" label="Tab 1" />
            <Tab value="tab2" label="Tab 2" />
            <TabPanel value="tab1">Content 1</TabPanel>
            <TabPanel value="tab2">Content 2</TabPanel>
          </Tabs>
        );
      };

      render(<ControlledTabs />);

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(handleChange).toHaveBeenCalledWith('tab2');
      expect(screen.getByText('Content 2')).toBeVisible();
    });
  });

  describe('Disabled Tabs', () => {
    it('does not activate disabled tabs', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);

      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      await user.click(tab3);

      expect(tab3).toHaveAttribute('aria-selected', 'false');
      expect(tab3).toBeDisabled();
    });

    it('skips disabled tabs in keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<BasicTabs />);

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      tab2.focus();
      await user.keyboard('{ArrowRight}');

      // Should skip disabled tab3 and go to tab1
      expect(tab1).toHaveFocus();
    });
  });

  describe('Variants', () => {
    it('applies primary variant class by default', () => {
      render(<BasicTabs />);

      const tabs = screen.getByRole('tablist').parentElement;
      expect(tabs?.className).toEqual(expect.stringContaining('tabs--primary'));
    });

    it('applies secondary variant class', () => {
      render(
        <Tabs variant="secondary" defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      const tabs = screen.getByRole('tablist').parentElement;
      expect(tabs?.className).toEqual(expect.stringContaining('tabs--secondary'));
    });
  });

  describe('Layout Options', () => {
    it('applies scrollable class', () => {
      render(
        <Tabs scrollable defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      const tabs = screen.getByRole('tablist').parentElement;
      expect(tabs?.className).toEqual(expect.stringContaining('tabs--scrollable'));
    });

    it('applies centered class', () => {
      render(
        <Tabs centered defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      const tabs = screen.getByRole('tablist').parentElement;
      expect(tabs?.className).toEqual(expect.stringContaining('tabs--centered'));
    });

    it('applies fullWidth class', () => {
      render(
        <Tabs fullWidth defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      const tabs = screen.getByRole('tablist').parentElement;
      expect(tabs?.className).toEqual(expect.stringContaining('tabs--fullWidth'));
    });
  });

  describe('Icons and Badges', () => {
    it('renders tabs with icons', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" icon="🏠" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      expect(screen.getByText('🏠')).toBeInTheDocument();
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
    });

    it('renders tabs with badges', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" badge="5" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<BasicTabs />);

      const tablist = screen.getByRole('tablist');
      const tabs = screen.getAllByRole('tab');
      const panels = screen.getAllByRole('tabpanel', { hidden: true });

      expect(tablist).toBeInTheDocument();
      expect(tabs).toHaveLength(3);
      expect(panels).toHaveLength(3);

      // Check aria-controls and aria-labelledby
      expect(tabs[0]).toHaveAttribute('aria-controls');
      expect(panels[0]).toHaveAttribute('aria-labelledby');
    });

    it('supports aria-label on tablist', () => {
      render(
        <Tabs aria-label="Navigation tabs" defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Navigation tabs');
    });

    it('supports aria-labelledby on tablist', () => {
      render(
        <div>
          <h2 id="tabs-title">Section Tabs</h2>
          <Tabs aria-labelledby="tabs-title" defaultValue="tab1">
            <Tab value="tab1" label="Tab 1" />
            <TabPanel value="tab1">Content 1</TabPanel>
          </Tabs>
        </div>,
      );

      expect(screen.getByRole('tablist')).toHaveAttribute('aria-labelledby', 'tabs-title');
    });
  });

  describe('TabPanel Features', () => {
    it('renders lazy loading panels', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <Tab value="tab2" label="Tab 2" />
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2" lazy>
            Content 2
          </TabPanel>
        </Tabs>,
      );

      // Lazy panel should show loading initially
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('loads lazy panel when activated', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <Tab value="tab2" label="Tab 2" />
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2" lazy>
            Content 2
          </TabPanel>
        </Tabs>,
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('keeps mounted panels when specified', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <Tab value="tab2" label="Tab 2" />
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2" keepMounted>
            Content 2
          </TabPanel>
        </Tabs>,
      );

      // Both panels should be in DOM but tab2 hidden
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.getByText('Content 2')).not.toBeVisible();

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(screen.getByText('Content 2')).toBeVisible();
      expect(screen.getByText('Content 1')).not.toBeVisible();
    });
  });

  describe('Custom Classes and Styles', () => {
    it('applies custom className', () => {
      render(
        <Tabs className="custom-tabs" defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      const tabs = screen.getByRole('tablist').parentElement;
      expect(tabs?.className).toEqual(expect.stringContaining('custom-tabs'));
    });

    it('applies custom styles', () => {
      render(
        <Tabs style={{ backgroundColor: 'red' }} defaultValue="tab1">
          <Tab value="tab1" label="Tab 1" />
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>,
      );

      const tabs = screen.getByRole('tablist').parentElement;
      // Check style attribute directly
      expect(tabs?.getAttribute('style')).toContain('background-color: red');
    });
  });
});
