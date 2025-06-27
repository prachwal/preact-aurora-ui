import { Grid, Col } from '../components/Grid';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';

export function Analytics() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Analytics"
        subtitle="Deep insights into your business performance and trends."
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
              Export Report
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
              Custom Report
            </button>
          </div>
        }
        style={{ marginBottom: 'var(--space-lg)' }}
      />

      {/* Analytics Grid */}
      <Grid responsive columns={12} gutter={[16, 16]}>
        {/* Key Metrics */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card variant="elevated" elevation={2} hoverable title="Page Views" padding="md">
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              2.4M
            </div>
            <div
              style={{
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ↗ +18% from last week
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card variant="elevated" elevation={2} hoverable title="Bounce Rate" padding="md">
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              24.5%
            </div>
            <div
              style={{
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ↘ -5% from last week
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card variant="elevated" elevation={2} hoverable title="Session Duration" padding="md">
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              3m 42s
            </div>
            <div
              style={{
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ↗ +12% from last week
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card variant="elevated" elevation={2} hoverable title="Conversion Rate" padding="md">
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              4.8%
            </div>
            <div
              style={{
                color: 'var(--color-success)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              ↗ +0.8% from last week
            </div>
          </Card>
        </Col>

        {/* Traffic Sources */}
        <Col xs={12} lg={8}>
          <Card
            title="Traffic Sources"
            variant="elevated"
            elevation={2}
            padding="lg"
            style={{ height: '400px' }}
          >
            <div
              style={{
                height: '100%',
                background: 'var(--color-surface-variant)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-on-surface-variant)',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
            >
              <div style={{ fontSize: 'var(--font-size-2xl)' }}>📊</div>
              <div>Traffic Sources Chart</div>
              <div style={{ fontSize: 'var(--font-size-sm)' }}>
                Organic: 45% • Direct: 28% • Social: 15% • Referral: 12%
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card
            title="Top Referrers"
            variant="elevated"
            elevation={2}
            padding="lg"
            style={{ height: '400px' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--space-sm)',
                  background: 'var(--color-surface-variant)',
                  borderRadius: '8px',
                }}
              >
                <span style={{ fontWeight: '500' }}>google.com</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>45.2%</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--space-sm)',
                  background: 'var(--color-surface-variant)',
                  borderRadius: '8px',
                }}
              >
                <span style={{ fontWeight: '500' }}>direct</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>28.1%</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--space-sm)',
                  background: 'var(--color-surface-variant)',
                  borderRadius: '8px',
                }}
              >
                <span style={{ fontWeight: '500' }}>facebook.com</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>15.7%</span>
              </div>
            </div>
          </Card>
        </Col>
      </Grid>
    </>
  );
}
