import { useState } from 'preact/hooks';

import { Banner } from '../../components/Banner';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export function BannerDemo() {
  const [showInfo, setShowInfo] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(false);
  const [showBottomBanner, setShowBottomBanner] = useState(false);

  return (
    <Card>
      <h2>Banner Component Demo</h2>
      <p>Material Design 3 Banner implementation with different variants and positions</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Banner Variants */}
        <div>
          <h3>Banner Variants</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {showInfo && (
              <Banner
                variant="info"
                message="This is an informational message about a new feature or update."
                dismissible
                onDismiss={() => setShowInfo(false)}
                actions={[
                  { label: 'Learn More', onClick: () => alert('Learn more clicked!') },
                  { label: 'Dismiss', onClick: () => setShowInfo(false), variant: 'text' },
                ]}
              />
            )}

            {showWarning && (
              <Banner
                variant="warning"
                message="Warning: This action may affect your data. Please proceed with caution."
                dismissible
                onDismiss={() => setShowWarning(false)}
                actions={[
                  { label: 'Continue', onClick: () => alert('Continue clicked!') },
                  { label: 'Cancel', onClick: () => setShowWarning(false), variant: 'text' },
                ]}
              />
            )}

            {showError && (
              <Banner
                variant="error"
                message="Error: Unable to complete the operation. Please try again later."
                dismissible
                onDismiss={() => setShowError(false)}
                actions={[
                  { label: 'Retry', onClick: () => alert('Retry clicked!') },
                  { label: 'Dismiss', onClick: () => setShowError(false), variant: 'text' },
                ]}
              />
            )}

            {showSuccess && (
              <Banner
                variant="success"
                message="Success! Your changes have been saved successfully."
                dismissible
                onDismiss={() => setShowSuccess(false)}
                actions={[{ label: 'View Details', onClick: () => alert('View details clicked!') }]}
              />
            )}
          </div>
        </div>

        {/* Banner Controls */}
        <div>
          <h3>Banner Controls</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => setShowInfo(true)} disabled={showInfo} variant="outlined">
              Show Info Banner
            </Button>
            <Button onClick={() => setShowWarning(true)} disabled={showWarning} variant="outlined">
              Show Warning Banner
            </Button>
            <Button onClick={() => setShowError(true)} disabled={showError} variant="outlined">
              Show Error Banner
            </Button>
            <Button onClick={() => setShowSuccess(true)} disabled={showSuccess} variant="outlined">
              Show Success Banner
            </Button>
          </div>
        </div>

        {/* Banner Positions */}
        <div>
          <h3>Banner Positions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Button
              onClick={() => setShowTopBanner(true)}
              disabled={showTopBanner}
              variant="outlined"
            >
              Show Top Banner
            </Button>
            <Button
              onClick={() => setShowBottomBanner(true)}
              disabled={showBottomBanner}
              variant="outlined"
            >
              Show Bottom Banner
            </Button>
          </div>

          {showTopBanner && (
            <Banner
              variant="info"
              position="top"
              message="This banner is positioned at the top of the container."
              dismissible
              onDismiss={() => setShowTopBanner(false)}
            />
          )}

          {showBottomBanner && (
            <Banner
              variant="info"
              position="bottom"
              message="This banner is positioned at the bottom of the container."
              dismissible
              onDismiss={() => setShowBottomBanner(false)}
            />
          )}
        </div>

        {/* Non-dismissible Banner */}
        <div>
          <h3>Non-dismissible Banner</h3>
          <Banner
            variant="info"
            message="This banner cannot be dismissed and requires action from the user."
            dismissible={false}
            actions={[
              { label: 'Take Action', onClick: () => alert('Action taken!') },
              { label: 'Later', onClick: () => alert('Postponed'), variant: 'text' },
            ]}
          />
        </div>

        {/* Banner with Icon */}
        <div>
          <h3>Banner with Custom Content</h3>
          <Banner
            variant="warning"
            message={
              <div>
                <strong>🔒 Security Notice:</strong>
                <br />
                Your session will expire in 5 minutes. Please save your work.
              </div>
            }
            dismissible
            onDismiss={() => alert('Security banner dismissed')}
            actions={[
              { label: 'Extend Session', onClick: () => alert('Session extended!') },
              { label: 'Save & Exit', onClick: () => alert('Saved and exiting'), variant: 'text' },
            ]}
          />
        </div>
      </div>
    </Card>
  );
}
