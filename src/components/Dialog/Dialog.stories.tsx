import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { Button } from '../Button/Button';

import { Dialog } from './Dialog';
import { useDialog } from './useDialog';
import type { DialogAction, DialogProps } from './types';

const meta: Meta<typeof Dialog> = {
  title: 'Communication/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Material Design 3 Dialog component for displaying modal and non-modal content.

## Features
- 4 dialog types: basic, alert, confirmation, fullscreen
- Modal overlay with configurable backdrop dismissal
- Focus management and keyboard navigation (tab trapping, escape key)
- Action buttons with Material Design variants
- Draggable and resizable variants
- Portal rendering for proper z-index management
- Full accessibility support (ARIA, screen readers)
- Responsive design with size variants

## Usage
\`\`\`tsx
import { Dialog, useDialog } from '@aurora-ui/react';

function MyComponent() {
  const dialog = useDialog();

  return (
    <>
      <Button onClick={dialog.open}>Open Dialog</Button>
      <Dialog
        open={dialog.isOpen}
        onClose={dialog.close}
        title="Dialog Title"
        actions={[
          { label: 'Cancel', onClick: dialog.close, variant: 'text' },
          { label: 'Confirm', onClick: dialog.close, variant: 'filled' }
        ]}
      >
        Dialog content goes here
      </Dialog>
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    type: {
      control: { type: 'select' },
      options: ['basic', 'alert', 'confirmation', 'fullscreen'],
      description: 'Dialog type',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Dialog size (not applicable to fullscreen)',
    },
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined'],
      description: 'Dialog visual variant',
    },
    modal: {
      control: 'boolean',
      description: 'Whether dialog is modal (blocks interaction with background)',
    },
    draggable: {
      control: 'boolean',
      description: 'Whether dialog can be dragged',
    },
    resizable: {
      control: 'boolean',
      description: 'Whether dialog can be resized',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether clicking the overlay closes the dialog',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing escape closes the dialog',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button in header',
    },
  },
  args: {
    type: 'basic',
    size: 'medium',
    variant: 'elevated',
    modal: true,
    draggable: false,
    resizable: false,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Wrapper component for interactive stories
function DialogWrapper(props: Omit<DialogProps, 'open' | 'onClose'>) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog {...props} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export const Basic: Story = {
  render: () => (
    <DialogWrapper
      title="Basic Dialog"
      actions={[
        { label: 'Cancel', onClick: () => { }, variant: 'text' },
        { label: 'Save', onClick: () => { }, variant: 'filled' },
      ]}
    >
      <p>This is a basic dialog with some content. You can add any content here.</p>
    </DialogWrapper>
  ),
};

export const Alert: Story = {
  render: () => (
    <DialogWrapper
      type="alert"
      title="Delete Item"
      icon="⚠️"
      actions={[
        { label: 'Cancel', onClick: () => { }, variant: 'text' },
        { label: 'Delete', onClick: () => { }, variant: 'filled', destructive: true },
      ]}
    >
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </DialogWrapper>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <DialogWrapper
      type="confirmation"
      title="Save Changes"
      subtitle="You have unsaved changes"
      icon="💾"
      actions={[
        { label: 'Discard', onClick: () => { }, variant: 'text' },
        { label: 'Save', onClick: () => { }, variant: 'filled' },
      ]}
    >
      <p>Do you want to save your changes before leaving this page?</p>
    </DialogWrapper>
  ),
};

export const Fullscreen: Story = {
  render: () => (
    <DialogWrapper
      type="fullscreen"
      title="Fullscreen Dialog"
      subtitle="Takes up the entire viewport"
      actions={[
        { label: 'Cancel', onClick: () => { }, variant: 'text' },
        { label: 'Save', onClick: () => { }, variant: 'filled' },
      ]}
    >
      <div style={{ padding: '1rem' }}>
        <h3>Large Content Area</h3>
        <p>
          This is a fullscreen dialog that takes up the entire viewport. It's useful for complex
          forms, editing workflows, or when you need maximum screen real estate.
        </p>
        <p>
          The fullscreen dialog automatically removes the draggable and resizable options since it
          occupies the full screen.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <h4>Form Example</h4>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label>First Name</label>
              <input type="text" style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div>
              <label>Email</label>
              <input type="email" style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div>
              <label>Phone</label>
              <input type="tel" style={{ width: '100%', padding: '0.5rem' }} />
            </div>
          </div>
        </div>
      </div>
    </DialogWrapper>
  ),
};

export const Draggable: Story = {
  render: () => (
    <DialogWrapper
      title="Draggable Dialog"
      draggable={true}
      initialPosition={{ x: 100, y: 100 }}
      actions={[{ label: 'Close', onClick: () => { }, variant: 'text' }]}
    >
      <p>This dialog can be dragged around the screen by clicking and dragging the header.</p>
      <p>Try dragging it to a different position!</p>
    </DialogWrapper>
  ),
};

export const Resizable: Story = {
  render: () => (
    <DialogWrapper
      title="Resizable Dialog"
      resizable={true}
      size="small"
      actions={[{ label: 'Close', onClick: () => { }, variant: 'text' }]}
    >
      <p>This dialog can be resized by dragging the resize handle in the bottom-right corner.</p>
      <p>Try making it larger or smaller!</p>
    </DialogWrapper>
  ),
};

export const DraggableAndResizable: Story = {
  render: () => (
    <DialogWrapper
      title="Draggable & Resizable"
      draggable={true}
      resizable={true}
      initialPosition={{ x: 50, y: 50 }}
      actions={[
        { label: 'Reset', onClick: () => { }, variant: 'outlined' },
        { label: 'Close', onClick: () => { }, variant: 'text' },
      ]}
    >
      <p>This dialog combines both dragging and resizing capabilities.</p>
      <p>You can drag it around and resize it as needed.</p>
    </DialogWrapper>
  ),
};

export const NonModal: Story = {
  render: () => (
    <div>
      <DialogWrapper
        title="Non-Modal Dialog"
        modal={false}
        closeOnOverlayClick={false}
        actions={[{ label: 'Close', onClick: () => { }, variant: 'text' }]}
      >
        <p>This is a non-modal dialog. You can interact with the background content.</p>
        <p>It doesn't have an overlay and won't block other interactions.</p>
      </DialogWrapper>
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h3>Background Content</h3>
        <p>This content remains interactive when the non-modal dialog is open.</p>
        <Button>Interactive Button</Button>
      </div>
    </div>
  ),
};

export const WithCustomActions: Story = {
  render: () => {
    const actions: DialogAction[] = [
      { label: 'Help', onClick: () => alert('Help clicked'), variant: 'text' },
      { label: 'Reset', onClick: () => alert('Reset clicked'), variant: 'outlined' },
      { label: 'Cancel', onClick: () => { }, variant: 'text' },
      { label: 'Save & Continue', onClick: () => alert('Saved'), variant: 'filled' },
    ];

    return (
      <DialogWrapper
        title="Multiple Actions"
        subtitle="Dialog with custom action buttons"
        actions={actions}
      >
        <p>This dialog demonstrates multiple action buttons with different variants.</p>
        <p>Actions can be text, outlined, or filled variants.</p>
      </DialogWrapper>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [activeSize, setActiveSize] = useState<'small' | 'medium' | 'large'>('medium');

    return (
      <div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Button onClick={() => setActiveSize('small')}>Small Dialog</Button>
          <Button onClick={() => setActiveSize('medium')}>Medium Dialog</Button>
          <Button onClick={() => setActiveSize('large')}>Large Dialog</Button>
        </div>
        <DialogWrapper
          title={`${activeSize.charAt(0).toUpperCase() + activeSize.slice(1)} Dialog`}
          size={activeSize}
          actions={[{ label: 'Close', onClick: () => { }, variant: 'text' }]}
        >
          <p>This is a {activeSize} dialog size demonstration.</p>
          <p>Dialog sizes help you choose the appropriate width for your content.</p>
        </DialogWrapper>
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => (
    <DialogWrapper
      title="Accessibility Features"
      aria-describedby="dialog-description"
      actions={[
        { label: 'Cancel', onClick: () => { }, variant: 'text' },
        { label: 'Confirm', onClick: () => { }, variant: 'filled', autoFocus: true },
      ]}
    >
      <div id="dialog-description">
        <p>This dialog demonstrates accessibility features:</p>
        <ul>
          <li>Focus is trapped within the dialog</li>
          <li>Tab navigation cycles through focusable elements</li>
          <li>Escape key closes the dialog</li>
          <li>Screen reader support with ARIA attributes</li>
          <li>Focus returns to trigger element when closed</li>
        </ul>
        <p>Try using Tab, Shift+Tab, and Escape keys to navigate.</p>
      </div>
    </DialogWrapper>
  ),
};

// Hook usage example
export const UseDialogHook: Story = {
  render: () => {
    const dialog = useDialog({
      onOpen: () => console.log('Dialog opened'),
      onClose: () => console.log('Dialog closed'),
    });

    return (
      <div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Button onClick={dialog.open}>Open</Button>
          <Button onClick={dialog.close} disabled={!dialog.isOpen}>
            Close
          </Button>
          <Button onClick={dialog.toggle}>Toggle</Button>
        </div>
        <p>Dialog is currently: {dialog.isOpen ? 'Open' : 'Closed'}</p>
        <Dialog
          open={dialog.isOpen}
          onClose={dialog.close}
          title="useDialog Hook Demo"
          actions={[
            { label: 'Toggle', onClick: dialog.toggle, variant: 'outlined' },
            { label: 'Close', onClick: dialog.close, variant: 'text' },
          ]}
        >
          <p>This dialog is controlled by the useDialog hook.</p>
          <p>The hook provides open, close, and toggle methods.</p>
        </Dialog>
      </div>
    );
  },
};
