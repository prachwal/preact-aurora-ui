import { useState } from 'preact/hooks';

import { Dialog } from '../../components/Dialog';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { TextField } from '../../components/TextField';

export function DialogDemo() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [draggableOpen, setDraggableOpen] = useState(false);
  const [resizableOpen, setResizableOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [sizedOpen, setSizedOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);
  const [nestedChildOpen, setNestedChildOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '' });

  return (
    <Card>
      <h2>Dialog Component Demo</h2>
      <p>Material Design 3 Dialogs with modal functionality, drag & drop, and various configurations</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Basic Dialog Types */}
        <div>
          <h3>Dialog Types</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => setBasicOpen(true)}>Basic Dialog</Button>
            <Button onClick={() => setAlertOpen(true)} variant="outlined">
              Alert Dialog
            </Button>
            <Button onClick={() => setConfirmationOpen(true)} variant="filled">
              Confirmation Dialog
            </Button>
            <Button onClick={() => setFormOpen(true)}>Form Dialog</Button>
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <h3>Advanced Features</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => setDraggableOpen(true)} variant="outlined">
              Draggable Dialog
            </Button>
            <Button onClick={() => setResizableOpen(true)} variant="outlined">
              Resizable Dialog
            </Button>
            <Button onClick={() => setFullscreenOpen(true)} variant="filled">
              Fullscreen Dialog
            </Button>
            <Button onClick={() => setSizedOpen(true)}>Small Dialog</Button>
            <Button onClick={() => setNestedOpen(true)}>Nested Dialogs</Button>
          </div>
        </div>

        {/* Basic Dialog */}
        <Dialog open={basicOpen} onClose={() => setBasicOpen(false)} title="Basic Dialog">
          <p>This is a basic dialog with simple content.</p>
          <p>You can close it by clicking the close button, pressing Escape, or clicking outside.</p>
          <div style={{ marginTop: '1rem' }}>
            <Button onClick={() => setBasicOpen(false)} variant="text">
              Cancel
            </Button>
            <Button onClick={() => setBasicOpen(false)} style={{ marginLeft: '1rem' }}>
              OK
            </Button>
          </div>
        </Dialog>

        {/* Alert Dialog */}
        <Dialog
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          type="alert"
          title="Delete Item"
          icon="⚠️"
          actions={[
            { label: 'Cancel', onClick: () => setAlertOpen(false), variant: 'text' },
            {
              label: 'Delete',
              onClick: () => {
                alert('Item deleted!');
                setAlertOpen(false);
              },
              variant: 'filled',
            },
          ]}
        >
          <p>Are you sure you want to delete this item?</p>
          <p>This action cannot be undone.</p>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          type="confirmation"
          title="Save Changes"
          icon="💾"
          actions={[
            { label: 'Discard', onClick: () => setConfirmationOpen(false), variant: 'text' },
            {
              label: 'Save',
              onClick: () => {
                alert('Changes saved!');
                setConfirmationOpen(false);
              },
              variant: 'filled',
            },
          ]}
        >
          <p>You have unsaved changes.</p>
          <p>Do you want to save them before closing?</p>
        </Dialog>

        {/* Form Dialog */}
        <Dialog
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title="User Information"
          size="medium"
          actions={[
            { label: 'Cancel', onClick: () => setFormOpen(false), variant: 'text' },
            {
              label: 'Submit',
              onClick: () => {
                alert(`Form submitted: ${formData.name}, ${formData.email}`);
                setFormOpen(false);
              },
              variant: 'filled',
            },
          ]}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: (e.target as HTMLInputElement).value })}
              placeholder="Enter your name"
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: (e.target as HTMLInputElement).value })}
              placeholder="Enter your email"
            />
          </div>
        </Dialog>

        {/* Draggable Dialog */}
        <Dialog
          open={draggableOpen}
          onClose={() => setDraggableOpen(false)}
          title="Draggable Dialog"
          draggable
          initialPosition={{ x: 100, y: 100 }}
          actions={[
            { label: 'Close', onClick: () => setDraggableOpen(false), variant: 'filled' },
          ]}
        >
          <p>🖱️ This dialog can be dragged around!</p>
          <p>Click and drag the header to move it.</p>
        </Dialog>

        {/* Resizable Dialog */}
        <Dialog
          open={resizableOpen}
          onClose={() => setResizableOpen(false)}
          title="Resizable Dialog"
          resizable
          size="large"
          actions={[
            { label: 'Close', onClick: () => setResizableOpen(false), variant: 'filled' },
          ]}
        >
          <p>📐 This dialog can be resized!</p>
          <p>Look for the resize handle in the bottom-right corner.</p>
          <div style={{ height: '200px', background: '#f5f5f5', padding: '1rem', margin: '1rem 0' }}>
            <p>Content area that can benefit from resizing...</p>
          </div>
        </Dialog>

        {/* Fullscreen Dialog */}
        <Dialog
          open={fullscreenOpen}
          onClose={() => setFullscreenOpen(false)}
          type="fullscreen"
          title="Fullscreen Dialog"
          actions={[
            { label: 'Close', onClick: () => setFullscreenOpen(false), variant: 'text' },
            { label: 'Save', onClick: () => alert('Saved!'), variant: 'filled' },
          ]}
        >
          <div style={{ padding: '2rem' }}>
            <h3>Welcome to Fullscreen Mode</h3>
            <p>This dialog takes up the entire screen, perfect for complex forms or detailed content.</p>
            <div style={{ height: '300px', background: '#f0f0f0', padding: '2rem', margin: '2rem 0' }}>
              <p>Large content area...</p>
            </div>
          </div>
        </Dialog>

        {/* Small Dialog */}
        <Dialog
          open={sizedOpen}
          onClose={() => setSizedOpen(false)}
          title="Small Dialog"
          size="small"
          actions={[
            { label: 'OK', onClick: () => setSizedOpen(false), variant: 'filled' },
          ]}
        >
          <p>This is a compact dialog for simple messages.</p>
        </Dialog>

        {/* Nested Dialogs */}
        <Dialog
          open={nestedOpen}
          onClose={() => setNestedOpen(false)}
          title="Parent Dialog"
          actions={[
            { label: 'Close', onClick: () => setNestedOpen(false), variant: 'text' },
            { label: 'Open Child', onClick: () => setNestedChildOpen(true), variant: 'filled' },
          ]}
        >
          <p>This is the parent dialog.</p>
          <p>Click "Open Child" to see nested dialog behavior.</p>
        </Dialog>

        <Dialog
          open={nestedChildOpen}
          onClose={() => setNestedChildOpen(false)}
          title="Child Dialog"
          size="small"
          actions={[
            { label: 'Close', onClick: () => setNestedChildOpen(false), variant: 'filled' },
          ]}
        >
          <p>This is a child dialog on top of the parent.</p>
        </Dialog>
      </div>
    </Card>
  );
}
