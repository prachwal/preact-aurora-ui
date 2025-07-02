import { useEffect, useState } from 'preact/hooks';
import { PageHeader } from '../components/PageHeader';
import { Content } from '../components/Content';

interface MarkdownPageProps {
  markdownFile: string;
  title: string;
  subtitle?: string;
}

/**
 * MarkdownPage - A component that renders markdown files dynamically
 * This is a simple implementation for the docs routing
 */
export function MarkdownPage({ markdownFile, title, subtitle }: MarkdownPageProps) {
  const [content, setContent] = useState<string>('Loading...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        // For now, show a placeholder - in a real implementation
        // you would fetch and render the markdown file
        const placeholderContent = `
          <div style="padding: var(--space-xl); color: var(--color-on-surface);">
            <h2>📄 ${title}</h2>
            ${subtitle ? `<p style="color: var(--color-on-surface-variant); margin-bottom: var(--space-lg);">${subtitle}</p>` : ''}
            <div style="background: var(--md-sys-color-surface-container-low); padding: var(--space-xl); border-radius: 8px; border: 1px solid var(--color-outline-variant);">
              <p><strong>📍 Note:</strong> This page would render the markdown content from <code>${markdownFile}</code></p>
              <p>You can implement markdown rendering using libraries like:</p>
              <ul>
                <li><strong>marked</strong> - For markdown parsing</li>
                <li><strong>highlight.js</strong> - For code syntax highlighting</li>
                <li><strong>remark/rehype</strong> - For advanced markdown processing</li>
              </ul>
              <p>The markdown file should be fetched and rendered here dynamically.</p>
            </div>
            <div style="margin-top: var(--space-xl);">
              <a href="/docs" style="color: var(--color-primary); text-decoration: none;">← Back to Documentation Home</a>
            </div>
          </div>
        `;
        setContent(placeholderContent);
      } catch (err) {
        setError(`Failed to load ${markdownFile}: ${err}`);
        setContent(`<p style="color: var(--color-error);">Error loading content: ${error}</p>`);
      }
    };

    loadMarkdown();
  }, [markdownFile, title, subtitle, error]);

  return (
    <Content variant="article" maxWidth="800px">
      <PageHeader
        title={title}
        subtitle={subtitle || `Documentation from ${markdownFile}`}
        actions={
          <a
            href="/docs"
            style={{
              color: 'var(--color-primary)',
              textDecoration: 'none',
              padding: 'var(--space-sm) var(--space-md)',
              border: '1px solid var(--color-outline)',
              borderRadius: '4px',
              fontSize: 'var(--font-size-sm)'
            }}
          >
            ← Back
          </a>
        }
      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Content>
  );
}
