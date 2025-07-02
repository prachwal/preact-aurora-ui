import type { ComponentChildren } from 'preact';
import type { JSX } from 'preact/jsx-runtime';

import styles from './NotFound.module.scss';

export interface NotFoundProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  'aria-label'?: string;
  title?: string;
  subtitle?: string;
  showHomeLink?: boolean;
  showBackLink?: boolean;
}

/**
 * NotFound – Strona 404 dla nieistniejących ścieżek
 *
 * @param title - Główny tytuł błędu (domyślnie "404 - Page Not Found")
 * @param subtitle - Podtytuł z opisem błędu
 * @param showHomeLink - Czy pokazać link do strony głównej
 * @param showBackLink - Czy pokazać link "powrót"
 */
export function NotFound({
  children,
  className = '',
  style,
  'aria-label': ariaLabel = '404 Page Not Found',
  title = '404 - Page Not Found',
  subtitle = "The page you're looking for doesn't exist or has been moved.",
  showHomeLink = true,
  showBackLink = true,
}: NotFoundProps) {
  const classes = [styles.notFound, className].filter(Boolean).join(' ');

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className={classes} style={style} aria-label={ariaLabel} role="main">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          {children}

          <div className={styles.actions}>
            {showHomeLink && (
              <a href="/" className={styles.homeLink}>
                🏠 Go to Homepage
              </a>
            )}
            {showBackLink && (
              <button
                onClick={handleGoBack}
                className={styles.backButton}
                type="button"
              >
                ← Go Back
              </button>
            )}
          </div>

          <div className={styles.suggestions}>
            <h3>You might be looking for:</h3>
            <ul>
              <li>
                <a href="/">🏠 Homepage</a>
              </li>
              <li>
                <a href="/docs">📚 Documentation</a>
              </li>
              <li>
                <a href="/storybook">🎨 Storybook</a>
              </li>
              <li>
                <a href="https://github.com/prachwal/preact-aurora-ui">💻 GitHub</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
