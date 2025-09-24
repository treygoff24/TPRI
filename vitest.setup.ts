import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

global.IntersectionObserver = class implements IntersectionObserver {
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  disconnect(): void {}
  observe(element: Element): void {
    this.callback(
      [
        {
          isIntersecting: true,
          target: element,
          intersectionRatio: 1,
          time: Date.now(),
          boundingClientRect: element.getBoundingClientRect(),
          intersectionRect: element.getBoundingClientRect(),
          rootBounds: null,
        },
      ],
      this,
    );
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void {}
};

global.ResizeObserver = class {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    prefetch,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }) => {
    void prefetch;
    return React.createElement("a", { href, ...props }, children);
  },
}));

vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }),
}));
