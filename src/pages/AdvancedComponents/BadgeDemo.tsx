import { BadgeWrapper } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export function BadgeDemo() {
  return (
    <Card>
      <h2>Badge Component Demo</h2>
      <p>Material Design 3 Badge implementation with different variants and colors</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Dot Badges */}
        <div>
          <h3>Dot Badges</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <BadgeWrapper badge={{ variant: 'dot', color: 'primary' }}>
              <Button>Notifications</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'dot', color: 'error' }}>
              <Button>Messages</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'dot', color: 'success' }}>
              <Button>Updates</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'dot', color: 'warning' }}>
              <Button>⚙️ Settings</Button>
            </BadgeWrapper>
          </div>
        </div>

        {/* Numeric Badges */}
        <div>
          <h3>Numeric Badges</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <BadgeWrapper badge={{ variant: 'numeric', count: 5, color: 'primary' }}>
              <Button>Inbox</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'numeric', count: 99, color: 'error' }}>
              <Button>Alerts</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'numeric', count: 1000, max: 999, color: 'info' }}>
              <Button>Downloads</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'numeric', count: 0, showZero: true, color: 'secondary' }}>
              <Button>Archives</Button>
            </BadgeWrapper>
          </div>
        </div>

        {/* Status Badges */}
        <div>
          <h3>Status Badges</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <BadgeWrapper badge={{ variant: 'status', content: 'New', color: 'success' }}>
              <Button>Features</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'status', content: 'Beta', color: 'warning' }}>
              <Button>Preview</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'status', content: 'Pro', color: 'primary' }}>
              <Button>Account</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'status', content: 'Error', color: 'error' }}>
              <Button>Status</Button>
            </BadgeWrapper>
          </div>
        </div>

        {/* Different Positions */}
        <div>
          <h3>Badge Positions</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <BadgeWrapper badge={{ variant: 'numeric', count: 1, position: 'top-right', color: 'primary' }}>
              <Button>Top Right</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'numeric', count: 2, position: 'top-left', color: 'secondary' }}>
              <Button>Top Left</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'numeric', count: 3, position: 'bottom-right', color: 'success' }}>
              <Button>Bottom Right</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'numeric', count: 4, position: 'bottom-left', color: 'warning' }}>
              <Button>Bottom Left</Button>
            </BadgeWrapper>
          </div>
        </div>

        {/* Different Sizes */}
        <div>
          <h3>Badge Sizes</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <BadgeWrapper badge={{ variant: 'numeric', count: 5, size: 'small', color: 'primary' }}>
              <Button>Small</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'numeric', count: 10, size: 'medium', color: 'primary' }}>
              <Button>Medium</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'numeric', count: 15, size: 'large', color: 'primary' }}>
              <Button>Large</Button>
            </BadgeWrapper>
          </div>
        </div>

        {/* Animation and Visibility */}
        <div>
          <h3>Badge Features</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <BadgeWrapper badge={{ variant: 'numeric', count: 3, animated: true, color: 'primary' }}>
              <Button>Animated</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'dot', visible: false, color: 'error' }}>
              <Button>Hidden Badge</Button>
            </BadgeWrapper>
            <BadgeWrapper badge={{ variant: 'status', content: 'Live', color: 'success', animated: true }}>
              <Button>Live Status</Button>
            </BadgeWrapper>
          </div>
        </div>
      </div>
    </Card>
  );
}
