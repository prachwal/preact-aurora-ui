# Footer

Komponent stopki aplikacji zgodny z Material Design 3, zapewniający miejsce na informacje prawne, linki nawigacyjne i dane kontaktowe.

## 🎯 Kiedy używać

- **Stopka strony** - copyright, linki prawne, kontakt
- **Dashboard footer** - informacje o wersji, status systemu
- **Aplikacja mobile** - dodatkowe linki, social media
- **Landing page** - newsletter, social media, mapa strony

## 📱 Podstawowe użycie

```tsx
import { Footer } from 'preact-aurora-ui';

function App() {
  return <Footer>© 2025 My Company. All rights reserved.</Footer>;
}
```

## 🔧 Warianty

### Footer domyślny

```tsx
function DefaultFooter() {
  return (
    <Footer
      copyright="© 2025 Aurora UI"
      links={[
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  );
}
```

### Footer minimalny

```tsx
function MinimalFooter() {
  return <Footer variant="minimal">Made with ❤️ by Aurora Team</Footer>;
}
```

### Footer rozszerzony

```tsx
function ExtendedFooter() {
  const links = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Help Center', href: '/help' },
    { label: 'API Docs', href: '/docs', external: true },
  ];

  const socialLinks = [
    {
      platform: 'Twitter',
      href: 'https://twitter.com/company',
      icon: <TwitterIcon />,
    },
    {
      platform: 'LinkedIn',
      href: 'https://linkedin.com/company',
      icon: <LinkedInIcon />,
    },
    {
      platform: 'GitHub',
      href: 'https://github.com/company',
      icon: <GitHubIcon />,
    },
  ];

  return (
    <Footer
      variant="extended"
      copyright="© 2025 Aurora UI. All rights reserved."
      links={links}
      social={socialLinks}
    >
      <div className="footer-content">
        <div className="footer-section">
          <h3>Product</h3>
          <ul>
            <li>
              <a href="/features">Features</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/integrations">Integrations</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/team">Team</a>
            </li>
            <li>
              <a href="/investors">Investors</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="/docs">Documentation</a>
            </li>
            <li>
              <a href="/guides">Guides</a>
            </li>
            <li>
              <a href="/changelog">Changelog</a>
            </li>
          </ul>
        </div>
      </div>
    </Footer>
  );
}
```

### Footer sticky

```tsx
function StickyFooter() {
  return (
    <Footer
      sticky
      elevation={1}
      copyright="© 2025 Dashboard App"
      links={[
        { label: 'Support', href: '/support' },
        { label: 'Status', href: 'https://status.app.com', external: true },
      ]}
    />
  );
}
```

## 🧩 Wzorce implementacji

### Dashboard footer

```tsx
function DashboardFooter() {
  const { user, version } = useApp();

  return (
    <Footer variant="minimal" elevation={0}>
      <div className="dashboard-footer-info">
        <span>Version {version}</span>
        <span>•</span>
        <span>Logged in as {user.name}</span>
        <span>•</span>
        <a href="/support">Need help?</a>
      </div>
    </Footer>
  );
}
```

### E-commerce footer

```tsx
function EcommerceFooter() {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'New Arrivals', href: '/new' },
        { label: 'Best Sellers', href: '/best-sellers' },
        { label: 'Sale', href: '/sale' },
        { label: 'Gift Cards', href: '/gift-cards' },
      ],
    },
    {
      title: 'Customer Care',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
        { label: 'Size Guide', href: '/size-guide' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Sustainability', href: '/sustainability' },
      ],
    },
  ];

  const socialLinks = [
    { platform: 'Instagram', href: '#', icon: '📷' },
    { platform: 'Facebook', href: '#', icon: '📘' },
    { platform: 'Twitter', href: '#', icon: '🐦' },
    { platform: 'Pinterest', href: '#', icon: '📌' },
  ];

  return (
    <Footer
      variant="extended"
      elevation={1}
      copyright="© 2025 StyleStore. All rights reserved."
      social={socialLinks}
    >
      <div className="ecommerce-footer">
        <div className="footer-brand">
          <img src="/logo.svg" alt="StyleStore" />
          <p>Discover the latest trends in fashion and lifestyle.</p>

          <div className="newsletter">
            <h4>Subscribe to our newsletter</h4>
            <div className="newsletter-form">
              <TextField placeholder="Enter your email" />
              <Button variant="filled">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="footer-sections">
          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Footer>
  );
}
```

### Blog footer

```tsx
function BlogFooter() {
  const tags = [
    'React',
    'JavaScript',
    'TypeScript',
    'CSS',
    'Design',
    'Development',
    'Tutorial',
    'Tips',
    'Best Practices',
  ];

  return (
    <Footer variant="extended">
      <div className="blog-footer">
        <div className="footer-main">
          <div className="about-section">
            <h3>About This Blog</h3>
            <p>
              Sharing knowledge about web development, design, and the latest technology trends.
            </p>
          </div>

          <div className="popular-tags">
            <h3>Popular Tags</h3>
            <div className="tag-cloud">
              {tags.map((tag) => (
                <a key={tag} href={`/tag/${tag.toLowerCase()}`} className="tag">
                  {tag}
                </a>
              ))}
            </div>
          </div>

          <div className="subscribe">
            <h3>Stay Updated</h3>
            <p>Get notified when new articles are published.</p>
            <div className="subscribe-form">
              <TextField type="email" placeholder="your@email.com" />
              <Button variant="filled">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}
```

### Landing page footer

```tsx
function LandingFooter() {
  const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <Footer
      variant="extended"
      copyright="© 2025 StartupCo. All rights reserved."
      links={legalLinks}
      social={[
        { platform: 'Twitter', href: '#', icon: '🐦' },
        { platform: 'LinkedIn', href: '#', icon: '💼' },
        { platform: 'GitHub', href: '#', icon: '🐙' },
      ]}
    >
      <div className="landing-footer">
        <div className="footer-logo">
          <img src="/logo-white.svg" alt="StartupCo" />
          <p>Building the future of productivity tools. Join thousands of happy users.</p>
        </div>

        <div className="footer-links">
          <div className="link-section">
            <h4>Product</h4>
            <ul>
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="link-section">
            <h4>Company</h4>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="link-section">
            <h4>Contact</h4>
            <ul>
              <li>📧 hello@startupco.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 San Francisco, CA</li>
            </ul>
          </div>
        </div>
      </div>
    </Footer>
  );
}
```

## 📋 API Reference

### Footer Props

| Prop         | Typ                                    | Domyślnie   | Opis                                               |
| ------------ | -------------------------------------- | ----------- | -------------------------------------------------- |
| `children`   | `ComponentChildren`                    | -           | Dodatkowa treść footera                            |
| `variant`    | `'default' \| 'minimal' \| 'extended'` | `'default'` | Wariant stylu footera                              |
| `sticky`     | `boolean`                              | `false`     | Czy footer ma być przyklejony do dołu              |
| `elevation`  | `0 \| 1 \| 2`                          | `0`         | Poziom cienia (Material Design)                    |
| `copyright`  | `string`                               | -           | Tekst copyright (auto-generowany jeśli nie podano) |
| `links`      | `FooterLink[]`                         | `[]`        | Lista linków nawigacyjnych                         |
| `social`     | `SocialLink[]`                         | `[]`        | Lista linków do social media                       |
| `className`  | `string`                               | -           | Dodatkowe klasy CSS                                |
| `style`      | `JSX.CSSProperties`                    | -           | Inline style                                       |
| `aria-label` | `string`                               | `'Stopka'`  | Etykieta accessibility                             |

### FooterLink Interface

| Prop       | Typ       | Domyślnie | Opis                                   |
| ---------- | --------- | --------- | -------------------------------------- |
| `label`    | `string`  | -         | **Wymagane.** Tekst linku              |
| `href`     | `string`  | -         | **Wymagane.** URL docelowy             |
| `external` | `boolean` | `false`   | Czy link prowadzi na zewnętrzną stronę |

### SocialLink Interface

| Prop       | Typ                 | Domyślnie | Opis                                        |
| ---------- | ------------------- | --------- | ------------------------------------------- |
| `platform` | `string`            | -         | **Wymagane.** Nazwa platformy               |
| `href`     | `string`            | -         | **Wymagane.** URL do profilu                |
| `icon`     | `ComponentChildren` | -         | Ikona platformy (fallback to platform name) |

### Warianty

**`default`** - standardowy footer z podstawowym stylem
**`minimal`** - uproszczony footer bez dodatkowych elementów
**`extended`** - rozbudowany footer z sekcjami i social media

## 🎨 Stylowanie

### CSS Custom Properties

```css
.custom-footer {
  /* Tło i kolory */
  --footer-background: var(--md-sys-color-surface);
  --footer-color: var(--md-sys-color-on-surface-variant);
  --footer-border: var(--md-sys-color-outline-variant);

  /* Spacing */
  --footer-padding: 16px 24px;
  --footer-min-height: 56px;

  /* Cienie */
  --footer-shadow: var(--md-sys-elevation-level1);

  /* Przejścia */
  --footer-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* Linki */
  --footer-link-color: var(--md-sys-color-primary);
  --footer-link-hover: var(--md-sys-color-primary-dark);
}
```

### Responsywny footer

```scss
.footer {
  @media (max-width: $breakpoint-sm) {
    padding: var(--space-md) var(--space-lg);
    flex-direction: column;
    gap: var(--space-md);
    text-align: center;

    .footer-nav {
      ul {
        flex-direction: column;
        gap: var(--space-sm);
      }
    }

    .footer-social {
      justify-content: center;
    }
  }

  @media (min-width: $breakpoint-lg) {
    padding: var(--space-xl) var(--space-2xl);
  }
}
```

### Custom styles dla extended variant

```tsx
<Footer
  variant="extended"
  className="custom-extended-footer"
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  }}
>
  <div>Extended content</div>
</Footer>
```

```scss
.custom-extended-footer {
  .footer-main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-xl);
    margin-bottom: var(--space-xl);
  }

  .footer-section {
    h3,
    h4 {
      color: white;
      margin-bottom: var(--space-md);
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: var(--space-sm);
      }
    }

    a {
      color: rgba(255, 255, 255, 0.8);

      &:hover {
        color: white;
      }
    }
  }
}
```

## ♿ Accessibility

### Role i struktura semantyczna

```tsx
<Footer aria-label="Site footer">
  <nav aria-label="Footer navigation">
    <ul>
      <li>
        <a href="/privacy">Privacy Policy</a>
      </li>
      <li>
        <a href="/terms">Terms of Service</a>
      </li>
    </ul>
  </nav>

  <div role="complementary" aria-label="Company information">
    <p>© 2025 Company Name. All rights reserved.</p>
  </div>

  <div role="complementary" aria-label="Social media links">
    <a href="#" aria-label="Follow us on Twitter">
      <TwitterIcon aria-hidden="true" />
    </a>
  </div>
</Footer>
```

### Keyboard navigation

```tsx
function AccessibleFooter() {
  return (
    <Footer
      links={[
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Contact', href: '/contact' },
      ]}
      social={[
        {
          platform: 'Twitter',
          href: 'https://twitter.com/company',
          icon: <TwitterIcon aria-hidden="true" />,
        },
      ]}
    >
      {/* Wszystkie linki automatycznie obsługują keyboard navigation */}
    </Footer>
  );
}
```

### Focus management

```scss
.footer {
  a {
    &:focus {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
      border-radius: 4px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }

  // Visible focus for keyboard users
  &:focus-within {
    .footer-nav a {
      position: relative;

      &:focus::after {
        content: '';
        position: absolute;
        inset: -4px;
        border: 2px solid var(--md-sys-color-primary);
        border-radius: 4px;
      }
    }
  }
}
```

### Screen readers

```tsx
<Footer aria-label="Website footer with navigation and company information">
  <nav aria-label="Footer site links">
    <ul>
      <li>
        <a href="/about" aria-describedby="about-desc">
          About Us
          <span id="about-desc" className="sr-only">
            Learn more about our company and mission
          </span>
        </a>
      </li>
    </ul>
  </nav>

  <div aria-label="Copyright and legal information">
    <p>© 2025 Company. All rights reserved.</p>
  </div>

  <div aria-label="Connect with us on social media">
    {socialLinks.map((link) => (
      <a
        key={link.platform}
        href={link.href}
        aria-label={`Follow us on ${link.platform}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span aria-hidden="true">{link.icon}</span>
      </a>
    ))}
  </div>
</Footer>
```

## 🧪 Testowanie

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import { Footer } from 'preact-aurora-ui';

test('renderuje footer z podstawową zawartością', () => {
  render(<Footer copyright="© 2025 Test Company">Additional content</Footer>);

  expect(screen.getByText('© 2025 Test Company')).toBeInTheDocument();
  expect(screen.getByText('Additional content')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renderuje linki nawigacyjne', () => {
  const links = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  render(<Footer links={links} />);

  expect(screen.getByText('Privacy')).toBeInTheDocument();
  expect(screen.getByText('Terms')).toBeInTheDocument();
  expect(screen.getByText('Privacy').closest('a')).toHaveAttribute('href', '/privacy');
});
```

### Testy wariantów

```tsx
test('aplikuje prawidłowe klasy dla wariantów', () => {
  const { rerender } = render(<Footer variant="minimal" />);

  expect(screen.getByRole('contentinfo')).toHaveClass('footer--variant-minimal');

  rerender(<Footer variant="extended" elevation={2} sticky />);

  const footer = screen.getByRole('contentinfo');
  expect(footer).toHaveClass('footer--variant-extended');
  expect(footer).toHaveClass('footer--elevation-2');
  expect(footer).toHaveClass('footer--sticky');
});
```

### Testy external links

```tsx
test('obsługuje external links prawidłowo', () => {
  const links = [
    { label: 'Internal', href: '/internal' },
    { label: 'External', href: 'https://external.com', external: true },
  ];

  render(<Footer links={links} />);

  const internalLink = screen.getByText('Internal').closest('a');
  const externalLink = screen.getByText('External').closest('a');

  expect(internalLink).not.toHaveAttribute('target');
  expect(internalLink).not.toHaveAttribute('rel');

  expect(externalLink).toHaveAttribute('target', '_blank');
  expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
});
```

### Testy social links

```tsx
test('renderuje social media linki', () => {
  const socialLinks = [
    { platform: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
    { platform: 'GitHub', href: 'https://github.com', icon: '🐙' },
  ];

  render(<Footer social={socialLinks} />);

  expect(screen.getByLabelText('Twitter link')).toBeInTheDocument();
  expect(screen.getByLabelText('GitHub link')).toBeInTheDocument();
  expect(screen.getByText('🐦')).toBeInTheDocument();
});
```

### Testy accessibility

```tsx
test('ma poprawną strukturę accessibility', () => {
  render(<Footer aria-label="Main footer" links={[{ label: 'Contact', href: '/contact' }]} />);

  const footer = screen.getByRole('contentinfo');
  expect(footer).toHaveAttribute('aria-label', 'Main footer');

  const nav = screen.getByLabelText('Footer links');
  expect(nav).toBeInTheDocument();
});
```

## 📚 Przykłady zaawansowane

### Footer z newsletter signup

```tsx
function NewsletterFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    try {
      await subscribeToNewsletter(email);
      setSubscribed(true);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <Footer variant="extended">
      <div className="newsletter-footer">
        <div className="footer-content">
          <h3>Stay in the loop</h3>
          <p>Get the latest updates and offers directly in your inbox.</p>

          {!subscribed ? (
            <div className="newsletter-form">
              <TextField
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Enter your email"
                required
              />
              <Button onClick={handleSubscribe} disabled={!email}>
                Subscribe
              </Button>
            </div>
          ) : (
            <div className="success-message">✅ Thanks for subscribing!</div>
          )}
        </div>
      </div>
    </Footer>
  );
}
```

### Footer z theme toggle

```tsx
function ThemedFooter() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Footer variant="minimal" copyright="© 2025 My App">
      <div className="footer-controls">
        <span>Theme:</span>
        <Button
          variant="text"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </Button>
      </div>
    </Footer>
  );
}
```

### Footer z language selector

```tsx
function MultiLanguageFooter() {
  const { language, setLanguage, t } = useI18n();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <Footer
      copyright={t('footer.copyright')}
      links={[
        { label: t('footer.privacy'), href: '/privacy' },
        { label: t('footer.terms'), href: '/terms' },
      ]}
    >
      <div className="language-selector">
        <Select value={language} onChange={setLanguage} aria-label="Select language">
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </Select>
      </div>
    </Footer>
  );
}
```

## ❓ FAQ

**P: Jak zrobić sticky footer na dole strony?**  
O: Użyj CSS flexbox na body i ustaw footer na `margin-top: auto`:

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto;
}
```

**P: Dlaczego footer nie jest na dole gdy jest mało treści?**  
O: Użyj `sticky={true}` lub ustaw odpowiedni layout w CSS (flexbox na całą wysokość).

**P: Jak dodać animacje do footera?**  
O: Użyj CSS transitions lub bibliotek animacji:

```scss
.footer {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-2);
  }
}
```

**P: Czy mogę mieć różne footery na różnych stronach?**  
O: Tak, używaj conditional rendering lub różnych komponentów Footer.

**P: Jak obsłużyć bardzo długie listy linków?**  
O: Użyj wariantu `extended` i organizuj linki w kolumny lub kategorie.

**P: Dlaczego social linki nie otwierają się w nowej karcie?**  
O: Upewnij się że mają ustawione `external: true` lub dodaj `target="_blank"` ręcznie.

---

**Powiązane komponenty:**

- [Header](../Header/README.md) - Nagłówek aplikacji
- [Layout](../Layout/README.md) - Struktura strony
- [Container](../Container/README.md) - Wrapper treści
- [Text](../Text/README.md) - Komponenty tekstowe  
  A: Add a text node or `span` element with the copyright information within the `children` of the `Footer` component.

**Q: How do I add links to the footer?**  
A: Add `a` elements with the appropriate `href` attributes within the `children` of the `Footer` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
