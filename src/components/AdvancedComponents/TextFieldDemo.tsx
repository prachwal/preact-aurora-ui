import { useState } from 'preact/hooks';

import { Card } from '../Card';
import { TextField } from '../TextField';

export const TextFieldDemo = () => {
  const [textValue, setTextValue] = useState('');

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  };

  return (
    <Card title="TextField Component" subtitle="MD3 Text Input with various configurations">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Basic TextFields */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Basic Variants</h4>
          <div style={gridStyle}>
            <TextField label="Outlined (default)" placeholder="Enter text..." variant="outlined" />
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
  );
};
