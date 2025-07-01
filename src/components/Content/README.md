# Content

A main content area component that provides flexible layout options for application content with Material Design 3 principles.

## Installation

```bash
npm install @preact-aurora-ui/components@0.0.13
```

## Basic Usage

```tsx
import { Content } from '@preact-aurora-ui/components';

function App() {
  return (
    <Content>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard content area.</p>
    </Content>
  );
}
```

## API Reference

### Props

| Prop         | Type                                                | Default     | Description                         |
| ------------ | --------------------------------------------------- | ----------- | ----------------------------------- |
| `children`   | `ComponentChildren`                                 | -           | Content to display in the main area |
| `className`  | `string`                                            | `''`        | Additional CSS classes              |
| `style`      | `JSX.CSSProperties`                                 | -           | Inline styles                       |
| `aria-label` | `string`                                            | `'Content'` | Accessibility label                 |
| `padding`    | `boolean \| 'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `true`      | Internal padding amount             |
| `maxWidth`   | `string \| number`                                  | -           | Maximum width constraint            |
| `centered`   | `boolean`                                           | `false`     | Center content horizontally         |
| `scrollable` | `boolean`                                           | `true`      | Enable scrolling                    |
| `variant`    | `'default' \| 'article' \| 'dashboard' \| 'form'`   | `'default'` | Content variant styling             |

## Variants

### Default Content

```tsx
<Content>
  <h1>Standard Content</h1>
  <p>Basic content area with default styling.</p>
</Content>
```

### Article Content

```tsx
<Content variant="article" maxWidth="800px" centered>
  <article>
    <h1>Article Title</h1>
    <p>Long form content optimized for reading.</p>
  </article>
</Content>
```

### Dashboard Content

```tsx
<Content variant="dashboard" padding="lg">
  <div className="dashboard-grid">
    <Widget />
    <Chart />
    <Table />
  </div>
</Content>
```

### Form Content

```tsx
<Content variant="form" maxWidth="600px" centered>
  <form>
    <TextField label="Name" />
    <TextField label="Email" />
    <Button type="submit">Submit</Button>
  </form>
</Content>
```

## Advanced Usage

### Responsive Content with Padding

```tsx
<Content padding="xl" maxWidth="1200px" centered>
  <div className="responsive-layout">
    <MainContent />
    <Sidebar />
  </div>
</Content>
```

### Scrollable Content Area

```tsx
<Content scrollable={true} style={{ height: '400px' }}>
  <LongContentList />
</Content>
```

### Non-scrollable Fixed Content

```tsx
<Content scrollable={false} variant="dashboard">
  <FixedLayout />
</Content>
```

### Custom Width and Centering

```tsx
<Content maxWidth="900px" centered padding="lg">
  <CenteredContent />
</Content>
```

## Accessibility

The Content component follows WAI-ARIA guidelines:

- Uses `main` element with `role="main"`
- Provides descriptive `aria-label` for screen readers
- Maintains proper heading hierarchy within content
- Supports keyboard navigation through content
- Ensures sufficient color contrast for text content

### Screen Reader Support

```tsx
<Content aria-label="Dashboard main content">
  <h1>Dashboard Overview</h1>
  <section aria-labelledby="stats-heading">
    <h2 id="stats-heading">Statistics</h2>
    {/* Statistics content */}
  </section>
</Content>
```

## Theming

The component supports Material Design 3 theming through CSS custom properties:

```css
.content {
  --content-bg: var(--md-sys-color-background);
  --content-color: var(--md-sys-color-on-background);
  --content-padding-sm: var(--md-sys-spacing-2);
  --content-padding-md: var(--md-sys-spacing-4);
  --content-padding-lg: var(--md-sys-spacing-6);
  --content-padding-xl: var(--md-sys-spacing-8);
  --content-max-width: 1200px;
}
```

### Custom Theming

```css
.custom-content {
  --content-bg: var(--md-sys-color-surface-variant);
  --content-padding-md: 2rem;
  --content-border-radius: var(--md-sys-shape-corner-large);
}
```

## Integration

### With Layout Components

```tsx
import { AppLayout, Header, Sidebar, Content } from '@preact-aurora-ui/components';

function App() {
  return (
    <AppLayout>
      <Header>App Header</Header>
      <Sidebar nav={<Navigation />} />
      <Content variant="dashboard">
        <Dashboard />
      </Content>
    </AppLayout>
  );
}
```

### With Page Structure

```tsx
function BlogPost({ post }) {
  return (
    <Content variant="article" maxWidth="800px" centered>
      <article>
        <header>
          <h1>{post.title}</h1>
          <time dateTime={post.date}>{post.date}</time>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Content>
  );
}
```

### With Forms

```tsx
function ContactForm() {
  return (
    <Content variant="form" maxWidth="600px" centered padding="xl">
      <form>
        <TextField label="Name" required />
        <TextField label="Email" type="email" required />
        <TextField label="Message" multiline rows={4} />
        <Button type="submit" variant="filled">
          Send Message
        </Button>
      </form>
    </Content>
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Content } from '@preact-aurora-ui/components';

test('renders main content', () => {
  render(
    <Content>
      <h1>Test Content</h1>
    </Content>,
  );

  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByText('Test Content')).toBeInTheDocument();
});

test('applies variant styling', () => {
  render(
    <Content variant="article" data-testid="content">
      Content
    </Content>,
  );

  expect(screen.getByTestId('content')).toHaveClass('content--variant-article');
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(
    <Content>
      <h1>Main Content</h1>
      <p>Content description</p>
    </Content>,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## FAQ

**Q: What's the difference between Content variants?**
A: Each variant optimizes the content area for specific use cases:

- `default`: General purpose content
- `article`: Optimized for reading with better typography
- `dashboard`: Suitable for complex layouts with widgets
- `form`: Optimized for form layouts

**Q: How do I control content width?**
A: Use the `maxWidth` prop to set a maximum width, and `centered` to center the content horizontally.

**Q: Can I disable scrolling in the content area?**
A: Yes, set `scrollable={false}` to disable overflow scrolling. Useful for fixed layouts.

**Q: How do I customize padding?**
A: Use the `padding` prop with values like `'sm'`, `'md'`, `'lg'`, `'xl'`, or `false` to disable padding.

**Q: Is the Content component responsive?**
A: Yes, the component adapts to different screen sizes. You can combine it with responsive padding and max-width settings.

**Q: How do I integrate with routing?**
A: The Content component works well with any routing solution. Just wrap your route components inside Content.

**Q: Can I nest multiple Content components?**
A: While technically possible, it's not recommended as it can cause accessibility issues with multiple `main` landmarks. Use regular `div` or `section` elements for nested content areas.

[Link to Storybook story](https://your-storybook-url.com/content-component)

## FAQ

**Q: How do I add content to the content area?**  
A: Add any React components within the `children` of the `Content` component.

**Q: How do I style the content area?**  
A: Modify the CSS styles in `Content.module.scss` or override the CSS custom properties in your application's CSS or theme.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
