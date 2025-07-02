import { screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { DocsHomepage } from './DocsHomepage';
import { renderWithTheme } from '../../test-utils';
import '@testing-library/jest-dom';

describe('DocsHomepage', () => {
  it('renders with default props', () => {
    renderWithTheme(<DocsHomepage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('🌟 Aurora UI')).toBeInTheDocument();
    expect(screen.getByText('Modern Material Design 3 components for Preact applications')).toBeInTheDocument();
  });

  it('renders custom title and subtitle', () => {
    renderWithTheme(
      <DocsHomepage
        title="Custom Title"
        subtitle="Custom subtitle text"
      />
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle text')).toBeInTheDocument();
  });

  it('renders stats correctly', () => {
    const customStats = [
      { number: '42', label: 'Tests' },
      { number: '100%', label: 'Coverage' },
    ];

    renderWithTheme(<DocsHomepage stats={customStats} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Tests')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Coverage')).toBeInTheDocument();
  });

  it('renders cards with links', () => {
    const customCards = [
      {
        title: 'Test Card',
        description: 'Test description',
        link: '/test-link',
        buttonText: 'Test Button',
        icon: '🧪',
      },
    ];

    renderWithTheme(<DocsHomepage cards={customCards} />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('🧪')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Test Button' });
    expect(link).toHaveAttribute('href', '/test-link');
  });

  it('handles external links correctly', () => {
    const externalCards = [
      {
        title: 'External Link',
        description: 'External description',
        link: 'https://external.com',
        buttonText: 'External Button',
      },
    ];

    renderWithTheme(<DocsHomepage cards={externalCards} />);

    const link = screen.getByRole('link', { name: 'External Button' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders children content', () => {
    renderWithTheme(
      <DocsHomepage>
        <div>Custom children content</div>
      </DocsHomepage>
    );

    expect(screen.getByText('Custom children content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<DocsHomepage className="custom-class" />);

    const container = screen.getByLabelText('Aurora UI Documentation Homepage');
    expect(container).toHaveClass('custom-class');
  });

  it('renders footer text', () => {
    renderWithTheme(<DocsHomepage footerText="Custom footer text" />);

    expect(screen.getByText('Custom footer text')).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();

    renderWithTheme(<DocsHomepage />);

    // First element in tab order is the theme toggle
    const themeToggle = screen.getByRole('button', { name: /switch to/i });

    await user.tab();
    expect(themeToggle).toHaveFocus();

    // Second element should be the first link
    await user.tab();
    const firstLink = screen.getAllByRole('link')[0];
    expect(firstLink).toHaveFocus();
  });

  it('handles click events on buttons', async () => {
    const user = userEvent.setup();

    renderWithTheme(<DocsHomepage />);

    const button = screen.getByRole('link', { name: 'View Documentation' });

    await user.click(button);
    expect(button).toHaveAttribute('href', '/docs/readme');
  });
});
