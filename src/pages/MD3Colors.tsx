import { PageHeader } from '../components';

export const MD3ColorsPage = () => {
  return (
    <>
      <PageHeader title="MD3 Color System" subtitle="Material Design 3 Color Tokens Demo" />

      <div style={{ padding: '24px', maxWidth: '1200px' }}>
        <h2 style={{ color: 'var(--md-sys-color-primary)', marginBottom: '24px' }}>
          Primary Colors
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              background: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Primary
          </div>
          <div
            style={{
              background: 'var(--md-sys-color-primary-container)',
              color: 'var(--md-sys-color-on-primary-container)',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Primary Container
          </div>
          <div
            style={{
              background: 'var(--md-sys-color-secondary)',
              color: 'var(--md-sys-color-on-secondary)',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Secondary
          </div>
          <div
            style={{
              background: 'var(--md-sys-color-secondary-container)',
              color: 'var(--md-sys-color-on-secondary-container)',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Secondary Container
          </div>
        </div>

        <h3 style={{ color: 'var(--md-sys-color-tertiary)', marginBottom: '16px' }}>
          Surface Colors
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              background: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--md-sys-color-outline)',
              textAlign: 'center',
            }}
          >
            Surface
          </div>
          <div
            style={{
              background: 'var(--md-sys-color-surface-container)',
              color: 'var(--md-sys-color-on-surface)',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Surface Container
          </div>
          <div
            style={{
              background: 'var(--md-sys-color-surface-container-high)',
              color: 'var(--md-sys-color-on-surface)',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Surface Container High
          </div>
          <div
            style={{
              background: 'var(--md-sys-color-surface-container-highest)',
              color: 'var(--md-sys-color-on-surface)',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            Surface Container Highest
          </div>
        </div>

        <h3 style={{ color: 'var(--md-sys-color-error)', marginBottom: '16px' }}>Elevation Demo</h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              style={{
                background: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                padding: '24px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: `var(--md-sys-elevation-level${level})`,
                transition: 'box-shadow 0.2s ease',
              }}
            >
              Level {level}
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'var(--md-sys-color-tertiary-container)',
            color: 'var(--md-sys-color-on-tertiary-container)',
            padding: '16px',
            borderRadius: '8px',
            marginTop: '24px',
          }}
        >
          <strong>✅ MD3 Color System Successfully Implemented!</strong>
          <br />
          All Material Design 3 color tokens are now available including complete dark theme
          support, backwards compatibility with legacy colors, and utility classes for rapid
          development.
        </div>
      </div>
    </>
  );
};
