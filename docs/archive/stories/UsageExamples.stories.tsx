/**
 * Component Usage Examples - Aurora UI
 * Real-world examples showing how to combine components effectively
 */

import type { Meta, StoryObj } from '@storybook/preact';

const meta: Meta = {
  title: 'FAZA 5/Documentation/Usage Examples',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Component Usage Examples

Real-world patterns and examples showing how to effectively combine Aurora UI components.

## Patterns Covered
- **Dashboard Layouts**: Complete dashboard interfaces
- **Card Compositions**: Various card patterns
- **Form Layouts**: Form design patterns
- **Navigation Patterns**: Header and sidebar combinations
- **Content Layouts**: Article and content page structures
- **Mobile-First Design**: Responsive pattern examples

Each example demonstrates best practices for:
- Semantic HTML structure
- Proper color usage
- Accessibility considerations
- Responsive design
- Performance optimization
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DashboardLayout: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--md-sys-color-background)' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: 'var(--md-sys-color-surface)',
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '500',
              color: 'var(--md-sys-color-on-surface)',
            }}
          >
            🚀 Aurora Dashboard
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant)' }}>
            Welcome, User
          </span>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--md-sys-color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--md-sys-color-on-primary)',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            U
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', height: 'calc(100vh - 73px)' }}>
        {/* Sidebar */}
        <nav
          style={{
            width: '250px',
            backgroundColor: 'var(--md-sys-color-surface-variant)',
            padding: '24px 16px',
            borderRight: '1px solid var(--md-sys-color-outline-variant)',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                margin: '0 0 16px 0',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface-variant)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Navigation
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: '📊', label: 'Dashboard', active: true },
                { icon: '👥', label: 'Users', active: false },
                { icon: '📈', label: 'Analytics', active: false },
                { icon: '⚙️', label: 'Settings', active: false },
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: item.active
                        ? 'var(--md-sys-color-primary-container)'
                        : 'transparent',
                      color: item.active
                        ? 'var(--md-sys-color-on-primary-container)'
                        : 'var(--md-sys-color-on-surface-variant)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: item.active ? '500' : '400' }}>
                      {item.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                margin: '0 0 8px 0',
                fontSize: '32px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-background)',
              }}
            >
              Dashboard Overview
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: '16px',
                color: 'var(--md-sys-color-on-surface-variant)',
              }}
            >
              Monitor your key metrics and system performance
            </p>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            {[
              { title: 'Total Users', value: '12,345', change: '+12%', color: 'primary' },
              { title: 'Revenue', value: '$45,678', change: '+8%', color: 'secondary' },
              { title: 'Orders', value: '1,234', change: '+15%', color: 'tertiary' },
              { title: 'Conversion', value: '3.24%', change: '-2%', color: 'error' },
            ].map((stat) => (
              <div
                key={stat.title}
                style={{
                  backgroundColor: 'var(--md-sys-color-surface-container)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--md-sys-color-on-surface-variant)',
                  }}
                >
                  {stat.title}
                </h3>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: 'var(--md-sys-color-on-surface)',
                    marginBottom: '8px',
                  }}
                >
                  {stat.value}
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    color: stat.change.startsWith('+')
                      ? 'var(--md-sys-color-primary)'
                      : 'var(--md-sys-color-error)',
                    fontWeight: '500',
                  }}
                >
                  {stat.change} from last month
                </span>
              </div>
            ))}
          </div>

          {/* Content Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Chart Card */}
            <div
              style={{
                backgroundColor: 'var(--md-sys-color-surface)',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--md-sys-color-outline-variant)',
              }}
            >
              <h3
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontWeight: '500',
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                Performance Overview
              </h3>
              <div
                style={{
                  height: '200px',
                  backgroundColor: 'var(--md-sys-color-surface-variant)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--md-sys-color-on-surface-variant)',
                }}
              >
                📈 Chart Placeholder
              </div>
            </div>

            {/* Activity Feed */}
            <div
              style={{
                backgroundColor: 'var(--md-sys-color-surface)',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--md-sys-color-outline-variant)',
              }}
            >
              <h3
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontWeight: '500',
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { action: 'New user registered', time: '2 min ago', icon: '👤' },
                  { action: 'Order completed', time: '5 min ago', icon: '📦' },
                  { action: 'Payment processed', time: '12 min ago', icon: '💳' },
                  { action: 'Support ticket created', time: '25 min ago', icon: '🎫' },
                ].map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--md-sys-color-surface-variant)',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{activity.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '14px',
                          color: 'var(--md-sys-color-on-surface)',
                          marginBottom: '2px',
                        }}
                      >
                        {activity.action}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--md-sys-color-on-surface-variant)',
                        }}
                      >
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete dashboard layout with header, sidebar, and main content area.',
      },
    },
  },
};

export const ArticleLayout: Story = {
  render: () => (
    <div style={{ backgroundColor: 'var(--md-sys-color-background)', minHeight: '100vh' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Article Header */}
        <header
          style={{
            backgroundColor: 'var(--md-sys-color-primary-container)',
            padding: '48px',
            borderRadius: '24px',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              margin: '0 0 16px 0',
              fontSize: '48px',
              fontWeight: '600',
              color: 'var(--md-sys-color-on-primary-container)',
              lineHeight: '1.2',
            }}
          >
            Building Better User Interfaces
          </h1>
          <p
            style={{
              margin: '0 0 24px 0',
              fontSize: '20px',
              color: 'var(--md-sys-color-on-primary-container)',
              opacity: 0.8,
            }}
          >
            A comprehensive guide to modern component design
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              fontSize: '14px',
              color: 'var(--md-sys-color-on-primary-container)',
              opacity: 0.7,
            }}
          >
            <span>📅 March 15, 2024</span>
            <span>👤 Aurora Team</span>
            <span>⏱️ 5 min read</span>
          </div>
        </header>

        {/* Article Content */}
        <div
          style={{
            fontSize: '18px',
            lineHeight: '1.7',
            color: 'var(--md-sys-color-on-background)',
          }}
        >
          <p style={{ marginBottom: '24px' }}>
            Modern user interface design requires a thoughtful approach to component architecture.
            In this article, we'll explore best practices for creating maintainable, accessible, and
            beautiful user interfaces using Aurora UI components.
          </p>

          <h2
            style={{
              fontSize: '32px',
              fontWeight: '500',
              margin: '48px 0 24px 0',
              color: 'var(--md-sys-color-on-background)',
            }}
          >
            Design System Fundamentals
          </h2>

          <p style={{ marginBottom: '24px' }}>
            A design system provides the foundation for consistent user experiences. Aurora UI
            implements Material Design 3 principles to ensure your applications feel familiar and
            intuitive to users.
          </p>

          {/* Code Example */}
          <div
            style={{
              backgroundColor: 'var(--md-sys-color-surface-variant)',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <h3
              style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface-variant)',
              }}
            >
              💡 Quick Example
            </h3>
            <pre
              style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '14px',
                color: 'var(--md-sys-color-on-surface-variant)',
                overflow: 'auto',
              }}
            >
              {`<Container surface="primary-container" padding="lg">
  <Text variant="headline">Welcome</Text>
  <Text variant="body">Get started with Aurora UI</Text>
</Container>`}
            </pre>
          </div>

          <h2
            style={{
              fontSize: '32px',
              fontWeight: '500',
              margin: '48px 0 24px 0',
              color: 'var(--md-sys-color-on-background)',
            }}
          >
            Color and Typography
          </h2>

          <p style={{ marginBottom: '24px' }}>
            Effective use of color and typography creates hierarchy and guides user attention.
            Aurora UI's color system ensures proper contrast ratios and semantic meaning.
          </p>

          {/* Color Examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            {[
              {
                name: 'Primary',
                bg: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
              },
              {
                name: 'Secondary',
                bg: 'var(--md-sys-color-secondary)',
                color: 'var(--md-sys-color-on-secondary)',
              },
              {
                name: 'Tertiary',
                bg: 'var(--md-sys-color-tertiary)',
                color: 'var(--md-sys-color-on-tertiary)',
              },
            ].map((colorExample) => (
              <div
                key={colorExample.name}
                style={{
                  backgroundColor: colorExample.bg,
                  color: colorExample.color,
                  padding: '24px',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontWeight: '500', marginBottom: '8px' }}>{colorExample.name}</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Proper contrast</div>
              </div>
            ))}
          </div>

          <p style={{ marginBottom: '24px' }}>
            By following these principles, you can create interfaces that are not only beautiful but
            also accessible and maintainable. The Aurora UI design system handles the complexity so
            you can focus on creating great user experiences.
          </p>
        </div>

        {/* Article Footer */}
        <footer
          style={{
            marginTop: '48px',
            padding: '24px',
            backgroundColor: 'var(--md-sys-color-surface-variant)',
            borderRadius: '16px',
            border: '1px solid var(--md-sys-color-outline-variant)',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: '500',
              color: 'var(--md-sys-color-on-surface-variant)',
            }}
          >
            What's Next?
          </h3>
          <p
            style={{
              margin: '0 0 16px 0',
              color: 'var(--md-sys-color-on-surface-variant)',
            }}
          >
            Continue learning about Aurora UI with our comprehensive documentation and examples.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Components', 'Best Practices', 'Migration Guide'].map((link) => (
              <span
                key={link}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--md-sys-color-primary-container)',
                  color: 'var(--md-sys-color-on-primary-container)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                {link}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Article layout with proper typography hierarchy and content structure.',
      },
    },
  },
};

export const CardLayouts: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-background)',
        padding: '40px 24px',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            fontSize: '48px',
            fontWeight: '500',
            color: 'var(--md-sys-color-on-background)',
          }}
        >
          Card Layout Patterns
        </h1>

        <div style={{ display: 'grid', gap: '32px' }}>
          {/* Information Cards */}
          <section>
            <h2
              style={{
                marginBottom: '24px',
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-background)',
              }}
            >
              Information Cards
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  title: 'User Profile',
                  content: 'Display user information with avatar and key details.',
                  icon: '👤',
                  actions: ['View', 'Edit'],
                },
                {
                  title: 'System Status',
                  content: 'Monitor system health and performance metrics.',
                  icon: '⚡',
                  actions: ['Refresh', 'Details'],
                },
                {
                  title: 'Recent Activity',
                  content: 'Track recent user actions and system events.',
                  icon: '📋',
                  actions: ['View All', 'Filter'],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: 'var(--md-sys-color-surface)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '24px', marginRight: '12px' }}>{card.icon}</span>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '500',
                        color: 'var(--md-sys-color-on-surface)',
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      margin: '0 0 20px 0',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      lineHeight: '1.5',
                    }}
                  >
                    {card.content}
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {card.actions.map((action) => (
                      <button
                        key={action}
                        style={{
                          padding: '8px 16px',
                          border: '1px solid var(--md-sys-color-outline)',
                          borderRadius: '20px',
                          backgroundColor: 'transparent',
                          color: 'var(--md-sys-color-primary)',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                        }}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Cards */}
          <section>
            <h2
              style={{
                marginBottom: '24px',
                fontSize: '24px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-background)',
              }}
            >
              Action Cards
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  title: 'Create New Project',
                  content: 'Start a new project with our guided setup.',
                  background: 'var(--md-sys-color-primary-container)',
                  color: 'var(--md-sys-color-on-primary-container)',
                  action: 'Get Started',
                },
                {
                  title: 'Import Data',
                  content: 'Import existing data from various sources.',
                  background: 'var(--md-sys-color-secondary-container)',
                  color: 'var(--md-sys-color-on-secondary-container)',
                  action: 'Import Now',
                },
                {
                  title: 'View Analytics',
                  content: 'Analyze your data with advanced reports.',
                  background: 'var(--md-sys-color-tertiary-container)',
                  color: 'var(--md-sys-color-on-tertiary-container)',
                  action: 'View Reports',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: card.background,
                    color: card.color,
                    padding: '32px',
                    borderRadius: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 12px 0',
                      fontSize: '20px',
                      fontWeight: '600',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      margin: '0 0 24px 0',
                      opacity: 0.8,
                      lineHeight: '1.5',
                    }}
                  >
                    {card.content}
                  </p>
                  <button
                    style={{
                      padding: '12px 24px',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '24px',
                      color: 'inherit',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    {card.action}
                  </button>
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
        story: 'Various card layout patterns for different use cases.',
      },
    },
  },
};

export const ResponsiveForms: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-background)',
        padding: '40px 24px',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Form Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '32px',
            backgroundColor: 'var(--md-sys-color-surface-variant)',
            borderRadius: '20px',
          }}
        >
          <h1
            style={{
              margin: '0 0 12px 0',
              fontSize: '32px',
              fontWeight: '500',
              color: 'var(--md-sys-color-on-surface-variant)',
            }}
          >
            Contact Form
          </h1>
          <p
            style={{
              margin: 0,
              color: 'var(--md-sys-color-on-surface-variant)',
              opacity: 0.8,
            }}
          >
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        {/* Form */}
        <form
          style={{
            backgroundColor: 'var(--md-sys-color-surface)',
            padding: '32px',
            borderRadius: '20px',
            border: '1px solid var(--md-sys-color-outline-variant)',
          }}
        >
          {/* Name Fields */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                First Name
              </label>
              <input
                type="text"
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
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--md-sys-color-on-surface)',
                }}
              >
                Last Name
              </label>
              <input
                type="text"
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
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface)',
              }}
            >
              Email Address *
            </label>
            <input
              type="email"
              required
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
          </div>

          {/* Subject */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface)',
              }}
            >
              Subject
            </label>
            <select
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
            >
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Feature Request</option>
              <option>Bug Report</option>
            </select>
          </div>

          {/* Message */}
          <div style={{ marginBottom: '32px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--md-sys-color-on-surface)',
              }}
            >
              Message *
            </label>
            <textarea
              required
              rows={5}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--md-sys-color-outline)',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                boxSizing: 'border-box',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              placeholder="Tell us about your inquiry..."
            />
          </div>

          {/* Actions */}
          <div
            style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', flexWrap: 'wrap' }}
          >
            <button
              type="button"
              style={{
                padding: '12px 24px',
                border: '1px solid var(--md-sys-color-outline)',
                borderRadius: '24px',
                backgroundColor: 'transparent',
                color: 'var(--md-sys-color-on-surface-variant)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 32px',
                border: 'none',
                borderRadius: '24px',
                backgroundColor: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive form layout with proper field organization and styling.',
      },
    },
  },
};
