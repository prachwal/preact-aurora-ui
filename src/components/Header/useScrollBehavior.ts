import { useState, useEffect, useRef } from 'preact/hooks';

export interface UseScrollBehaviorOptions {
  scrollBehavior?: 'fixed' | 'scroll' | 'hide' | 'elevate';
  scrollTarget?: HTMLElement | string;
  scrollThreshold?: number;
}

export interface UseScrollBehaviorResult {
  scrolled: boolean;
  hidden: boolean;
}

export function useScrollBehavior({
  scrollBehavior = 'fixed',
  scrollTarget,
  scrollThreshold = 10,
}: UseScrollBehaviorOptions = {}): UseScrollBehaviorResult {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (scrollBehavior === 'fixed' || scrollBehavior === 'scroll') {
      return;
    }

    let target: HTMLElement | Window = window;

    if (scrollTarget) {
      if (typeof scrollTarget === 'string') {
        const element = document.querySelector(scrollTarget);
        if (element) {
          target = element as HTMLElement;
        }
      } else {
        target = scrollTarget;
      }
    }

    const handleScroll = () => {
      const currentScrollY = target === window ? window.scrollY : (target as HTMLElement).scrollTop;

      // Update scrolled state for elevate behavior
      if (scrollBehavior === 'elevate') {
        setScrolled(currentScrollY > scrollThreshold);
      }

      // Update hidden state for hide behavior
      if (scrollBehavior === 'hide') {
        const isScrollingDown = currentScrollY > lastScrollY.current;
        const shouldHide = isScrollingDown && currentScrollY > scrollThreshold;
        setHidden(shouldHide);
      }

      lastScrollY.current = currentScrollY;
    };

    if (target === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      (target as HTMLElement).addEventListener('scroll', handleScroll, { passive: true });
    }

    // Initial call
    handleScroll();

    return () => {
      if (target === window) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        (target as HTMLElement).removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollBehavior, scrollTarget, scrollThreshold]);

  return { scrolled, hidden };
}
