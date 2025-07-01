/**
 * AppLayout Component - FAZA 4: Advanced Features
 * Intelligent app wrapper with automatic theme management and responsive layout
 */

import { useState, useEffect } from 'preact/hooks';
import type { ComponentChildren, JSX } from 'preact';

import { ThemeProvider } from '../ThemeProvider/ThemeProvider';
import { Container } from '../Container/Container';
import { Layout } from '../Layout/Layout';
import type { ThemeMode } from '../ThemeProvider/types';

import styles from './AppLayout.module.scss';

export interface AppLayoutProps {
  header?: ComponentChildren;
  sidebar?: ComponentChildren;
  footer?: ComponentChildren;
  children: ComponentChildren;
  theme?: ThemeMode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
  className?: string;
  style?: JSX.CSSProperties;

  // Enhanced layout options
  responsive?: boolean;
  sidebarBreakpoint?: number;
  autoThemeManagement?: boolean;
  enableGrid?: boolean;
  maxWidth?: string | number;
}

export function AppLayout({
  header,
  sidebar,
  footer,
  children,
  theme = 'auto',
  sidebarCollapsed = false,
  onSidebarToggle,
  className = '',
  style,
  responsive = true,
  sidebarBreakpoint = 768,
  autoThemeManagement = true,
  enableGrid = true,
  maxWidth,
}: AppLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(sidebarCollapsed);

  // Handle responsive behavior
  useEffect(() => {
    if (!responsive) return;

    const checkMobile = () => {
      const mobile = window.innerWidth < sidebarBreakpoint;
      setIsMobile(mobile);

      // Auto-collapse sidebar on mobile
      if (mobile && !internalCollapsed) {
        setInternalCollapsed(true);
        onSidebarToggle?.(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [responsive, sidebarBreakpoint, internalCollapsed, onSidebarToggle]);

  // Sync internal state with external prop
  useEffect(() => {
    setInternalCollapsed(sidebarCollapsed);
  }, [sidebarCollapsed]);

  const layoutClasses = [
    styles.appLayout,
    enableGrid ? styles['appLayout--grid'] : '',
    isMobile ? styles['appLayout--mobile'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const layoutStyle = {
    ...style,
    ...(maxWidth ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : {}),
  };

  return (
    <ThemeProvider
      defaultTheme={{ mode: theme }}
      autoGlobalStyles={autoThemeManagement}
      generateUtilities={false}
    >
      <div className={layoutClasses} style={layoutStyle}>
        {header && (
          <Container surface="surface" className={styles.header} autoTextColor padding="none">
            {header}
          </Container>
        )}

        <div className={styles.body}>
          {sidebar && (
            <Container
              surface="surface-variant"
              className={`${styles.sidebar} ${internalCollapsed ? styles.collapsed : ''}`}
              autoTextColor
              padding="none"
            >
              {sidebar}
            </Container>
          )}

          <Container surface="surface" className={styles.main} autoTextColor padding="none">
            <Layout direction="vertical" overflow="auto" fullHeight>
              {children}
            </Layout>
          </Container>
        </div>

        {footer && (
          <Container surface="surface" className={styles.footer} autoTextColor padding="none">
            {footer}
          </Container>
        )}
      </div>
    </ThemeProvider>
  );
}
