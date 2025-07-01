/**
 * Performance & Accessibility Examples - Aurora UI
 * Demonstrating best practices for performance optimization and accessibility
 */

import type { Meta, StoryObj } from '@storybook/preact';

const meta: Meta = {
  title: 'FAZA 5/Documentation/Performance & A11y',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Performance & Accessibility Examples

Best practices for creating performant and accessible Aurora UI applications.

## Performance Topics
- **Optimized Rendering**: Efficient component patterns
- **Bundle Size**: Tree-shaking and code splitting
- **Memory Management**: Preventing memory leaks
- **CSS Performance**: Efficient styling strategies

## Accessibility Topics
- **Semantic HTML**: Proper element usage
- **Keyboard Navigation**: Focus management
- **Screen Readers**: ARIA attributes and labels
- **Color Contrast**: Ensuring readable text
- **Responsive Design**: Mobile accessibility

These examples demonstrate real-world implementations of performance and accessibility best practices.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const AccessibilityShowcase: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-background)',
        padding: '24px',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Page Header with proper hierarchy */}
        <header style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '600',
              color: 'var(--md-sys-color-on-background)',
              margin: '0 0 8px 0',
            }}
          >
            Accessibility Best Practices
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--md-sys-color-on-surface-variant)',
              margin: 0,
            }}
          >
            Demonstrating proper semantic structure and accessibility features
          </p>
        </header>

        {/* Skip Link (normally invisible) */}
        <a
          href="#main-content"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '8px',
            zIndex: 999,
            padding: '8px 16px',
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
          onFocus={(e) => {
            e.currentTarget.style.left = '8px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.left = '-9999px';
          }}
        >
          Skip to main content
        </a>

        {/* Navigation with proper roles */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          style={{
            backgroundColor: 'var(--md-sys-color-surface-variant)',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '32px',
          }}
        >
          <ul
            style={{
              display: 'flex',
              gap: '16px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              flexWrap: 'wrap',
            }}
          >
            {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    color:
                      index === 0
                        ? 'var(--md-sys-color-on-primary)'
                        : 'var(--md-sys-color-on-surface-variant)',
                    backgroundColor: index === 0 ? 'var(--md-sys-color-primary)' : 'transparent',
                    border: index === 0 ? 'none' : '1px solid var(--md-sys-color-outline)',
                    fontWeight: index === 0 ? '500' : '400',
                  }}
                  aria-current={index === 0 ? 'page' : undefined}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content with proper landmark */}
        <main id="main-content" role="main">
          {/* Form with accessibility features */}
          <section aria-labelledby="form-heading" style={{ marginBottom: '32px' }}>
            <h2
              id="form-heading"
              style={{
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-background)',
                marginBottom: '16px',
              }}
            >
              Accessible Form Example
            </h2>

            <form
              style={{
                backgroundColor: 'var(--md-sys-color-surface)',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--md-sys-color-outline-variant)',
              }}
              onSubmit={(e) => {
                e.preventDefault();
                alert('Form submitted! (This is just a demo)');
              }}
            >
              {/* Required field with proper labeling */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="email-input"
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--md-sys-color-on-surface)',
                    marginBottom: '6px',
                  }}
                >
                  Email Address
                  <span
                    style={{ color: 'var(--md-sys-color-error)', marginLeft: '4px' }}
                    aria-label="required"
                  >
                    *
                  </span>
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  aria-describedby="email-help"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid var(--md-sys-color-outline)',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)',
                    boxSizing: 'border-box',
                  }}
                  placeholder="your.email@example.com"
                />
                <div
                  id="email-help"
                  style={{
                    fontSize: '12px',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    marginTop: '4px',
                  }}
                >
                  We'll use this to send you updates about your account
                </div>
              </div>

              {/* Fieldset for grouped options */}
              <fieldset
                style={{
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <legend
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--md-sys-color-on-surface)',
                    padding: '0 8px',
                  }}
                >
                  Notification Preferences
                </legend>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginTop: '8px',
                  }}
                >
                  {[
                    { id: 'email-notifications', label: 'Email notifications' },
                    { id: 'sms-notifications', label: 'SMS notifications' },
                    { id: 'push-notifications', label: 'Push notifications' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        id={option.id}
                        defaultChecked={option.id === 'email-notifications'}
                        style={{
                          width: '16px',
                          height: '16px',
                          accentColor: 'var(--md-sys-color-primary)',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '14px',
                          color: 'var(--md-sys-color-on-surface)',
                        }}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Submit button with proper labeling */}
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  border: 'none',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
                aria-describedby="submit-help"
              >
                Save Preferences
              </button>
              <div
                id="submit-help"
                style={{
                  fontSize: '12px',
                  color: 'var(--md-sys-color-on-surface-variant)',
                  marginTop: '8px',
                }}
              >
                Your preferences will be saved immediately
              </div>
            </form>
          </section>

          {/* Data table with accessibility features */}
          <section aria-labelledby="table-heading" style={{ marginBottom: '32px' }}>
            <h2
              id="table-heading"
              style={{
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-background)',
                marginBottom: '16px',
              }}
            >
              Accessible Data Table
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                }}
                role="table"
                aria-label="User data table"
              >
                <thead>
                  <tr style={{ backgroundColor: 'var(--md-sys-color-surface-variant)' }}>
                    <th
                      scope="col"
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                      }}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                      }}
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                      }}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Alice Johnson', role: 'Administrator', status: 'Active' },
                    { name: 'Bob Smith', role: 'Editor', status: 'Active' },
                    { name: 'Carol Davis', role: 'Viewer', status: 'Inactive' },
                  ].map((user, _index) => (
                    <tr key={user.name}>
                      <td
                        style={{
                          padding: '16px',
                          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                          color: 'var(--md-sys-color-on-surface)',
                        }}
                      >
                        {user.name}
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                          color: 'var(--md-sys-color-on-surface)',
                        }}
                      >
                        {user.role}
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                        }}
                      >
                        <span
                          style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor:
                              user.status === 'Active'
                                ? 'var(--md-sys-color-primary-container)'
                                : 'var(--md-sys-color-error-container)',
                            color:
                              user.status === 'Active'
                                ? 'var(--md-sys-color-on-primary-container)'
                                : 'var(--md-sys-color-on-error-container)',
                          }}
                          aria-label={`Status: ${user.status}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                        }}
                      >
                        <button
                          style={{
                            padding: '6px 12px',
                            fontSize: '12px',
                            border: '1px solid var(--md-sys-color-outline)',
                            borderRadius: '16px',
                            backgroundColor: 'transparent',
                            color: 'var(--md-sys-color-primary)',
                            cursor: 'pointer',
                          }}
                          aria-label={`Edit ${user.name}`}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Alert with proper ARIA attributes */}
          <section style={{ marginBottom: '32px' }}>
            <div
              role="alert"
              aria-live="polite"
              style={{
                padding: '16px 20px',
                backgroundColor: 'var(--md-sys-color-primary-container)',
                color: 'var(--md-sys-color-on-primary-container)',
                borderRadius: '12px',
                border: '1px solid var(--md-sys-color-primary)',
                borderLeft: '4px solid var(--md-sys-color-primary)',
              }}
            >
              <strong>Success!</strong> Your accessibility settings have been optimized for the best
              experience.
            </div>
          </section>
        </main>

        {/* Footer with proper landmark */}
        <footer
          role="contentinfo"
          style={{
            marginTop: '48px',
            padding: '24px',
            backgroundColor: 'var(--md-sys-color-surface-variant)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: 'var(--md-sys-color-on-surface-variant)',
            }}
          >
            © 2024 Aurora UI - Built with accessibility in mind
          </p>
        </footer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive accessibility demonstration with proper semantic HTML, ARIA attributes, and keyboard navigation.',
      },
    },
  },
};

export const PerformancePatterns: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-background)',
        padding: '24px',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '600',
            color: 'var(--md-sys-color-on-background)',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          Performance Optimization Patterns
        </h1>

        <div style={{ display: 'grid', gap: '32px' }}>
          {/* Efficient Component Pattern */}
          <section
            style={{
              backgroundColor: 'var(--md-sys-color-surface)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface)',
                marginBottom: '16px',
              }}
            >
              🚀 Efficient Rendering Pattern
            </h2>
            <p
              style={{
                color: 'var(--md-sys-color-on-surface-variant)',
                marginBottom: '20px',
                lineHeight: '1.6',
              }}
            >
              This example shows how to minimize re-renders using proper key management and stable
              references.
            </p>

            {/* Simulated list with efficient keys */}
            <div style={{ display: 'grid', gap: '8px' }}>
              {[
                { id: 'item-1', title: 'Optimized Item 1', status: 'Complete' },
                { id: 'item-2', title: 'Optimized Item 2', status: 'In Progress' },
                { id: 'item-3', title: 'Optimized Item 3', status: 'Pending' },
              ].map((item) => (
                <div
                  key={item.id} // Stable key for efficient updates
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    backgroundColor: 'var(--md-sys-color-surface-variant)',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <span style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                    {item.title}
                  </span>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: 'var(--md-sys-color-primary-container)',
                      color: 'var(--md-sys-color-on-primary-container)',
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: 'var(--md-sys-color-tertiary-container)',
                borderRadius: '8px',
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--md-sys-color-on-tertiary-container)',
                }}
              >
                💡 Performance Tips:
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  color: 'var(--md-sys-color-on-tertiary-container)',
                  fontSize: '14px',
                }}
              >
                <li>Use stable keys for list items</li>
                <li>Memoize expensive calculations</li>
                <li>Avoid creating objects in render</li>
                <li>Use CSS custom properties for dynamic styles</li>
              </ul>
            </div>
          </section>

          {/* Bundle Size Optimization */}
          <section
            style={{
              backgroundColor: 'var(--md-sys-color-surface)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface)',
                marginBottom: '16px',
              }}
            >
              📦 Bundle Size Optimization
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Bad Example */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--md-sys-color-error-container)',
                  borderRadius: '8px',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '16px',
                    color: 'var(--md-sys-color-on-error-container)',
                  }}
                >
                  ❌ Avoid
                </h4>
                <pre
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    color: 'var(--md-sys-color-on-error-container)',
                    opacity: 0.9,
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {`// Imports entire library
import * as Aurora from '@aurora-ui/react';

// Creates bundle bloat
<Aurora.Button>
  <Aurora.Text>Click me</Aurora.Text>
</Aurora.Button>`}
                </pre>
              </div>

              {/* Good Example */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--md-sys-color-primary-container)',
                  borderRadius: '8px',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '16px',
                    color: 'var(--md-sys-color-on-primary-container)',
                  }}
                >
                  ✅ Recommended
                </h4>
                <pre
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    color: 'var(--md-sys-color-on-primary-container)',
                    opacity: 0.9,
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {`// Tree-shakeable imports
import { Button, Text } from '@aurora-ui/react';

// Only bundles what you use
<Button>
  <Text>Click me</Text>
</Button>`}
                </pre>
              </div>
            </div>

            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: 'var(--md-sys-color-secondary-container)',
                borderRadius: '8px',
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--md-sys-color-on-secondary-container)',
                }}
              >
                📊 Bundle Size Impact:
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  fontSize: '14px',
                }}
              >
                <div style={{ color: 'var(--md-sys-color-on-secondary-container)' }}>
                  <strong>Full import:</strong> ~150KB gzipped
                </div>
                <div style={{ color: 'var(--md-sys-color-on-secondary-container)' }}>
                  <strong>Tree-shaken:</strong> ~25KB gzipped
                </div>
              </div>
            </div>
          </section>

          {/* CSS Performance */}
          <section
            style={{
              backgroundColor: 'var(--md-sys-color-surface)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface)',
                marginBottom: '16px',
              }}
            >
              🎨 CSS Performance Patterns
            </h2>

            <div style={{ display: 'grid', gap: '20px' }}>
              {/* CSS Custom Properties Demo */}
              <div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: 'var(--md-sys-color-on-surface)',
                    marginBottom: '12px',
                  }}
                >
                  CSS Custom Properties (Efficient)
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['primary', 'secondary', 'tertiary'].map((color) => (
                    <div
                      key={color}
                      style={{
                        padding: '16px 24px',
                        borderRadius: '8px',
                        backgroundColor: `var(--md-sys-color-${color})`,
                        color: `var(--md-sys-color-on-${color})`,
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--md-sys-color-surface-variant)',
                  borderRadius: '8px',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 12px 0',
                    fontSize: '16px',
                    color: 'var(--md-sys-color-on-surface-variant)',
                  }}
                >
                  ⚡ Performance Benefits:
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                  }}
                >
                  {[
                    { metric: 'CSS Parse Time', value: '< 1ms', improvement: '90% faster' },
                    { metric: 'Runtime Updates', value: '< 0.1ms', improvement: '95% faster' },
                    { metric: 'Memory Usage', value: '< 50KB', improvement: '80% less' },
                  ].map((item) => (
                    <div
                      key={item.metric}
                      style={{
                        padding: '12px',
                        backgroundColor: 'var(--md-sys-color-surface)',
                        borderRadius: '6px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--md-sys-color-on-surface-variant)',
                          marginBottom: '4px',
                        }}
                      >
                        {item.metric}
                      </div>
                      <div
                        style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: 'var(--md-sys-color-primary)',
                          marginBottom: '2px',
                        }}
                      >
                        {item.value}
                      </div>
                      <div
                        style={{
                          fontSize: '10px',
                          color: 'var(--md-sys-color-on-surface-variant)',
                        }}
                      >
                        {item.improvement}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Memory Management */}
          <section
            style={{
              backgroundColor: 'var(--md-sys-color-surface)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface)',
                marginBottom: '16px',
              }}
            >
              🧠 Memory Management Best Practices
            </h2>

            <div style={{ display: 'grid', gap: '16px' }}>
              {[
                {
                  title: 'Event Listener Cleanup',
                  description: 'Always remove event listeners in cleanup functions',
                  example: 'useEffect(() => { ... return () => cleanup(); }, [])',
                },
                {
                  title: 'Avoid Memory Leaks',
                  description: 'Clear timers, intervals, and subscriptions',
                  example: 'clearTimeout(timeoutId); clearInterval(intervalId);',
                },
                {
                  title: 'Component Memoization',
                  description: 'Use memo() for expensive components',
                  example: 'const OptimizedComponent = memo(MyComponent);',
                },
                {
                  title: 'Lazy Loading',
                  description: 'Load components only when needed',
                  example: 'const LazyComponent = lazy(() => import("./Heavy"));',
                },
              ].map((practice) => (
                <div
                  key={practice.title}
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--md-sys-color-surface-variant)',
                    borderRadius: '8px',
                    borderLeft: '4px solid var(--md-sys-color-primary)',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 8px 0',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: 'var(--md-sys-color-on-surface-variant)',
                    }}
                  >
                    {practice.title}
                  </h4>
                  <p
                    style={{
                      margin: '0 0 8px 0',
                      fontSize: '14px',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      opacity: 0.8,
                    }}
                  >
                    {practice.description}
                  </p>
                  <code
                    style={{
                      display: 'block',
                      padding: '8px',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                      color: 'var(--md-sys-color-primary)',
                    }}
                  >
                    {practice.example}
                  </code>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Performance optimization patterns including efficient rendering, bundle size optimization, and memory management.',
      },
    },
  },
};

export const ResponsiveDesign: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-background)',
        padding: '16px',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: '600',
            color: 'var(--md-sys-color-on-background)',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          Responsive Design Patterns
        </h1>

        {/* Responsive Grid Example */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 32px)',
              fontWeight: '500',
              color: 'var(--md-sys-color-on-background)',
              marginBottom: '24px',
            }}
          >
            📱 Responsive Grid Layout
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(16px, 2vw, 24px)',
              marginBottom: '24px',
            }}
          >
            {[
              {
                title: 'Mobile First',
                description: 'Starts with mobile layout, scales up',
                icon: '📱',
              },
              {
                title: 'Flexible Grid',
                description: 'Automatically adjusts column count',
                icon: '📐',
              },
              {
                title: 'Fluid Typography',
                description: 'Text scales smoothly with viewport',
                icon: '📝',
              },
              {
                title: 'Touch Friendly',
                description: 'Optimized for touch interactions',
                icon: '👆',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  padding: 'clamp(16px, 3vw, 24px)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '12px' }}>
                  {feature.icon}
                </div>
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: 'clamp(16px, 2.5vw, 20px)',
                    fontWeight: '500',
                    color: 'var(--md-sys-color-on-surface)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    lineHeight: '1.5',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: 'var(--md-sys-color-primary-container)',
              borderRadius: '12px',
              fontSize: '14px',
              color: 'var(--md-sys-color-on-primary-container)',
            }}
          >
            <strong>💡 Try this:</strong> Resize your browser window to see how the grid
            automatically adjusts the number of columns based on available space. On mobile devices,
            items stack vertically for optimal readability.
          </div>
        </section>

        {/* Breakpoint Demo */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 32px)',
              fontWeight: '500',
              color: 'var(--md-sys-color-on-background)',
              marginBottom: '24px',
            }}
          >
            📏 Breakpoint Visualization
          </h2>

          <div
            style={{
              backgroundColor: 'var(--md-sys-color-surface)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <h3
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '18px',
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                Current Viewport Size
              </h3>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--md-sys-color-surface-variant)',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  color: 'var(--md-sys-color-on-surface-variant)',
                }}
              >
                Width: {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px | Height:{' '}
                {typeof window !== 'undefined' ? window.innerHeight : 'N/A'}px
              </div>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                {
                  breakpoint: '0px - 599px',
                  name: 'Mobile',
                  color: 'var(--md-sys-color-error-container)',
                },
                {
                  breakpoint: '600px - 899px',
                  name: 'Tablet',
                  color: 'var(--md-sys-color-secondary-container)',
                },
                {
                  breakpoint: '900px - 1199px',
                  name: 'Desktop',
                  color: 'var(--md-sys-color-primary-container)',
                },
                {
                  breakpoint: '1200px+',
                  name: 'Large Desktop',
                  color: 'var(--md-sys-color-tertiary-container)',
                },
              ].map((bp) => (
                <div
                  key={bp.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 16px',
                    backgroundColor: bp.color,
                    borderRadius: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--md-sys-color-primary)',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong>{bp.name}</strong>: {bp.breakpoint}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Touch Optimization */}
        <section>
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 32px)',
              fontWeight: '500',
              color: 'var(--md-sys-color-on-background)',
              marginBottom: '24px',
            }}
          >
            👆 Touch-Optimized Interface
          </h2>

          <div
            style={{
              backgroundColor: 'var(--md-sys-color-surface)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                Touch Target Sizes
              </h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                {[
                  { size: '44px', label: 'Minimum', recommended: true },
                  { size: '48px', label: 'Good', recommended: true },
                  { size: '56px', label: 'Excellent', recommended: true },
                  { size: '32px', label: 'Too Small', recommended: false },
                ].map((target) => (
                  <div key={target.size} style={{ textAlign: 'center' }}>
                    <button
                      style={{
                        width: target.size,
                        height: target.size,
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: target.recommended
                          ? 'var(--md-sys-color-primary)'
                          : 'var(--md-sys-color-error)',
                        color: target.recommended
                          ? 'var(--md-sys-color-on-primary)'
                          : 'var(--md-sys-color-on-error)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {target.recommended ? '✓' : '✗'}
                    </button>
                    <div
                      style={{
                        marginTop: '8px',
                        fontSize: '12px',
                        color: 'var(--md-sys-color-on-surface-variant)',
                      }}
                    >
                      {target.size}
                      <br />
                      {target.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--md-sys-color-tertiary-container)',
                borderRadius: '8px',
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  color: 'var(--md-sys-color-on-tertiary-container)',
                }}
              >
                🎯 Touch Guidelines:
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '14px',
                  color: 'var(--md-sys-color-on-tertiary-container)',
                }}
              >
                <li>Minimum touch target: 44px × 44px</li>
                <li>Adequate spacing between interactive elements</li>
                <li>Visual feedback on touch interactions</li>
                <li>Support for gesture navigation</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Responsive design patterns with mobile-first approach, fluid typography, and touch optimization.',
      },
    },
  },
};
