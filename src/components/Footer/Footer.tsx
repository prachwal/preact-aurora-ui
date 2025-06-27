import type { ComponentChildren } from "preact";
import type { JSX } from "preact/jsx-runtime";

import styles from "./Footer.module.scss";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon?: ComponentChildren;
}

export interface FooterProps {
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  "aria-label"?: string;

  // Enhanced props for flexibility
  variant?: "default" | "minimal" | "extended";
  sticky?: boolean;
  elevation?: 0 | 1 | 2;
  copyright?: string;
  links?: FooterLink[];
  social?: SocialLink[];
}

/**
 * Footer – stopka dashboardu
 *
 * @param variant - Wariant footera: default, minimal, extended
 * @param sticky - Czy footer ma być sticky
 * @param elevation - Poziom cienia (0-2)
 * @param copyright - Tekst copyright
 * @param links - Lista linków
 * @param social - Lista linków społecznościowych
 */
export function Footer({
  children,
  className = "",
  style,
  "aria-label": ariaLabel = "Stopka",
  variant = "default",
  sticky = false,
  elevation = 0,
  copyright,
  links = [],
  social = [],
}: FooterProps) {
  const classes = [
    styles.footer,
    styles[`footer--variant-${variant}`],
    styles[`footer--elevation-${elevation}`],
    sticky ? styles["footer--sticky"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const currentYear = new Date().getFullYear();
  const copyrightText = copyright || `© ${currentYear} Aurora UI`;

  return (
    <footer
      className={classes}
      style={style}
      aria-label={ariaLabel}
      role="contentinfo"
    >
      {variant === "extended" && (
        <div className={styles.main}>
          <div className={styles.content}>
            {children}
            {links.length > 0 && (
              <nav className={styles.nav} aria-label="Footer links">
                <ul className={styles.linksList}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          {social.length > 0 && (
            <div className={styles.social}>
              <ul className={styles.socialList}>
                {social.map((item) => (
                  <li key={item.platform}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.platform} link`}
                    >
                      {item.icon || item.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className={styles.bottom}>
        {variant !== "extended" && children}
        <div className={styles.copyright}>{copyrightText}</div>
        {variant !== "extended" && links.length > 0 && (
          <nav className={styles.nav} aria-label="Footer links">
            <ul className={styles.linksList}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  );
}
