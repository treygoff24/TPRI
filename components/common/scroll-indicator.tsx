"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const ratio = height > 0 ? scrollTop / height : 0;
      setProgress(Math.min(100, Math.max(0, ratio * 100)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-accent to-secondary transition-transform"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
