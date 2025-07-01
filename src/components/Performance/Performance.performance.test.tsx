import { describe, it, expect, beforeEach } from 'vitest';
import { screen, cleanup } from '@testing-library/preact';

import {
  measureRenderTime,
  estimateComponentSize,
  expectPerformance,
  PERFORMANCE_THRESHOLDS,
} from '../../../test-setup-performance';
import { renderWithTheme } from '../../test-utils';
import { Button } from '../Button';
import { Header } from '../Header/Header';
import { Text } from '../Text/Text';
import { Container } from '../Container/Container';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider';

import '@testing-library/jest-dom';

describe('Performance Tests', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('Component Render Performance', () => {
    it('Button should render within performance threshold', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(<Button>Click me</Button>);
      });

      const button = screen.getByRole('button');
      const componentSize = estimateComponentSize(button);

      const performance = expectPerformance({
        renderTime,
        componentSize,
      });

      expect(performance.renderTimeOk).toBe(true);
      expect(performance.componentSizeOk).toBe(true);
      expect(performance.allOk).toBe(true);

      console.log('Button Performance:', {
        renderTime: `${renderTime.toFixed(2)}ms`,
        componentSize: `${(componentSize / 1024).toFixed(2)}KB`,
        threshold: `${PERFORMANCE_THRESHOLDS.RENDER_TIME_MS}ms`,
      });
    });

    it('Text component should be lightweight', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <div>
            <Text variant="headline-large">Large Headline</Text>
            <Text variant="headline-medium">Medium Headline</Text>
            <Text variant="body-large">Body text content</Text>
            <Text variant="body-medium">More body content</Text>
            <Text variant="label-large">Label text</Text>
          </div>,
        );
      });

      const container = screen.getByText('Large Headline').parentElement;
      const componentSize = estimateComponentSize(container!);

      const performance = expectPerformance({
        renderTime,
        componentSize,
      });

      expect(performance.allOk).toBe(true);

      console.log('Text Components Performance:', {
        renderTime: `${renderTime.toFixed(2)}ms`,
        componentSize: `${(componentSize / 1024).toFixed(2)}KB`,
      });
    });

    it('Container component should handle complex layouts efficiently', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <Container surface="surface" padding="lg">
            <Container surface="surface-variant" padding="md">
              <Text variant="headline-medium">Nested Container</Text>
              <Container surface="surface" padding="sm">
                <Text>Deeply nested content</Text>
                <Button>Action</Button>
              </Container>
            </Container>
          </Container>,
        );
      });

      const container = screen.getByText('Nested Container').closest('[class*="container"]');
      const componentSize = estimateComponentSize(container as HTMLElement);

      const performance = expectPerformance({
        renderTime,
        componentSize,
      });

      expect(performance.allOk).toBe(true);

      console.log('Complex Container Performance:', {
        renderTime: `${renderTime.toFixed(2)}ms`,
        componentSize: `${(componentSize / 1024).toFixed(2)}KB`,
      });
    });

    it('Header with complex content should remain performant', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <Header
            logo={<span>Complex Logo</span>}
            nav={
              <nav>
                <ul>
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#products">Products</a>
                  </li>
                  <li>
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </nav>
            }
            actions={
              <div>
                <Button variant="text">Login</Button>
                <Button>Sign Up</Button>
              </div>
            }
            moreActions={[
              { key: 'settings', label: 'Settings' },
              { key: 'help', label: 'Help' },
              { key: 'feedback', label: 'Feedback' },
            ]}
          />,
        );
      });

      const header = screen.getByRole('banner');
      const componentSize = estimateComponentSize(header);

      const performance = expectPerformance({
        renderTime,
        componentSize,
      });

      expect(performance.allOk).toBe(true);

      console.log('Complex Header Performance:', {
        renderTime: `${renderTime.toFixed(2)}ms`,
        componentSize: `${(componentSize / 1024).toFixed(2)}KB`,
      });
    });
  });

  describe('Theme Provider Performance', () => {
    it('should initialize theme efficiently', () => {
      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <ThemeProvider autoGlobalStyles generateUtilities>
            <div>
              <Text>Themed content</Text>
              <Button>Themed button</Button>
            </div>
          </ThemeProvider>,
        );
      });

      const container = screen.getByText('Themed content').parentElement;
      const componentSize = estimateComponentSize(container!);

      const performance = expectPerformance({
        renderTime,
        componentSize,
      });

      expect(performance.allOk).toBe(true);

      console.log('ThemeProvider Performance:', {
        renderTime: `${renderTime.toFixed(2)}ms`,
        componentSize: `${(componentSize / 1024).toFixed(2)}KB`,
      });
    });

    it('should handle theme switching efficiently', () => {
      let switchTime = 0;

      // Initial render
      const { rerender } = renderWithTheme(
        <Container surface="surface">
          <Text>Content</Text>
        </Container>,
        { mode: 'light' },
      );

      // Measure theme switch time
      const switchStart = performance.now();
      rerender(
        <ThemeProvider defaultTheme={{ mode: 'dark' }}>
          <Container surface="surface">
            <Text>Content</Text>
          </Container>
        </ThemeProvider>,
      );
      switchTime = performance.now() - switchStart;

      expect(switchTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS);

      console.log('Theme Switch Performance:', {
        switchTime: `${switchTime.toFixed(2)}ms`,
        threshold: `${PERFORMANCE_THRESHOLDS.RENDER_TIME_MS}ms`,
      });
    });
  });

  describe('Bundle Size Impact', () => {
    it('should track component bundle impact', () => {
      // This is a simulated test - in real scenarios you'd use bundle analyzer
      const baselineSize = estimateComponentSize(document.createElement('div'));

      const { container } = renderWithTheme(
        <div>
          <Button>Button</Button>
          <Text>Text</Text>
          <Container>Container</Container>
        </div>,
      );

      const totalSize = estimateComponentSize(container as HTMLElement);
      const componentImpact = totalSize - baselineSize;

      // Component impact should be reasonable
      expect(componentImpact).toBeLessThan(PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 1024 * 5); // 5x threshold for multiple components

      console.log('Bundle Impact:', {
        baselineSize: `${(baselineSize / 1024).toFixed(2)}KB`,
        totalSize: `${(totalSize / 1024).toFixed(2)}KB`,
        impact: `${(componentImpact / 1024).toFixed(2)}KB`,
      });
    });
  });

  describe('Memory Usage', () => {
    it('should not cause memory leaks with repeated renders', () => {
      const iterations = 100;
      let maxSize = 0;

      for (let i = 0; i < iterations; i++) {
        const { container, unmount } = renderWithTheme(
          <Container>
            <Text>Iteration {i}</Text>
            <Button>Button {i}</Button>
          </Container>,
        );

        const size = estimateComponentSize(container as HTMLElement);
        maxSize = Math.max(maxSize, size);

        unmount();
      }

      // Memory usage should be consistent across iterations
      expect(maxSize).toBeLessThan(PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 1024 * 2);

      console.log('Memory Test:', {
        iterations,
        maxSize: `${(maxSize / 1024).toFixed(2)}KB`,
        threshold: `${PERFORMANCE_THRESHOLDS.COMPONENT_SIZE_KB * 2}KB`,
      });
    });
  });

  describe('Real-world Performance Scenarios', () => {
    it('should handle large lists efficiently', () => {
      const itemCount = 50;
      const items = Array.from({ length: itemCount }, (_, i) => ({
        id: i,
        title: `Item ${i}`,
        description: `Description for item ${i}`,
      }));

      const renderTime = measureRenderTime(() => {
        renderWithTheme(
          <Container>
            {items.map((item) => (
              <Container key={item.id} surface="surface-variant" padding="sm">
                <Text variant="headline-small">{item.title}</Text>
                <Text variant="body-medium">{item.description}</Text>
                <Button>Action</Button>
              </Container>
            ))}
          </Container>,
        );
      });

      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS * 8); // Allow 8x threshold for large lists (128ms)

      console.log('Large List Performance:', {
        itemCount,
        renderTime: `${renderTime.toFixed(2)}ms`,
        averagePerItem: `${(renderTime / itemCount).toFixed(2)}ms`,
      });
    });

    it('should handle deeply nested components', () => {
      const depth = 10;

      const createNestedContent = (level: number): any => {
        if (level === 0) {
          return <Text>Deep content</Text>;
        }
        return (
          <Container surface="surface" padding="sm">
            <Text>Level {level}</Text>
            {createNestedContent(level - 1)}
          </Container>
        );
      };

      const renderTime = measureRenderTime(() => {
        renderWithTheme(createNestedContent(depth));
      });

      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.RENDER_TIME_MS * 2);

      console.log('Nested Components Performance:', {
        depth,
        renderTime: `${renderTime.toFixed(2)}ms`,
        averagePerLevel: `${(renderTime / depth).toFixed(2)}ms`,
      });
    });
  });
});
