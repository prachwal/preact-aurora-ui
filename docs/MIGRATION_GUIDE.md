# Migration Guide

Guide for migrating to Aurora UI from other component libraries.

## From Material-UI (MUI)

### Component Mapping

| MUI Component      | Aurora UI Component | Notes                            |
| ------------------ | ------------------- | -------------------------------- |
| `AppBar`           | `Header`            | Enhanced with scroll behaviors   |
| `Drawer`           | `Sidebar`           | MD3 Navigation Drawer specs      |
| `Card`             | `Card`              | Full MD3 Card specifications     |
| `Button`           | `Button`            | MD3 variants (5 types)           |
| `Typography`       | CSS Classes         | Use MD3 typography tokens        |
| `Box`              | `Layout`            | Flexible layout container        |
| `Grid`             | `Grid`/`Row`/`Col`  | 12-column responsive system      |
| `Menu`             | `Menu`              | Enhanced with submenu support    |
| `Breadcrumbs`      | `Breadcrumbs`       | MD3 navigation enhancements      |
| `CircularProgress` | `Progress`          | Circular and linear variants     |
| `LinearProgress`   | `Progress`          | Combined into Progress component |

### Code Migration Examples

#### Basic Layout Migration

```tsx
// MUI
<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <AppBar position="static">
    <Toolbar>App Title</Toolbar>
  </AppBar>
  <Box sx={{ display: 'flex', flex: 1 }}>
    <Drawer variant="permanent">Navigation</Drawer>
    <Box component="main" sx={{ flex: 1, p: 3 }}>
      Content
    </Box>
  </Box>
</Box>

// Aurora UI
<Layout direction="column" fullHeight>
  <Header>App Title</Header>
  <Layout direction="row">
    <Sidebar variant="permanent">Navigation</Sidebar>
    <Content>Content</Content>
  </Layout>
</Layout>
```

#### Button Migration

```tsx
// MUI
<Button variant="contained" color="primary" startIcon={<Icon />}>
  Click Me
</Button>

// Aurora UI
<Button variant="filled" startIcon={<Icon />}>
  Click Me
</Button>
```

#### Progress Migration

```tsx
// MUI
<CircularProgress color="primary" />
<LinearProgress variant="determinate" value={75} />

// Aurora UI
<Progress variant="circular" color="primary" />
<Progress variant="linear" value={75} />
```

### Theme Migration

#### MUI Theme to Aurora UI

```tsx
// MUI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Aurora UI (CSS Custom Properties)
:root {
  --md-sys-color-primary: #1976d2;
  --md-sys-color-secondary: #dc004e;
}
```

## From Ant Design

### Component Mapping

| Ant Design   | Aurora UI     | Notes                           |
| ------------ | ------------- | ------------------------------- |
| `Layout`     | `Layout`      | Similar flex-based layout       |
| `Header`     | `Header`      | Enhanced with MD3 features      |
| `Sider`      | `Sidebar`     | Navigation drawer with collapse |
| `Content`    | `Content`     | Main content area               |
| `Button`     | `Button`      | MD3 button variants             |
| `Card`       | `Card`        | MD3 card specifications         |
| `Menu`       | `Menu`        | Hierarchical navigation         |
| `Breadcrumb` | `Breadcrumbs` | Path navigation                 |
| `Progress`   | `Progress`    | Circular and linear             |
| `Spin`       | `Progress`    | Loading indicators              |

### Code Migration Examples

#### Layout Migration

```tsx
// Ant Design
<Layout style={{ minHeight: '100vh' }}>
  <Header>Header</Header>
  <Layout>
    <Sider collapsible>Menu</Sider>
    <Content style={{ padding: 24 }}>Content</Content>
  </Layout>
</Layout>

// Aurora UI
<Layout direction="column" fullHeight>
  <Header>Header</Header>
  <Layout direction="row">
    <Sidebar>Menu</Sidebar>
    <Content>Content</Content>
  </Layout>
</Layout>
```

## From Chakra UI

### Component Mapping

| Chakra UI    | Aurora UI     | Notes              |
| ------------ | ------------- | ------------------ |
| `Box`        | `Layout`      | Flexible container |
| `Flex`       | `Layout`      | Use direction prop |
| `Button`     | `Button`      | MD3 variants       |
| `Card`       | `Card`        | MD3 card specs     |
| `Progress`   | `Progress`    | Combined component |
| `Breadcrumb` | `Breadcrumbs` | Navigation path    |

### Code Migration Examples

#### Flex Layout Migration

```tsx
// Chakra UI
<Flex direction="column" h="100vh">
  <Box>Header</Box>
  <Flex flex={1}>
    <Box w="250px">Sidebar</Box>
    <Box flex={1}>Content</Box>
  </Flex>
</Flex>

// Aurora UI
<Layout direction="column" fullHeight>
  <Header>Header</Header>
  <Layout direction="row">
    <Sidebar width="250px">Sidebar</Sidebar>
    <Content>Content</Content>
  </Layout>
</Layout>
```

## General Migration Steps

### 1. Install Aurora UI

```bash
npm install @aurora-ui/react
# or
yarn add @aurora-ui/react
```

### 2. Update Imports

```tsx
// Before
import { Button, Card } from '@mui/material';

// After
import { Button, Card } from '@aurora-ui/react';
```

### 3. Theme Setup

```tsx
// Add ThemeProvider to your app root
import { ThemeProvider } from '@aurora-ui/react';

function App() {
  return (
    <ThemeProvider theme="auto" storage="localStorage">
      <YourApp />
    </ThemeProvider>
  );
}
```

### 4. Update Component Props

Review component APIs and update props according to Aurora UI specifications.

### 5. Style Migration

Replace custom styles with MD3 design tokens:

```scss
// Before (custom CSS)
.my-button {
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
}

// After (MD3 tokens)
.my-button {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  border-radius: var(--md-sys-shape-corner-medium);
}
```

## Breaking Changes to Watch

### Component API Changes

- Some prop names may differ between libraries
- Event handler signatures may be different
- CSS class names follow BEM methodology

### Theme Structure

- Aurora UI uses CSS custom properties instead of JS theme objects
- Color system follows MD3 specifications
- Elevation system uses predefined levels

### Bundle Size

- Aurora UI is optimized for tree shaking
- Import only components you need
- Use production builds for optimal size

## Migration Tools

### Automated Migration (Planned)

We're working on codemods to automate common migration patterns:

```bash
npx @aurora-ui/migrate --from=mui --to=aurora-ui src/
```

### Manual Migration Checklist

- [ ] Replace component imports
- [ ] Update component props
- [ ] Migrate theme configuration
- [ ] Update custom styles to MD3 tokens
- [ ] Test responsive behavior
- [ ] Verify accessibility compliance
- [ ] Update tests and stories

## Support

### Migration Support

- Join our Discord community for migration help
- Check GitHub Discussions for common migration questions
- Review component documentation and examples

### Backwards Compatibility

Aurora UI maintains backwards compatibility within major versions:

- Existing APIs remain stable
- New features are additive
- Deprecation warnings before breaking changes

### Performance Considerations

- Aurora UI components are optimized for performance
- Tree shaking reduces bundle size
- CSS-in-JS overhead is eliminated with SCSS modules
- Theme switching is optimized for runtime performance

## Common Migration Issues

### Issue: Missing Component

**Problem**: Component exists in old library but not in Aurora UI
**Solution**: Check component mapping table or build custom component

### Issue: Different API

**Problem**: Component props don't match
**Solution**: Review API documentation and update props accordingly

### Issue: Theme Not Working

**Problem**: Colors/styles not applying correctly
**Solution**: Ensure ThemeProvider is set up and CSS custom properties are loaded

### Issue: Bundle Size Increase

**Problem**: Bundle size larger than expected
**Solution**: Verify tree shaking is working and import only needed components

### Issue: Accessibility Regression

**Problem**: Screen reader or keyboard navigation issues
**Solution**: Aurora UI components follow WCAG 2.1 AA - verify custom code doesn't override accessibility features
