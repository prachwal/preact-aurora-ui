import { useState } from 'preact/hooks';

import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import { Content } from '../components/Content';
import { TextField } from '../components/TextField';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { SnackbarProvider, useSnackbar } from '../components/Snackbar';

// Demo component that uses the snackbar hook
const SnackbarDemo = () => {
  const { showSnackbar } = useSnackbar();
  const [textValue, setTextValue] = useState('');
  const [basicChecked, setBasicChecked] = useState(false);
  const [indeterminateChecked, setIndeterminateChecked] = useState(false);
  const [errorChecked, setErrorChecked] = useState(true);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  };

  const buttonStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  };

  const showInfoSnackbar = () => {
    showSnackbar({
      message: 'This is an info message with some helpful information.',
      severity: 'info',
      position: 'bottom',
      duration: 4000,
    });
  };

  const showSuccessSnackbar = () => {
    showSnackbar({
      message: 'Operation completed successfully!',
      severity: 'success',
      position: 'top',
      duration: 3000,
    });
  };

  const showWarningSnackbar = () => {
    showSnackbar({
      message: 'Please check your input and try again.',
      severity: 'warning',
      position: 'bottom-left',
      duration: 5000,
    });
  };

  const showErrorSnackbar = () => {
    showSnackbar({
      message: 'An error occurred while processing your request.',
      severity: 'error',
      position: 'top-left',
      persistent: true,
      showCloseButton: true,
    });
  };

  const showActionSnackbar = () => {
    showSnackbar({
      message: 'Your changes have been saved as draft.',
      severity: 'info',
      position: 'bottom',
      duration: 6000,
      action: {
        label: 'Publish',
        onClick: () => {
          showSnackbar({
            message: 'Published successfully!',
            severity: 'success',
            position: 'bottom',
          });
        },
      },
    });
  };

  const showMultipleSnackbars = () => {
    showSnackbar({ message: 'First notification', severity: 'info' });
    setTimeout(() => showSnackbar({ message: 'Second notification', severity: 'success' }), 500);
    setTimeout(() => showSnackbar({ message: 'Third notification', severity: 'warning' }), 1000);
  };

  const showPersistentSnackbar = () => {
    showSnackbar({
      message: 'This is a persistent notification that stays until manually closed.',
      severity: 'info',
      persistent: true,
      showCloseButton: true,
      position: 'top',
    });
  };

  return (
    <Content>
      <PageHeader
        title="Advanced Components"
        subtitle="Testing TextField, Checkbox, and Snackbar components with Material Design 3"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
        {/* TextField Demo Section */}
        <Card title="TextField Component" subtitle="MD3 Text Input with various configurations">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Basic TextFields */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Basic Variants</h4>
              <div style={gridStyle}>
                <TextField
                  label="Outlined (default)"
                  placeholder="Enter text..."
                  variant="outlined"
                />
                <TextField label="Filled" placeholder="Enter text..." variant="filled" />
                <TextField label="Standard" placeholder="Enter text..." variant="standard" />
              </div>
            </div>

            {/* States */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>States & Features</h4>
              <div style={gridStyle}>
                <TextField
                  label="With Value"
                  value={textValue}
                  onChange={(e) => setTextValue(e.currentTarget.value)}
                  helperText="This field has a controlled value"
                />
                <TextField
                  label="With Error"
                  value="invalid@"
                  error={true}
                  helperText="Please enter a valid email address"
                />
                <TextField
                  label="Disabled"
                  value="Cannot edit this"
                  disabled={true}
                  helperText="This field is disabled"
                />
              </div>
            </div>

            {/* Input Types */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Input Types</h4>
              <div style={gridStyle}>
                <TextField label="Email" type="email" placeholder="user@example.com" />
                <TextField label="Password" type="password" placeholder="Enter password..." />
                <TextField label="Number" type="number" placeholder="Enter number..." />
                <TextField label="Search" type="search" placeholder="Search..." clearable={true} />
              </div>
            </div>

            {/* Advanced Features */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Advanced Features</h4>
              <div style={gridStyle}>
                <TextField
                  label="With Character Count"
                  placeholder="Limited to 50 characters..."
                  maxLength={50}
                  showCharacterCount={true}
                />
                <TextField
                  label="Multiline"
                  placeholder="Enter multiple lines..."
                  multiline={true}
                  rows={3}
                />
                <TextField
                  label="With Icons"
                  placeholder="Search with icons..."
                  startIcon="🔍"
                  endIcon="✨"
                  clearable={true}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Checkbox Demo Section */}
        <Card title="Checkbox Component" subtitle="MD3 Selection Control with various states">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Basic States */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Basic States</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Checkbox
                  label="Controlled Checkbox"
                  checked={basicChecked}
                  onChange={(e: Event & { currentTarget: HTMLInputElement }) =>
                    setBasicChecked(e.currentTarget.checked)
                  }
                  helperText="This checkbox state is controlled by React"
                />
                <Checkbox
                  label="Uncontrolled Checkbox"
                  defaultChecked={false}
                  helperText="This checkbox manages its own state"
                />
                <Checkbox
                  label="Indeterminate State"
                  indeterminate={true}
                  checked={indeterminateChecked}
                  onChange={(e: Event & { currentTarget: HTMLInputElement }) =>
                    setIndeterminateChecked(e.currentTarget.checked)
                  }
                  helperText="Useful for parent/child relationships"
                />
                <Checkbox label="Disabled Unchecked" disabled={true} checked={false} />
                <Checkbox label="Disabled Checked" disabled={true} checked={true} />
              </div>
            </div>

            {/* Size Variants */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Size Variants</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Checkbox label="Small Checkbox" size="small" defaultChecked={true} />
                <Checkbox label="Medium Checkbox (default)" size="medium" defaultChecked={true} />
                <Checkbox label="Large Checkbox" size="large" defaultChecked={true} />
              </div>
            </div>

            {/* Color Variants */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Color Variants</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Checkbox label="Primary Color (default)" color="primary" defaultChecked={true} />
                <Checkbox label="Secondary Color" color="secondary" defaultChecked={true} />
                <Checkbox label="Error Color" color="error" defaultChecked={true} />
              </div>
            </div>

            {/* Error States */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Validation & Error States</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Checkbox
                  label="Required Checkbox"
                  required={true}
                  checked={errorChecked}
                  onChange={(e: Event & { currentTarget: HTMLInputElement }) =>
                    setErrorChecked(e.currentTarget.checked)
                  }
                  error={!errorChecked}
                  helperText={!errorChecked ? 'This field is required' : 'All good!'}
                />
                <Checkbox
                  label="Terms and Conditions"
                  required={true}
                  error={true}
                  helperText="You must accept the terms and conditions"
                />
              </div>
            </div>

            {/* Instructions */}
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-variant)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: 'var(--color-on-surface-variant)',
              }}
            >
              <strong>💡 Features Demonstrated:</strong>
              <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem' }}>
                <li>Controlled and uncontrolled checkbox states</li>
                <li>Indeterminate state for parent/child relationships</li>
                <li>Size variants (small, medium, large)</li>
                <li>Color variants (primary, secondary, error)</li>
                <li>Error states with validation helper text</li>
                <li>Disabled states (checked and unchecked)</li>
                <li>Required field indicators</li>
                <li>Full keyboard accessibility support</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Snackbar Demo Section */}
        <Card title="Snackbar Component" subtitle="MD3 Notification System with queue management">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Severity Variants */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Severity Variants</h4>
              <div style={buttonStyle}>
                <Button variant="outlined" onClick={showInfoSnackbar}>
                  Show Info
                </Button>
                <Button variant="outlined" onClick={showSuccessSnackbar}>
                  Show Success
                </Button>
                <Button variant="outlined" onClick={showWarningSnackbar}>
                  Show Warning
                </Button>
                <Button variant="outlined" onClick={showErrorSnackbar}>
                  Show Error
                </Button>
              </div>
            </div>

            {/* Advanced Features */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Advanced Features</h4>
              <div style={buttonStyle}>
                <Button variant="filled" onClick={showActionSnackbar}>
                  With Action Button
                </Button>
                <Button variant="outlined" onClick={showMultipleSnackbars}>
                  Test Queue (3x)
                </Button>
                <Button variant="outlined" onClick={showPersistentSnackbar}>
                  Persistent Mode
                </Button>
              </div>
            </div>

            {/* Position Demo */}
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Position Variants</h4>
              <div style={buttonStyle}>
                <Button
                  variant="text"
                  size="small"
                  onClick={() =>
                    showSnackbar({ message: 'Top position', position: 'top', severity: 'info' })
                  }
                >
                  Top
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() =>
                    showSnackbar({
                      message: 'Bottom position',
                      position: 'bottom',
                      severity: 'success',
                    })
                  }
                >
                  Bottom
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() =>
                    showSnackbar({
                      message: 'Bottom Left',
                      position: 'bottom-left',
                      severity: 'warning',
                    })
                  }
                >
                  Bottom Left
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() =>
                    showSnackbar({ message: 'Top Left', position: 'top-left', severity: 'error' })
                  }
                >
                  Top Left
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-surface-variant)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: 'var(--color-on-surface-variant)',
              }}
            >
              <strong>💡 Testing Tips:</strong>
              <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '1rem' }}>
                <li>Try different snackbar combinations to test the queue system</li>
                <li>Use keyboard (Escape key) to close snackbars</li>
                <li>Persistent snackbars require manual closing</li>
                <li>Resize window to test responsive behavior</li>
                <li>Check accessibility with screen readers</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Component Status */}
        <Card title="Implementation Status" subtitle="Current state of Advanced Components">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* Completed */}
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-success-container)',
                borderRadius: '8px',
              }}
            >
              <h4 style={{ color: 'var(--color-on-success-container)', margin: '0 0 0.5rem 0' }}>
                ✅ Completed (3/10)
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1rem',
                  color: 'var(--color-on-success-container)',
                }}
              >
                <li>
                  <strong>TextField</strong> - Full MD3 implementation
                </li>
                <li>
                  <strong>Snackbar</strong> - Complete notification system
                </li>
                <li>
                  <strong>Checkbox</strong> - Selection control with all states
                </li>
              </ul>
            </div>

            {/* In Progress */}
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--color-warning-container)',
                borderRadius: '8px',
              }}
            >
              <h4 style={{ color: 'var(--color-on-warning-container)', margin: '0 0 0.5rem 0' }}>
                🔄 Next Priority (7/10)
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1rem',
                  color: 'var(--color-on-warning-container)',
                }}
              >
                <li>Tooltip - Contextual help</li>
                <li>Badge - Status indicators</li>
                <li>Radio - Single selection</li>
                <li>Switch - Toggle component</li>
                <li>Tabs - Content organization</li>
                <li>FAB - Floating action button</li>
                <li>Icon Button - Compact actions</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

export function AdvancedComponents() {
  return (
    <SnackbarProvider maxSnackbars={3}>
      <SnackbarDemo />
    </SnackbarProvider>
  );
}
