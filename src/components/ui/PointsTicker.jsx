import React, { useEffect, useRef, useState } from "react";
import { fmt } from "../../utils/format.js";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const DURATION = 500;

export default function PointsTicker({ value, size = 28, color = "var(--amber)", glow }) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    // Only the headline figures (glow=true — balance, pot totals, house
    // take) count up on change; the dense per-row numbers in the ledger
    // table stay instant so data the user is reading doesn't move for
    // style. This mirrors how `glow` is already used to mark "the number
    // that matters" versus routine detail throughout the app.
    if (!glow) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || value === fromRef.current) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const from = fromRef.current;
    const to = value;
    const start = performance.now();
    cancelAnimationFrame(rafRef.current);

    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      setDisplay(Math.round(from + (to - from) * easeOut(t)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, glow]);

  return (
    <span style={{
      fontFamily: "'Roboto Mono', monospace", fontWeight: 700,
      fontSize: size, color, letterSpacing: 0.5,
      fontVariantNumeric: "tabular-nums",
      textShadow: glow ? `0 0 18px ${color}55` : "none",
    }}>
      {fmt(display)}
    </span>
  );
}
