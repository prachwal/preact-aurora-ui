// Utility do debugowania scroll i overflow problemów
export interface ScrollDebugInfo {
  element: Element;
  selector: string;
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  offsetWidth: number;
  offsetHeight: number;
  hasHorizontalScroll: boolean;
  hasVerticalScroll: boolean;
  overflowX: string;
  overflowY: string;
  computedStyles: {
    width: string;
    height: string;
    minWidth: string;
    maxWidth: string;
    boxSizing: string;
    padding: string;
    margin: string;
    border: string;
  };
}

export function getElementScrollDebugInfo(element: Element): ScrollDebugInfo {
  const computedStyle = window.getComputedStyle(element);

  return {
    element,
    selector: getElementSelector(element),
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
    offsetWidth: (element as HTMLElement).offsetWidth,
    offsetHeight: (element as HTMLElement).offsetHeight,
    hasHorizontalScroll: element.scrollWidth > element.clientWidth,
    hasVerticalScroll: element.scrollHeight > element.clientHeight,
    overflowX: computedStyle.overflowX,
    overflowY: computedStyle.overflowY,
    computedStyles: {
      width: computedStyle.width,
      height: computedStyle.height,
      minWidth: computedStyle.minWidth,
      maxWidth: computedStyle.maxWidth,
      boxSizing: computedStyle.boxSizing,
      padding: computedStyle.padding,
      margin: computedStyle.margin,
      border: computedStyle.border,
    },
  };
}

function getElementSelector(element: Element): string {
  let selector = element.tagName.toLowerCase();

  if (element.id) {
    selector += `#${element.id}`;
  }

  if (element.className) {
    const classes = element.className
      .toString()
      .split(" ")
      .filter((c) => c);
    selector += "." + classes.join(".");
  }

  return selector;
}

export function debugAllScrollableElements(): ScrollDebugInfo[] {
  const allElements = document.querySelectorAll("*");
  const scrollableElements: ScrollDebugInfo[] = [];

  allElements.forEach((element) => {
    const info = getElementScrollDebugInfo(element);

    // Dodaj do listy jeśli ma scroll lub overflow
    if (
      info.hasHorizontalScroll ||
      info.hasVerticalScroll ||
      info.overflowX !== "visible" ||
      info.overflowY !== "visible"
    ) {
      scrollableElements.push(info);
    }
  });

  return scrollableElements;
}

export function logScrollDebug(): void {
  console.group("🔍 SCROLL DEBUG REPORT");

  // Window/viewport info
  console.group("📊 Viewport Info");
  console.log("Window inner size:", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
  console.log("Document scroll size:", {
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  });
  console.log("Document client size:", {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  console.groupEnd();

  // Body scroll info
  const bodyInfo = getElementScrollDebugInfo(document.body);
  console.group("🌐 Body Element");
  console.table(bodyInfo);
  console.groupEnd();

  // All scrollable elements
  const scrollableElements = debugAllScrollableElements();

  console.group("📋 All Scrollable/Overflow Elements");
  console.log(
    `Found ${scrollableElements.length} elements with scroll/overflow`
  );

  scrollableElements.forEach((info, index) => {
    console.group(`${index + 1}. ${info.selector}`);

    if (info.hasHorizontalScroll) {
      console.warn("🔴 HAS HORIZONTAL SCROLL!", {
        scrollWidth: info.scrollWidth,
        clientWidth: info.clientWidth,
        difference: info.scrollWidth - info.clientWidth,
      });
    }

    if (info.hasVerticalScroll) {
      console.info("🟡 Has vertical scroll", {
        scrollHeight: info.scrollHeight,
        clientHeight: info.clientHeight,
        difference: info.scrollHeight - info.clientHeight,
      });
    }

    console.table({
      "Scroll Width": info.scrollWidth,
      "Client Width": info.clientWidth,
      "Offset Width": info.offsetWidth,
      "Scroll Height": info.scrollHeight,
      "Client Height": info.clientHeight,
      "Offset Height": info.offsetHeight,
      "Overflow X": info.overflowX,
      "Overflow Y": info.overflowY,
    });

    console.log("Computed Styles:", info.computedStyles);
    console.groupEnd();
  });

  console.groupEnd();

  // Horizontal scroll culprits
  const horizontalScrollElements = scrollableElements.filter(
    (info) => info.hasHorizontalScroll
  );
  if (horizontalScrollElements.length > 0) {
    console.group("🚨 HORIZONTAL SCROLL CULPRITS");
    horizontalScrollElements.forEach((info) => {
      console.error(`Element: ${info.selector}`, {
        element: info.element,
        scrollWidth: info.scrollWidth,
        clientWidth: info.clientWidth,
        overflowing: info.scrollWidth - info.clientWidth,
        styles: info.computedStyles,
      });
    });
    console.groupEnd();
  }

  console.groupEnd();
}

export function startScrollMonitoring(): () => void {
  let timeoutId: number;

  const monitor = () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      console.log("📏 Scroll state changed, running debug...");
      logScrollDebug();
    }, 500);
  };

  // Monitor resize
  window.addEventListener("resize", monitor);

  // Monitor scroll
  window.addEventListener("scroll", monitor);

  // Monitor DOM changes
  const observer = new MutationObserver(monitor);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  });

  // Initial run
  logScrollDebug();

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", monitor);
    window.removeEventListener("scroll", monitor);
    observer.disconnect();
    clearTimeout(timeoutId);
  };
}
