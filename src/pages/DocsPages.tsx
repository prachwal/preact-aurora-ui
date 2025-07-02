import { MarkdownPage } from './MarkdownPage';
import { ReadmePage } from './ReadmePage';

export function DocsReadmePage() {
  return <ReadmePage />;
}

export function DocsComponentsPage() {
  return (
    <MarkdownPage
      markdownFile="/docs/COMPONENTS.md"
      title="Components Overview"
      subtitle="Complete list of all 34 Aurora UI components"
    />
  );
}

export function DocsQuickStartPage() {
  return (
    <MarkdownPage
      markdownFile="/docs/QUICK_START.md"
      title="Quick Start Guide"
      subtitle="Get started with Aurora UI in minutes"
    />
  );
}
