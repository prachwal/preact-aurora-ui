import type { ComponentChildren } from 'preact';

import styles from './MD3ColorDemo.module.scss';

interface ColorSwatchProps {
  label: string;
  token: string;
  textToken?: string;
  children?: ComponentChildren;
}

const ColorSwatch = ({ label, token, textToken, children }: ColorSwatchProps) => {
  return (
    <div
      className={styles.swatch}
      style={{
        '--swatch-bg': `var(${token})`,
        '--swatch-text': textToken ? `var(${textToken})` : 'var(--md-sys-color-on-surface)',
      }}
    >
      <div className={styles.swatchColor}></div>
      <div className={styles.swatchInfo}>
        <div className={styles.swatchLabel}>{label}</div>
        <div className={styles.swatchToken}>{token}</div>
        {children}
      </div>
    </div>
  );
};

interface MD3ColorDemoProps {
  className?: string;
}

export const MD3ColorDemo = ({ className }: MD3ColorDemoProps) => {
  return (
    <div className={`${styles.demo} ${className || ''}`}>
      <h2 className={styles.title}>Material Design 3 Color System</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Primary Colors</h3>
        <div className={styles.colorGrid}>
          <ColorSwatch
            label="Primary"
            token="--md-sys-color-primary"
            textToken="--md-sys-color-on-primary"
          />
          <ColorSwatch
            label="On Primary"
            token="--md-sys-color-on-primary"
            textToken="--md-sys-color-primary"
          />
          <ColorSwatch
            label="Primary Container"
            token="--md-sys-color-primary-container"
            textToken="--md-sys-color-on-primary-container"
          />
          <ColorSwatch
            label="On Primary Container"
            token="--md-sys-color-on-primary-container"
            textToken="--md-sys-color-primary-container"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Secondary Colors</h3>
        <div className={styles.colorGrid}>
          <ColorSwatch
            label="Secondary"
            token="--md-sys-color-secondary"
            textToken="--md-sys-color-on-secondary"
          />
          <ColorSwatch
            label="On Secondary"
            token="--md-sys-color-on-secondary"
            textToken="--md-sys-color-secondary"
          />
          <ColorSwatch
            label="Secondary Container"
            token="--md-sys-color-secondary-container"
            textToken="--md-sys-color-on-secondary-container"
          />
          <ColorSwatch
            label="On Secondary Container"
            token="--md-sys-color-on-secondary-container"
            textToken="--md-sys-color-secondary-container"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Tertiary Colors</h3>
        <div className={styles.colorGrid}>
          <ColorSwatch
            label="Tertiary"
            token="--md-sys-color-tertiary"
            textToken="--md-sys-color-on-tertiary"
          />
          <ColorSwatch
            label="On Tertiary"
            token="--md-sys-color-on-tertiary"
            textToken="--md-sys-color-tertiary"
          />
          <ColorSwatch
            label="Tertiary Container"
            token="--md-sys-color-tertiary-container"
            textToken="--md-sys-color-on-tertiary-container"
          />
          <ColorSwatch
            label="On Tertiary Container"
            token="--md-sys-color-on-tertiary-container"
            textToken="--md-sys-color-tertiary-container"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Error Colors</h3>
        <div className={styles.colorGrid}>
          <ColorSwatch
            label="Error"
            token="--md-sys-color-error"
            textToken="--md-sys-color-on-error"
          />
          <ColorSwatch
            label="On Error"
            token="--md-sys-color-on-error"
            textToken="--md-sys-color-error"
          />
          <ColorSwatch
            label="Error Container"
            token="--md-sys-color-error-container"
            textToken="--md-sys-color-on-error-container"
          />
          <ColorSwatch
            label="On Error Container"
            token="--md-sys-color-on-error-container"
            textToken="--md-sys-color-error-container"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Surface Colors</h3>
        <div className={styles.colorGrid}>
          <ColorSwatch
            label="Surface"
            token="--md-sys-color-surface"
            textToken="--md-sys-color-on-surface"
          />
          <ColorSwatch
            label="Surface Variant"
            token="--md-sys-color-surface-variant"
            textToken="--md-sys-color-on-surface-variant"
          />
          <ColorSwatch
            label="Surface Container Low"
            token="--md-sys-color-surface-container-low"
            textToken="--md-sys-color-on-surface"
          />
          <ColorSwatch
            label="Surface Container"
            token="--md-sys-color-surface-container"
            textToken="--md-sys-color-on-surface"
          />
          <ColorSwatch
            label="Surface Container High"
            token="--md-sys-color-surface-container-high"
            textToken="--md-sys-color-on-surface"
          />
          <ColorSwatch
            label="Surface Container Highest"
            token="--md-sys-color-surface-container-highest"
            textToken="--md-sys-color-on-surface"
          />
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Elevation Examples</h3>
        <div className={styles.elevationGrid}>
          <div className={`${styles.elevationBox} md3-elevation-0`}>
            <span>Level 0</span>
          </div>
          <div className={`${styles.elevationBox} md3-elevation-1`}>
            <span>Level 1</span>
          </div>
          <div className={`${styles.elevationBox} md3-elevation-2`}>
            <span>Level 2</span>
          </div>
          <div className={`${styles.elevationBox} md3-elevation-3`}>
            <span>Level 3</span>
          </div>
          <div className={`${styles.elevationBox} md3-elevation-4`}>
            <span>Level 4</span>
          </div>
          <div className={`${styles.elevationBox} md3-elevation-5`}>
            <span>Level 5</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Utility Classes Demo</h3>
        <div className={styles.utilityGrid}>
          <div
            className="md3-primary-container md3-elevation-1"
            style={{ padding: '16px', borderRadius: '8px' }}
          >
            <span className="md3-on-primary-container">Primary Container</span>
          </div>
          <div
            className="md3-secondary-container md3-elevation-2"
            style={{ padding: '16px', borderRadius: '8px' }}
          >
            <span className="md3-on-secondary-container">Secondary Container</span>
          </div>
          <div
            className="md3-tertiary-container md3-elevation-3"
            style={{ padding: '16px', borderRadius: '8px' }}
          >
            <span className="md3-on-tertiary-container">Tertiary Container</span>
          </div>
          <div
            className="md3-error-container md3-elevation-2"
            style={{ padding: '16px', borderRadius: '8px' }}
          >
            <span className="md3-on-error-container">Error Container</span>
          </div>
        </div>
      </section>
    </div>
  );
};
