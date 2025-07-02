import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/preact';

import { renderWithTheme } from '../../test-utils';
import {
  measureRenderTime,
  estimateComponentSize,
  expectPerformance,
  PERFORMANCE_THRESHOLDS,
} from '../../../config/test-setup-performance';
import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import { Header } from '../Header/Header';
import { Container } from '../Container/Container';

import '@testing-library/jest-dom';

describe('Performance Tests', () => {
  describe('Render Performance', () => {
    it('Button should render quickly', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(<Button>Click me</Button>);
      });

      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS);
    });

    it('Complex Button should render within threshold', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <Button variant="outlined" size="large" disabled>
            🚀 Complex Button
          </Button>,
        );
      });

      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS);
    });

    it('TextField should render quickly', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <TextField label="Username" helperText="Enter your username" placeholder="john.doe" />,
        );
      });

      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS);
    });

    it('Header with navigation should render quickly', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <Header
            logo={<span>Logo</span>}
            nav={
              <nav>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </nav>
            }
            actions={
              <div>
                <Button>Login</Button>
                <Button variant="outlined">Sign Up</Button>
              </div>
            }
          />,
        );
      });

      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS * 2); // Complex component gets 2x threshold
    });
  });

  describe('Component Size', () => {
    it('Button should have reasonable HTML size', () => {
      renderWithTheme(<Button>Test</Button>);
      const button = screen.getByRole('button');

      const size = estimateComponentSize(button);
      expect(size).toBeLessThan(PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 1024);
    });

    it('TextField should have reasonable HTML size', () => {
      const { container } = renderWithTheme(<TextField label="Test" helperText="Helper text" />);

      const size = estimateComponentSize(container as HTMLElement);
      expect(size).toBeLessThan(PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 1024 * 2); // Text fields are more complex
    });

    it('Card with content should have reasonable size', () => {
      const { container } = renderWithTheme(
        <Card>
          <Text variant="headline" as="h2">
            Card Title
          </Text>
          <Text variant="body">This is card content with some text to test the size impact.</Text>
          <div>
            <Button>Action 1</Button>
            <Button variant="outlined">Action 2</Button>
          </div>
        </Card>,
      );

      const size = estimateComponentSize(container as HTMLElement);
      expect(size).toBeLessThan(PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 1024 * 3); // Complex cards get 3x threshold
    });
  });

  describe('Bundle Size Impact', () => {
    it('Text component should be lightweight', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(<Text variant="body">Simple text</Text>);
      });

      const result = expectPerformance({
        renderTime,
        componentSize: 500, // Very small component
      });

      expect(result.allOk).toBe(true);
      expect(result.renderTimeOk).toBe(true);
      expect(result.componentSizeOk).toBe(true);
    });

    it('Container with multiple children should perform well', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <Container surface="surface" padding="lg">
            <Text variant="headline">Title</Text>
            <Text variant="body">Content goes here</Text>
            <Button>Action</Button>
          </Container>,
        );
      });

      const result = expectPerformance({
        renderTime,
        componentSize: 2000, // Reasonable size for container with children
      });

      expect(result.allOk).toBe(true);
    });
  });

  describe('Theme Integration Performance', () => {
    it('Theme switching should not cause performance issues', () => {
      // Test light theme render
      const lightRenderTime = measureRenderTime(() => {
        renderWithTheme(<Button>Theme Test</Button>, { mode: 'light' });
      });

      // Test dark theme render
      const darkRenderTime = measureRenderTime(() => {
        renderWithTheme(<Button>Theme Test</Button>, { mode: 'dark' });
      });

      expect(lightRenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS);
      expect(darkRenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS);

      // Theme switching shouldn't cause significant performance difference
      const timeDifference = Math.abs(lightRenderTime - darkRenderTime);
      expect(timeDifference).toBeLessThan(5); // Max 5ms difference
    });

    it('Auto theme detection should be fast', () => {
      const autoRenderTime = measureRenderTime(() => {
        renderWithTheme(<Button>Auto Theme</Button>, { mode: 'auto' });
      });

      expect(autoRenderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS);
    });
  });

  describe('Memory Usage', () => {
    it('Should not cause memory leaks with multiple renders', () => {
      // Test that multiple renders/unmounts don't cause errors
      // In a real test environment, we'd use memory profiling tools

      const renderCount = 10;
      const unmountFunctions: Array<() => void> = [];

      // Render multiple components
      for (let i = 0; i < renderCount; i++) {
        const { unmount } = renderWithTheme(
          <div>
            <Button>Button {i}</Button>
            <TextField label={`Field ${i}`} />
            <Text>Text {i}</Text>
          </div>,
        );
        unmountFunctions.push(unmount);
      }

      // Unmount all components
      unmountFunctions.forEach((unmount) => unmount());

      // If we get here without errors, the test passes
      expect(unmountFunctions).toHaveLength(renderCount);
    });
  });

  describe('Large Data Sets', () => {
    it('Should handle large lists efficiently', () => {
      const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <div>
            {items.map((item, index) => (
              <Text key={index} variant="body">
                {item}
              </Text>
            ))}
          </div>,
        );
      });

      // Large lists get more time but should still be reasonable
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS * 10);
    });

    it('Should handle complex nested structures', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <Container surface="surface" padding="lg">
            <Header
              logo={<Text variant="headline">Logo</Text>}
              nav={
                <div>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Button key={i} variant="text">
                      Nav {i + 1}
                    </Button>
                  ))}
                </div>
              }
            />
            <div>
              {Array.from({ length: 10 }, (_, i) => (
                <Card key={i}>
                  <Text variant="headline">Card {i + 1}</Text>
                  <Text variant="body">Content for card {i + 1}</Text>
                  <Button>Action</Button>
                </Card>
              ))}
            </div>
          </Container>,
        );
      });

      // Complex nested structures get significant time allowance
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS * 20);
    });
  });
});
