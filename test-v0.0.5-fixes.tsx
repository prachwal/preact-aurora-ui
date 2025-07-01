// Test imports - verification after v0.0.5 fixes
import {
  Button,
  Card,
  ThemeProvider,
  AppLayout,
  Text,
  Container,
  useTheme,
  useThemeColors, // Fixed export
  injectUtilityStyles // Fixed export from utils
} from './dist';

console.log('✅ All imports work correctly after v0.0.5 fixes!');

// Test component rendering
function TestApp() {
  const colors = useThemeColors();
  
  return (
    <ThemeProvider>
      <AppLayout>
        <Container surface="surface" padding="lg">
          <Text variant="headline-medium" color="primary">
            v0.0.5 fixes work correctly!
          </Text>
        </Container>
      </AppLayout>
    </ThemeProvider>
  );
}

export default TestApp;
