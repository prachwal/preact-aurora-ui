import { useState } from 'preact/hooks';

import { Stepper, Step } from '../../components/Stepper';

export function StepperDemo() {
  const [activeStep1, setActiveStep1] = useState(0);
  const [activeStep2] = useState(1);
  const [activeStep3, setActiveStep3] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([0]));

  const handleStepClick = (step: number) => {
    setActiveStep1(step);
    if (step > activeStep1) {
      setCompletedSteps((prev) => new Set([...prev, activeStep1]));
    }
  };

  const nextStep = () => {
    if (activeStep1 < 3) {
      setCompletedSteps((prev) => new Set([...prev, activeStep1]));
      setActiveStep1(activeStep1 + 1);
    }
  };

  const prevStep = () => {
    if (activeStep1 > 0) {
      setActiveStep1(activeStep1 - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section>
        <h2>Stepper</h2>
        <p>Material Design 3 stepper component for multi-step workflows and processes.</p>
      </section>

      {/* Horizontal Stepper */}
      <section>
        <h3>Horizontal Stepper</h3>
        <p>Linear stepper for guided workflows.</p>

        <div
          style={{
            padding: '2rem',
            background: 'var(--md-sys-color-surface-container)',
            borderRadius: '12px',
          }}
        >
          <Stepper activeStep={activeStep1} orientation="horizontal" onStepChange={handleStepClick}>
            <Step
              index={0}
              label="Account Setup"
              description="Enter your personal information"
              completed={completedSteps.has(0)}
            >
              <div>Account setup content</div>
            </Step>
            <Step
              index={1}
              label="Verification"
              description="Verify your email address"
              completed={completedSteps.has(1)}
            >
              <div>Verification content</div>
            </Step>
            <Step
              index={2}
              label="Preferences"
              description="Configure your settings"
              completed={completedSteps.has(2)}
            >
              <div>Preferences content</div>
            </Step>
            <Step
              index={3}
              label="Complete"
              description="Review and finish setup"
              completed={completedSteps.has(3)}
            >
              <div>Completion content</div>
            </Step>
          </Stepper>

          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'var(--md-sys-color-surface)',
              borderRadius: '8px',
            }}
          >
            <h4>Step {activeStep1 + 1} Content</h4>
            <p>
              {activeStep1 === 0 && 'Please enter your account information to get started.'}
              {activeStep1 === 1 && 'Check your email and click the verification link.'}
              {activeStep1 === 2 && 'Customize your preferences and settings.'}
              {activeStep1 === 3 && 'Review your setup and complete the process.'}
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button
                onClick={prevStep}
                disabled={activeStep1 === 0}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--md-sys-color-outline)',
                  background: 'transparent',
                  borderRadius: '4px',
                  cursor: activeStep1 === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={activeStep1 === 3}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  background: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  borderRadius: '4px',
                  cursor: activeStep1 === 3 ? 'not-allowed' : 'pointer',
                }}
              >
                {activeStep1 === 3 ? 'Complete' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Stepper */}
      <section>
        <h3>Vertical Stepper</h3>
        <p>Vertical layout with expandable content areas.</p>

        <div
          style={{
            padding: '2rem',
            background: 'var(--md-sys-color-surface-container)',
            borderRadius: '12px',
          }}
        >
          <Stepper activeStep={activeStep2} orientation="vertical">
            <Step
              index={0}
              label="Plan Selection"
              description="Choose your subscription plan"
              completed={true}
            >
              <div
                style={{
                  padding: '1rem',
                  background: 'var(--md-sys-color-surface)',
                  borderRadius: '8px',
                  marginTop: '1rem',
                }}
              >
                <h4>✅ Premium Plan Selected</h4>
                <p>You've chosen the Premium plan with all features included.</p>
              </div>
            </Step>
            <Step
              index={1}
              label="Payment Information"
              description="Enter your billing details"
              error={false}
            >
              <div
                style={{
                  padding: '1rem',
                  background: 'var(--md-sys-color-surface)',
                  borderRadius: '8px',
                  marginTop: '1rem',
                }}
              >
                <h4>💳 Payment Details</h4>
                <p>Please enter your credit card information securely.</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Card number"
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      border: '1px solid var(--md-sys-color-outline)',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    style={{
                      width: '80px',
                      padding: '0.5rem',
                      border: '1px solid var(--md-sys-color-outline)',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    style={{
                      width: '80px',
                      padding: '0.5rem',
                      border: '1px solid var(--md-sys-color-outline)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            </Step>
            <Step
              index={2}
              label="Confirmation"
              description="Review and confirm your order"
              disabled={true}
            >
              <div
                style={{
                  padding: '1rem',
                  background: 'var(--md-sys-color-surface)',
                  borderRadius: '8px',
                  marginTop: '1rem',
                }}
              >
                <h4>📋 Order Summary</h4>
                <p>Review your order details before completing the purchase.</p>
              </div>
            </Step>
          </Stepper>
        </div>
      </section>

      {/* Non-linear Stepper */}
      <section>
        <h3>Non-linear Stepper</h3>
        <p>Allow users to jump between steps freely.</p>

        <div
          style={{
            padding: '2rem',
            background: 'var(--md-sys-color-surface-container)',
            borderRadius: '12px',
          }}
        >
          <Stepper
            activeStep={activeStep3}
            orientation="horizontal"
            linear={false}
            onStepChange={setActiveStep3}
          >
            <Step index={0} label="Profile" description="Personal information" completed={true}>
              <div>Profile content</div>
            </Step>
            <Step index={1} label="Skills" description="Technical expertise" completed={false}>
              <div>Skills content</div>
            </Step>
            <Step index={2} label="Experience" description="Work history" completed={true}>
              <div>Experience content</div>
            </Step>
            <Step index={3} label="Portfolio" description="Showcase your work" completed={false}>
              <div>Portfolio content</div>
            </Step>
          </Stepper>

          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'var(--md-sys-color-surface)',
              borderRadius: '8px',
            }}
          >
            <h4>
              {activeStep3 === 0 && 'Profile Information'}
              {activeStep3 === 1 && 'Technical Skills'}
              {activeStep3 === 2 && 'Work Experience'}
              {activeStep3 === 3 && 'Portfolio Projects'}
            </h4>
            <p>
              {activeStep3 === 0 && 'Fill in your basic profile information and contact details.'}
              {activeStep3 === 1 && 'List your technical skills and proficiency levels.'}
              {activeStep3 === 2 && 'Add your work experience and achievements.'}
              {activeStep3 === 3 && 'Showcase your best projects and work samples.'}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h3>Key Features</h3>
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li
            style={{
              padding: '1rem',
              background: 'var(--md-sys-color-surface-container)',
              borderRadius: '8px',
            }}
          >
            <strong>✨ Material Design 3</strong>
            <br />
            Full MD3 theming and state design
          </li>
          <li
            style={{
              padding: '1rem',
              background: 'var(--md-sys-color-surface-container)',
              borderRadius: '8px',
            }}
          >
            <strong>📐 Multiple Orientations</strong>
            <br />
            Horizontal, vertical, and mobile layouts
          </li>
          <li
            style={{
              padding: '1rem',
              background: 'var(--md-sys-color-surface-container)',
              borderRadius: '8px',
            }}
          >
            <strong>🎯 Linear & Non-linear</strong>
            <br />
            Support for guided and flexible workflows
          </li>
          <li
            style={{
              padding: '1rem',
              background: 'var(--md-sys-color-surface-container)',
              borderRadius: '8px',
            }}
          >
            <strong>⌨️ Keyboard Navigation</strong>
            <br />
            Full accessibility and keyboard support
          </li>
          <li
            style={{
              padding: '1rem',
              background: 'var(--md-sys-color-surface-container)',
              borderRadius: '8px',
            }}
          >
            <strong>🎨 Customizable</strong>
            <br />
            Custom icons, colors, and content
          </li>
          <li
            style={{
              padding: '1rem',
              background: 'var(--md-sys-color-surface-container)',
              borderRadius: '8px',
            }}
          >
            <strong>📱 Responsive</strong>
            <br />
            Adapts to mobile and desktop screens
          </li>
        </ul>
      </section>
    </div>
  );
}
