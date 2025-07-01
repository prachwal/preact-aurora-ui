// Test v0.0.6 SCSS fixes
import {
  Button,
  Card,
  ThemeProvider,
  AppLayout,
  Text,
  Container,
  useTheme,
  useThemeColors,
  injectUtilityStyles
} from './dist';

console.log('✅ All imports work correctly after v0.0.6 SCSS fixes!');

// Test advanced components (should work now with fixed SCSS)
function TestApp() {
  const colors = useThemeColors();

  return (
    <ThemeProvider>
      <AppLayout header={<Text variant="headline-large">Fixed App</Text>}>
        <Container surface="surface" padding="lg">
          <Text variant="body-medium" color="primary">
            v0.0.6 SCSS fixes work correctly! 🎉
          </Text>
          <Button variant="filled">
            Test Button
          </Button>
        </Container>
      </AppLayout>
    </ThemeProvider>
  );
}

export default TestApp;
