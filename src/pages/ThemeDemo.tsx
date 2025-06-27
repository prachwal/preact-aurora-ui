import { Grid, Col } from '../components/Grid';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { ThemeToggle, useTheme } from '../components';
import { Button } from '../components/Button';

export function ThemeDemo() {
  const { theme, isDark } = useTheme();

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Theme System Demo"
        subtitle="Explore Aurora UI's comprehensive theme system with light/dark modes and custom properties."
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <ThemeToggle variant="button" showLabel />
          </div>
        }
        style={{ marginBottom: 'var(--space-lg)' }}
      />

      {/* Theme Demo Grid */}
      <Grid responsive columns={12} gutter={[16, 16]}>
        {/* Current Theme Info */}
        <Col xs={12} lg={4}>
          <Card title="Current Theme" variant="elevated" elevation={2} padding="lg">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
            >
              <div>
                <strong>Mode:</strong> {theme.mode}
              </div>
              <div>
                <strong>Active:</strong> {isDark ? 'Dark' : 'Light'}
              </div>
              <div>
                <strong>System Preference:</strong>{' '}
                {window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'}
              </div>
            </div>
          </Card>
        </Col>

        {/* Color Palette */}
        <Col xs={12} lg={8}>
          <Card title="Color Palette" variant="elevated" elevation={2} padding="lg">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 'var(--space-md)',
              }}
            >
              {[
                { name: 'Primary', color: 'var(--color-primary)' },
                { name: 'Secondary', color: 'var(--color-secondary)' },
                { name: 'Success', color: 'var(--color-success)' },
                { name: 'Warning', color: 'var(--color-warning)' },
                { name: 'Error', color: 'var(--color-error)' },
                { name: 'Info', color: 'var(--color-info)' },
              ].map((item) => (
                <div
                  key={item.name}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      height: '60px',
                      backgroundColor: item.color,
                      borderRadius: '8px',
                      marginBottom: 'var(--space-xs)',
                      border: '1px solid var(--color-outline)',
                    }}
                  />
                  <div style={{ fontSize: 'var(--font-size-sm)' }}>{item.name}</div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Surface Colors */}
        <Col xs={12} lg={6}>
          <Card title="Surface Colors" variant="elevated" elevation={2} padding="lg">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
            >
              {[
                { name: 'Background', color: 'var(--color-background)' },
                { name: 'Surface', color: 'var(--color-surface)' },
                {
                  name: 'Surface Variant',
                  color: 'var(--color-surface-variant)',
                },
              ].map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: item.color,
                      borderRadius: '6px',
                      border: '2px solid var(--color-outline)',
                    }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Typography Colors */}
        <Col xs={12} lg={6}>
          <Card title="Typography Colors" variant="elevated" elevation={2} padding="lg">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
            >
              <div style={{ color: 'var(--color-on-surface)' }}>Primary text (on-surface)</div>
              <div style={{ color: 'var(--color-on-surface-variant)' }}>
                Secondary text (on-surface-variant)
              </div>
              <div
                style={{
                  color: 'var(--color-on-primary)',
                  backgroundColor: 'var(--color-primary)',
                  padding: 'var(--space-sm)',
                  borderRadius: '6px',
                }}
              >
                Text on primary background
              </div>
            </div>
          </Card>
        </Col>

        {/* Elevation Showcase */}
        <Col xs={12}>
          <Card title="Elevation & Shadows" variant="elevated" elevation={2} padding="lg">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-xl)',
                padding: 'var(--space-lg)',
              }}
            >
              {[
                { name: 'Small', shadow: 'var(--shadow-sm)' },
                { name: 'Medium', shadow: 'var(--shadow-md)' },
                { name: 'Large', shadow: 'var(--shadow-lg)' },
                { name: 'Extra Large', shadow: 'var(--shadow-xl)' },
              ].map((item) => (
                <div
                  key={item.name}
                  style={{
                    padding: 'var(--space-lg)',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: '12px',
                    boxShadow: item.shadow,
                    textAlign: 'center',
                  }}
                >
                  <h4 style={{ marginBottom: 'var(--space-sm)' }}>{item.name}</h4>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--color-on-surface-variant)',
                    }}
                  >
                    Shadow elevation
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Interactive Elements */}
        <Col xs={12}>
          <Card title="Interactive Elements" variant="elevated" elevation={2} padding="lg">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-md)',
                alignItems: 'center',
              }}
            >
              <Button variant="filled">Primary Button</Button>
              <Button variant="outlined">Outline Button</Button>
              <input
                type="text"
                placeholder="Input field"
                style={{
                  padding: 'var(--space-sm)',
                  border: '1px solid var(--color-outline)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-on-surface)',
                }}
              />
              <select
                style={{
                  padding: 'var(--space-sm)',
                  border: '1px solid var(--color-outline)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-on-surface)',
                }}
              >
                <option>Select option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </Card>
        </Col>
      </Grid>
    </>
  );
}
