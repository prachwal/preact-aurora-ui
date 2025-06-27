import { Grid, Col } from "../components/Grid";
import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";

export function Settings() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Settings"
        subtitle="Configure your application preferences and system settings."
        style={{ marginBottom: "var(--space-lg)" }}
      />

      {/* Settings Grid */}
      <Grid responsive columns={12} gutter={[16, 16]}>
        {/* General Settings */}
        <Col xs={12} lg={6}>
          <Card
            title="General Settings"
            variant="elevated"
            elevation={2}
            padding="lg"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "var(--space-sm)",
                    fontWeight: "500",
                  }}
                >
                  Site Name
                </label>
                <input
                  type="text"
                  defaultValue="Aurora UI Dashboard"
                  style={{
                    width: "100%",
                    padding: "var(--space-sm)",
                    border: "1px solid var(--color-outline)",
                    borderRadius: "6px",
                    background: "var(--color-surface)",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "var(--space-sm)",
                    fontWeight: "500",
                  }}
                >
                  Description
                </label>
                <textarea
                  defaultValue="A modern dashboard built with Aurora UI components"
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "var(--space-sm)",
                    border: "1px solid var(--color-outline)",
                    borderRadius: "6px",
                    background: "var(--color-surface)",
                    resize: "vertical",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "var(--space-sm)",
                    fontWeight: "500",
                  }}
                >
                  Time Zone
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "var(--space-sm)",
                    border: "1px solid var(--color-outline)",
                    borderRadius: "6px",
                    background: "var(--color-surface)",
                  }}
                >
                  <option>UTC (GMT+0)</option>
                  <option>Eastern Time (GMT-5)</option>
                  <option>Pacific Time (GMT-8)</option>
                  <option>Central European Time (GMT+1)</option>
                </select>
              </div>
            </div>
          </Card>
        </Col>

        {/* Security Settings */}
        <Col xs={12} lg={6}>
          <Card
            title="Security Settings"
            variant="elevated"
            elevation={2}
            padding="lg"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
              }}
            >
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    cursor: "pointer",
                  }}
                >
                  <input type="checkbox" defaultChecked />
                  <span>Enable two-factor authentication</span>
                </label>
              </div>
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    cursor: "pointer",
                  }}
                >
                  <input type="checkbox" defaultChecked />
                  <span>Require password change every 90 days</span>
                </label>
              </div>
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    cursor: "pointer",
                  }}
                >
                  <input type="checkbox" />
                  <span>Allow login from multiple devices</span>
                </label>
              </div>
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    cursor: "pointer",
                  }}
                >
                  <input type="checkbox" defaultChecked />
                  <span>Send email alerts for suspicious activity</span>
                </label>
              </div>
            </div>
          </Card>
        </Col>

        {/* Notification Settings */}
        <Col xs={12}>
          <Card
            title="Notification Settings"
            variant="elevated"
            elevation={2}
            padding="lg"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "var(--space-lg)",
                }}
              >
                <div>
                  <h4 style={{ marginBottom: "var(--space-md)" }}>
                    Email Notifications
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-sm)",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" defaultChecked />
                      <span>New user registrations</span>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" defaultChecked />
                      <span>System updates</span>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" />
                      <span>Marketing emails</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 style={{ marginBottom: "var(--space-md)" }}>
                    Push Notifications
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-sm)",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" defaultChecked />
                      <span>Important alerts</span>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" />
                      <span>Daily summaries</span>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" />
                      <span>Weekly reports</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Save Actions */}
        <Col xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-sm)",
            }}
          >
            <button
              style={{
                background: "transparent",
                border: "1px solid var(--color-outline)",
                borderRadius: "8px",
                padding: "var(--space-sm) var(--space-lg)",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
            <button
              style={{
                background: "var(--color-primary)",
                color: "var(--color-on-primary)",
                border: "none",
                borderRadius: "8px",
                padding: "var(--space-sm) var(--space-lg)",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </div>
        </Col>
      </Grid>
    </>
  );
}
