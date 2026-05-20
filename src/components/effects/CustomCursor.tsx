"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = "none";
      document.body.classList.remove("cursor-none");
      return;
    }

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx - 4}px, ${cy - 4}px, 0) rotate(${rotation}deg)`;
      rafId = requestAnimationFrame(loop);
    };

    const rotation = 0;
    let _targetRotation = 0;

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);

    const onEnter = () => {
      _targetRotation = 45;
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.marginLeft = "-4px";
      cursor.style.marginTop = "-4px";
    };
    const onLeave = () => {
      _targetRotation = 0;
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      cursor.style.marginLeft = "0px";
      cursor.style.marginTop = "0px";
    };

    const interactives = document.querySelectorAll("a, button, [data-cursor-hover], input, textarea, select");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll<HTMLElement>("a, button");
    const magneticListeners: Array<{ el: HTMLElement; move: (e: Event) => void; leave: () => void }> = [];

    magneticElements.forEach((el) => {
      const onMagneticMove = (e: Event) => {
        const mouseE = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        const x = mouseE.clientX - rect.left - rect.width / 2;
        const y = mouseE.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      };
      const onMagneticLeave = () => {
        el.style.transform = "translate(0, 0)";
      };

      el.addEventListener("mousemove", onMagneticMove);
      el.addEventListener("mouseleave", onMagneticLeave);
      magneticListeners.push({ el, move: onMagneticMove, leave: onMagneticLeave });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      magneticListeners.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] w-2 h-2 bg-[#CCFF00]"
      style={{ willChange: "transform" }}
    />
  );
}
