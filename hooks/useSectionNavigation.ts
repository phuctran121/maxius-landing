"use client";

import { useState, useEffect, useRef, useCallback } from "react";

function isInsideScrollable(e: WheelEvent | TouchEvent) {
  let node = e.target as HTMLElement | null;
  while (node && node !== document.body) {
    const style = window.getComputedStyle(node);
    const canScroll =
      /(auto|scroll)/.test(style.overflowY) &&
      node.scrollHeight > node.clientHeight;

    if (canScroll) {
      return true; // trong div scrollable thì không đổi section
    }
    node = node.parentElement;
  }
  return false;
}

export const useSectionNavigation = (totalSections: number, delay = 800) => {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const isAnimating = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const startY = useRef<number | null>(null);

  const navigate = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const next = Math.max(0, Math.min(index, totalSections - 1));
      setCurrent(next);
      currentRef.current = next;

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        isAnimating.current = false;
      }, delay);
    },
    [totalSections, delay]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // zoom
      if (isInsideScrollable(e)) return;

      navigate(e.deltaY > 0 ? currentRef.current + 1 : currentRef.current - 1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") navigate(currentRef.current + 1);
      if (e.key === "ArrowUp") navigate(currentRef.current - 1);
    };

    // --- Mobile touch support ---
    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (startY.current === null) return;
      const endY = e.changedTouches[0].clientY;
      const diff = startY.current - endY;

      // threshold để tránh nhảy section khi chạm nhẹ
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          navigate(currentRef.current + 1); // swipe lên → next section
        } else {
          navigate(currentRef.current - 1); // swipe xuống → prev section
        }
      }
      startY.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [navigate]);

  return { current, navigate };
};
