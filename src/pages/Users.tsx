import { Grid, Col } from '../components/Grid';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

export function Users() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Users Management"
        subtitle="Manage your users, roles, and permissions."
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <button
              style={{
                background: 'transparent',
                border: '1px solid var(--color-outline)',
                borderRadius: '8px',
                padding: 'var(--space-sm) var(--space-md)',
                cursor: 'pointer',
              }}
            >
              Import Users
            </button>
            <button
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                border: 'none',
                borderRadius: '8px',
                padding: 'var(--space-sm) var(--space-md)',
                cursor: 'pointer',
              }}
            >
              Add User
            </button>
          </div>
        }
        style={{ marginBottom: 'var(--space-lg)' }}
      />

      {/* Users Grid */}
      <Grid responsive columns={12} gutter={[16, 16]}>
        {/* User Stats */}
        <Col xs={12} sm={6} md={3}>
          <Card variant="elevated" elevation={2} hoverable title="Total Users" padding="md">
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              12,847
            </div>
            <div
              style={{
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ↗ +234 this month
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Card variant="elevated" elevation={2} hoverable title="Active Users" padding="md">
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              8,432
            </div>
            <div
              style={{
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ↗ +156 this week
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Card variant="elevated" elevation={2} hoverable title="New Users" padding="md">
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              234
            </div>
            <div
              style={{
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ↗ +12% from last month
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3}>
          <Card variant="elevated" elevation={2} hoverable title="Premium Users" padding="md">
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              1,247
            </div>
            <div
              style={{
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ↗ +8% from last month
            </div>
          </Card>
        </Col>

        {/* User List */}
        <Col xs={12}>
          <Card title="Recent Users" variant="elevated" elevation={2} padding="lg">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
            >
              {[
                {
                  name: 'John Doe',
                  email: 'john@example.com',
                  role: 'Admin',
                  status: 'Active',
                  avatar: '👤',
                },
                {
                  name: 'Jane Smith',
                  email: 'jane@example.com',
                  role: 'User',
                  status: 'Active',
                  avatar: '👩',
                },
                {
                  name: 'Bob Johnson',
                  email: 'bob@example.com',
                  role: 'Moderator',
                  status: 'Inactive',
                  avatar: '👨',
                },
                {
                  name: 'Alice Brown',
                  email: 'alice@example.com',
                  role: 'User',
                  status: 'Active',
                  avatar: '👩',
                },
              ].map((user, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-md)',
                    background: 'var(--color-surface-variant)',
                    borderRadius: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                    }}
                  >
                    <span style={{ fontSize: 'var(--font-size-2xl)' }}>{user.avatar}</span>
                    <div>
                      <div style={{ fontWeight: '500' }}>{user.name}</div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-on-surface-variant)',
                        }}
                      >
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                    }}
                  >
                    <span
                      style={{
                        padding: 'var(--space-xs) var(--space-sm)',
                        background: 'var(--color-primary)',
                        color: 'var(--color-on-primary)',
                        borderRadius: '16px',
                        fontSize: 'var(--font-size-xs)',
                      }}
                    >
                      {user.role}
                    </span>
                    <span
                      style={{
                        color:
                          user.status === 'Active' ? 'var(--color-success)' : 'var(--color-error)',
                        fontWeight: '500',
                      }}
                    >
                      {user.status}
                    </span>
                    <button
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--color-outline)',
                        borderRadius: '6px',
                        padding: 'var(--space-xs) var(--space-sm)',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Grid>
    </>
  );
}
