import { Grid, Col } from "../components/Grid";
import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";

export function Dashboard() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening with your projects today."
        actions={
          <div style={{ display: "flex", gap: "var(--space-sm)" }}>
            <button
              style={{
                background: "transparent",
                border: "1px solid var(--color-outline)",
                borderRadius: "8px",
                padding: "var(--space-sm) var(--space-md)",
                cursor: "pointer",
              }}
            >
              Export
            </button>
            <button
              style={{
                background: "var(--color-primary)",
                color: "var(--color-on-primary)",
                border: "none",
                borderRadius: "8px",
                padding: "var(--space-sm) var(--space-md)",
                cursor: "pointer",
              }}
            >
              New Project
            </button>
          </div>
        }
        style={{ marginBottom: "var(--space-lg)" }}
      />

      {/* Dashboard Grid */}
      <Grid responsive columns={12} gutter={[16, 16]}>
        {/* Stats Cards */}
        <Col xs={12} sm={6} md={6} lg={3}>
          <Card
            variant="elevated"
            elevation={2}
            hoverable
            title="Total Users"
            padding="md"
          >
            <div
              style={{
                fontSize: "var(--font-size-2xl)",
                fontWeight: "bold",
                color: "var(--color-primary)",
                marginBottom: "var(--space-sm)",
              }}
            >
              12,847
            </div>
            <div
              style={{
                color: "var(--color-success)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              ↗ +12% from last month
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3}>
          <Card
            variant="elevated"
            elevation={2}
            hoverable
            title="Revenue"
            padding="md"
          >
            <div
              style={{
                fontSize: "var(--font-size-2xl)",
                fontWeight: "bold",
                color: "var(--color-primary)",
                marginBottom: "var(--space-sm)",
              }}
            >
              $89,432
            </div>
            <div
              style={{
                color: "var(--color-success)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              ↗ +8% from last month
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3}>
          <Card
            variant="elevated"
            elevation={2}
            hoverable
            title="Orders"
            padding="md"
          >
            <div
              style={{
                fontSize: "var(--font-size-2xl)",
                fontWeight: "bold",
                color: "var(--color-primary)",
                marginBottom: "var(--space-sm)",
              }}
            >
              2,847
            </div>
            <div
              style={{
                color: "var(--color-warning)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              ↘ -3% from last month
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3}>
          <Card
            variant="elevated"
            elevation={2}
            hoverable
            title="Conversion"
            padding="md"
          >
            <div
              style={{
                fontSize: "var(--font-size-2xl)",
                fontWeight: "bold",
                color: "var(--color-primary)",
                marginBottom: "var(--space-sm)",
              }}
            >
              3.24%
            </div>
            <div
              style={{
                color: "var(--color-success)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              ↗ +0.5% from last month
            </div>
          </Card>
        </Col>

        {/* Charts Section */}
        <Col xs={12} lg={8}>
          <Card
            title="Revenue Analytics"
            variant="elevated"
            elevation={2}
            padding="lg"
            actions={
              <select
                style={{
                  border: "1px solid var(--color-outline)",
                  borderRadius: "6px",
                  padding: "var(--space-xs) var(--space-sm)",
                  background: "var(--color-surface)",
                }}
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            }
            style={{ height: "400px" }}
          >
            <div
              style={{
                height: "100%",
                background: "var(--color-surface-variant)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-on-surface-variant)",
              }}
            >
              📈 Chart Placeholder
            </div>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card
            title="Top Products"
            variant="elevated"
            elevation={2}
            padding="lg"
            style={{ height: "400px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
              }}
            >
              {[
                { name: "Premium Plan", sales: 234, trend: "+12%" },
                { name: "Basic Plan", sales: 187, trend: "+8%" },
                { name: "Pro Plan", sales: 156, trend: "-2%" },
                { name: "Enterprise", sales: 89, trend: "+25%" },
              ].map((product, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--space-sm)",
                    background: "var(--color-surface-variant)",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "500" }}>{product.name}</div>
                    <div
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-on-surface-variant)",
                      }}
                    >
                      {product.sales} sales
                    </div>
                  </div>
                  <div
                    style={{
                      color: product.trend.startsWith("+")
                        ? "var(--color-success)"
                        : "var(--color-error)",
                      fontWeight: "500",
                    }}
                  >
                    {product.trend}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Activity & Projects Section */}
        <Col xs={12} lg={6}>
          <Card
            title="Recent Activity"
            variant="elevated"
            elevation={2}
            padding="lg"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
              }}
            >
              {[
                {
                  action: "New user registered",
                  time: "2 minutes ago",
                  icon: "👤",
                },
                {
                  action: "Order #1234 completed",
                  time: "15 minutes ago",
                  icon: "📦",
                },
                {
                  action: "Payment received",
                  time: "1 hour ago",
                  icon: "💰",
                },
                {
                  action: "New comment on project",
                  time: "2 hours ago",
                  icon: "💬",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "var(--space-md)",
                    alignItems: "center",
                    padding: "var(--space-sm) 0",
                    borderBottom:
                      index < 3
                        ? "1px solid var(--color-outline-variant)"
                        : "none",
                  }}
                >
                  <span style={{ fontSize: "var(--font-size-lg)" }}>
                    {activity.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div>{activity.action}</div>
                    <div
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-on-surface-variant)",
                      }}
                    >
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <Card
            title="Active Projects"
            variant="elevated"
            elevation={2}
            padding="lg"
            actions={
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-primary)",
                  cursor: "pointer",
                  fontSize: "var(--font-size-sm)",
                }}
              >
                View All
              </button>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
              }}
            >
              {[
                {
                  name: "Aurora UI Components",
                  progress: 85,
                  status: "In Progress",
                },
                {
                  name: "Mobile App Redesign",
                  progress: 60,
                  status: "In Progress",
                },
                {
                  name: "API Documentation",
                  progress: 95,
                  status: "Review",
                },
                {
                  name: "User Testing",
                  progress: 30,
                  status: "Planning",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  style={{
                    padding: "var(--space-md)",
                    background: "var(--color-surface-variant)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    <span style={{ fontWeight: "500" }}>{project.name}</span>
                    <span
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-on-surface-variant)",
                      }}
                    >
                      {project.progress}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      background: "var(--color-outline-variant)",
                      borderRadius: "2px",
                      overflow: "hidden",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${project.progress}%`,
                        background: "var(--color-primary)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    {project.status}
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
