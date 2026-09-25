import React, { useRef } from "react";

// Pointer-driven 3D tilt + glare for the app's two "hero" surfaces
// (balance chip, live-pot card) — the delight tier, used sparingly on
// purpose. Desktop/trackpad (hover: hover + pointer: fine) gets full
// continuous tracking, like a real card catching light. Touch gets a
// single tasteful settle-tilt on press instead of move-tracking, so it
// never fights the page's own scroll gesture.
const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

export default function TiltCard({ children, style, maxTilt = 7 }) {
  const ref = useRef(null);

  const setTilt = (rotateX, rotateY, glareX, glareY) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", `${rotateX}deg`);
    el.style.setProperty("--tilt-y", `${rotateY}deg`);
    el.style.setProperty("--glare-x", `${glareX}%`);
    el.style.setProperty("--glare-y", `${glareY}%`);
    el.style.setProperty("--glare-o", "1");
  };

  const handleMove = (e) => {
    if (!canHover()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt((0.5 - py) * (maxTilt * 2), (px - 0.5) * (maxTilt * 2), px * 100, py * 100);
  };

  const handlePress = (e) => {
    if (canHover()) { handleMove(e); return; }
    // Touch: no move-tracking (would fight scroll) — a single fixed
    // settle-tilt on press reads as "this is a physical card" without
    // needing to track the finger.
    setTilt(-3, 3, 70, 20);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--glare-o", "0");
  };

  return (
    <div className="huddle-tilt-perspective" style={style}>
      <div
        ref={ref}
        className="huddle-tilt"
        onPointerMove={handleMove}
        onPointerDown={handlePress}
        onPointerUp={reset}
        onPointerLeave={reset}
        onPointerCancel={reset}
      >
        <div className="huddle-tilt-glare" />
        {children}
      </div>
    </div>
  );
}
